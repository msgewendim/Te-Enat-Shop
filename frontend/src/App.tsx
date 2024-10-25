import { Outlet } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { Suspense } from 'react'
import { useAppContext } from './hooks/useAppContext'
import ConfirmationModal from './components/ui/ConfirmModal'
const App = () => {
  const { modalState } = useAppContext()
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Navbar />
      {modalState.isOpen && <ConfirmationModal />}
      <Outlet />
      <Footer />
    </Suspense>
  )
}

export default App
