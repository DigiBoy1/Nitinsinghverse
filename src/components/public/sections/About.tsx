import { getPublicResource } from '@/lib/api/publicData'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionTitle } from '../ui/SectionTitle'

export async function About() {
  const profile = await getPublicResource<any>('profiles', { single: true })
  const about = await getPublicResource<any>('about', { single: true })

  if (!profile || !about) return null

  return (
    <SectionWrapper id="about" className="bg-black">
      <SectionTitle title="About Me" subtitle={profile.title} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Bio */}
        <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">Who I Am</h3>
          <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
            {about.who_i_am || profile.bio}
          </p>
        </div>

        <div className="space-y-6">
          {about.what_i_do && (
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-2">What I Do</h3>
              <p className="text-zinc-400 leading-relaxed">{about.what_i_do}</p>
            </div>
          )}
          {about.what_i_like_building && (
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-2">What I Like Building</h3>
              <p className="text-zinc-400 leading-relaxed">{about.what_i_like_building}</p>
            </div>
          )}
          {about.what_im_exploring && (
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-2">What I&apos;m Exploring</h3>
              <p className="text-zinc-400 leading-relaxed">{about.what_im_exploring}</p>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
