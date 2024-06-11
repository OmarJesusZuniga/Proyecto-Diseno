/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.js",
    "./src/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],  // Setting Poppins as the default sans-serif font
        mono: ['VT323', 'monospace']      // Setting VT323 as the default monospace font
      },
      colors: {
        'text': '#dce7f2',
        'background': '#050c14',
        'primary': '#7fb4ea',
        'secondary': '#0d559f',
        'accent': '#1e8dfd',
      }
    }
  }
}
