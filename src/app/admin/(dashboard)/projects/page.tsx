'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema } from '@/lib/api/schemas'
import { useAdminResource } from '@/hooks/useAdminResource'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MediaPicker } from '@/components/admin/ui/MediaPicker'
import { Image as ImageIcon } from 'lucide-react'

export default function ProjectsPage() {
  const projects = useAdminResource<any>('projects')
  const [editingProject, setEditingProject] = useState<any>(null)
  const [deletingProject, setDeletingProject] = useState<any>(null)
  
  // Media Picker state
  const [showMediaPicker, setShowMediaPicker] = useState<false | 'thumbnail' | 'logo'>(false)

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '', slug: '', short_description: '', full_description: '',
      thumbnail: '', logo: '', problem: '', solution: '',
      features: [], tech_stack: [], github_url: '', live_url: '',
      status: 'draft', start_date: '', end_date: '',
      featured: false, display_order: 0, visibility: false
    }
  })

  // For array inputs
  const [featuresText, setFeaturesText] = useState('')
  const [techStackText, setTechStackText] = useState('')

  useEffect(() => {
    projects.fetchResource()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEdit = (item: any) => {
    setEditingProject(item)
    form.reset({
      ...item,
      start_date: item.start_date ? item.start_date.split('T')[0] : '',
      end_date: item.end_date ? item.end_date.split('T')[0] : '',
    })
    setFeaturesText(Array.isArray(item.features) ? item.features.join('\n') : '')
    setTechStackText(Array.isArray(item.tech_stack) ? item.tech_stack.join('\n') : '')
  }

  const handleCreateNew = () => {
    setEditingProject(null)
    form.reset({
      title: '', slug: '', short_description: '', full_description: '',
      thumbnail: '', logo: '', problem: '', solution: '',
      features: [], tech_stack: [], github_url: '', live_url: '',
      status: 'draft', start_date: '', end_date: '',
      featured: false, display_order: 0, visibility: false
    })
    setFeaturesText('')
    setTechStackText('')
  }

  const onSubmit = async (values: any) => {
    const payload = {
      ...values,
      features: featuresText.split('\n').map(s => s.trim()).filter(Boolean),
      tech_stack: techStackText.split('\n').map(s => s.trim()).filter(Boolean),
      start_date: values.start_date || null,
      end_date: values.end_date || null,
    }

    if (editingProject?.id) {
      await projects.updateRecord(editingProject.id, payload)
    } else {
      await projects.createRecord(payload)
    }
    handleCreateNew()
  }

  const columns: Column<any>[] = [
    { header: 'Title', accessorKey: 'title' },
    { header: 'Status', cell: (item) => <span className="capitalize">{item.status}</span> },
    { header: 'Featured', cell: (item) => <Switch checked={item.featured} onCheckedChange={(val) => projects.updateRecord(item.id, { featured: val })} /> },
    { header: 'Visibility', cell: (item) => <Switch checked={item.visibility} onCheckedChange={(val) => projects.updateRecord(item.id, { visibility: val })} /> }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <Button onClick={handleCreateNew}>New Project</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DataTable 
            data={projects.data} 
            columns={columns} 
            loading={projects.loading}
            onEdit={handleEdit}
            onDelete={setDeletingProject}
          />
        </div>
        <div className="lg:col-span-2">
          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle>{editingProject ? 'Edit Project' : 'New Project'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title *</label>
                    <Input {...form.register('title')} required />
                    {form.formState.errors.title && <p className="text-xs text-red-500">{form.formState.errors.title.message?.toString()}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug *</label>
                    <Input {...form.register('slug')} required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Short Description</label>
                    <Input {...form.register('short_description')} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Full Description</label>
                      <span className="text-xs text-zinc-500">Supports Markdown and media links</span>
                    </div>
                    <Textarea {...form.register('full_description')} rows={4} />
                  </div>
                  
                  {/* Media Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Thumbnail URL</label>
                    <div className="flex gap-2">
                      <Input {...form.register('thumbnail')} />
                      <Button type="button" variant="secondary" onClick={() => setShowMediaPicker('thumbnail')}>
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Logo URL</label>
                    <div className="flex gap-2">
                      <Input {...form.register('logo')} />
                      <Button type="button" variant="secondary" onClick={() => setShowMediaPicker('logo')}>
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">GitHub URL</label>
                    <Input {...form.register('github_url')} type="url" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Live URL</label>
                    <Input {...form.register('live_url')} type="url" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input {...form.register('start_date')} type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input {...form.register('end_date')} type="date" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Problem</label>
                    <Textarea {...form.register('problem')} rows={3} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Solution</label>
                    <Textarea {...form.register('solution')} rows={3} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Features (One per line)</label>
                    <Textarea value={featuresText} onChange={e => setFeaturesText(e.target.value)} rows={4} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tech Stack (One per line)</label>
                    <Textarea value={techStackText} onChange={e => setTechStackText(e.target.value)} rows={4} />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 p-4 bg-zinc-900 rounded-md">
                  <div className="space-y-2">
                    <label className="text-sm font-medium block">Status</label>
                    <select {...form.register('status')} className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm dark:border-zinc-800 dark:focus-visible:ring-zinc-300">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium block">Display Order</label>
                    <Input type="number" {...form.register('display_order', { valueAsNumber: true })} />
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <div className="flex items-center space-x-2">
                      <Switch checked={form.watch('visibility')} onCheckedChange={(val) => form.setValue('visibility', val)} />
                      <span className="text-sm font-medium">Visible to Public</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={form.watch('featured')} onCheckedChange={(val) => form.setValue('featured', val)} />
                      <span className="text-sm font-medium">Featured</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  {editingProject && (
                    <Button type="button" variant="outline" onClick={handleCreateNew}>Cancel</Button>
                  )}
                  <Button type="submit" disabled={projects.actionLoading}>
                    {projects.actionLoading ? 'Saving...' : 'Save Project'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog 
        isOpen={!!deletingProject} 
        title="Delete Project" 
        description={`Are you sure you want to delete "${deletingProject?.title}"?`} 
        onConfirm={async () => {
          await projects.deleteRecord(deletingProject.id)
          setDeletingProject(null)
          if (editingProject?.id === deletingProject.id) handleCreateNew()
        }} 
        onCancel={() => setDeletingProject(null)} 
        loading={projects.actionLoading} 
      />

      {showMediaPicker && (
        <MediaPicker 
          onSelect={(url) => {
            form.setValue(showMediaPicker, url)
            setShowMediaPicker(false)
          }}
          onClose={() => setShowMediaPicker(false)}
        />
      )}
    </div>
  )
}
