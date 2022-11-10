/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },
      backgroundImage: {
        app: 'url(/background.png)'
      },
      colors: {
        gray: {
          100: '#e1e1e6',
          300: '#8d8d99',
          600: '#323238',
          800: '#202024',
          900: '#121214'
        },
        ignite: {
          500: '#129E57'
        },
        yellow: {
          500: '#F7DD43',
          700: '#e5cd3d'
        }
      }
    },

  },
  plugins: [],
};
