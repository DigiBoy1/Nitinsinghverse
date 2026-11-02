import { getPublicResource } from '@/lib/api/publicData'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionTitle } from '../ui/SectionTitle'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

export async function Labs() {
  const genai = await getPublicResource<any[]>('genai_projects', { order: { column: 'display_order', ascending: true } }) || []
  const threejs = await getPublicResource<any[]>('threejs_experiments', { order: { column: 'display_order', ascending: true } }) || []

  if (!genai.length && !threejs.length) return null

  return (
    <>
      {genai.length > 0 && (
        <SectionWrapper id="genai" className="bg-black">
          <SectionTitle 
            title="GenAI Lab" 
            subtitle="Exploring Generative AI, LLMs, and intelligent agents."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {genai.map((item: any) => (
              <a 
                key={item.id} 
                href={item.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-cyan-600/50 transition-all"
              >
                {item.thumbnail ? (
                  <div className="aspect-video w-full relative overflow-hidden bg-zinc-950">
                    <Image 
                      src={item.thumbnail} 
                      alt={item.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-zinc-950 flex items-center justify-center">
                    <span className="text-zinc-800 font-mono text-4xl">AI</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  {item.category && (
                    <span className="inline-block px-2 py-1 mb-3 text-xs font-medium text-cyan-400 bg-cyan-950/50 rounded border border-cyan-900/50">
                      {item.category}
                    </span>
                  )}
                  <p className="text-sm text-zinc-400 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </SectionWrapper>
      )}

      {threejs.length > 0 && (
        <SectionWrapper id="experiments" className="bg-zinc-950">
          <SectionTitle 
            title="3D Experiments" 
            subtitle="Interactive web experiences built with React Three Fiber."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {threejs.map((item: any) => (
              <a 
                key={item.id} 
                href={item.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative overflow-hidden rounded-2xl bg-black border border-zinc-800 hover:border-purple-600/50 transition-all"
              >
                {item.thumbnail ? (
                  <div className="aspect-video w-full relative overflow-hidden bg-zinc-900">
                    <Image 
                      src={item.thumbnail} 
                      alt={item.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-zinc-900 flex items-center justify-center">
                    <span className="text-zinc-800 font-mono text-4xl">3D</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                      {item.title}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </SectionWrapper>
      )}
    </>
  )
}
