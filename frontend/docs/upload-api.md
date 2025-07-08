# Upload Module

The Upload module provides image upload functionality using Cloudinary as the storage service. It supports both single and batch image uploads through a unified endpoint.

## Features

- **Single Image Upload**: Upload one image at a time
- **Batch Image Upload**: Upload multiple images in a single request  
- **Cloudinary Integration**: Uses Cloudinary for optimized cloud storage
- **Image Validation**: Validates file types, sizes, and image format
- **Error Handling**: Robust error handling with partial success for batch uploads
- **Custom Folders**: Organize uploads in different Cloudinary folders

## Configuration

### Environment Variables

Add these variables to your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key  
CLOUDINARY_API_SECRET=your-api-secret
```

### File Limits

- **Max file size**: 10MB per file
- **Max files per batch**: 10 files
- **Supported formats**: JPG, JPEG, PNG, GIF, WebP

## API Endpoint

### POST `/upload/images`

Upload single or multiple images.

#### Parameters

- `file` (optional): Single file for upload
- `files` (optional): Multiple files for batch upload
- `folder` (query, optional): Cloudinary folder name (default: "tenat-uploads")

#### Single File Upload

```bash
curl -X POST \
  http://localhost:3005/upload/images \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@image.jpg'
```

#### Batch Upload

```bash
curl -X POST \
  http://localhost:3005/upload/images \
  -H 'Content-Type: multipart/form-data' \
  -F 'files=@image1.jpg' \
  -F 'files=@image2.png' \
  -F 'files=@image3.gif'
```

#### With Custom Folder

```bash
curl -X POST \
  'http://localhost:3005/upload/images?folder=products' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@product.jpg'
```

## Response Formats

### Single Upload Response

```json
{
  "originalName": "image.jpg",
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/tenat-uploads/unique-id.jpg",
  "size": 245760,
  "mimeType": "image/jpeg"
}
```

### Batch Upload Response

```json
{
  "successful": [
    {
      "originalName": "image1.jpg",
      "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/tenat-uploads/unique-id-1.jpg",
      "size": 245760,
      "mimeType": "image/jpeg"
    }
  ],
  "failed": [
    {
      "originalName": "invalid.txt", 
      "error": "Invalid file type. Only JPG, PNG, GIF, and WebP images are allowed"
    }
  ],
  "total": 2,
  "successCount": 1,
  "failureCount": 1
}
```

## Frontend Integration Examples

### JavaScript/TypeScript

```typescript
// Single file upload
const uploadSingle = async (file: File, folder?: string) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const url = folder ? `/upload/images?folder=${folder}` : '/upload/images';
  
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  
  return response.json();
};

// Batch upload
const uploadBatch = async (files: File[], folder?: string) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  
  const url = folder ? `/upload/images?folder=${folder}` : '/upload/images';
  
  const response = await fetch(url, {
    method: 'POST', 
    body: formData,
  });
  
  return response.json();
};
```

### React Hook Example

```tsx
import { useState } from 'react';

const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImages = async (files: File[], folder?: string) => {
    setUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));
      
      const url = folder ? `/upload/images?folder=${folder}` : '/upload/images';
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImages, uploading, error };
};
```

## Error Handling

The module provides comprehensive error handling:

- **File validation errors**: Invalid file types, sizes, or formats
- **Upload failures**: Network issues or Cloudinary errors  
- **Batch processing**: Partial failures are handled gracefully
- **Missing files**: Clear error messages for missing uploads

## Security Considerations

1. **File type validation**: Only allows image file types
2. **Size limits**: Prevents large file uploads that could impact performance
3. **Magic byte validation**: Validates actual file content, not just extensions
4. **Rate limiting**: Consider adding rate limiting in production
5. **Authentication**: Add authentication middleware as needed

## Performance Optimizations

- **Parallel processing**: Batch uploads are processed in parallel
- **Image optimization**: Cloudinary automatically optimizes images
- **Memory storage**: Uses memory storage for temporary file handling
- **Size constraints**: Prevents memory exhaustion with size limits

## Troubleshooting

### Common Issues

1. **Cloudinary configuration**: Ensure environment variables are set correctly
2. **File size limits**: Check if files exceed the 10MB limit
3. **Network timeouts**: Large batch uploads may need increased timeout settings
4. **CORS issues**: Configure CORS for frontend integration

### Debugging

Enable detailed logging by setting `NODE_ENV=development` in your environment. 