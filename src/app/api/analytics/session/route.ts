import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { apiSuccess, apiError, ApiError } from '@/lib/api/response'
import { VisitorSessionSchema } from '@/lib/api/schemas'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const parsed = VisitorSessionSchema.parse(body)

    const supabase = await createClient()
    const sessionId = uuidv4()

    const { error } = await supabase.from('visitor_sessions').insert({
      session_id: sessionId,
      ip_hash: parsed.ip_hash,
      user_agent: parsed.user_agent,
      location: parsed.location,
    })

    if (error) {
      throw new ApiError(500, 'database_error', 'Failed to create session.')
    }

    return apiSuccess({ session_id: sessionId })
  } catch (error) {
    return apiError(error)
  }
}
