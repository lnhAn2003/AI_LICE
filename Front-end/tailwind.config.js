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
        lightCream: '#FFF0D5',
        brightYellow: '#FFD54F',
        coralPink: '#FF8A65',
        redOrange: '#E64A19',
        lightGreen: '#8BC34A',
        skyBlue: '#81D4FA',
        header: '#1a1a2e',
        textWhite: '#FFFFFF',
        button: '#4e9fda',
        backgroundMain: '#f0f2f5',
        cardBackground: '#e0e4e9',
        link: '#4e9fda',
        shadowBorder: '#c0c0c0',
        prussianBlue: '#0b3d91',  
        offWhite: '#f8f1f1',      
        waveGray: '#7a869a',     
        waveHighlight: '#b5d3e7',
        waveBeige: '#f5e6ca',     
      },
    },
  },
  plugins: [],
};
