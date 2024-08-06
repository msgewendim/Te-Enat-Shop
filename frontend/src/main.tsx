import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { routes } from './routes/route'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import './i18n'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <RouterProvider router={routes} />
    </Suspense>
  </React.StrictMode>,
)
