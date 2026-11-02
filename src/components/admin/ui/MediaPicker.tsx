'use client'

import { useEffect, useState, useRef } from 'react'
import { useMedia, MediaFile } from '@/hooks/useMedia'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X, UploadCloud, File, Trash2, Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface MediaPickerProps {
  onSelect: (url: string) => void
  onClose: () => void
}

export function MediaPicker({ onSelect, onClose }: MediaPickerProps) {
  const { files, loading, uploading, fetchFiles, uploadFile, deleteFile, getPublicUrl } = useMedia()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0])
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="flex h-full max-h-[80vh] w-full max-w-4xl flex-col rounded-xl bg-zinc-950 border border-zinc-800 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
          <h2 className="text-lg font-semibold text-zinc-50">Select Media</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between border-b border-zinc-800 p-4 bg-zinc-900/50">
          <div className="text-sm text-zinc-400">
            {files.length} items
          </div>
          <Button onClick={handleUploadClick} disabled={uploading}>
            <UploadCloud className="mr-2 h-4 w-4" />
            {uploading ? 'Uploading...' : 'Upload File'}
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange}
            accept="image/*,application/pdf,video/*"
          />
        </div>

        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="flex h-full items-center justify-center text-zinc-500">Loading...</div>
          ) : files.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-zinc-500">
              <ImageIcon className="h-12 w-12 mb-4 opacity-50" />
              <p>No media found. Upload something to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {files.map((file) => {
                const url = getPublicUrl(file.name)
                const isImage = file.metadata.mimetype?.startsWith('image/')
                return (
                  <Card key={file.id} className="group relative overflow-hidden bg-zinc-900 hover:border-zinc-500 cursor-pointer transition-colors">
                    <div 
                      className="aspect-square flex items-center justify-center bg-zinc-800 p-2"
                      onClick={() => onSelect(url)}
                    >
                      {isImage ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={url} alt={file.name} className="h-full w-full object-cover rounded-md" />
                      ) : (
                        <File className="h-10 w-10 text-zinc-500" />
                      )}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-xs text-white truncate opacity-0 transition-opacity group-hover:opacity-100 flex justify-between items-center">
                      <span className="truncate">{file.name}</span>
                      <div className="flex shrink-0">
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="h-6 w-6 ml-2 bg-zinc-700 hover:bg-zinc-600 text-white" 
                          onClick={(e) => {
                            e.stopPropagation()
                            navigator.clipboard.writeText(url)
                            toast.success('Copied URL to clipboard')
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-6 w-6 ml-1" 
                          onClick={(e) => {
                            e.stopPropagation()
                            if (confirm('Delete this file?')) deleteFile(file.name)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}
