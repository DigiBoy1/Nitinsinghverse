'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { skillCategorySchema, skillSchema } from '@/lib/api/schemas'
import { useAdminResource } from '@/hooks/useAdminResource'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'

export default function SkillsPage() {
  const categories = useAdminResource<any>('skill_categories')
  const skills = useAdminResource<any>('skills')

  const [activeTab, setActiveTab] = useState<'skills' | 'categories'>('categories')
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [deletingCategory, setDeletingCategory] = useState<any>(null)
  
  const [editingSkill, setEditingSkill] = useState<any>(null)
  const [deletingSkill, setDeletingSkill] = useState<any>(null)

  const catForm = useForm({
    resolver: zodResolver(skillCategorySchema),
    defaultValues: { name: '', display_order: 0, visibility: true }
  })

  const skillForm = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: '', category_id: '', icon: '', description: '', url: '', proficiency_level: '', learning_status: '', featured: false, display_order: 0, visibility: true }
  })

  useEffect(() => {
    categories.fetchResource()
    skills.fetchResource()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Categories CRUD
  const onSubmitCategory = async (values: any) => {
    if (editingCategory?.id) {
      await categories.updateRecord(editingCategory.id, values)
    } else {
      await categories.createRecord(values)
    }
    setEditingCategory(null)
    catForm.reset({ name: '', display_order: 0, visibility: true })
  }

  // Skills CRUD
  const onSubmitSkill = async (values: any) => {
    if (editingSkill?.id) {
      await skills.updateRecord(editingSkill.id, values)
    } else {
      await skills.createRecord(values)
    }
    setEditingSkill(null)
    skillForm.reset({ name: '', category_id: '', icon: '', description: '', url: '', proficiency_level: '', learning_status: '', featured: false, display_order: 0, visibility: true })
  }

  const categoryCols: Column<any>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Order', accessorKey: 'display_order' },
    { header: 'Visibility', cell: (item) => <Switch checked={item.visibility} onCheckedChange={(val) => categories.updateRecord(item.id, { visibility: val })} /> }
  ]

  const skillCols: Column<any>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Category', cell: (item) => categories.data.find(c => c.id === item.category_id)?.name || 'Unknown' },
    { header: 'Level', accessorKey: 'proficiency_level' },
    { header: 'Featured', cell: (item) => <Switch checked={item.featured} onCheckedChange={(val) => skills.updateRecord(item.id, { featured: val })} /> },
    { header: 'Visibility', cell: (item) => <Switch checked={item.visibility} onCheckedChange={(val) => skills.updateRecord(item.id, { visibility: val })} /> }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Skills & Categories</h1>
        <div className="flex bg-zinc-900 rounded-md p-1">
          <Button variant={activeTab === 'categories' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('categories')}>Categories</Button>
          <Button variant={activeTab === 'skills' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('skills')}>Skills</Button>
        </div>
      </div>

      {activeTab === 'categories' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DataTable 
              data={categories.data} 
              columns={categoryCols} 
              loading={categories.loading}
              onEdit={(item) => {
                setEditingCategory(item)
                catForm.reset(item)
              }}
              onDelete={setDeletingCategory}
            />
          </div>
          <div>
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>{editingCategory ? 'Edit Category' : 'New Category'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={catForm.handleSubmit(onSubmitCategory)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input {...catForm.register('name')} />
                    {catForm.formState.errors.name && <p className="text-xs text-red-500">{catForm.formState.errors.name.message?.toString()}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Display Order</label>
                    <Input type="number" {...catForm.register('display_order', { valueAsNumber: true })} />
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch checked={catForm.watch('visibility')} onCheckedChange={(val) => catForm.setValue('visibility', val)} />
                    <span className="text-sm font-medium">Visible</span>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1" disabled={categories.actionLoading}>Save</Button>
                    {editingCategory && (
                      <Button type="button" variant="outline" onClick={() => { setEditingCategory(null); catForm.reset({ name: '', display_order: 0, visibility: true }) }}>Cancel</Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DataTable 
              data={skills.data} 
              columns={skillCols} 
              loading={skills.loading}
              onEdit={(item) => {
                setEditingSkill(item)
                skillForm.reset(item)
              }}
              onDelete={setDeletingSkill}
            />
          </div>
          <div>
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>{editingSkill ? 'Edit Skill' : 'New Skill'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={skillForm.handleSubmit(onSubmitSkill)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input {...skillForm.register('name')} />
                    {skillForm.formState.errors.name && <p className="text-xs text-red-500">{skillForm.formState.errors.name.message?.toString()}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select {...skillForm.register('category_id')} className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm dark:border-zinc-800 dark:focus-visible:ring-zinc-300">
                      <option value="">Select Category...</option>
                      {categories.data.map((c: any) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Proficiency Level</label>
                    <Input {...skillForm.register('proficiency_level')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Display Order</label>
                    <Input type="number" {...skillForm.register('display_order', { valueAsNumber: true })} />
                  </div>
                  <div className="flex gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <Switch checked={skillForm.watch('visibility')} onCheckedChange={(val) => skillForm.setValue('visibility', val)} />
                      <span className="text-sm font-medium">Visible</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={skillForm.watch('featured')} onCheckedChange={(val) => skillForm.setValue('featured', val)} />
                      <span className="text-sm font-medium">Featured</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1" disabled={skills.actionLoading}>Save</Button>
                    {editingSkill && (
                      <Button type="button" variant="outline" onClick={() => { setEditingSkill(null); skillForm.reset() }}>Cancel</Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <ConfirmDialog 
        isOpen={!!deletingCategory} 
        title="Delete Category" 
        description={`Are you sure you want to delete "${deletingCategory?.name}"? All associated skills will also be deleted.`} 
        onConfirm={async () => {
          await categories.deleteRecord(deletingCategory.id)
          setDeletingCategory(null)
        }} 
        onCancel={() => setDeletingCategory(null)} 
        loading={categories.actionLoading} 
      />

      <ConfirmDialog 
        isOpen={!!deletingSkill} 
        title="Delete Skill" 
        description={`Are you sure you want to delete "${deletingSkill?.name}"?`} 
        onConfirm={async () => {
          await skills.deleteRecord(deletingSkill.id)
          setDeletingSkill(null)
        }} 
        onCancel={() => setDeletingSkill(null)} 
        loading={skills.actionLoading} 
      />
    </div>
  )
}
