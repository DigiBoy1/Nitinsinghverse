import { createClient } from '@/lib/supabase/server'
import { PublicResource, isPublicResource } from '@/lib/api/config'

// Share the exact same projection rules as the public API endpoint
export const PUBLIC_FIELD_PROJECTIONS: Record<PublicResource, string> = {
  profiles: 'id, name, title, bio, github_url, linkedin_url, availability_status',
  about: 'id, who_i_am, what_i_do, what_im_exploring, what_i_like_building',
  skill_categories: 'id, name, display_order',
  skills: 'id, category_id, name, icon, description, url, proficiency_level, featured, display_order',
  projects: 'id, title, slug, short_description, full_description, thumbnail, logo, problem, solution, features, tech_stack, github_url, live_url, status, start_date, end_date, featured, display_order',
  certificates: 'id, title, issuer, issue_date, credential_id, image_url, pdf_url, description, verification_url, featured, display_order',
  badges: 'id, title, issuer, image_url, issue_date, credential_id, verification_url, description, display_order',
  education: 'id, institution, degree, field_of_study, start_date, end_date, description, display_order',
  experience: 'id, company, position, start_date, end_date, current, description, display_order',
  achievements: 'id, title, date, description, url, display_order',
  learning_journey: 'id, title, description, display_order',
  genai_projects: 'id, title, category, description, url, thumbnail, display_order',
  threejs_experiments: 'id, title, description, url, thumbnail, display_order',
  github_repositories: 'id, name, description, url, language, stars, forks, display_order',
  resume_versions: 'id, version_name, file_url',
  site_settings: 'id, title, description, hero_copy, seo_metadata, og_image, favicon, theme_settings',
}

/**
 * Server Component utility to fetch public resource data directly from Supabase.
 * Bypasses unnecessary HTTP round-trips to our own /api/public routes.
 * Strictly enforces field projection to prevent private data leakage.
 * RLS handles the 'visibility = true' constraint natively.
 */
export async function getPublicResource<T = any>(resource: PublicResource, options?: { 
  single?: boolean, 
  eq?: { column: string, value: any },
  order?: { column: string, ascending?: boolean }
}): Promise<T | null> {
  if (!isPublicResource(resource)) {
    throw new Error(`Invalid public resource: ${resource}`)
  }

  const supabase = await createClient()
  const selectQuery = PUBLIC_FIELD_PROJECTIONS[resource]

  let query = supabase.from(resource).select(selectQuery)

  if (options?.eq) {
    query = query.eq(options.eq.column, options.eq.value)
  }

  if (options?.order) {
    query = query.order(options.order.column, { ascending: options.order.ascending ?? true })
  }

  if (options?.single) {
    const { data, error } = await query.maybeSingle()
    if (error) {
      console.error(`Error fetching ${resource}:`, error)
      return null
    }
    return data as T
  }

  const { data, error } = await query
  if (error) {
    console.error(`Error fetching ${resource}:`, error)
    return [] as T
  }

  return data as T
}
