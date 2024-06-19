/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#323437',
        secondary: '#646669',
        yellowAcent: '#E2B714',
        redAcent: '#BF4652',
        light: '#C8C7BC',
        dark: '#2C2E31'
      },
      fontFamily: {
        robotoMono: 'Roboto Mono',
        lexendDeca: 'Lexend Deca',
      },
      keyframes: {
        blinkLeftBorder: {
          '0%, 100%': {
            borderLeftColor: '#E2B714FF',
          },
          '50%': {
            borderLeftColor: '#E2B71400',
          }
        },
        blinkRightBorder: {
          '0%, 100%': {
            borderRightColor: '#E2B714FF',
          },
          '50%': {
            borderRightColor: '#E2B71400',
          }
        }
      },
      animation: {
        blinkLeftBorder: 'blinkLeftBorder 1s infinite ease',
        blinkRightBorder: 'blinkRightBorder 1s infinite ease',
      },
    },
  },
  plugins: [],
};
