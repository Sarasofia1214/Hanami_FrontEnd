/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hamani-red': '#C54537',   // color principal del card
        'hamani-dark': '#2b1f1c',  // color botón oscuro
        'hamani-bg': '#f2efed',    // fondo claro si lo usas
      },
 fontFamily: {
  hanalei: ['"Hanalei Fill"', 'cursive'],
  sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
  david: ['"David Libre"', 'serif'],
  dancing: ['"Dancing Script"', 'cursive'],
  alegreya: ['"Alegreya Sans"', 'sans-serif'],
},
    },
  },
  plugins: [],
}
