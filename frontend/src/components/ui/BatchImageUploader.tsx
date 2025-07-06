import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import DropzoneImageUploader from './DropzoneImageUploader'

interface BatchImageUploaderProps {
  onUpload: (urls: string[]) => void
  onError?: (error: string) => void
  currentImageUrls?: string[]
  label?: string
  className?: string
  maxSizeMB?: number
  folder?: string
  maxFiles?: number
}

interface BatchUploadProgress {
  total: number
  completed: number
  failed: number
  uploading: number
  currentFile?: string
}

function BatchImageUploader({
  onUpload,
  onError,
  currentImageUrls = [],
  label,
  className = '',
  maxSizeMB = 5,
  folder = 'tenat-uploads',
  maxFiles = 10
}: BatchImageUploaderProps) {
  const { t } = useTranslation()
  const [uploadProgress, setUploadProgress] = useState<BatchUploadProgress | null>(null)
  const [allUploadedUrls, setAllUploadedUrls] = useState<string[]>(currentImageUrls)

  const handleBatchUpload = useCallback((urls: string | string[]) => {
    const urlArray = Array.isArray(urls) ? urls : [urls]
    const updatedUrls = [...allUploadedUrls, ...urlArray]
    setAllUploadedUrls(updatedUrls)
    onUpload(updatedUrls)
  }, [allUploadedUrls, onUpload])

  const handleBatchProgress = useCallback((progress: BatchUploadProgress) => {
    setUploadProgress(progress)
  }, [])

  const handleError = useCallback((error: string) => {
    onError?.(error)
  }, [onError])

  const clearAllImages = () => {
    setAllUploadedUrls([])
    setUploadProgress(null)
    onUpload([])
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          {label || t('upload.selectImages')}
        </h3>
        {allUploadedUrls.length > 0 && (
          <button
            type="button"
            onClick={clearAllImages}
            className="text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            {t('upload.clearAll')} ({allUploadedUrls.length})
          </button>
        )}
      </div>

      {/* Upload Progress Summary */}
      {uploadProgress && uploadProgress.total > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-blue-900">
              {t('upload.batchProgress', { 
                completed: uploadProgress.completed, 
                total: uploadProgress.total 
              })}
            </h4>
            <span className="text-xs text-blue-600">
              {uploadProgress.uploading > 0 && `${t('upload.uploading')} ${uploadProgress.uploading}`}
            </span>
          </div>
          
          <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${uploadProgress.total > 0 ? (uploadProgress.completed / uploadProgress.total) * 100 : 0}%` 
              }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-blue-700">
            <span>
              {uploadProgress.completed} {t('upload.completed', { defaultValue: 'completed' })}
            </span>
            {uploadProgress.failed > 0 && (
              <span className="text-red-600">
                {uploadProgress.failed} {t('upload.failed', { defaultValue: 'failed' })}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main Upload Component */}
      <DropzoneImageUploader
        multiple={true}
        maxFiles={maxFiles}
        onUpload={handleBatchUpload}
        onError={handleError}
        onBatchProgress={handleBatchProgress}
        currentImageUrl={allUploadedUrls}
        maxSizeMB={maxSizeMB}
        folder={folder}
        className="border-2 border-dashed border-gray-300 rounded-lg"
      />

      {/* Uploaded Images Summary */}
      {allUploadedUrls.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-900 mb-2">
            {t('upload.uploadedImages', { 
              count: allUploadedUrls.length,
              defaultValue: `${allUploadedUrls.length} images uploaded successfully`
            })}
          </h4>
          <div className="text-xs text-green-700">
            <p>{t('upload.readyToUse', { defaultValue: 'Images are ready to use in your content.' })}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BatchImageUploader 