import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { routes } from './routes/route'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import './i18n'
import AppProvider from './providers/ContextProvider'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <AppProvider>
        <RouterProvider router={routes} />
      </AppProvider>
    </Suspense>
  </React.StrictMode>,
)
