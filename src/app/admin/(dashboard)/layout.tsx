import { requireAdmin } from '@/lib/api/auth'
import { redirect } from 'next/navigation'
import { ApiError } from '@/lib/api/response'
import { Sidebar } from '@/components/admin/layout/Sidebar'
import { Topnav } from '@/components/admin/layout/Topnav'
import AdminClientShell from '@/components/admin/layout/AdminClientShell'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user = null
  try {
    const authResult = await requireAdmin()
    user = authResult.user
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        redirect('/admin/login')
      }
      if (error.status === 403) {
        return (
          <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 text-zinc-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-red-500">403</h1>
              <p className="mt-2 text-lg">Access Denied.</p>
              <p className="mt-1 text-sm text-zinc-400">Your account does not have Portfolio Forge permissions.</p>
            </div>
          </div>
        )
      }
    }
    throw error
  }

  return <AdminClientShell email={user.email!}>{children}</AdminClientShell>
}
