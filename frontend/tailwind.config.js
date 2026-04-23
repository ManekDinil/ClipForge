/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F",
        surface: "#1A1A1A",
        accent: "#39FF14"
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(200%)' },
        }
      }
    },
  },
  plugins: [],
}
