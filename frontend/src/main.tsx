import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom'
import './i18n'
import { Auth0Provider } from "@auth0/auth0-react"
import { routes } from './routes/route'
import AppProvider from './providers/ContextProvider'
import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from './utils/env.config'
import './index.css'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: AUTH0_AUDIENCE,
        scope: "openid profile email"
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
