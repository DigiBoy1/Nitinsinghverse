import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { apiSuccess, apiError, ApiError } from '@/lib/api/response'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input to prevent blind database writes
    const parsed = contactSchema.parse(body)

    const supabase = await createClient()
    
    // Insert into messages table
    // RLS allows public inserts into 'messages' (verified in Phase 3)
    const { data, error } = await supabase.from('messages').insert([
      {
        name: parsed.name,
        email: parsed.email,
        subject: parsed.subject,
        message: parsed.message,
        // status default is usually 'unread' per schema
      }
    ]).select().single()

    if (error) {
      console.error('Failed to insert message:', error)
      throw new ApiError(500, 'database_error', 'Failed to send message.')
    }

    return apiSuccess({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError(new ApiError(400, 'validation_error', 'Invalid form data.'))
    }
    return apiError(error)
  }
}
