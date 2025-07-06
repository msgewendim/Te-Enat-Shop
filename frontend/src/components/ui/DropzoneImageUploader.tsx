import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import { axiosInstance } from '../../providers/api'

interface DropzoneImageUploaderProps {
  onUpload: (url: string | string[]) => void
  onError?: (error: string) => void
  currentImageUrl?: string | string[]
  label?: string
  className?: string
  maxSizeMB?: number
  folder?: string
  multiple?: boolean
  maxFiles?: number
  onBatchProgress?: (progress: BatchUploadProgress) => void
}

interface BatchUploadProgress {
  total: number
  completed: number
  failed: number
  uploading: number
  currentFile?: string
}

interface FileUploadState {
  file: File
  id: string
  preview: string
  status: 'pending' | 'uploading' | 'success' | 'error'
  url?: string
  error?: string
  progress?: number
}

interface UploadResponse {
  success: boolean
  imageUrl: string
  message: string
}

interface BatchUploadResponse {
  success: boolean
  results: Array<{
    success: boolean
    imageUrl?: string
    error?: string
    originalName: string
  }>
  summary: {
    total: number
    successful: number
    failed: number
  }
  message: string
}

const DropzoneImageUploader: React.FC<DropzoneImageUploaderProps> = ({
  onUpload,
  onError,
  currentImageUrl,
  label,
  className = '',
  maxSizeMB = 5,
  folder = 'tenat-uploads',
  multiple = false,
  maxFiles = 10,
  onBatchProgress
}) => {
  const { t } = useTranslation()
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(
    typeof currentImageUrl === 'string' ? currentImageUrl : null
  )
  const [fileStates, setFileStates] = useState<FileUploadState[]>([])
  const [batchProgress, setBatchProgress] = useState<BatchUploadProgress>({
    total: 0,
    completed: 0,
    failed: 0,
    uploading: 0
  })

  const uploadSingleImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const response = await axiosInstance.post<UploadResponse>('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (!response.data.success) {
      throw new Error(response.data.message || 'Upload failed')
    }

    return response.data.imageUrl
  }

  const uploadBatchImages = async (files: File[]): Promise<BatchUploadResponse> => {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })
    formData.append('folder', folder)

    const response = await axiosInstance.post<BatchUploadResponse>('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    setIsUploading(true)

    if (!multiple) {
      // Single file upload
      const file = acceptedFiles[0]
      if (!file) {
        setIsUploading(false)
        return
      }

      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      try {
        const imageUrl = await uploadSingleImage(file)
        onUpload(imageUrl)
        URL.revokeObjectURL(previewUrl)
        setPreview(imageUrl)
      } catch (error) {
        console.error('Upload error:', error)
        const errorMessage = error instanceof Error 
          ? error.message 
          : t('upload.errors.uploadFailed')
        onError?.(errorMessage)
        URL.revokeObjectURL(previewUrl)
        setPreview(typeof currentImageUrl === 'string' ? currentImageUrl : null)
      } finally {
        setIsUploading(false)
      }
    } else {
      // Batch upload
      const newFileStates: FileUploadState[] = acceptedFiles.map(file => ({
        file,
        id: `${Date.now()}_${Math.random()}`,
        preview: URL.createObjectURL(file),
        status: 'pending'
      }))

      setFileStates(prev => [...prev, ...newFileStates])

      const progress: BatchUploadProgress = {
        total: newFileStates.length,
        completed: 0,
        failed: 0,
        uploading: newFileStates.length
      }
      setBatchProgress(progress)
      onBatchProgress?.(progress)

      try {
        const response = await uploadBatchImages(acceptedFiles)
        
        // Update file states with results
        setFileStates(prev => {
          const updated = [...prev]
          response.results.forEach((result, index) => {
            const fileState = updated.find(fs => fs.file.name === result.originalName)
            if (fileState) {
              fileState.status = result.success ? 'success' : 'error'
              fileState.url = result.imageUrl
              fileState.error = result.error
            }
          })
          return updated
        })

        // Update progress
        const finalProgress: BatchUploadProgress = {
          total: response.summary.total,
          completed: response.summary.successful,
          failed: response.summary.failed,
          uploading: 0
        }
        setBatchProgress(finalProgress)
        onBatchProgress?.(finalProgress)

        // Return successful URLs
        const successfulUrls = response.results
          .filter(result => result.success && result.imageUrl)
          .map(result => result.imageUrl!)
        
        if (successfulUrls.length > 0) {
          onUpload(successfulUrls)
        }

        if (response.summary.failed > 0) {
          onError?.(`${response.summary.failed} of ${response.summary.total} files failed to upload`)
        }

      } catch (error) {
        console.error('Batch upload error:', error)
        const errorMessage = error instanceof Error 
          ? error.message 
          : t('upload.errors.uploadFailed')
        onError?.(errorMessage)

        // Mark all as failed
        setFileStates(prev => prev.map(fs => ({ ...fs, status: 'error' as const, error: errorMessage })))
      } finally {
        setIsUploading(false)
      }
    }
  }, [multiple, onUpload, onError, currentImageUrl, folder, onBatchProgress, t])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: maxSizeMB * 1024 * 1024,
    maxFiles: multiple ? maxFiles : 1,
    multiple,
    disabled: isUploading
  })

  const handleRemoveImage = () => {
    setPreview(null)
    onUpload(multiple ? [] : '') // Clear the form field
  }

  const handleRemoveFileFromBatch = (fileId: string) => {
    setFileStates(prev => {
      const updated = prev.filter(fs => fs.id !== fileId)
      
      // Update URLs for parent form
      const successfulUrls = updated
        .filter(fs => fs.status === 'success' && fs.url)
        .map(fs => fs.url!)
      
      onUpload(successfulUrls)
      
      return updated
    })
  }

  const clearAllFiles = () => {
    // Clean up blob URLs
    fileStates.forEach(fs => {
      if (fs.preview.startsWith('blob:')) {
        URL.revokeObjectURL(fs.preview)
      }
    })
    
    setFileStates([])
    setBatchProgress({ total: 0, completed: 0, failed: 0, uploading: 0 })
    onUpload(multiple ? [] : '')
  }

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

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Single Image Preview */}
      {!multiple && preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
            aria-label={t('upload.removeImage')}
          >
            ×
          </button>
        </div>
      )}

      {/* Batch Upload Previews */}
      {multiple && fileStates.length > 0 && (
        <div className="space-y-3">
          {/* Progress Summary */}
          {batchProgress.total > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {t('upload.batchProgress', { 
                    completed: batchProgress.completed, 
                    total: batchProgress.total 
                  })}
                </span>
                <button
                  type="button"
                  onClick={clearAllFiles}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  {t('upload.clearAll')}
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${batchProgress.total > 0 ? (batchProgress.completed / batchProgress.total) * 100 : 0}%` 
                  }}
                />
              </div>
              {batchProgress.failed > 0 && (
                <p className="text-xs text-red-600 mt-1">
                  {t('upload.failedFiles', { count: batchProgress.failed })}
                </p>
              )}
            </div>
          )}

          {/* Individual File Previews */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {fileStates.map((fileState) => (
              <div key={fileState.id} className="relative">
                <img
                  src={fileState.preview}
                  alt={fileState.file.name}
                  className={`w-full h-20 object-cover rounded-lg border-2 transition-all ${
                    fileState.status === 'success' 
                      ? 'border-green-300' 
                      : fileState.status === 'error'
                      ? 'border-red-300'
                      : fileState.status === 'uploading'
                      ? 'border-blue-300'
                      : 'border-gray-300'
                  }`}
                />
                
                {/* Status Indicator */}
                <div className="absolute top-1 right-1">
                  {fileState.status === 'success' && (
                    <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      ✓
                    </div>
                  )}
                  {fileState.status === 'error' && (
                    <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      ✗
                    </div>
                  )}
                  {fileState.status === 'uploading' && (
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveFileFromBatch(fileState.id)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  aria-label={t('upload.removeFile', { name: fileState.file.name })}
                >
                  ×
                </button>

                {/* Error Message */}
                {fileState.status === 'error' && fileState.error && (
                  <p className="text-xs text-red-600 mt-1 truncate" title={fileState.error}>
                    {fileState.error}
                  </p>
                )}

                {/* File Name */}
                <p className="text-xs text-gray-600 mt-1 truncate" title={fileState.file.name}>
                  {fileState.file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dropzone Section */}
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
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
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
              <span className="text-sm text-gray-600">{t('upload.uploading')}</span>
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
                      ? t('upload.dragReject', { types: 'images' })
                      : multiple
                      ? t('upload.dragActiveMultiple')
                      : t('upload.dragActive')
                    : multiple
                    ? fileStates.length > 0
                      ? t('upload.dragInactiveMultipleWithFiles', { count: fileStates.length })
                      : t('upload.dragInactiveMultiple', { maxFiles })
                    : preview
                    ? t('upload.changeImage')
                    : t('upload.dragInactive')
                  }
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {t('upload.supportedFormats')} 
                  {multiple && ` (max ${maxFiles} files, `}
                  (max {maxSizeMB}MB{multiple ? ' each' : ''})
                  {multiple && ')'}
                </p>
              </div>
              
                              <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  {multiple 
                    ? fileStates.length > 0 
                      ? t('upload.addMoreImages')
                      : t('upload.selectImages')
                    : preview 
                    ? t('upload.changeImage') 
                    : t('upload.selectImage')
                  }
                </button>
            </>
          )}
        </div>
      </div>

      {/* Remove Button (Single Upload) */}
      {!multiple && preview && !isUploading && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleRemoveImage}
            className="inline-flex items-center px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 transition-colors"
          >
            {t('upload.remove')}
          </button>
        </div>
      )}
    </div>
  )
}

export default DropzoneImageUploader 