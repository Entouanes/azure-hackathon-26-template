import { Download, Plus } from 'lucide-react'
import { useState } from 'react'

import { ComplianceQueryForm } from './ComplianceQueryForm'
import { AssessmentDetailsDialog } from './history/AssessmentDetailsDialog'
import { createHistoryColumns } from './history/columns'
import type {HistoryItem} from '@/context/DashboardContext';
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {  useDashboard } from '@/context/DashboardContext'


export function HistoryView() {
  const { history } = useDashboard()
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const handleViewDetails = (item: HistoryItem) => {
    setSelectedItem(item)
    setDetailsOpen(true)
  }

  const columns = createHistoryColumns({ onViewDetails: handleViewDetails })

  const toolbarActions = (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Export as PDF</DropdownMenuItem>
          <DropdownMenuItem>Export as CSV</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'outline'}>
            <Plus className="mr-2 h-4 w-4" />
            Questions
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl sm:max-w-3xl">
          <ComplianceQueryForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Assessments Results ({history.length})
        </h2>
      </div>

      <div className="flex-1 overflow-hidden">
        <DataTable
          columns={columns}
          data={history}
          toolbarActions={toolbarActions}
        />
      </div>

      <AssessmentDetailsDialog
        item={selectedItem}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  )
}
