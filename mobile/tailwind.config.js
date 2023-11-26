/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.tsx', './src/**/*.tsx'],

  theme: {
    fontFamily: {
      Lato: ['Lato'],
    },
    extend: {
      colors: {
        primary: '#9acd32',
        danger: {
          DEFAULT: '#DA2E2E',
          50: '#F6CACA',
          100: '#F3B9B9',
          200: '#EC9696',
          300: '#E67373',
          400: '#E05151',
          500: '#DA2E2E',
          600: '#B11F1F',
          700: '#811717',
          800: '#510E0E',
          900: '#220606',
        },
      },
    },
  },
  plugins: [],
};
