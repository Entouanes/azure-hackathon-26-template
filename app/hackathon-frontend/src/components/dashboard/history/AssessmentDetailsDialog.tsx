import { Quote, FileText, Calendar, Info, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { getStatusColor, getStatusIcon } from '../status-utils'
import type { HistoryItem } from '@/context/DashboardContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

interface AssessmentDetailsDialogProps {
  item: HistoryItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AssessmentDetailsDialog({
  item,
  open,
  onOpenChange,
}: AssessmentDetailsDialogProps) {
  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl h-[85vh] p-0 gap-0 overflow-hidden flex flex-col">
          <div className="flex flex-col h-full">
            <DialogHeader className="px-6 py-4 flex-none border-b">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <DialogTitle className="pr-8">
                    {item.query}
                  </DialogTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <HistoryStatusBadge status={item.status} />
                    <Separator orientation="vertical" className="h-4" />
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.timestamp}
                    </span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="font-mono text-xs">{item.id}</span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Content: Summary */}
                <div className="flex-1 flex flex-col min-w-[50%] border-r bg-background/50">
                     <div className="px-6 py-3 border-b bg-muted/20">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                             <Info className="h-4 w-4" /> Assessment Summary
                        </h3>
                     </div>
                     <ScrollArea className="flex-1 p-6">
                        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground leading-relaxed">
                            {item.summary || "No summary available."}
                        </div>
                     </ScrollArea>
                </div>

                {/* Sidebar: Sources */}
                <div className="w-[400px] flex flex-col bg-muted/10">
                     <div className="px-6 py-3 border-b bg-muted/20 flex items-center justify-between">
                         <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                             <FileText className="h-4 w-4" /> Relevant Sources
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                             {item.sources} {item.sources === 1 ? 'doc' : 'docs'}
                        </Badge>
                     </div>
                     
                     <ScrollArea className="flex-1 p-4">
                        {item.sources === 0 ? (
                             <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground opacity-60">
                                 <FileText className="h-10 w-10 mb-2 stroke-1" />
                                 <p className="text-sm">No sources referenced</p>
                             </div>
                        ) : (
                            <Accordion type="single" collapsible className="w-full space-y-3">
                                {/* Simulated Source 1 */}
                                <AccordionItem value="source-1" className="border rounded-lg bg-card px-3 shadow-sm">
                                    <AccordionTrigger className="hover:no-underline py-3 text-sm font-medium">
                                        <div className="flex items-center gap-3 text-left">
                                             <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                                 <span className="text-xs font-bold">PDF</span>
                                             </div>
                                             <div className="flex-1 truncate">
                                                 <div className="truncate">UBS (Lux) Fund Solutions.pdf</div>
                                                 <div className="text-xs text-muted-foreground font-normal">Page 15 • Score 95%</div>
                                             </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-0 pb-3 pl-11 pr-2">
                                         <div className="relative pl-3 border-l-2 border-primary/30 my-2">
                                             <Quote className="h-3 w-3 text-muted-foreground absolute -left-[19px] top-0 bg-card" />
                                             <p className="italic text-sm text-muted-foreground leading-relaxed">
                                                 "This is a relevant quote from the source document that provides evidence for the compliance assessment."
                                             </p>
                                         </div>
                                         <Button variant="link" className="h-auto p-0 text-xs text-primary mt-1">
                                             View Document
                                         </Button>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Conditional Render: More Sources */}
                                {item.sources > 1 && (
                                    <AccordionItem value="source-2" className="border rounded-lg bg-card px-3 shadow-sm">
                                        <AccordionTrigger className="hover:no-underline py-3 text-sm font-medium">
                                            <div className="flex items-center gap-3 text-left">
                                                <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                                    <span className="text-xs font-bold">DOC</span>
                                                </div>
                                                <div className="flex-1 truncate">
                                                    <div className="truncate">Global_Compliance_2025.docx</div>
                                                    <div className="text-xs text-muted-foreground font-normal">Page 8 • Score 82%</div>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-0 pb-3 pl-11 pr-2">
                                             <div className="relative pl-3 border-l-2 border-primary/30 my-2">
                                                <p className="italic text-sm text-muted-foreground leading-relaxed">
                                                    "Additional relevant information from another source document supporting the assessment conclusion."
                                                </p>
                                             </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                )}
                            </Accordion>
                        )}
                     </ScrollArea>
                </div>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  )
}

function HistoryStatusBadge({ status }: { status: string }) {
     const Icon = getStatusIcon(status)
     return (
         <Badge
              variant="outline"
              className={cn('flex items-center gap-1.5 px-2 py-0.5 border-none bg-transparent', getStatusColor(status))}
            >
              {Icon}
              <span className="font-medium">{status}</span>
         </Badge>
     )
}
