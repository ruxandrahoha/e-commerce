/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7f4',
          100: '#feeae3',
          200: '#fdd4c7',
          300: '#fab59e',
          400: '#f68b6b',
          500: '#ef6344',
          600: '#dc4626',
          700: '#af4f39',
          800: '#8b3d2e',
          900: '#713429',
          950: '#3d1a14',
        },
        accent: {
          DEFAULT: '#af4f39',
          50: '#fef7f4',
          100: '#feeae3',
          200: '#fdd4c7',
          300: '#fab59e',
          400: '#f68b6b',
          500: '#ef6344',
          600: '#dc4626',
          700: '#af4f39',
          800: '#8b3d2e',
          900: '#713429',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}