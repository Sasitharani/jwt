/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the paths according to your project structure
        './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Add Montserrat font
      },
    },
  },
  plugins: [],
}

