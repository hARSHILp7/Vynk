/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
      },
      colors: {
        bg: {
          base:     '#0c0e14',
          surface:  '#111318',
          elevated: '#171a22',
        },
        border: {
          subtle:  '#1a1e2a',
          DEFAULT: '#222636',
        },
        accent: {
          DEFAULT: '#5b8def',
          hover:   '#7aa3f5',
          muted:   '#1b2540',
        },
        success: '#22c55e',
      },
      animation: {
        'slide-up':   'slideUp 0.18s ease-out',
        'fade-in':    'fadeIn 0.15s ease-out',
        'pulse-dot':  'pulseDot 2s ease-in-out infinite',
        'bounce-dot': 'bounceDot 1.2s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
        bounceDot: {
          '0%, 80%, 100%': { transform: 'translateY(0)' },
          '40%':           { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}