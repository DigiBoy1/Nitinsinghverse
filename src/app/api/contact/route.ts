import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { apiSuccess, apiError, ApiError } from '@/lib/api/response'
import { ContactSchema } from '@/lib/api/schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = ContactSchema.parse(body)

    const supabase = await createClient()

    // Insert message
    const { error } = await supabase.from('messages').insert({
      name: parsed.name,
      email: parsed.email,
      subject: parsed.subject,
      message: parsed.message,
    })

    if (error) {
      throw new ApiError(500, 'database_error', 'Failed to save message.')
    }

    return apiSuccess({ success: true, message: 'Message sent successfully.' })
  } catch (error) {
    return apiError(error)
  }
}
