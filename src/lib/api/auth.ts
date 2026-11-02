import { createClient } from '@/lib/supabase/server'
import { ApiError } from '@/lib/api/response'

export async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    throw new ApiError(401, 'unauthorized', 'Authentication required.')
  }

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    throw new ApiError(500, 'server_configuration_error', 'Server is missing admin configuration.')
  }

  if (user.email !== adminEmail) {
    throw new ApiError(403, 'forbidden', 'Admin access denied.')
  }

  return { user, supabase }
}
