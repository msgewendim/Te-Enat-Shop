/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#274C5B",
        secondary: "#6da605",
        bgColor1: "#f8efea",
        bgColor2: "#ded369",
        btnColor1: "#e0475b",
        btnColor2: "#166534",
        hoverBtnColor2: "#14532d",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
          // md: '4rem',
          // lg: '8rem',
          // xl: '16rem',
        },
      },
    },
  },
  plugins: [
    ({ addBase }) => {
      addBase({
        '[type="search"]::-webkit-search-decoration': { display: "none" },
        '[type="search"]::-webkit-search-cancel-button': { display: "none" },
        '[type="search"]::-webkit-search-results-button': { display: "none" },
        '[type="search"]::-webkit-search-results-decoration': {
          display: "none",
        },
      });
    },
  ],
};
