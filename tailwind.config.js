/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#F0FDF8',
          100: '#D9F8EB',
          200: '#B6EFD6',
          300: '#7FDFC0',
          400: '#46C6A3',
          500: '#2AAB87',
          600: '#1D8A6D',
          700: '#196E58',
          800: '#175847',
          900: '#14493C',
        },
        lavender: {
          50: '#F7F6FD',
          100: '#EFEBFB',
          200: '#DDD4F8',
          300: '#C2B1F2',
          400: '#A48AE9',
          500: '#8965DF',
          600: '#7547D1',
          700: '#6437BB',
          800: '#522E9B',
          900: '#44277E',
        },
        peach: {
          50: '#FFF7F2',
          100: '#FFEBE1',
          200: '#FFD7C5',
          300: '#FFB89C',
          400: '#FF8D69',
          500: '#F8673E',
          600: '#E84A22',
          700: '#C23719',
          800: '#9B2E18',
          900: '#7E2A19',
        },
        safeBg: '#F8F9FA',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.9' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.25s ease-out',
      }
    },
  },
  plugins: [],
}
