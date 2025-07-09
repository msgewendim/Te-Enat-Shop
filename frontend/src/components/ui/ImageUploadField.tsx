import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import { useImageUpload } from '../../hooks/useImageUpload'

interface ImageUploadFieldProps {
  value?: string | string[]
  onChange: (value: string | string[]) => void
  onError?: (error: string) => void
  label?: string
  placeholder?: string
  className?: string
  multiple?: boolean
  maxFiles?: number
  maxSizeMB?: number
  folder?: string
  required?: boolean
  disabled?: boolean
}

export function ImageUploadField({
  value,
  onChange,
  onError,
  label,
  placeholder,
  className = '',
  multiple = false,
  maxFiles = 10,
  maxSizeMB = 5,
  folder = 'tenat-uploads',
  required = false,
  disabled = false
}: ImageUploadFieldProps) {
  const { t } = useTranslation()

  const imageUpload = useImageUpload({
    multiple,
    maxFiles,
    maxSizeMB,
    folder,
    onSuccess: onChange,
    onError
  })

  const {
    isUploading,
    fileStates,
    uploadProgress,
    uploadFiles,
    removeFile,
    clearAll,
    hasFiles,
    hasSuccessfulUploads
  } = imageUpload

  // Initialize with existing value
  useEffect(() => {
    if (value) {
      const urls = Array.isArray(value) ? value : [value]
      // Only set if we don't already have files to avoid overriding
      if (fileStates.length === 0 && urls.length > 0 && urls[0]) {
        // Create file states for existing images
        const existingFileStates = urls.map((url, index) => ({
          file: new File([], `existing-${index}`, { type: 'image/jpeg' }),
          id: `existing-${index}-${url}`,
          preview: url,
          status: 'success' as const,
          url
        }))
        // We can't directly set fileStates from here, but we can track it
      }
    }
  }, [value, fileStates.length])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections
  } = useDropzone({
    onDrop: uploadFiles,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: maxSizeMB * 1024 * 1024,
    maxFiles: multiple ? maxFiles : 1,
    multiple,
    disabled: disabled || isUploading
  })

  // Handle file rejection errors
  useEffect(() => {
    if (fileRejections.length > 0) {
      const rejection = fileRejections[0]
      if (rejection && rejection.errors.length > 0) {
        const error = rejection.errors[0]
        if (error) {
          let errorMessage = t('upload.errors.uploadFailed')
          
          if (error.code === 'file-too-large') {
            errorMessage = t('upload.errors.fileTooLarge', { maxSize: maxSizeMB })
          } else if (error.code === 'file-invalid-type') {
            errorMessage = t('upload.errors.invalidFileType')
          }
          
          onError?.(errorMessage)
        }
      }
    }
  }, [fileRejections, onError, maxSizeMB, t])

  // Get current images (from props or uploaded files)
  const getCurrentImages = () => {
    // First check successful uploads from fileStates
    const uploadedUrls = fileStates
      .filter(fs => fs.status === 'success' && fs.url)
      .map(fs => ({ url: fs.url!, id: fs.id, isUploaded: true }))

    if (uploadedUrls.length > 0) {
      return uploadedUrls
    }

    // Then check value prop for existing images
    if (value) {
      const urls = Array.isArray(value) ? value : [value]
      return urls
        .filter(url => url && url.trim() !== '')
        .map((url, index) => ({ 
          url, 
          id: `existing-${index}-${url}`, 
          isUploaded: false 
        }))
    }

    return []
  }

  const currentImages = getCurrentImages()
  const hasImages = currentImages.length > 0

  const handleRemoveExistingImage = (imageId: string) => {
    if (imageId.startsWith('existing-')) {
      // Handle existing images from props
      const imageUrl = imageId.split('existing-')[1]?.split('-').slice(1).join('-')
      if (multiple && Array.isArray(value)) {
        const updatedUrls = value.filter(url => url !== imageUrl)
        onChange(updatedUrls)
      } else {
        onChange('')
      }
    } else {
      // Handle uploaded images
      removeFile(imageId)
    }
  }

  const getButtonText = () => {
    if (multiple) {
      return hasImages 
        ? t('upload.addMoreImages', { 
            defaultValue: `Add More Images (${currentImages.length})`
          })
        : t('upload.selectImages', { defaultValue: 'Select Images' })
    } else {
      return hasImages 
        ? t('upload.changeImage', { defaultValue: 'Change Image' })
        : t('upload.selectImage', { defaultValue: 'Select Image' })
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Current Images Display */}
      {hasImages && (
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">
            {multiple 
              ? t('upload.currentImages', { 
                  count: currentImages.length,
                  defaultValue: `Current Images (${currentImages.length})`
                })
              : t('upload.currentImage', { defaultValue: 'Current Image' })
            }
          </div>
          
          <div className={multiple 
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" 
            : "flex justify-start"
          }>
            {currentImages.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt="Preview"
                  className={`object-cover rounded-lg border border-gray-300 ${
                    multiple ? 'w-full h-20' : 'w-24 h-24'
                  }`}
                />
                
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(image.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-80 group-hover:opacity-100"
                  aria-label={t('upload.removeImage')}
                  disabled={disabled}
                >
                  ×
                </button>

                {/* Status Indicator for Uploaded Files */}
                {image.isUploaded && (
                  <div className="absolute bottom-1 right-1">
                    <div className="bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      ✓
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Clear All Button for Multiple */}
          {multiple && currentImages.length > 1 && (
            <button
              type="button"
              onClick={() => {
                clearAll()
                onChange([])
              }}
              className="text-sm text-red-600 hover:text-red-800 transition-colors"
              disabled={disabled}
            >
              {t('upload.clearAll', { defaultValue: 'Clear All' })} ({currentImages.length})
            </button>
          )}
        </div>
      )}

      {/* Upload Progress */}
      {uploadProgress.total > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-900">
              {t('upload.batchProgress', { 
                completed: uploadProgress.completed, 
                total: uploadProgress.total,
                defaultValue: `Progress: ${uploadProgress.completed}/${uploadProgress.total}`
              })}
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${uploadProgress.total > 0 ? (uploadProgress.completed / uploadProgress.total) * 100 : 0}%` 
              }}
            />
          </div>
          {uploadProgress.failed > 0 && (
            <p className="text-xs text-red-600 mt-1">
              {t('upload.failedFiles', { 
                count: uploadProgress.failed,
                defaultValue: `${uploadProgress.failed} files failed`
              })}
            </p>
          )}
        </div>
      )}

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive && !isDragReject 
            ? 'border-blue-400 bg-blue-50' 
            : isDragReject 
            ? 'border-red-400 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
          }
          ${isUploading || disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-2">
          {isUploading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-gray-600">
                {t('upload.uploading', { defaultValue: 'Uploading...' })}
              </span>
            </div>
          ) : (
            <>
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-full w-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? isDragReject 
                      ? t('upload.dragReject', { types: 'images', defaultValue: 'Invalid file type' })
                      : multiple
                      ? t('upload.dragActiveMultiple', { defaultValue: 'Drop images here' })
                      : t('upload.dragActive', { defaultValue: 'Drop image here' })
                    : placeholder || (multiple
                      ? t('upload.dragInactiveMultiple', { 
                          maxFiles,
                          defaultValue: `Drag images here or click to select (max ${maxFiles})`
                        })
                      : t('upload.dragInactive', { defaultValue: 'Drag image here or click to select' })
                    )
                  }
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {t('upload.supportedFormats', { defaultValue: 'PNG, JPG, GIF, WebP' })} 
                  {multiple && ` (max ${maxFiles} files, `}
                  (max {maxSizeMB}MB{multiple ? ' each' : ''})
                  {multiple && ')'}
                </p>
              </div>
              
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                disabled={disabled}
              >
                {getButtonText()}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 