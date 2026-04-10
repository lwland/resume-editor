/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        resume: {
          blue: '#2563eb',
          gray: '#6b7280',
          dark: '#1e293b',
        }
      }
    },
  },
  plugins: [],
}

