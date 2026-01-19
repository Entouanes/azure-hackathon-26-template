import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { EventType, PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider, useMsal } from '@azure/msal-react'
import { msalConfig } from './lib/auth'
import { getRouter } from './router'
import type { AuthenticationResult, EventMessage } from '@azure/msal-browser';
import './styles.css'

const router = getRouter()
const msalInstance = new PublicClientApplication(msalConfig)

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const { instance } = useMsal()

  React.useEffect(() => {
    if (!instance.getActiveAccount() && instance.getAllAccounts().length > 0) {
      instance.setActiveAccount(instance.getAllAccounts()[0])
    }

    const callbackId = instance.addEventCallback((event: EventMessage) => {
      if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult
        instance.setActiveAccount(payload.account)
      }
    })

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId)
      }
    }
  }, [instance])

  return <RouterProvider router={router} />
}

msalInstance.initialize().then(() => {
  const rootElement = document.getElementById('root')!
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </React.StrictMode>,
    )
  }
})