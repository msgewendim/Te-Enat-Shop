import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import { uploadImage, validateImageFile } from '../utils/services/Storage'

const router = express.Router()

// Configure multer for file uploads (store in memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (server-side failsafe)
  },
  fileFilter: (req, file, cb) => {
    // Basic file type check
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

/**
 * POST /api/upload/image
 * Upload a single image file through the server to Cloudinary
 */
router.post(
  '/image',
  upload.single('file'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          error: 'No file provided',
          message: 'Please select an image file to upload'
        })
      }

      const { buffer, originalname } = req.file
      const folder = req.body.folder || 'tenat-uploads'

      // Validate the image file
      const validation = validateImageFile(buffer, originalname, 5) // 5MB limit
      if (!validation.isValid) {
        return res.status(400).json({
          error: 'Invalid file',
          message: validation.error
        })
      }

      // Upload to Cloudinary
      const imageUrl = await uploadImage(buffer, originalname, folder)

      res.status(200).json({
        success: true,
        imageUrl,
        message: 'Image uploaded successfully'
      })

    } catch (error) {
      console.error('Image upload error:', error)
      res.status(500).json({ 
        error: 'Upload failed',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      })
    }
  }
)

/**
 * POST /api/upload/images
 * Upload multiple image files through the server to Cloudinary
 */
router.post(
  '/images',
  upload.array('files', 10), // Allow up to 10 files
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as Express.Multer.File[]
      
      if (!files || files.length === 0) {
        return res.status(400).json({ 
          error: 'No files provided',
          message: 'Please select at least one image file to upload'
        })
      }

      const folder = req.body.folder || 'tenat-uploads'
      const uploadResults: Array<{
        success: boolean
        imageUrl?: string
        error?: string
        originalName: string
      }> = []

      // Process each file
      for (const file of files) {
        try {
          const { buffer, originalname } = file

          // Validate the image file
          const validation = validateImageFile(buffer, originalname, 5) // 5MB limit
          if (!validation.isValid) {
            uploadResults.push({
              success: false,
              error: validation.error,
              originalName: originalname
            })
            continue
          }

          // Upload to Cloudinary
          const imageUrl = await uploadImage(buffer, originalname, folder)
          uploadResults.push({
            success: true,
            imageUrl,
            originalName: originalname
          })

        } catch (error) {
          console.error(`Error uploading ${file.originalname}:`, error)
          uploadResults.push({
            success: false,
            error: error instanceof Error ? error.message : 'Upload failed',
            originalName: file.originalname
          })
        }
      }

      // Check overall success
      const successfulUploads = uploadResults.filter(result => result.success)
      const failedUploads = uploadResults.filter(result => !result.success)

      res.status(200).json({
        success: successfulUploads.length > 0,
        results: uploadResults,
        summary: {
          total: files.length,
          successful: successfulUploads.length,
          failed: failedUploads.length
        },
        message: failedUploads.length === 0 
          ? `All ${successfulUploads.length} images uploaded successfully`
          : `${successfulUploads.length} of ${files.length} images uploaded successfully`
      })

    } catch (error) {
      console.error('Batch upload error:', error)
      res.status(500).json({ 
        error: 'Batch upload failed',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      })
    }
  }
)

export default router 