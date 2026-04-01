/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        finance: {
          primary: '#4f46e5', // indigo 600
          success: '#10b981', // emerald 500
          danger: '#ef4444',  // red 500
          surface: '#ffffff', // white
          background: '#f3f4f6', // gray 100
        }
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
