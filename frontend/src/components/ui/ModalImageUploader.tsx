import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import GenericModal from './Modal'
import DropzoneImageUploader from './DropzoneImageUploader'

interface ModalImageUploaderProps {
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
  buttonText?: string
  modalTitle?: string
}

interface BatchUploadProgress {
  total: number
  completed: number
  failed: number
  uploading: number
  currentFile?: string
}

function ModalImageUploader({
  onUpload,
  onError,
  currentImageUrl,
  label,
  className = '',
  maxSizeMB = 5,
  folder = 'tenat-uploads',
  multiple = false,
  maxFiles = 10,
  onBatchProgress,
  buttonText,
  modalTitle
}: ModalImageUploaderProps) {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<BatchUploadProgress | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleUpload = useCallback((urls: string | string[]) => {
    onUpload(urls)
    setUploadSuccess(true)
    
    // Show success message briefly, then close modal
    setTimeout(() => {
      setIsModalOpen(false)
      setUploadSuccess(false)
    }, 1500)
  }, [onUpload])

  const handleBatchProgress = useCallback((progress: BatchUploadProgress) => {
    setUploadProgress(progress)
    onBatchProgress?.(progress)
  }, [onBatchProgress])

  const handleError = useCallback((error: string) => {
    onError?.(error)
  }, [onError])

  const openModal = () => {
    setIsModalOpen(true)
    setUploadProgress(null)
    setUploadSuccess(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setUploadProgress(null)
    setUploadSuccess(false)
  }

  // Determine current state for display
  const hasImages = multiple 
    ? Array.isArray(currentImageUrl) && currentImageUrl.length > 0
    : Boolean(currentImageUrl)

  const imageCount = multiple && Array.isArray(currentImageUrl) 
    ? currentImageUrl.length 
    : (currentImageUrl ? 1 : 0)

  const getButtonText = () => {
    if (buttonText) return buttonText
    
    if (multiple) {
      return hasImages 
        ? t('upload.manageImages', { 
            count: imageCount,
            defaultValue: `Manage Images (${imageCount})`
          })
        : t('upload.selectImages')
    } else {
      return hasImages 
        ? t('upload.changeImage')
        : t('upload.selectImage')
    }
  }

  const getModalTitle = () => {
    if (modalTitle) return modalTitle
    
    return multiple 
      ? t('upload.uploadImages', { defaultValue: 'Upload Images' })
      : t('upload.uploadImage', { defaultValue: 'Upload Image' })
  }

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Current Images Preview */}
      {hasImages && (
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">
            {multiple 
              ? t('upload.currentImages', { 
                  count: imageCount,
                  defaultValue: `Current Images (${imageCount})`
                })
              : t('upload.currentImage', { defaultValue: 'Current Image' })
            }
          </div>
          
          {multiple && Array.isArray(currentImageUrl) ? (
            <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">
              {currentImageUrl.map((url, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-16 h-16 object-cover rounded border border-gray-300 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 truncate">
                      {t('upload.imageNumber', { number: index + 1, defaultValue: `Image ${index + 1}` })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {url.split('/').pop()?.split('?')[0] || 'image.jpg'}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {t('upload.uploaded', { defaultValue: 'Uploaded' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
              <img
                src={typeof currentImageUrl === 'string' ? currentImageUrl : ''}
                alt="Preview"
                className="w-20 h-20 object-cover rounded border border-gray-300 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600">
                  {t('upload.uploadedImage', { defaultValue: 'Uploaded Image' })}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {typeof currentImageUrl === 'string' 
                    ? currentImageUrl.split('/').pop()?.split('?')[0] || 'image.jpg'
                    : 'image.jpg'
                  }
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {t('upload.uploaded', { defaultValue: 'Uploaded' })}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Button */}
      <button
        type="button"
        onClick={openModal}
        className={`
          inline-flex items-center px-4 py-2 border border-gray-300 rounded-md 
          text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          transition-colors duration-200
          ${hasImages ? 'border-green-300 bg-green-50 text-green-700 hover:bg-green-100' : ''}
        `}
      >
        <svg 
          className="w-4 h-4 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
          />
        </svg>
        {getButtonText()}
      </button>

      {/* Upload Progress Indicator */}
      {uploadProgress && uploadProgress.uploading > 0 && (
        <div className="mt-2 text-xs text-blue-600">
          {t('upload.uploading')} {uploadProgress.uploading} / {uploadProgress.total}
        </div>
      )}

      {/* Modal */}
      <GenericModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title={getModalTitle()}
        content={
          <div className="space-y-4">
                         {/* Upload Instructions or Success Message */}
             {uploadSuccess ? (
               <div className="text-center py-4">
                 <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                   <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                   </svg>
                 </div>
                 <h3 className="text-lg font-medium text-gray-900 mb-2">
                   {t('upload.uploadSuccessful', { defaultValue: 'Upload Successful!' })}
                 </h3>
                 <p className="text-sm text-gray-600">
                   {multiple 
                     ? t('upload.imagesUploadedSuccessfully', { 
                         defaultValue: 'Your images have been uploaded successfully.' 
                       })
                     : t('upload.imageUploadedSuccessfully', { 
                         defaultValue: 'Your image has been uploaded successfully.' 
                       })
                   }
                 </p>
               </div>
             ) : (
               <div className="text-sm text-gray-600 text-center">
                 {multiple ? (
                   <p>
                     {t('upload.modalInstructionsMultiple', {
                       maxFiles,
                       maxSize: maxSizeMB,
                       defaultValue: `Select up to ${maxFiles} images (max ${maxSizeMB}MB each)`
                     })}
                   </p>
                 ) : (
                   <p>
                     {t('upload.modalInstructionsSingle', {
                       maxSize: maxSizeMB,
                       defaultValue: `Select an image (max ${maxSizeMB}MB)`
                     })}
                   </p>
                 )}
               </div>
             )}

                         {/* Dropzone Uploader */}
             {!uploadSuccess && (
               <DropzoneImageUploader
                 multiple={multiple}
                 maxFiles={maxFiles}
                 onUpload={handleUpload}
                 onError={handleError}
                 onBatchProgress={handleBatchProgress}
                 currentImageUrl={currentImageUrl}
                 maxSizeMB={maxSizeMB}
                 folder={folder}
                 className="min-h-[200px]"
               />
             )}

                         {/* Modal Actions */}
             {!uploadSuccess && (
               <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                 <button
                   type="button"
                   onClick={closeModal}
                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                 >
                   {t('common.cancel', { defaultValue: 'Cancel' })}
                 </button>
                 {hasImages && (
                   <button
                     type="button"
                     onClick={closeModal}
                     className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                   >
                     {t('common.done', { defaultValue: 'Done' })}
                   </button>
                 )}
               </div>
             )}
          </div>
        }
        className="w-full max-w-2xl"
        contentClassName="p-6"
      />
    </div>
  )
}

export default ModalImageUploader 