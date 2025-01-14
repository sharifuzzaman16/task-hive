/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-primary': '#333333',
        'text-secondary': '#6B6B6B',
        'bg-primary': '#FF8C42',
        'bg-secondary': '#FFFFFF',
        'success-green': '#6BCB77', 
        'error-red': '#FF0000',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}