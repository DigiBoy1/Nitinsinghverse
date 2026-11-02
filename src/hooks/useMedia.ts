import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export interface MediaFile {
  name: string
  id: string
  metadata: {
    size: number
    mimetype: string
  }
  created_at: string
}

export function useMedia() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  const fetchFiles = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.storage.from('media').list('', {
      limit: 100,
      sortBy: { column: 'created_at', order: 'desc' },
    })

    setLoading(false)
    if (error) {
      toast.error('Failed to load media: ' + error.message)
      return
    }
    // Filter out the empty placeholder file if exists
    setFiles((data as any[]).filter(f => f.name !== '.emptyFolderPlaceholder') as MediaFile[])
  }, [supabase])

  const uploadFile = async (file: File) => {
    // Application layer validation
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return false
    }

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

    const { error } = await supabase.storage.from('media').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

    setUploading(false)

    if (error) {
      toast.error('Upload failed: ' + error.message)
      return false
    }

    toast.success('File uploaded successfully')
    await fetchFiles()
    return true
  }

  const deleteFile = async (fileName: string) => {
    const { error } = await supabase.storage.from('media').remove([fileName])
    if (error) {
      toast.error('Failed to delete file: ' + error.message)
      return false
    }
    toast.success('File deleted')
    await fetchFiles()
    return true
  }

  const getPublicUrl = (fileName: string) => {
    return supabase.storage.from('media').getPublicUrl(fileName).data.publicUrl
  }

  return {
    files,
    loading,
    uploading,
    fetchFiles,
    uploadFile,
    deleteFile,
    getPublicUrl
  }
}
