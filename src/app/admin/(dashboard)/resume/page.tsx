'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeVersionSchema } from '@/lib/api/schemas'
import { useAdminResource } from '@/hooks/useAdminResource'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MediaPicker } from '@/components/admin/ui/MediaPicker'
import { FileText } from 'lucide-react'

export default function ResumePage() {
  const resumes = useAdminResource<any>('resume_versions')
  const [editingRecord, setEditingRecord] = useState<any>(null)
  const [deletingRecord, setDeletingRecord] = useState<any>(null)
  const [showMediaPicker, setShowMediaPicker] = useState(false)

  const form = useForm({
    resolver: zodResolver(resumeVersionSchema),
    defaultValues: { version_name: '', file_url: '', is_active: false }
  })

  useEffect(() => {
    resumes.fetchResource()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (values: any) => {
    if (editingRecord?.id) {
      await resumes.updateRecord(editingRecord.id, values)
    } else {
      await resumes.createRecord(values)
    }
    setEditingRecord(null)
    form.reset()
  }

  const columns: Column<any>[] = [
    { header: 'Version Name', accessorKey: 'version_name' },
    { header: 'Created', cell: (item) => new Date(item.created_at).toLocaleDateString() },
    { header: 'Active', cell: (item) => <Switch checked={item.is_active} onCheckedChange={(val) => resumes.updateRecord(item.id, { is_active: val })} /> }
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Resume Management</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DataTable 
            data={resumes.data} 
            columns={columns} 
            loading={resumes.loading}
            onEdit={(item) => { setEditingRecord(item); form.reset(item) }}
            onDelete={setDeletingRecord}
          />
        </div>
        <div>
          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle>{editingRecord ? 'Edit Resume' : 'New Resume'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Version Name</label>
                  <Input {...form.register('version_name')} placeholder="e.g. 2026 Fall Edition" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">File URL</label>
                  <div className="flex gap-2">
                    <Input {...form.register('file_url')} />
                    <Button type="button" variant="secondary" onClick={() => setShowMediaPicker(true)}><FileText className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch checked={form.watch('is_active')} onCheckedChange={(val) => form.setValue('is_active', val)} />
                  <span className="text-sm font-medium">Active (Public)</span>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" disabled={resumes.actionLoading}>Save</Button>
                  {editingRecord && (
                    <Button type="button" variant="outline" onClick={() => { setEditingRecord(null); form.reset() }}>Cancel</Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog isOpen={!!deletingRecord} title="Delete Resume" description="Are you sure?" onConfirm={async () => { await resumes.deleteRecord(deletingRecord.id); setDeletingRecord(null) }} onCancel={() => setDeletingRecord(null)} loading={resumes.actionLoading} />

      {showMediaPicker && (
        <MediaPicker 
          onSelect={(url) => { form.setValue('file_url', url); setShowMediaPicker(false) }}
          onClose={() => setShowMediaPicker(false)}
        />
      )}
    </div>
  )
}
