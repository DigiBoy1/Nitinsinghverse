'use client'

import { useEffect, useRef, useState } from 'react'
import { useMedia } from '@/hooks/useMedia'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { UploadCloud, File, Trash2, ExternalLink, FileText, Film, Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export default function MediaPage() {
  const { files, loading, uploading, fetchFiles, uploadFile, deleteFile, getPublicUrl } = useMedia()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
        <div className="flex gap-2">
          <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            <UploadCloud className="mr-2 h-4 w-4" />
            {uploading ? 'Uploading...' : 'Upload File'}
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={async (e) => {
              if (e.target.files && e.target.files[0]) {
                await uploadFile(e.target.files[0])
              }
            }}
            accept="image/*,application/pdf,video/*"
          />
        </div>
      </div>

      <Card className="border-zinc-800 bg-zinc-950 p-6 min-h-[500px]">
        {loading ? (
          <div className="flex h-full items-center justify-center text-zinc-500 py-20">Loading media...</div>
        ) : files.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-zinc-500 py-20">
            <UploadCloud className="h-12 w-12 mb-4 opacity-50" />
            <p>No media files found.</p>
            <p className="text-sm mt-2">Upload images, PDFs, or videos to use across your portfolio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {files.map((file) => {
              const url = getPublicUrl(file.name)
              const isImage = file.metadata?.mimetype?.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name)
              const isPdf = file.metadata?.mimetype === 'application/pdf' || /\.pdf$/i.test(file.name)
              const isVideo = file.metadata?.mimetype?.startsWith('video/') || /\.(mp4|webm|mov)$/i.test(file.name)
              
              return (
                <div key={file.id} className="group flex flex-col space-y-2">
                  <div className="relative aspect-square overflow-hidden rounded-md border border-zinc-800 bg-zinc-900 transition-colors group-hover:border-zinc-700 flex items-center justify-center">
                    {isImage ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={url} alt={file.name} className="h-full w-full object-cover" />
                    ) : isPdf ? (
                      <div className="flex flex-col items-center justify-center space-y-2 p-2 text-center">
                        <div className="relative flex items-center justify-center">
                          <FileText className="h-14 w-14 text-rose-500 transition-transform group-hover:scale-105" />
                          <span className="absolute -bottom-1 rounded bg-rose-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider shadow-sm">
                            PDF
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-400 font-mono truncate max-w-[110px] block mt-1">
                          {file.name}
                        </span>
                      </div>
                    ) : isVideo ? (
                      <div className="relative h-full w-full flex items-center justify-center bg-zinc-950">
                        <Film className="h-10 w-10 text-cyan-400" />
                        <span className="absolute bottom-1 right-1 rounded bg-zinc-800 px-1 py-0.5 text-[8px] text-zinc-300 uppercase">VIDEO</span>
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <File className="h-12 w-12 text-zinc-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/70 backdrop-blur-xs opacity-0 transition-opacity group-hover:opacity-100">
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-8 w-8 bg-zinc-800 hover:bg-zinc-700 text-white" 
                        title="Open / Preview in new tab"
                        onClick={() => window.open(url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-8 w-8 bg-zinc-800 hover:bg-zinc-700 text-white" 
                        title="Copy URL"
                        onClick={() => {
                          navigator.clipboard.writeText(url)
                          toast.success('Copied URL to clipboard')
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="h-8 w-8 bg-red-950/80 hover:bg-red-900 text-red-300" 
                        title="Delete"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this file? This might break links in your content.')) {
                            deleteFile(file.name)
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="truncate text-xs font-medium text-zinc-300" title={file.name}>{file.name}</span>
                    <span className="text-[10px] text-zinc-500">{(file.metadata.size / 1024).toFixed(1)} KB</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}
