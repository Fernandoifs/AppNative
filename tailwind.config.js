/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './screens/**/*.{js,ts,tsx}',
    './navigation/**/*.{js,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#1a1a1a',
          text: '#ffffff',
          primary: '#3b82f6',
          card: '#2d2d2d',
          border: '#404040',
        },
      },
    },
  },
  plugins: [],
};
