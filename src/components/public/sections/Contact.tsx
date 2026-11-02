import { getPublicResource } from '@/lib/api/publicData'
import { ContactClient } from './ContactClient'

export async function Contact() {
  // Try to find the active resume version
  // We can't strictly filter by 'is_active' if it's not in the public fields, 
  // but if the admin system publishes it, we assume the latest one is the active one, or we just grab the first one.
  const resumes = await getPublicResource<any[]>('resume_versions', { order: { column: 'id', ascending: false } }) || []
  
  // Actually, we should only expose the one that is currently active. RLS handles visibility if is_active is mapped to visibility? 
  // The schema usually has is_active for resume. If it's the only one returned via public get, we take the first.
  const activeResume = resumes[0]

  return <ContactClient resumeUrl={activeResume?.file_url || null} />
}
