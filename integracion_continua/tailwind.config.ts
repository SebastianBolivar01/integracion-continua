import type { Config } from 'tailwindcss'

// Forzamos estrategia por clase para el modo oscuro
export default {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Monomaniac One', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
    colors: {
      primary: '#87CEEB', // Azul cielo
      secondary: '#98FB98', // Verde menta
      accent: '#FFD700', // Amarillo soleado
      neutral: '#F5F5F5', // Gris claro
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
  },
} satisfies Config



