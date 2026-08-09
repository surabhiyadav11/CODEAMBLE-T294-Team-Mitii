/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF6F0',
        creamSoft: '#FBF4EE',
        creamLine: '#EFE3D8',
        forest: '#1E5128',
        forestSoft: '#2D7A3F',
        maroon: '#4A1521',
        amber: '#F59E0B',
        blush: '#FBE7DD',
        rose: '#D97779',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(12px, -18px, 0)' },
        },
        reveal: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        drift: 'drift 11s ease-in-out infinite',
        reveal: 'reveal 0.8s ease both',
      },
      boxShadow: {
        soft: '0 18px 60px rgba(74, 21, 33, 0.14)',
      },
    },
  },
  plugins: [],
};
