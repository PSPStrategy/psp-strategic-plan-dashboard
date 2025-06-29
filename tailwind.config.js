// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to scan all JS/JSX files in your src folder
    "./public/index.html", // Also scan your public HTML file
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Define Inter as the default sans font
      },
    },
  },
  plugins: [],
}