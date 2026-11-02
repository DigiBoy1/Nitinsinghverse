import { getPublicResource } from '@/lib/api/publicData'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionTitle } from '../ui/SectionTitle'
import { Briefcase, GraduationCap } from 'lucide-react'

export async function Timeline() {
  const experience = await getPublicResource<any[]>('experience', { order: { column: 'start_date', ascending: false } }) || []
  const education = await getPublicResource<any[]>('education', { order: { column: 'start_date', ascending: false } }) || []

  if (!experience.length && !education.length) return null

  return (
    <SectionWrapper id="timeline" className="bg-black">
      <SectionTitle 
        title="Experience & Education" 
        subtitle="My academic background and professional journey."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Experience Timeline */}
        {experience.length > 0 && (
          <div>
            <div className="flex items-center mb-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-950 border border-cyan-900">
                <Briefcase className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-white">Experience</h3>
            </div>
            
            <div className="space-y-10 border-l border-zinc-800 ml-6 pl-8 relative">
              {experience.map((item: any) => (
                <div key={item.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-black border-2 border-cyan-500" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <h4 className="text-xl font-bold text-white">{item.position}</h4>
                    <span className="text-sm font-mono text-cyan-400 mt-1 sm:mt-0">
                      {new Date(item.start_date).getFullYear()} — {item.current ? 'Present' : new Date(item.end_date).getFullYear()}
                    </span>
                  </div>
                  <h5 className="text-base font-medium text-zinc-400 mb-4">{item.company}</h5>
                  <p className="text-zinc-400 leading-relaxed whitespace-pre-line text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Timeline */}
        {education.length > 0 && (
          <div>
            <div className="flex items-center mb-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-950 border border-purple-900">
                <GraduationCap className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-white">Education</h3>
            </div>
            
            <div className="space-y-10 border-l border-zinc-800 ml-6 pl-8 relative">
              {education.map((item: any) => (
                <div key={item.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-black border-2 border-purple-500" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <h4 className="text-xl font-bold text-white">{item.degree}</h4>
                    <span className="text-sm font-mono text-purple-400 mt-1 sm:mt-0">
                      {new Date(item.start_date).getFullYear()} — {item.end_date ? new Date(item.end_date).getFullYear() : 'Present'}
                    </span>
                  </div>
                  <h5 className="text-base font-medium text-zinc-400 mb-2">{item.institution}</h5>
                  <h6 className="text-sm font-medium text-zinc-500 mb-4">{item.field_of_study}</h6>
                  {item.description && (
                    <p className="text-zinc-400 leading-relaxed whitespace-pre-line text-sm">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
