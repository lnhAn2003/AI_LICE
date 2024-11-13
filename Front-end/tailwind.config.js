/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',  
    './pages/**/*.{js,ts,jsx,tsx}', 
    './src/**/*.{js,ts,jsx,tsx}',  
  ],
  theme: {
    extend: {
      colors: {
        header: '#1a1a2e',
        textWhite: '#FFFFFF',
        button: '#4e9fda',
        backgroundMain: '#f0f2f5',
        cardBackground: '#e0e4e9',
        link: '#4e9fda',
        shadowBorder: '#c0c0c0',
      },
    },
  },
  plugins: [],
};
