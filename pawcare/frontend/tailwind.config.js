/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pc: {
          orange: '#ff7d3b',
          'orange-dark': '#e8601f',
          green: '#3f9142',
          beige: '#fdf6ee',
          charcoal: '#2b2620',
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
