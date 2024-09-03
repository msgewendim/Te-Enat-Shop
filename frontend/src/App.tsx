import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import i18next from 'i18next'

function App() {
  let direction : string 
  const getLang = i18next.language
  if (getLang === "en"){
    direction = "ltr"
  }else if (getLang === "he-IL"){
    direction = "rtl"
  }else{
    direction = "ltr" // Default direction for other languages
  }
  return (
    <div dir={direction}>
      <Navbar />
      <Outlet/>
      <Footer />
    </div>
  )
}

export default App
