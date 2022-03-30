module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      // Adjusted to match the breakpoints of element-plus
      'sm': '640px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1536px',
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('active-class', '&.active')
    },
  ],
}
