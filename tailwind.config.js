/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cricket: {
          pitch: '#15803d',
          grass: '#166534',
          accent: '#10b981',
          gold: '#f59e0b',
          neonCyan: '#06b6d4',
          neonGreen: '#34d399',
          darkBg: '#020617',
          cardBg: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(52, 211, 153, 0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(52, 211, 153, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
