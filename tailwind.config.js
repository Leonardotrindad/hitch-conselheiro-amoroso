/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'oleo-swash': ['Oleo Script Swash Caps', 'cursive'],
      }
    },
  },
  plugins: [],
}