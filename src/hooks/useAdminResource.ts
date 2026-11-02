import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'

export function useAdminResource<T>(resource: string) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const fetchResource = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/${resource}`)
      const json = await res.json()
      if (json.success) {
        setData(json.data)
      } else {
        toast.error(json.error?.message || 'Failed to fetch')
      }
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }, [resource])

  const createRecord = async (payload: any) => {
    setActionLoading(true)
    try {
      const res = await fetch(`/api/admin/${resource}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const json = await res.json()
      if (json.success) {
        toast.success('Created successfully')
        await fetchResource()
        return json.data
      } else {
        toast.error(json.error?.message || 'Failed to create')
        return null
      }
    } catch (err: any) {
      toast.error(err.message)
      return null
    } finally {
      setActionLoading(false)
    }
  }

  const updateRecord = async (id: string, payload: any) => {
    setActionLoading(true)
    try {
      const res = await fetch(`/api/admin/${resource}?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const json = await res.json()
      if (json.success) {
        toast.success('Updated successfully')
        await fetchResource()
        return json.data
      } else {
        toast.error(json.error?.message || 'Failed to update')
        return null
      }
    } catch (err: any) {
      toast.error(err.message)
      return null
    } finally {
      setActionLoading(false)
    }
  }

  const deleteRecord = async (id: string) => {
    setActionLoading(true)
    try {
      const res = await fetch(`/api/admin/${resource}?id=${id}`, {
        method: 'DELETE'
      })
      if (res.status === 204 || res.ok) {
        toast.success('Deleted successfully')
        await fetchResource()
        return true
      }
      const json = await res.json()
      toast.error(json.error?.message || 'Failed to delete')
      return false
    } catch (err: any) {
      toast.error(err.message)
      return false
    } finally {
      setActionLoading(false)
    }
  }

  return { data, loading, actionLoading, fetchResource, createRecord, updateRecord, deleteRecord }
}
