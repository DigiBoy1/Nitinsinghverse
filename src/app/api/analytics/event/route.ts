import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { apiSuccess, apiError, ApiError } from '@/lib/api/response'
import { VisitorEventSchema } from '@/lib/api/schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = VisitorEventSchema.parse(body)

    const supabase = await createClient()

    const { error } = await supabase.from('visitor_events').insert({
      session_id: parsed.session_id,
      event_type: parsed.event_type,
      page_url: parsed.page_url,
      metadata: parsed.metadata,
    })

    if (error) {
      throw new ApiError(500, 'database_error', 'Failed to record event.')
    }

    return apiSuccess({ success: true })
  } catch (error) {
    return apiError(error)
  }
}
