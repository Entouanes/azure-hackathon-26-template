import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react'

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Compliant':
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'Non-Compliant':
      return <AlertCircle className="h-4 w-4 text-red-600" />
    case 'Unclear':
      return <HelpCircle className="h-4 w-4 text-yellow-600" />
    default:
      return <HelpCircle className="h-4 w-4 text-muted-foreground" />
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Compliant':
      return 'border-green-200 text-green-700 bg-green-50'
    case 'Non-Compliant':
      return 'border-red-200 text-red-700 bg-red-50'
    case 'Unclear':
      return 'border-yellow-200 text-yellow-700 bg-yellow-50'
    default:
      return 'border-gray-200 text-gray-700 bg-gray-50'
  }
}
