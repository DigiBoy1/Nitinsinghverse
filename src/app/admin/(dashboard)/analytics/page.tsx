'use client'

import { useEffect, useState } from 'react'
import { useAdminResource } from '@/hooks/useAdminResource'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'

export default function AnalyticsPage() {
  const sessions = useAdminResource<any>('visitor_sessions')
  const events = useAdminResource<any>('visitor_events')

  const [activeTab, setActiveTab] = useState<'sessions' | 'events'>('sessions')
  const [deletingSession, setDeletingSession] = useState<any>(null)

  useEffect(() => {
    sessions.fetchResource()
    events.fetchResource()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sessionCols: Column<any>[] = [
    { header: 'Date', cell: (item) => new Date(item.created_at).toLocaleString() },
    { header: 'Session ID', accessorKey: 'session_id' },
    { header: 'Location', cell: (item) => item.location || 'Unknown' },
    { header: 'User Agent', cell: (item) => <div className="max-w-xs truncate" title={item.user_agent}>{item.user_agent || 'Unknown'}</div> }
  ]

  const eventCols: Column<any>[] = [
    { header: 'Date', cell: (item) => new Date(item.created_at).toLocaleString() },
    { header: 'Event Type', accessorKey: 'event_type' },
    { header: 'Page URL', accessorKey: 'page_url' },
    { header: 'Metadata', cell: (item) => <div className="max-w-xs truncate" title={JSON.stringify(item.metadata)}>{JSON.stringify(item.metadata)}</div> }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Visitor Analytics</h1>
        <div className="flex bg-zinc-900 rounded-md p-1">
          <Button variant={activeTab === 'sessions' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('sessions')}>Sessions</Button>
          <Button variant={activeTab === 'events' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('events')}>Events</Button>
        </div>
      </div>

      {activeTab === 'sessions' && (
        <DataTable 
          data={sessions.data} 
          columns={sessionCols} 
          loading={sessions.loading}
          onDelete={setDeletingSession}
        />
      )}

      {activeTab === 'events' && (
        <DataTable 
          data={events.data} 
          columns={eventCols} 
          loading={events.loading}
        />
      )}

      <ConfirmDialog isOpen={!!deletingSession} title="Delete Session" description="Deleting a session will also delete all associated events. Are you sure?" onConfirm={async () => { await sessions.deleteRecord(deletingSession.id); setDeletingSession(null); await events.fetchResource(); }} onCancel={() => setDeletingSession(null)} loading={sessions.actionLoading} />
    </div>
  )
}
