import { createContext, useContext, useEffect, useState } from 'react'
import { deleteFile, listFiles, uploadFile } from '../lib/api'
import type { ReactNode } from 'react'

export interface Document {
  id: string
  name: string
  size: string
  date: string
  status?: 'uploading' | 'ready' | 'error'
}

export interface HistoryItem {
  id: string
  query: string
  status: 'Compliant' | 'Non-Compliant' | 'Unclear' | 'Pending'
  summary: string
  timestamp: string
  sources: number
}

interface DashboardContextType {
  documents: Array<Document>
  addDocument: (doc: Document) => void
  updateDocument: (id: string, updates: Partial<Document>) => void
  removeDocument: (id: string) => Promise<void>
  uploadDocument: (file: File) => Promise<void>
  history: Array<HistoryItem>
  addHistoryItem: (item: HistoryItem) => void
  updateHistoryItem: (id: string, updates: Partial<HistoryItem>) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Array<Document>>([])

  useEffect(() => {
    listFiles()
      .then((files) => {
        console.log("list_uploaded output:", files)
        setDocuments(
          files.map((name) => ({
            id: name,
            name,
            size: '-',
            date: '-',
            status: 'ready',
          })),
        )
      })
      .catch(console.error)
  }, [])

  const [history, setHistory] = useState<Array<HistoryItem>>([])

  const addDocument = (doc: Document) => {
    setDocuments((prev) => [...prev, doc])
  }

  const updateDocument = (id: string, updates: Partial<Document>) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, ...updates } : doc)),
    )
  }

  const removeDocument = async (id: string) => {
    // Optimistic update or wait?
    // Let's try to delete first.
    // We assume id is the filename for existing docs.
    // For docs being uploaded, they might have a random ID.
    // If status is uploading, maybe we can't delete yet or just remove from UI.
    
    const doc = documents.find(d => d.id === id);
    if (!doc) return;

    if (doc.status === 'ready') {
        try {
            await deleteFile(doc.name);
            setDocuments((prev) => prev.filter((d) => d.id !== id))
        } catch (error) {
            console.error("Failed to delete file", error);
            // Optionally show error
        }
    } else {
        // If it's uploading or error, just remove from UI
        setDocuments((prev) => prev.filter((d) => d.id !== id))
    }
  }

  const uploadDocument = async (file: File) => {
    await uploadFile(file)
  }

  const addHistoryItem = (item: HistoryItem) => {
    setHistory((prev) => [item, ...prev])
  }

  const updateHistoryItem = (id: string, updates: Partial<HistoryItem>) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    )
  }

  return (
    <DashboardContext.Provider
      value={{
        documents,
        addDocument,
        updateDocument,
        removeDocument,
        uploadDocument,
        history,
        addHistoryItem,
        updateHistoryItem,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}
