import {v2 as cloudinary} from 'cloudinary';
import { randomUUID } from 'crypto';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config/env.config';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

/**
 * Upload a Buffer (binary data) to Cloudinary under `archives/<archiveId>/`.
 * Returns the secure URL of the uploaded asset.
 */
export async function uploadBuffer(buffer: Buffer, mimeType: string, destinationPath: string) {
  const base64 = buffer.toString('base64');
  const dataUri = `data:${mimeType};base64,${base64}`;

  // Extract folder and file name from destinationPath
  const segments = destinationPath.split('/');
  const fileNameWithExt = segments.pop()!;
  const folderPath = segments.join('/'); // e.g. archives/57
  const publicId = fileNameWithExt.replace(/\.[^/.]+$/, '');

  const res = await cloudinary.uploader.upload(dataUri, {
    folder: folderPath, // creates folders automatically
    public_id: publicId,
    resource_type: 'auto',
    overwrite: true,
    unique_filename: false,
  });
  return res.secure_url;
}

/**
 * Delete an asset from Cloudinary given its secure URL.
 */
export async function deleteAsset(fileUrl: string) {
  // secure URL format: https://res.cloudinary.com/<cloud_name>/<resource_type>/upload/<version>/<public_id>.<ext>
  try {
    const url = new URL(fileUrl)
    const pathSegments = url.pathname.split('/')
    // ['','<resource_type>','upload','v<version>', ...public id parts ]
    const resourceType = pathSegments[1] ?? 'image' // default to image if not found

    // Extract public_id (remove version prefix and extension)
    const parts = fileUrl.split('/upload/')
    if (parts.length !== 2) throw new Error('Invalid Cloudinary URL')
    const publicIdWithVersion = parts[1]
    // Remove version segment (v###/)
    const publicId = publicIdWithVersion.replace(/v\d+\//, '').replace(/\.[^/.]+$/, '')
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
    } catch (err) {
      // Fallback: try other common resource types if not found
      const fallbackTypes = ['image', 'video', 'raw'].filter((t) => t !== resourceType)
      for (const t of fallbackTypes) {
        try {
          await cloudinary.uploader.destroy(publicId, { resource_type: t })
          return
        } catch {
          // continue
        }
      }
      throw err
    }
  } catch (err) {
    console.error('[deleteAsset] Failed to delete asset', err)
    throw err
  }
}

export function generateArchiveDestination(archiveId: number, originalFileName: string) {
  const ext = originalFileName.split('.').pop() ?? '';
  const unique = `${Date.now()}_${randomUUID()}`;
  return `archives/${archiveId}/${unique}.${ext}`;
}

export function getArchiveUrl(archiveId: number, fileName: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v1/archives/${archiveId}/${fileName}`
}

/**
 * Upload an image file to Cloudinary with proper organization and optimization
 * Returns the secure URL of the uploaded image
 */
export async function uploadImage(buffer: Buffer, originalFileName: string, folder: string = 'tenat-uploads'): Promise<string> {
  const base64 = buffer.toString('base64');
  const mimeType = getImageMimeType(originalFileName);
  const dataUri = `data:${mimeType};base64,${base64}`;
  
  // Generate unique filename to prevent conflicts
  const fileExt = originalFileName.split('.').pop()?.toLowerCase() || 'jpg';
  const uniqueId = `${Date.now()}_${randomUUID()}`;
  const publicId = `${uniqueId}`;

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      public_id: publicId,
      resource_type: 'image',
      format: fileExt,
      // Image optimization settings
      quality: 'auto:good',
      fetch_format: 'auto',
      crop: 'limit',
      width: 2000, // Max width to control file size
      height: 2000, // Max height to control file size
      overwrite: false,
      unique_filename: true,
    });

    return result.secure_url;
  } catch (error) {
    console.error('[uploadImage] Failed to upload image to Cloudinary:', error);
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get MIME type based on file extension
 */
function getImageMimeType(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml'
  };
  return mimeTypes[ext || 'jpg'] || 'image/jpeg';
}

/**
 * Validate image file
 */
export function validateImageFile(buffer: Buffer, fileName: string, maxSizeMB: number = 5): { isValid: boolean; error?: string } {
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (buffer.length > maxSizeBytes) {
    return { isValid: false, error: `File too large. Maximum size is ${maxSizeMB}MB` };
  }

  // Check file extension
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const fileExt = fileName.split('.').pop()?.toLowerCase();
  if (!fileExt || !allowedExtensions.includes(fileExt)) {
    return { isValid: false, error: 'Invalid file type. Only JPG, PNG, GIF, and WebP images are allowed' };
  }

  // Basic image file validation (check for magic bytes)
  const isValidImage = validateImageBuffer(buffer);
  if (!isValidImage) {
    return { isValid: false, error: 'Invalid image file format' };
  }

  return { isValid: true };
}

/**
 * Validate image buffer by checking magic bytes
 */
function validateImageBuffer(buffer: Buffer): boolean {
  if (buffer.length < 4) return false;

  // Check for common image file signatures
  const signatures = [
    [0xFF, 0xD8, 0xFF], // JPEG
    [0x89, 0x50, 0x4E, 0x47], // PNG
    [0x47, 0x49, 0x46], // GIF
    [0x52, 0x49, 0x46, 0x46], // WebP (RIFF)
  ];

  return signatures.some(sig => 
    sig.every((byte, index) => buffer[index] === byte)
  );
}