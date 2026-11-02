import { NextRequest } from 'next/server'
import { apiSuccess, apiError, ApiError } from '@/lib/api/response'
import { requireAdmin } from '@/lib/api/auth'
import { isAdminResource, AdminResource } from '@/lib/api/config'
import { AdminSchemas } from '@/lib/api/schemas'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  try {
    const { supabase } = await requireAdmin()
    const { resource } = await params
    
    if (!isAdminResource(resource)) {
      throw new ApiError(404, 'not_found', 'Resource not found.')
    }

    const { data, error } = await supabase.from(resource).select('*')

    if (error) {
      throw new ApiError(500, 'database_error', 'Failed to fetch resource.')
    }

    return apiSuccess(data)
  } catch (error) {
    return apiError(error)
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  try {
    const { supabase } = await requireAdmin()
    const { resource } = await params
    
    if (!isAdminResource(resource)) {
      throw new ApiError(404, 'not_found', 'Resource not found.')
    }

    const schema = AdminSchemas[resource as AdminResource]
    if (!schema) {
      throw new ApiError(500, 'schema_missing', 'Validation schema missing for this resource.')
    }

    const body = await request.json()
    const parsed = schema.parse(body)

    const { data, error } = await supabase.from(resource).insert(parsed as Record<string, unknown>).select().single()

    if (error) {
      throw new ApiError(500, 'database_error', 'Failed to create resource.')
    }

    return apiSuccess(data)
  } catch (error) {
    return apiError(error)
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  try {
    const { supabase } = await requireAdmin()
    const { resource } = await params
    
    if (!isAdminResource(resource)) {
      throw new ApiError(404, 'not_found', 'Resource not found.')
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    if (!id) {
      throw new ApiError(400, 'missing_id', 'Resource ID is required for update.')
    }

    const schema = AdminSchemas[resource as AdminResource]
    if (!schema) {
      throw new ApiError(500, 'schema_missing', 'Validation schema missing for this resource.')
    }

    const body = await request.json()
    const parsed = schema.partial().parse(body) // Allow partial updates

    const { data, error } = await supabase.from(resource).update(parsed as Record<string, unknown>).eq('id', id).select().single()

    if (error) {
      throw new ApiError(500, 'database_error', 'Failed to update resource.')
    }

    return apiSuccess(data)
  } catch (error) {
    return apiError(error)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  try {
    const { supabase } = await requireAdmin()
    const { resource } = await params
    
    if (!isAdminResource(resource)) {
      throw new ApiError(404, 'not_found', 'Resource not found.')
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    if (!id) {
      throw new ApiError(400, 'missing_id', 'Resource ID is required for deletion.')
    }

    const { error } = await supabase.from(resource).delete().eq('id', id)

    if (error) {
      throw new ApiError(500, 'database_error', 'Failed to delete resource.')
    }

    return apiSuccess({ success: true, message: 'Resource deleted.' })
  } catch (error) {
    return apiError(error)
  }
}
