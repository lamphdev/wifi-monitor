const colors = require('tailwindcss/colors');
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      primary: '#0284c7',
      success: '#16a34a',
      danger: '#f43f5e',
      warning: '#d97706',
      secondary: '#64748b',
      ...colors
    },
    extend: {},
  },
  plugins: [],
}