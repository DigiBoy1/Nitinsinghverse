'use client'

import { useEffect, useState } from 'react'
import { useAdminResource } from '@/hooks/useAdminResource'
import { DataTable, Column } from '@/components/admin/ui/DataTable'
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

export default function InboxPage() {
  const messages = useAdminResource<any>('messages')
  const notifications = useAdminResource<any>('notifications')

  const [activeTab, setActiveTab] = useState<'messages' | 'notifications'>('messages')
  const [deletingMsg, setDeletingMsg] = useState<any>(null)
  const [deletingNotif, setDeletingNotif] = useState<any>(null)

  useEffect(() => {
    messages.fetchResource()
    notifications.fetchResource()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const msgCols: Column<any>[] = [
    { header: 'Date', cell: (item) => new Date(item.created_at).toLocaleDateString() },
    { header: 'From', cell: (item) => <div className="flex flex-col"><span className="font-medium">{item.name}</span><span className="text-xs text-zinc-500">{item.email}</span></div> },
    { header: 'Subject', accessorKey: 'subject' },
    { header: 'Message', cell: (item) => <div className="max-w-xs truncate" title={item.message}>{item.message}</div> },
    { header: 'Status', cell: (item) => (
      <select 
        value={item.status} 
        onChange={(e) => messages.updateRecord(item.id, { status: e.target.value })}
        className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs"
      >
        <option value="unread">Unread</option>
        <option value="read">Read</option>
        <option value="archived">Archived</option>
      </select>
    )}
  ]

  const notifCols: Column<any>[] = [
    { header: 'Date', cell: (item) => new Date(item.created_at).toLocaleDateString() },
    { header: 'Title', accessorKey: 'title' },
    { header: 'Message', accessorKey: 'message' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Read', cell: (item) => <Switch checked={item.read} onCheckedChange={(val) => notifications.updateRecord(item.id, { read: val })} /> }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Inbox</h1>
        <div className="flex bg-zinc-900 rounded-md p-1">
          <Button variant={activeTab === 'messages' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('messages')}>Messages</Button>
          <Button variant={activeTab === 'notifications' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('notifications')}>Notifications</Button>
        </div>
      </div>

      {activeTab === 'messages' && (
        <DataTable 
          data={messages.data} 
          columns={msgCols} 
          loading={messages.loading}
          onDelete={setDeletingMsg}
        />
      )}

      {activeTab === 'notifications' && (
        <DataTable 
          data={notifications.data} 
          columns={notifCols} 
          loading={notifications.loading}
          onDelete={setDeletingNotif}
        />
      )}

      <ConfirmDialog isOpen={!!deletingMsg} title="Delete Message" description="Are you sure?" onConfirm={async () => { await messages.deleteRecord(deletingMsg.id); setDeletingMsg(null) }} onCancel={() => setDeletingMsg(null)} loading={messages.actionLoading} />
      <ConfirmDialog isOpen={!!deletingNotif} title="Delete Notification" description="Are you sure?" onConfirm={async () => { await notifications.deleteRecord(deletingNotif.id); setDeletingNotif(null) }} onCancel={() => setDeletingNotif(null)} loading={notifications.actionLoading} />
    </div>
  )
}
