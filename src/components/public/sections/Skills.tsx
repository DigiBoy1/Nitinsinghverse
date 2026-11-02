import { getPublicResource } from '@/lib/api/publicData'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionTitle } from '../ui/SectionTitle'

export async function Skills() {
  const categories = await getPublicResource<any[]>('skill_categories', { order: { column: 'display_order', ascending: true } }) || []
  const allSkills = await getPublicResource<any[]>('skills', { order: { column: 'display_order', ascending: true } }) || []

  if (!categories.length || !allSkills.length) return null

  // Group skills by category
  const skillsByCategory = categories.map(category => ({
    ...category,
    skills: allSkills.filter(s => s.category_id === category.id)
  })).filter(cat => cat.skills.length > 0)

  return (
    <SectionWrapper id="skills" className="bg-zinc-950">
      <SectionTitle 
        title="Skills & Technologies" 
        subtitle="The tools and frameworks I use to build scalable applications."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillsByCategory.map((category) => (
          <div 
            key={category.id} 
            className="p-6 rounded-2xl bg-black border border-zinc-800/60 hover:border-cyan-900/50 transition-colors"
          >
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-zinc-800 pb-2">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill: any) => (
                <div 
                  key={skill.id}
                  className="inline-flex items-center rounded-full bg-zinc-900 px-3 py-1 text-sm font-medium text-zinc-300 ring-1 ring-inset ring-zinc-800 hover:ring-cyan-600/50 hover:bg-zinc-800 hover:text-white transition-all cursor-default"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
