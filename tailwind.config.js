/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./public/**/*.html",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
        'vueGreen': '#42d392',
        'vueBlue': '#647eff',
        'background': '#415DA2',
        'silver': '#C0C0C0', // silver
        'button': '#3399FF', //vibrant blue
        'teal': '#008080',
        'middlegreen': '#4cb8b4'
      }
    },
  },
  plugins: [
    require("tw-elements/dist/plugin")
  ],
  darkMode: "class",
}
