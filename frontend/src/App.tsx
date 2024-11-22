import { Outlet } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { Suspense } from 'react'
import { useAppContext } from './hooks/app/useAppContext'
import ConfirmationModal from './components/ui/ConfirmModal'
import ErrorBoundary from './components/error/Error'

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
