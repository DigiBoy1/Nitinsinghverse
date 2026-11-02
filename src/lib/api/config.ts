export const PUBLIC_RESOURCES = [
  'profiles',
  'about',
  'skill_categories',
  'skills',
  'projects',
  'certificates',
  'badges',
  'education',
  'experience',
  'achievements',
  'learning_journey',
  'genai_projects',
  'threejs_experiments',
  'github_repositories',
  'resume_versions',
  'site_settings',
] as const

export const ADMIN_RESOURCES = [
  ...PUBLIC_RESOURCES,
  'project_images',
  'project_skills',
  'messages',
  'notifications',
  'visitor_sessions',
  'visitor_events',
  'media',
] as const

export type PublicResource = typeof PUBLIC_RESOURCES[number]
export type AdminResource = typeof ADMIN_RESOURCES[number]

export function isPublicResource(resource: string): resource is PublicResource {
  return PUBLIC_RESOURCES.includes(resource as PublicResource)
}

export function isAdminResource(resource: string): resource is AdminResource {
  return ADMIN_RESOURCES.includes(resource as AdminResource)
}
