/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        exxeta: '#ffed00',
        dark: '#1a1a1a',
      }
    },
  },
  plugins: [],
}