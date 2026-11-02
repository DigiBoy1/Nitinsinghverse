import { NextResponse } from 'next/server'

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export function apiSuccess(data: unknown, meta?: unknown) {
  const payload: Record<string, unknown> = { success: true, data }
  if (meta !== undefined) {
    payload.meta = meta
  }
  return NextResponse.json(payload, { status: 200 })
}

export function apiError(error: unknown) {
  if (error instanceof ApiError) {
    const payload: Record<string, unknown> = {
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    }
    if (error.details !== undefined) {
      payload.details = error.details
    }
    return NextResponse.json(payload, { status: error.status })
  }

  // Zod Errors
  if (typeof error === 'object' && error !== null && 'name' in error && error.name === 'ZodError') {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'validation_error',
          message: 'Invalid request data',
        },
        details: 'errors' in error ? error.errors : undefined,
      },
      { status: 422 }
    )
  }

  console.error('API Error:', error)
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'internal_error',
        message: 'An unexpected error occurred.',
      },
    },
    { status: 500 }
  )
}
