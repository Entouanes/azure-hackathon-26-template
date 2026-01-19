import { Landmark } from 'lucide-react'

export function Header() {
  return (
    <div className="flex justify-center p-10">
      <header className="container flex items-center justify-between rounded-md border bg-background/80 px-4 py-2 backdrop-blur-md">
      <div className='container flex items-center gap-3'>
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Landmark className="h-6 w-6" />
        </div>
        <p className='text-md font-bold'>Compliance Assessment Platform</p>
        <p className='text-muted-foreground font-mono'>v0.0.0</p>
      </div>
      </header>
    </div>
  )
}
