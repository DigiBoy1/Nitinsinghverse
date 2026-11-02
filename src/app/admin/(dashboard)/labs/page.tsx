'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { genaiProjectSchema, threejsExperimentSchema } from '@/lib/api/schemas'
import { useAdminResource } from '@/hooks/useAdminResource'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LabsPage() {
  const genai = useAdminResource<any>('genai_projects')
  const threejs = useAdminResource<any>('threejs_experiments')

  const [activeTab, setActiveTab] = useState<'genai' | 'threejs'>('genai')
  const [editingGenai, setEditingGenai] = useState<any>(null)
  const [deletingGenai, setDeletingGenai] = useState<any>(null)
  
  const [editingThreejs, setEditingThreejs] = useState<any>(null)
  const [deletingThreejs, setDeletingThreejs] = useState<any>(null)

  const genaiForm = useForm({
    resolver: zodResolver(genaiProjectSchema),
    defaultValues: { title: '', category: '', description: '', url: '', thumbnail: '', display_order: 0, visibility: true }
  })

  const threejsForm = useForm({
    resolver: zodResolver(threejsExperimentSchema),
    defaultValues: { title: '', description: '', url: '', thumbnail: '', display_order: 0, visibility: true }
  })

  useEffect(() => {
    genai.fetchResource()
    threejs.fetchResource()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // GenAI CRUD
  const onSubmitGenai = async (values: any) => {
    if (editingGenai?.id) {
      await genai.updateRecord(editingGenai.id, values)
    } else {
      await genai.createRecord(values)
    }
    setEditingGenai(null)
    genaiForm.reset({ title: '', category: '', description: '', url: '', thumbnail: '', display_order: 0, visibility: true })
  }

  // Three.js CRUD
  const onSubmitThreejs = async (values: any) => {
    if (editingThreejs?.id) {
      await threejs.updateRecord(editingThreejs.id, values)
    } else {
      await threejs.createRecord(values)
    }
    setEditingThreejs(null)
    threejsForm.reset({ title: '', description: '', url: '', thumbnail: '', display_order: 0, visibility: true })
  }

  const columns: Column<any>[] = [
    { header: 'Title', accessorKey: 'title' },
    { header: 'Order', accessorKey: 'display_order' },
    { header: 'Visibility', cell: (item) => <Switch checked={item.visibility} onCheckedChange={(val) => (activeTab === 'genai' ? genai : threejs).updateRecord(item.id, { visibility: val })} /> }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Labs & Experiments</h1>
        <div className="flex bg-zinc-900 rounded-md p-1">
          <Button variant={activeTab === 'genai' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('genai')}>GenAI</Button>
          <Button variant={activeTab === 'threejs' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('threejs')}>3D Lab</Button>
        </div>
      </div>

      {activeTab === 'genai' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DataTable 
              data={genai.data} 
              columns={columns} 
              loading={genai.loading}
              onEdit={(item) => { setEditingGenai(item); genaiForm.reset(item) }}
              onDelete={setDeletingGenai}
            />
          </div>
          <div>
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>{editingGenai ? 'Edit GenAI Project' : 'New GenAI Project'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={genaiForm.handleSubmit(onSubmitGenai)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input {...genaiForm.register('title')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Input {...genaiForm.register('category')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL</label>
                    <Input {...genaiForm.register('url')} type="url" />
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch checked={genaiForm.watch('visibility')} onCheckedChange={(val) => genaiForm.setValue('visibility', val)} />
                    <span className="text-sm font-medium">Visible</span>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1" disabled={genai.actionLoading}>Save</Button>
                    {editingGenai && (
                      <Button type="button" variant="outline" onClick={() => { setEditingGenai(null); genaiForm.reset() }}>Cancel</Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'threejs' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DataTable 
              data={threejs.data} 
              columns={columns} 
              loading={threejs.loading}
              onEdit={(item) => { setEditingThreejs(item); threejsForm.reset(item) }}
              onDelete={setDeletingThreejs}
            />
          </div>
          <div>
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>{editingThreejs ? 'Edit 3D Experiment' : 'New 3D Experiment'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={threejsForm.handleSubmit(onSubmitThreejs)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input {...threejsForm.register('title')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL</label>
                    <Input {...threejsForm.register('url')} type="url" />
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch checked={threejsForm.watch('visibility')} onCheckedChange={(val) => threejsForm.setValue('visibility', val)} />
                    <span className="text-sm font-medium">Visible</span>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1" disabled={threejs.actionLoading}>Save</Button>
                    {editingThreejs && (
                      <Button type="button" variant="outline" onClick={() => { setEditingThreejs(null); threejsForm.reset() }}>Cancel</Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <ConfirmDialog isOpen={!!deletingGenai} title="Delete GenAI Project" description="Are you sure?" onConfirm={async () => { await genai.deleteRecord(deletingGenai.id); setDeletingGenai(null) }} onCancel={() => setDeletingGenai(null)} loading={genai.actionLoading} />
      <ConfirmDialog isOpen={!!deletingThreejs} title="Delete 3D Experiment" description="Are you sure?" onConfirm={async () => { await threejs.deleteRecord(deletingThreejs.id); setDeletingThreejs(null) }} onCancel={() => setDeletingThreejs(null)} loading={threejs.actionLoading} />
    </div>
  )
}
