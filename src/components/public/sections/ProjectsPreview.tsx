import { getPublicResource } from '@/lib/api/publicData'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionTitle } from '../ui/SectionTitle'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export async function ProjectsPreview() {
  // Fetch only featured projects for the preview
  const projects = await getPublicResource<any[]>('projects', { order: { column: 'display_order', ascending: true } }) || []
  const featured = projects.filter(p => p.featured).slice(0, 3) // Max 3 featured

  if (!featured.length) return null

  return (
    <SectionWrapper id="projects" className="bg-zinc-950">
      <SectionTitle 
        title="Featured Projects" 
        subtitle="Selected case studies showcasing my problem-solving approach."
      />

      <div className="space-y-12">
        {featured.map((project, index) => (
          <div 
            key={project.id}
            className={`flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          >
            <Link 
              href={`/projects/${project.slug}`}
              className="w-full lg:w-1/2 block relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 group"
            >
              {project.thumbnail ? (
                <Image 
                  src={project.thumbnail} 
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-zinc-700 font-bold text-2xl">{project.title}</span>
                </div>
              )}
            </Link>
            
            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-cyan-400 font-medium">{project.short_description}</p>
              </div>
              
              {project.tech_stack && project.tech_stack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.slice(0, 5).map((tech: string, i: number) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-zinc-900 text-zinc-400 rounded-full border border-zinc-800">
                      {tech}
                    </span>
                  ))}
                  {project.tech_stack.length > 5 && (
                    <span className="px-3 py-1 text-xs font-medium bg-zinc-900/50 text-zinc-500 rounded-full border border-zinc-800/50">
                      +{project.tech_stack.length - 5} more
                    </span>
                  )}
                </div>
              )}
              
              <Link 
                href={`/projects/${project.slug}`}
                className="inline-flex items-center text-white hover:text-cyan-400 font-semibold transition-colors group"
              >
                Read Case Study <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {projects.length > featured.length && (
        <div className="mt-16 flex justify-center">
          <Link 
            href="/projects"
            className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-transparent px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-900 transition-colors"
          >
            View All Projects
          </Link>
        </div>
      )}
    </SectionWrapper>
  )
}
