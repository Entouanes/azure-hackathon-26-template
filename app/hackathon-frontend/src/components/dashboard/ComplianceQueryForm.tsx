import { useRef, useState } from 'react'
import {
  FileText,
  Loader2,
  Play,
  Plus,
  RotateCcw,
  Upload,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDashboard } from '@/context/DashboardContext'
import { mockService } from '@/lib/mock-service'
import { cn } from '@/lib/utils'

interface ComplianceQueryFormProps {
  onSuccess?: () => void
}

export function ComplianceQueryForm({ onSuccess }: ComplianceQueryFormProps) {
  const { addHistoryItem, updateHistoryItem } = useDashboard()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const [activeTab, setActiveTab] = useState('questions') // 'questions' or 'upload'

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectedQuestions, setDetectedQuestions] = useState<Array<string>>([])
  const [newQuestion, setNewQuestion] = useState('')
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAnalyze = async (selectedFile: File) => {
    setIsAnalyzing(true)
    try {
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const questions = await mockService.extractQuestions(selectedFile, '')
      setDetectedQuestions((prev) => [...prev, ...questions])
      setFile(selectedFile)
      setActiveTab('questions')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return
    setDetectedQuestions((prev) => [...prev, newQuestion.trim()])
    setNewQuestion('')
  }

  const handleDeleteQuestion = (index: number) => {
    setDetectedQuestions((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpdateQuestion = (index: number, newText: string) => {
    setDetectedQuestions((prev) => {
      const updated = [...prev]
      updated[index] = newText
      return updated
    })
  }

  const handleReset = () => {
    setFile(null)
    setDetectedQuestions([])
    setNewQuestion('')
    setLoading(false)
    setActiveTab('questions')
  }

  const handleVerify = () => {
    const itemsToVerify = detectedQuestions

    if (itemsToVerify.length === 0) return

    setLoading(true)

    const pendingItems = itemsToVerify.map((item) => ({
      id: Math.random().toString(36).substr(2, 9),
      query: item,
      status: 'Pending' as const,
      summary: '',
      timestamp: new Date().toLocaleString(),
      sources: 0,
    }))

    // Add pending items (reversed to maintain order when prepended)
    ;[...pendingItems].reverse().forEach((item) => addHistoryItem(item))

    // Clear inputs and stop loading immediately as items are now in history
    setFile(null)
    setDetectedQuestions([])
    setNewQuestion('')
    setLoading(false)

    onSuccess?.()
    
    // Process items
    pendingItems.forEach(async (item) => {
      const result = await mockService.verifyQuery(item.query)
      updateHistoryItem(item.id, result)
    })
  }

  return (
    <>
      <DialogHeader>
        <div className="flex items-center justify-between">
           <DialogTitle>Check Compliance</DialogTitle>
        </div>
        <DialogDescription>
          Run compliance checks based on manual questions or document analysis.
        </DialogDescription>
      </DialogHeader>
      
      <Separator />

      <div className="py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="questions">Manual Entry</TabsTrigger>
            <TabsTrigger value="upload">Upload Document</TabsTrigger>
            </TabsList>

            <TabsContent value="questions" className="space-y-4 outline-none">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Questions List
                    </h3>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md font-mono">
                    {detectedQuestions.length}
                    </span>
                </div>

                <ScrollArea className="h-[280px] rounded-md border p-4 bg-muted/10">
                    {detectedQuestions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-2 text-muted-foreground pt-8 pb-8">
                            <FileText className="h-8 w-8 opacity-20" />
                            <div className="text-sm">No questions added yet.</div>
                            <div className="text-xs">Type a question below or upload a document.</div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {detectedQuestions.map((q, i) => (
                                <InputGroup key={i}>
                                <InputGroupInput
                                    value={q}
                                    onChange={(e) => handleUpdateQuestion(i, e.target.value)}
                                    placeholder="Enter compliance item..."
                                    className="bg-background"
                                />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                    size="icon-xs"
                                    variant="ghost"
                                    onClick={() => handleDeleteQuestion(i)}
                                    aria-label="Delete question"
                                    >
                                    <X className="h-3.5 w-3.5" />
                                    </InputGroupButton>
                                </InputGroupAddon>
                                </InputGroup>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                <div className="pt-2">
                    <InputGroup>
                        <InputGroupInput
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Add a new question..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleAddQuestion()
                            }
                        }}
                        />
                        <InputGroupAddon align="inline-end">
                        <InputGroupButton
                            size="icon-xs"
                            onClick={handleAddQuestion}
                            disabled={!newQuestion.trim()}
                            aria-label="Add question"
                        >
                            <Plus className="h-3.5 w-3.5" />
                        </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </TabsContent>
            
            <TabsContent value="upload" className="outline-none">
             <div 
                className={cn(
                    "border-2 border-dashed rounded-xl h-[380px] flex flex-col items-center justify-center text-center transition-all cursor-pointer relative overflow-hidden",
                    isAnalyzing ? "border-primary/50 bg-primary/5" : "hover:bg-muted/30 hover:border-primary/50"
                )}
                onClick={() => !isAnalyzing && fileInputRef.current?.click()}
             >
                <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    accept=".pdf,.docx,.txt"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleAnalyze(file)
                    }}
                />
                
                {isAnalyzing ? (
                   <div className="flex flex-col items-center animate-pulse">
                        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                        <h3 className="text-lg font-medium text-primary">Analyzing Document</h3>
                        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                          Extracting compliance questions from your file...
                        </p>
                   </div>
                ) : (
                    <>
                        <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium">Upload Document</h3>
                        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                            Drag & drop or click to select a file.
                        </p>
                         <div className="flex gap-2 mt-4 justify-center">
                            <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">.PDF</span>
                            <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">.DOCX</span>
                            <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">.TXT</span>
                        </div>
                    </>
                )}
             </div>
            </TabsContent>
        </Tabs>
      </div>

      <Separator />

      <DialogFooter className="pt-4">
        <div className="flex w-full items-center justify-between sm:justify-end sm:gap-2">
           {activeTab === 'upload' && !isAnalyzing ? (
               <div className="mr-auto text-sm text-muted-foreground italic hidden sm:block">
                   Upload a file to automatically generate questions
               </div>
           ) : (
             <div className="mr-auto">
                <Button
                    variant="ghost"
                    onClick={handleReset}
                    disabled={loading || isAnalyzing || detectedQuestions.length === 0}
                    className="text-muted-foreground hover:text-foreground"
                    >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                </Button>
             </div>
           )}

          <div className="flex items-center gap-2">
            <Button
              onClick={handleVerify}
              disabled={loading || isAnalyzing || detectedQuestions.length === 0}
              className="px-6"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run Assessment
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogFooter>
    </>
  )
}
