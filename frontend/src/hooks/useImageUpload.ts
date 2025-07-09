import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { postUtil } from '../lib/api'
import useAuth from './auth/useAuth'

interface UseImageUploadOptions {
  multiple?: boolean
  maxFiles?: number
  maxSizeMB?: number
  folder?: string
  onSuccess?: (urls: string | string[]) => void
  onError?: (error: string) => void
}

interface UploadProgress {
  total: number
  completed: number
  failed: number
  uploading: number
  currentFile?: string
}

interface FileState {
  file: File
  id: string
  preview: string
  status: 'pending' | 'uploading' | 'success' | 'error'
  url?: string
  error?: string
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

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const {
    multiple = false,
    maxFiles = 10,
    maxSizeMB = 5,
    folder = 'tenat-uploads',
    onSuccess,
    onError
  } = options
  const { getToken } = useAuth()
  const { t } = useTranslation()
  const [isUploading, setIsUploading] = useState(false)
  const [fileStates, setFileStates] = useState<FileState[]>([])
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    total: 0,
    completed: 0,
    failed: 0,
    uploading: 0
  })

  const uploadSingleImage = async (file: File): Promise<string> => {
    const token = await getToken()
    const formData = new FormData()
    formData.append('file', file)

    const url = `/upload/images${folder ? `?folder=${folder}` : ''}`
    
    const response = await postUtil(url, formData, token, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // API returns direct response object for single uploads
    if (!response.data.url) {
      throw new Error('Upload failed - no URL returned')
    }

    return response.data.url
  }

  const uploadBatchImages = async (files: File[]): Promise<BatchUploadResponse> => {
    const token = await getToken()
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })

    const url = `/upload/images${folder ? `?folder=${folder}` : ''}`

    const response = await postUtil(url, formData, token, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // Transform API response to match our interface
    return {
      success: true,
      results: [
        ...(response.data.successful || []).map((item: any) => ({
          success: true,
          imageUrl: item.url,
          originalName: item.originalName
        })),
        ...(response.data.failed || []).map((item: any) => ({
          success: false,
          error: item.error,
          originalName: item.originalName
        }))
      ],
      summary: {
        total: response.data.total || files.length,
        successful: response.data.successCount || 0,
        failed: response.data.failureCount || 0
      },
      message: 'Batch upload completed'
    }
  }

  const uploadFiles = useCallback(async (files: File[]) => {
    if (files.length === 0) return

    setIsUploading(true)

    if (!multiple) {
      // Single file upload
      const file = files[0]
      if (!file) {
        setIsUploading(false)
        return
      }

      const newFileState: FileState = {
        file,
        id: `${Date.now()}_${Math.random()}`,
        preview: URL.createObjectURL(file),
        status: 'uploading'
      }

      setFileStates([newFileState])

      try {
        const imageUrl = await uploadSingleImage(file)
        
        setFileStates([{
          ...newFileState,
          status: 'success',
          url: imageUrl
        }])

        onSuccess?.(imageUrl)
      } catch (error) {
        console.error('Upload error:', error)
        const errorMessage = error instanceof Error 
          ? error.message 
          : t('upload.errors.uploadFailed')
        
        setFileStates([{
          ...newFileState,
          status: 'error',
          error: errorMessage
        }])

        onError?.(errorMessage)
      } finally {
        setIsUploading(false)
      }
    } else {
      // Batch upload
      const newFileStates: FileState[] = files.map(file => ({
        file,
        id: `${Date.now()}_${Math.random()}`,
        preview: URL.createObjectURL(file),
        status: 'pending'
      }))

      setFileStates(prev => [...prev, ...newFileStates])

      const progress: UploadProgress = {
        total: newFileStates.length,
        completed: 0,
        failed: 0,
        uploading: newFileStates.length
      }
      setUploadProgress(progress)

      try {
        // Mark all as uploading
        setFileStates(prev => prev.map(fs => 
          newFileStates.find(nfs => nfs.id === fs.id)
            ? { ...fs, status: 'uploading' as const }
            : fs
        ))

        const response = await uploadBatchImages(files)
        
        // Update file states with results
        setFileStates(prev => {
          const updated = [...prev]
          response.results.forEach((result) => {
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
        const finalProgress: UploadProgress = {
          total: response.summary.total,
          completed: response.summary.successful,
          failed: response.summary.failed,
          uploading: 0
        }
        setUploadProgress(finalProgress)

        // Return successful URLs
        const successfulUrls = response.results
          .filter(result => result.success && result.imageUrl)
          .map(result => result.imageUrl)
        
        if (successfulUrls.length > 0) {
          onSuccess?.(successfulUrls)
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
  }, [multiple, folder, onSuccess, onError, t])

  const removeFile = useCallback((fileId: string) => {
    setFileStates(prev => {
      const updated = prev.filter(fs => fs.id !== fileId)
      
      // Clean up blob URL
      const fileToRemove = prev.find(fs => fs.id === fileId)
      if (fileToRemove && fileToRemove.preview.startsWith('blob:')) {
        URL.revokeObjectURL(fileToRemove.preview)
      }

      // Update success callback with remaining URLs
      if (multiple) {
        const remainingUrls = updated
          .filter(fs => fs.status === 'success' && fs.url)
          .map(fs => fs.url)
        onSuccess?.(remainingUrls)
      } else if (updated.length === 0) {
        onSuccess?.('')
      }
      
      return updated
    })
  }, [multiple, onSuccess])

  const clearAll = useCallback(() => {
    // Clean up blob URLs
    fileStates.forEach(fs => {
      if (fs.preview.startsWith('blob:')) {
        URL.revokeObjectURL(fs.preview)
      }
    })
    
    setFileStates([])
    setUploadProgress({ total: 0, completed: 0, failed: 0, uploading: 0 })
    onSuccess?.(multiple ? [] : '')
  }, [fileStates, multiple, onSuccess])

  const getSuccessfulUrls = useCallback(() => {
    const urls = fileStates
      .filter(fs => fs.status === 'success' && fs.url)
      .map(fs => fs.url)
    
    return multiple ? urls : (urls[0] || '')
  }, [fileStates, multiple])

  return {
    // State
    isUploading,
    fileStates,
    uploadProgress,
    
    // Actions
    uploadFiles,
    removeFile,
    clearAll,
    
    // Computed
    getSuccessfulUrls,
    hasFiles: fileStates.length > 0,
    hasSuccessfulUploads: fileStates.some(fs => fs.status === 'success'),
    
    // Config
    multiple,
    maxFiles,
    maxSizeMB
  }
} 