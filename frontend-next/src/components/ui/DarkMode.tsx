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
  }, [theme, element])
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 transition-colors rounded-full text-primary dark:text-white bg-transparent hover:bg-secondary hover:text-white hover:p-2 hover:ring-offset-2 hover:ring-primary dark:hover:ring-gray-500"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <TbSun size={24} /> : <TbMoonStars size={24} />}
    </button>
  )
}

export default DarkMode