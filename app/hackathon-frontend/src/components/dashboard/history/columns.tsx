import { ArrowUpDown, Eye } from 'lucide-react'
import { getStatusColor, getStatusIcon } from '../status-utils'
import type { ColumnDef } from '@tanstack/react-table'
import type { HistoryItem } from '@/context/DashboardContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface ColumnsProps {
  onViewDetails: (item: HistoryItem) => void
}

export const createHistoryColumns = ({
  onViewDetails,
}: ColumnsProps): Array<ColumnDef<HistoryItem>> => [
  {
    accessorKey: 'query',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-2"
        >
          Question
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPending = row.original.status === 'Pending'

      if (isPending && !row.original.query) {
        return <Skeleton className="h-4 w-3/4" />
      }

      return (
        <div className="flex items-start gap-2">
          <span className="font-medium">{row.original.query}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'timestamp',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-2"
        >
          Submitted on
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPending = row.original.status === 'Pending'

      if (isPending && !row.original.timestamp) {
        return <Skeleton className="h-4 w-24" />
      }

      return (
        <div className="text-muted-foreground ">{row.original.timestamp}</div>
      )
    },
  },
  {
    accessorKey: 'sources',
    header: 'Sources',
    cell: ({ row }) => {
      const isPending = row.original.status === 'Pending'

      if (isPending && row.original.sources === 0) {
        return <Skeleton className="h-4 w-8" />
      }

      return (
        <div className="text-muted-foreground ">
          {row.original.sources} {row.original.sources === 1 ? 'source' : 'sources'}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.original.status
      const isPending = status === 'Pending'

      if (isPending) {
        return <Skeleton className="h-6 w-20 rounded-full" />
      }

      return (
        <Badge
          variant="outline"
          className={cn('flex w-fit items-center gap-1.5', getStatusColor(status))}
        >
          {getStatusIcon(status)}
          <span className=" font-medium">{status}</span>
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original
      const isPending = item.status === 'Pending'

      if (isPending) {
        return <Skeleton className="h-9 w-20" />
      }

      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails(item)}
          className="h-8"
        >
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      )
    },
  },
]
