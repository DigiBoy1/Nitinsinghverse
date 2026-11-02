'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, User, Briefcase, Award, FolderGit2,
  FileText, MessageSquare, LineChart, Settings, Image as ImageIcon,
  GraduationCap
} from 'lucide-react'

const routes = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Profile & About', icon: User, href: '/admin/profile' },
  { label: 'Skills', icon: Award, href: '/admin/skills' },
  { label: 'Projects', icon: Briefcase, href: '/admin/projects' },
  { label: 'Experience & Ed.', icon: GraduationCap, href: '/admin/experience' },
  { label: 'Labs & Exps.', icon: FolderGit2, href: '/admin/labs' },
  { label: 'Achievements', icon: Award, href: '/admin/achievements' },
  { label: 'Resume', icon: FileText, href: '/admin/resume' },
  { label: 'Inbox', icon: MessageSquare, href: '/admin/inbox' },
  { label: 'Analytics', icon: LineChart, href: '/admin/analytics' },
  { label: 'Media Library', icon: ImageIcon, href: '/admin/media' },
  { label: 'Settings', icon: Settings, href: '/admin/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-full flex-col bg-zinc-950 text-zinc-400">
      <div className="flex h-14 items-center border-b border-zinc-800 px-6 font-bold text-zinc-50">
        Portfolio Forge
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-3">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-zinc-50 hover:bg-zinc-900",
                pathname === route.href ? "bg-zinc-900 text-zinc-50" : ""
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
