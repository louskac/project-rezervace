module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
      extend: {
        fontFamily: {
          primary: ['Abril Fatface'],
          secondary: ['Poppins']
        }
      },
      colors: {
        'color-main': '#5700C3',
        'color-text': '#F2F2E6',
        'color-contrast': '#A9BA52',
        'color-dark': '#07020A',
      },
      backgroundImage: {
        'hero-pattern':
          "linear-gradient(to right bottom, rgba(255, 27, 107, 0.9), rgba(69, 202, 255, 0.9)), url('./assets/background.png')",
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }