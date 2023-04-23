/** @type {import('tailwindcss').Config} */

// const colors = require('tailwindcss/colors')
import colors from 'tailwindcss/colors'


module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './comps/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'grey-dark': '#282e3b',
        'grey-light': '#c9c9c9',
        'grey-superlight': '#f5f5f5',
        'pink': '#FF2A4F',
        'purple': '#793CEA',
        'purple-dark': '#462388',
        'error': colors.red,
        'success': colors.green,
      },
      skew: {
        '45': '45deg',
      },
      height: {
        '85': '85%'
      },
      top: {
        '15': '15%',
      }
    },
  },
  plugins: [],
}
