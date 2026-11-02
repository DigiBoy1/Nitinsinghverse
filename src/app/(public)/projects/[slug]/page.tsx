import { getPublicResource } from '@/lib/api/publicData'
import { SectionWrapper } from '@/components/public/ui/SectionWrapper'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Calendar, Target, Lightbulb, Code } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const GithubIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getPublicResource<any>('projects', { eq: { column: 'slug', value: slug }, single: true })
  
  if (!project) return {}
  
  return {
    title: `${project.title} | Nitin Singh`,
    description: project.short_description,
    openGraph: {
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  }
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getPublicResource<any>('projects', { eq: { column: 'slug', value: slug }, single: true })

  if (!project) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-black pt-24 pb-24">
      <SectionWrapper id="case-study-header" className="!py-12 border-b border-zinc-900">
        <Link href="/projects" className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
          {project.title}
        </h1>
        <p className="text-xl md:text-2xl text-cyan-400 font-medium max-w-3xl mb-8">
          {project.short_description}
        </p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {project.live_url && (
            <a 
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-2 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors"
            >
              Live Demo <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          )}
          {project.github_url && (
            <a 
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-zinc-800 px-6 py-2 text-sm font-semibold text-white border border-zinc-700 hover:bg-zinc-700 transition-colors"
            >
              GitHub <GithubIcon className="ml-2 h-4 w-4" />
            </a>
          )}
        </div>
      </SectionWrapper>

      {project.thumbnail && (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
            <Image 
              src={project.thumbnail} 
              alt={`${project.title} Cover`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <SectionWrapper id="case-study-content" className="!py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            {project.problem && (
              <section>
                <div className="flex items-center mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-950 border border-red-900">
                    <Target className="h-5 w-5 text-red-400" />
                  </div>
                  <h2 className="ml-4 text-2xl font-bold text-white">The Problem</h2>
                </div>
                <div className="prose prose-invert prose-zinc max-w-none text-zinc-300">
                  <ReactMarkdown>{project.problem}</ReactMarkdown>
                </div>
              </section>
            )}

            {project.solution && (
              <section>
                <div className="flex items-center mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-950 border border-cyan-900">
                    <Lightbulb className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h2 className="ml-4 text-2xl font-bold text-white">The Solution</h2>
                </div>
                <div className="prose prose-invert prose-zinc max-w-none text-zinc-300">
                  <ReactMarkdown>{project.solution}</ReactMarkdown>
                </div>
              </section>
            )}
            
            {project.full_description && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Deep Dive</h2>
                <div className="prose prose-invert prose-zinc max-w-none text-zinc-300">
                  <ReactMarkdown>{project.full_description}</ReactMarkdown>
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1 space-y-12">
            {project.features && project.features.length > 0 && (
              <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {project.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="text-cyan-500 mr-2">•</span>
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6">
                <div className="flex items-center mb-4">
                  <Code className="h-5 w-5 text-purple-400 mr-2" />
                  <h3 className="text-lg font-bold text-white">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech: string, i: number) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-zinc-950 text-zinc-300 rounded-full border border-zinc-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-zinc-400 mr-2" />
                <h3 className="text-lg font-bold text-white">Timeline</h3>
              </div>
              <div className="space-y-2 text-sm text-zinc-300">
                {project.start_date && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Started</span>
                    <span>{new Date(project.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-500">Status</span>
                  <span className="capitalize">{project.status || 'Completed'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </article>
  )
}
