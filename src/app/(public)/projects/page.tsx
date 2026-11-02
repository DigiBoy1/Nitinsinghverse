import { getPublicResource } from '@/lib/api/publicData'
import { SectionWrapper } from '@/components/public/ui/SectionWrapper'
import { SectionTitle } from '@/components/public/ui/SectionTitle'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Nitin Singh',
  description: 'A comprehensive list of my full-stack, AI/ML, and web development projects.',
}

export default async function ProjectsPage() {
  const projects = await getPublicResource<any[]>('projects', { order: { column: 'display_order', ascending: true } }) || []

  return (
    <SectionWrapper id="all-projects" className="bg-black pt-32 pb-24 min-h-screen">
      <SectionTitle 
        title="All Projects" 
        subtitle="Complete archive of my case studies and applications."
      />
      
      {projects.length === 0 ? (
        <div className="text-center text-zinc-500 py-12">No projects published yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link 
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-cyan-600/50 transition-all flex flex-col"
            >
              <div className="aspect-video w-full relative bg-zinc-950 border-b border-zinc-800">
                {project.thumbnail ? (
                  <Image 
                    src={project.thumbnail} 
                    alt={project.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-zinc-800 font-bold text-xl">{project.title}</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                  {project.short_description}
                </p>
                <div className="mt-auto flex items-center text-sm font-semibold text-cyan-500 group-hover:text-cyan-400">
                  Read Case Study <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
