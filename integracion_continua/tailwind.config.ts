import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Monomaniac One', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#87CEEB', // Azul cielo
        secondary: '#98FB98', // Verde menta
        accent: '#FFD700', // Amarillo soleado
        neutral: '#F5F5F5', // Gris claro
      },
    },
  },
} satisfies Config


