'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, aboutSchema } from '@/lib/api/schemas'
import { useAdminResource } from '@/hooks/useAdminResource'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

export default function ProfilePage() {
  const profilesResource = useAdminResource('profiles')
  const aboutResource = useAdminResource('about')

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', title: '', bio: '', email: '', github_url: '', linkedin_url: '', availability_status: '' }
  })

  const aboutForm = useForm({
    resolver: zodResolver(aboutSchema),
    defaultValues: { who_i_am: '', what_i_do: '', what_im_exploring: '', what_i_like_building: '', visibility: true }
  })

  useEffect(() => {
    profilesResource.fetchResource()
    aboutResource.fetchResource()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (profilesResource.data.length > 0) {
      profileForm.reset(profilesResource.data[0] as any)
    }
  }, [profilesResource.data, profileForm])

  useEffect(() => {
    if (aboutResource.data.length > 0) {
      aboutForm.reset(aboutResource.data[0] as any)
    }
  }, [aboutResource.data, aboutForm])

  const onSubmitProfile = async (values: any) => {
    if (profilesResource.data.length > 0) {
      await profilesResource.updateRecord((profilesResource.data[0] as any).id, values)
    } else {
      await profilesResource.createRecord(values)
    }
  }

  const onSubmitAbout = async (values: any) => {
    if (aboutResource.data.length > 0) {
      await aboutResource.updateRecord((aboutResource.data[0] as any).id, values)
    } else {
      await aboutResource.createRecord(values)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Profile & About</h1>

      <Card className="border-zinc-800 bg-zinc-950">
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>Your public identity and contact links.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input {...profileForm.register('name')} />
                {profileForm.formState.errors.name && <p className="text-xs text-red-500">{profileForm.formState.errors.name.message?.toString()}</p>}
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input {...profileForm.register('title')} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input {...profileForm.register('email')} type="email" />
              </div>
              <div className="space-y-2">
                <Label>Availability Status</Label>
                <Input {...profileForm.register('availability_status')} placeholder="e.g. Open to work" />
              </div>
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input {...profileForm.register('github_url')} type="url" />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input {...profileForm.register('linkedin_url')} type="url" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea {...profileForm.register('bio')} rows={4} />
            </div>
            <Button type="submit" disabled={profilesResource.actionLoading}>
              {profilesResource.actionLoading ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-950">
        <CardHeader>
          <CardTitle>About Section</CardTitle>
          <CardDescription>Detailed descriptions of who you are and what you build.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={aboutForm.handleSubmit(onSubmitAbout)} className="space-y-4">
            <div className="space-y-2">
              <Label>Who I Am</Label>
              <Textarea {...aboutForm.register('who_i_am')} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>What I Do</Label>
              <Textarea {...aboutForm.register('what_i_do')} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>What I&apos;m Exploring</Label>
              <Textarea {...aboutForm.register('what_im_exploring')} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>What I Like Building</Label>
              <Textarea {...aboutForm.register('what_i_like_building')} rows={3} />
            </div>
            <div className="flex items-center space-x-2 pt-2 pb-4">
              <Switch 
                checked={aboutForm.watch('visibility')} 
                onCheckedChange={(val) => aboutForm.setValue('visibility', val)} 
              />
              <Label>Visible to Public</Label>
            </div>
            <Button type="submit" disabled={aboutResource.actionLoading}>
              {aboutResource.actionLoading ? 'Saving...' : 'Save About'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
