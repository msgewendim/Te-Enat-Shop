import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './i18n'
import { Auth0Provider } from "@auth0/auth0-react"

import { AppProvider } from './providers/context/ContextProvider'
import { routes } from './routes/route'
import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from './utils/env.config'
import './index.css'

// Enhanced QueryClient configuration with proper caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 5 minutes by default
      staleTime: 5 * 60 * 1000, // 5 minutes
      
      // Cache data for 30 minutes before garbage collection
      gcTime: 30 * 60 * 1000, // 30 minutes
      
      // Refetch on window focus for fresh data
      refetchOnWindowFocus: false,
      
      // Don't refetch on reconnect unless data is stale
      refetchOnReconnect: 'always',
      
      // Keep previous data while fetching new data
      placeholderData: (previousData: unknown) => previousData,
      
      // Retry failed requests 3 times with exponential backoff
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: `${AUTH0_AUDIENCE}/`,
        scope: "openid profile email roles"
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <RouterProvider router={routes} />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnHover
            theme="light"
          />
        </AppProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>
  </StrictMode>,
)
