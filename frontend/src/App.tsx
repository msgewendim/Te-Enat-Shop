import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import ErrorBoundary from './components/error/Error'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import ConfirmationModal from './components/ui/ConfirmModal'
import { useAppContext } from './hooks/app/useAppContext'

const App = () => {
  const { modalState } = useAppContext()
  return (
    <ErrorBoundary >
      <Suspense fallback={<p>Loading...</p>}>
        <Navbar />
        {modalState.isOpen && <ConfirmationModal />}
        <Outlet />
        <Footer />
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
