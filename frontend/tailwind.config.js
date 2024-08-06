/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : 'class',
  theme: {
    extend: {
      colors:{
        primary : "#274C5B",
        secondary : "#7EB693",
        tertiary : "#FFFFFF",
        quaternary : "",
        
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '3rem',
          // md: '4rem',
          // lg: '8rem',
          // xl: '16rem',
        },
      },
    
      
    }
  },
  plugins: [],
}

