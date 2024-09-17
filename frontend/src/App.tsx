import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Suspense } from 'react'

const App = () => {
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Navbar />
      <Outlet />
      <Footer />
    </Suspense>
  )
}

export default App
