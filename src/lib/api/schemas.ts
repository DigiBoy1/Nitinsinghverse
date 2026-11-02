import { z } from 'zod'
import { AdminResource } from './config'

const uuidSchema = z.string().uuid()

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  github_url: z.string().url().optional().or(z.literal('')),
  linkedin_url: z.string().url().optional().or(z.literal('')),
  availability_status: z.string().optional(),
})

export const aboutSchema = z.object({
  who_i_am: z.string().optional(),
  what_i_do: z.string().optional(),
  what_im_exploring: z.string().optional(),
  what_i_like_building: z.string().optional(),
  visibility: z.boolean().optional(),
})

export const skillCategorySchema = z.object({
  name: z.string().min(1),
  display_order: z.number().int().optional(),
  visibility: z.boolean().optional(),
})

export const skillSchema = z.object({
  category_id: uuidSchema,
  name: z.string().min(1),
  icon: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  proficiency_level: z.string().optional(),
  learning_status: z.string().optional(),
  featured: z.boolean().optional(),
  display_order: z.number().int().optional(),
  visibility: z.boolean().optional(),
})

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  short_description: z.string().optional(),
  full_description: z.string().optional(),
  thumbnail: z.string().optional(),
  logo: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  features: z.array(z.string()).optional(),
  tech_stack: z.array(z.string()).optional(),
  github_url: z.string().url().optional().or(z.literal('')),
  live_url: z.string().url().optional().or(z.literal('')),
  status: z.string().optional(),
  start_date: z.string().optional().or(z.literal('')),
  end_date: z.string().optional().or(z.literal('')),
  featured: z.boolean().optional(),
  display_order: z.number().int().optional(),
  visibility: z.boolean().optional(),
})

export const certificateSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  issue_date: z.string().optional().or(z.literal('')),
  credential_id: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal('')),
  pdf_url: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  verification_url: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().optional(),
  display_order: z.number().int().optional(),
  visibility: z.boolean().optional(),
})

export const badgeSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  image_url: z.string().url().optional().or(z.literal('')),
  issue_date: z.string().optional().or(z.literal('')),
  credential_id: z.string().optional(),
  verification_url: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  display_order: z.number().int().optional(),
  visibility: z.boolean().optional(),
})

export const educationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  field_of_study: z.string().optional(),
  start_date: z.string().optional().or(z.literal('')),
  end_date: z.string().optional().or(z.literal('')),
  description: z.string().optional(),
  display_order: z.number().int().optional(),
  visibility: z.boolean().optional(),
})

export const experienceSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  start_date: z.string().optional().or(z.literal('')),
  end_date: z.string().optional().or(z.literal('')),
  current: z.boolean().optional(),
  description: z.string().optional(),
  display_order: z.number().int().optional(),
  visibility: z.boolean().optional(),
})

export const achievementSchema = z.object({
  title: z.string().min(1),
  date: z.string().optional().or(z.literal('')),
  description: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  display_order: z.number().int().optional(),
  visibility: z.boolean().optional(),
})

export const genaiProjectSchema = z.object({
  title: z.string().min(1),
  category: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  thumbnail: z.string().optional(),
  display_order: z.number().int().optional(),
  visibility: z.boolean().optional(),
})

export const threejsExperimentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  thumbnail: z.string().optional(),
  display_order: z.number().int().optional(),
  visibility: z.boolean().optional(),
})

export const resumeVersionSchema = z.object({
  version_name: z.string().min(1),
  file_url: z.string().url().optional().or(z.literal('')),
  is_active: z.boolean().optional(),
})

export const siteSettingsSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  hero_copy: z.string().optional(),
  seo_metadata: z.any().optional(),
  og_image: z.string().optional(),
  favicon: z.string().optional(),
  theme_settings: z.any().optional(),
})

// Export the mapping for the API handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AdminSchemas: Partial<Record<AdminResource, z.ZodObject<any>>> = {
  profiles: profileSchema,
  about: aboutSchema,
  skill_categories: skillCategorySchema,
  skills: skillSchema,
  projects: projectSchema,
  certificates: certificateSchema,
  badges: badgeSchema,
  education: educationSchema,
  experience: experienceSchema,
  achievements: achievementSchema,
  genai_projects: genaiProjectSchema,
  threejs_experiments: threejsExperimentSchema,
  resume_versions: resumeVersionSchema,
  site_settings: siteSettingsSchema,
}

export const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const VisitorSessionSchema = z.object({
  ip_hash: z.string().optional(),
  user_agent: z.string().optional(),
  location: z.string().optional(),
})

export const VisitorEventSchema = z.object({
  session_id: uuidSchema,
  event_type: z.string().min(1),
  page_url: z.string().optional(),
  metadata: z.any().optional(),
})
