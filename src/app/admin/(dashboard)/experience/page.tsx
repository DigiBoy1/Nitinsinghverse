'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { educationSchema, experienceSchema } from '@/lib/api/schemas'
import { useAdminResource } from '@/hooks/useAdminResource'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ExperiencePage() {
  const edu = useAdminResource<any>('education')
  const exp = useAdminResource<any>('experience')

  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience')
  const [editingEdu, setEditingEdu] = useState<any>(null)
  const [deletingEdu, setDeletingEdu] = useState<any>(null)
  
  const [editingExp, setEditingExp] = useState<any>(null)
  const [deletingExp, setDeletingExp] = useState<any>(null)

  const eduForm = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues: { institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', description: '', display_order: 0, visibility: true }
  })

  const expForm = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: { company: '', position: '', start_date: '', end_date: '', current: false, description: '', display_order: 0, visibility: true }
  })

  useEffect(() => {
    edu.fetchResource()
    exp.fetchResource()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Education CRUD
  const onSubmitEdu = async (values: any) => {
    const payload = { ...values, start_date: values.start_date || null, end_date: values.end_date || null }
    if (editingEdu?.id) {
      await edu.updateRecord(editingEdu.id, payload)
    } else {
      await edu.createRecord(payload)
    }
    setEditingEdu(null)
    eduForm.reset({ institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', description: '', display_order: 0, visibility: true })
  }

  // Experience CRUD
  const onSubmitExp = async (values: any) => {
    const payload = { ...values, start_date: values.start_date || null, end_date: values.end_date || null }
    if (editingExp?.id) {
      await exp.updateRecord(editingExp.id, payload)
    } else {
      await exp.createRecord(payload)
    }
    setEditingExp(null)
    expForm.reset({ company: '', position: '', start_date: '', end_date: '', current: false, description: '', display_order: 0, visibility: true })
  }

  const columns: Column<any>[] = [
    { header: 'Title', cell: (item) => item.institution || item.company },
    { header: 'Role/Degree', cell: (item) => item.degree || item.position },
    { header: 'Order', accessorKey: 'display_order' },
    { header: 'Visibility', cell: (item) => <Switch checked={item.visibility} onCheckedChange={(val) => (activeTab === 'education' ? edu : exp).updateRecord(item.id, { visibility: val })} /> }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Experience & Education</h1>
        <div className="flex bg-zinc-900 rounded-md p-1">
          <Button variant={activeTab === 'experience' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('experience')}>Experience</Button>
          <Button variant={activeTab === 'education' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('education')}>Education</Button>
        </div>
      </div>

      {activeTab === 'experience' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DataTable 
              data={exp.data} 
              columns={columns} 
              loading={exp.loading}
              onEdit={(item) => { 
                setEditingExp(item)
                expForm.reset({ ...item, start_date: item.start_date ? item.start_date.split('T')[0] : '', end_date: item.end_date ? item.end_date.split('T')[0] : '' }) 
              }}
              onDelete={setDeletingExp}
            />
          </div>
          <div>
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>{editingExp ? 'Edit Experience' : 'New Experience'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={expForm.handleSubmit(onSubmitExp)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Input {...expForm.register('company')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Position</label>
                    <Input {...expForm.register('position')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input type="date" {...expForm.register('start_date')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input type="date" {...expForm.register('end_date')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea {...expForm.register('description')} rows={3} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Display Order</label>
                    <Input type="number" {...expForm.register('display_order', { valueAsNumber: true })} />
                  </div>
                  <div className="flex gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <Switch checked={expForm.watch('current')} onCheckedChange={(val) => expForm.setValue('current', val)} />
                      <span className="text-sm font-medium">Current Role</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={expForm.watch('visibility')} onCheckedChange={(val) => expForm.setValue('visibility', val)} />
                      <span className="text-sm font-medium">Visible</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1" disabled={exp.actionLoading}>Save</Button>
                    {editingExp && (
                      <Button type="button" variant="outline" onClick={() => { setEditingExp(null); expForm.reset() }}>Cancel</Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'education' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DataTable 
              data={edu.data} 
              columns={columns} 
              loading={edu.loading}
              onEdit={(item) => { 
                setEditingEdu(item)
                eduForm.reset({ ...item, start_date: item.start_date ? item.start_date.split('T')[0] : '', end_date: item.end_date ? item.end_date.split('T')[0] : '' }) 
              }}
              onDelete={setDeletingEdu}
            />
          </div>
          <div>
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>{editingEdu ? 'Edit Education' : 'New Education'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={eduForm.handleSubmit(onSubmitEdu)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Institution</label>
                    <Input {...eduForm.register('institution')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Degree</label>
                    <Input {...eduForm.register('degree')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Field of Study</label>
                    <Input {...eduForm.register('field_of_study')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input type="date" {...eduForm.register('start_date')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input type="date" {...eduForm.register('end_date')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea {...eduForm.register('description')} rows={3} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Display Order</label>
                    <Input type="number" {...eduForm.register('display_order', { valueAsNumber: true })} />
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch checked={eduForm.watch('visibility')} onCheckedChange={(val) => eduForm.setValue('visibility', val)} />
                    <span className="text-sm font-medium">Visible</span>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1" disabled={edu.actionLoading}>Save</Button>
                    {editingEdu && (
                      <Button type="button" variant="outline" onClick={() => { setEditingEdu(null); eduForm.reset() }}>Cancel</Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <ConfirmDialog isOpen={!!deletingExp} title="Delete Experience" description="Are you sure?" onConfirm={async () => { await exp.deleteRecord(deletingExp.id); setDeletingExp(null) }} onCancel={() => setDeletingExp(null)} loading={exp.actionLoading} />
      <ConfirmDialog isOpen={!!deletingEdu} title="Delete Education" description="Are you sure?" onConfirm={async () => { await edu.deleteRecord(deletingEdu.id); setDeletingEdu(null) }} onCancel={() => setDeletingEdu(null)} loading={edu.actionLoading} />
    </div>
  )
}
