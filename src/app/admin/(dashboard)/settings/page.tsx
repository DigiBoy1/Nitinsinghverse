'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { siteSettingsSchema } from '@/lib/api/schemas'
import { useAdminResource } from '@/hooks/useAdminResource'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const settingsResource = useAdminResource<any>('site_settings')

  const form = useForm({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: { title: '', description: '', seo_metadata: {}, og_image: '', favicon: '', theme_settings: {}, hero_copy: '' }
  })

  useEffect(() => {
    settingsResource.fetchResource()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (settingsResource.data.length > 0) {
      form.reset(settingsResource.data[0])
    }
  }, [settingsResource.data, form])

  const onSubmit = async (values: any) => {
    if (settingsResource.data.length > 0) {
      await settingsResource.updateRecord((settingsResource.data[0] as any).id, values)
    } else {
      await settingsResource.createRecord(values)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>

      <Card className="border-zinc-800 bg-zinc-950 max-w-2xl">
        <CardHeader>
          <CardTitle>Global Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Site Title</Label>
              <Input {...form.register('title')} />
            </div>
            <div className="space-y-2">
              <Label>Site Description</Label>
              <Textarea {...form.register('description')} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Hero Copy</Label>
              <Textarea {...form.register('hero_copy')} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>OG Image URL</Label>
              <Input {...form.register('og_image')} />
            </div>
            <div className="space-y-2">
              <Label>Favicon URL</Label>
              <Input {...form.register('favicon')} />
            </div>
            <Button type="submit" disabled={settingsResource.actionLoading}>
              {settingsResource.actionLoading ? 'Saving...' : 'Save Settings'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
