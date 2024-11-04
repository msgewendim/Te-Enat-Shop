import { useCallback, useEffect, useState } from "react"
import { TbMoonStars, TbSun } from "react-icons/tb"

const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem("theme") : "light"
  )
  const element = document.documentElement
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme])

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      element.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme, toggleTheme, element])
  return (

    <button onClick={toggleTheme}>
      {
        theme === "dark" ?
          <TbSun className="text-primary" size={24} />
          :
          <TbMoonStars className="text-primary" size={24} />
      }
    </button>
  )
}

export default DarkMode