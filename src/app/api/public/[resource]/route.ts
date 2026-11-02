import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { apiSuccess, apiError, ApiError } from '@/lib/api/response'
import { isPublicResource, PublicResource } from '@/lib/api/config'

// Explicit field-level whitelisting for public API resources
// This prevents private admin-only fields from leaking to the public API
// even when RLS allows row visibility.
const PUBLIC_FIELD_PROJECTIONS: Record<PublicResource, string> = {
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  try {
    const { resource } = await params
    
    if (!isPublicResource(resource)) {
      throw new ApiError(404, 'not_found', 'Resource not found or not public.')
    }

    const supabase = await createClient()
    
    // Explicit field projection based on the allowed whitelist
    const selectQuery = PUBLIC_FIELD_PROJECTIONS[resource]

    // For public GET requests, Supabase RLS handles the visibility filtering natively.
    // E.g. 'visibility = true' is enforced by the database policies.
    const { data, error } = await supabase.from(resource).select(selectQuery)

    if (error) {
      throw new ApiError(500, 'database_error', 'Failed to fetch resource.')
    }

    return apiSuccess(data)
  } catch (error) {
    return apiError(error)
  }
}
