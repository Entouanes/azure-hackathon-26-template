import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Header } from '@/components/Header'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-1 py-4">
        <Outlet />
      </main>
    </div>
  )
}
