/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
      },
      colors: {
        primary: '#0033A0',
        primaryHover: '#002080',
        grayText: '#4B5563',
        grayUI: '#A7A9AC',
        background: '#f9fafb',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
