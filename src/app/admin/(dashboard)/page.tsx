'use client'

import { useEffect } from 'react'
import { useAdminResource } from '@/hooks/useAdminResource'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, FileText, MessageSquare, Activity } from 'lucide-react'

export default function AdminDashboardPage() {
  const projects = useAdminResource<any>('projects')
  const certificates = useAdminResource<any>('certificates')
  const messages = useAdminResource<any>('messages')
  const sessions = useAdminResource<any>('visitor_sessions')

  useEffect(() => {
    projects.fetchResource()
    certificates.fetchResource()
    messages.fetchResource()
    sessions.fetchResource()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalProjects = projects.data.length
  const publishedProjects = projects.data.filter(p => p.visibility === true).length
  const totalCerts = certificates.data.length
  const unreadMsgs = messages.data.filter(m => m.status === 'unread').length
  const totalSessions = sessions.data.length

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-zinc-800 bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-zinc-500">{publishedProjects} published</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Certificates</CardTitle>
            <FileText className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCerts}</div>
            <p className="text-xs text-zinc-500">Across all categories</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMsgs}</div>
            <p className="text-xs text-zinc-500">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Visitor Sessions</CardTitle>
            <Activity className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
            <p className="text-xs text-zinc-500">Total recorded</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
