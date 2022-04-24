const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'grey-dark': '#282e3b',
        'grey-light': '#c9c9c9',
        'grey-superlight': '#f5f5f5',
        'pink': '#FF2A4F',
        'purple': '#793CEA',
        'error': colors.red,
        'success': colors.green,
      }
    },
  },
  plugins: [],
}
