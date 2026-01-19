import { createFileRoute } from '@tanstack/react-router'
import { DashboardProvider } from '@/context/DashboardContext'
import { HistoryView } from '@/components/dashboard/HistoryView'

export const Route = createFileRoute('/')({
  component: Dashboard,
})

function Dashboard() {

  return (
    <DashboardProvider>
      <div className="text-muted-foreground mb-8 space-y-3">
        <div className="font-bold">
          Welcome to your AI-powered assistant for regulatory document analysis.
        </div>
        <div>
          Upload your compliance documents to the Knowledge Base, then ask questions to verify adherence to relevant regulations and standards. 
          Our AI analyzes your documents and provides detailed assessments with source references, helping you maintain compliance efficiently.
        </div>
      </div>
      <div className="flex h-full flex-col">
        <HistoryView />
      </div>
    </DashboardProvider>
  )
}
