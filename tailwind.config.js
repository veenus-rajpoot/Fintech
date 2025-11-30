/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0A0C1F',
        'brand-light': '#F1F5F9',
        'brand-cyan': '#22D3EE',
        'brand-pink': '#EC4899',
        'brand-purple': '#C084FC',
        'brand-violet': '#8B5CF6',
        'brand-green': '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(34, 211, 238, 0.4), 0 0 5px rgba(34, 211, 238, 0.6)',
        'glow-cyan-hover': '0 0 25px rgba(34, 211, 238, 0.6), 0 0 10px rgba(34, 211, 238, 0.8)',
        'glow-green': '0 0 15px rgba(16, 185, 129, 0.4), 0 0 5px rgba(16, 185, 129, 0.6)',
        'glow-green-hover': '0 0 25px rgba(16, 185, 129, 0.6), 0 0 10px rgba(16, 185, 129, 0.8)',
      },
      animation: {
        blink: 'blink 1.5s infinite ease-in-out',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      }
    },
  },
  plugins: [],
}
