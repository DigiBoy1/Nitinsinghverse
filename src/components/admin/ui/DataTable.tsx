'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Edit, Trash2 } from 'lucide-react'

export interface Column<T> {
  header: string
  accessorKey?: keyof T
  cell?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  loading?: boolean
}

export function DataTable<T extends { id: string }>({ data, columns, onEdit, onDelete, loading }: DataTableProps<T>) {
  if (loading) {
    return (
      <Card className="border-zinc-800 bg-zinc-950 p-6 flex justify-center items-center h-48">
        <div className="text-zinc-500">Loading data...</div>
      </Card>
    )
  }

  if (data.length === 0) {
    return (
      <Card className="border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-center items-center h-48">
        <div className="text-zinc-500 mb-2">No records found.</div>
      </Card>
    )
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-zinc-400">
          <thead className="text-xs uppercase bg-zinc-900 border-b border-zinc-800 text-zinc-300">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-3 font-medium">
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-3 text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                {columns.map((col, i) => (
                  <td key={i} className="px-6 py-4">
                    {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey]) : ''}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {onEdit && (
                        <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400 hover:bg-red-950" onClick={() => onDelete(item)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
