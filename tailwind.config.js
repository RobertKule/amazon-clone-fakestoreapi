/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'amazon': {
          blue: '#146EB4',
          orange: '#FF9900',
          dark: '#232F3E',
          light: '#F3F3F3',
          yellow: '#FFD814',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}