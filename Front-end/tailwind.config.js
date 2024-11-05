/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        header: '#1a1a2e',        // Dark Blue for Header and Navbar
        textWhite: '#FFFFFF',     // White text
        button: '#4e9fda',        // Light Blue for Buttons
        backgroundMain: '#f0f2f5', // Very Light Gray for Main Background
        cardBackground: '#e0e4e9', // Slightly Darker Gray for Cards
        link: '#4e9fda',          // Light Blue for Links
        shadowBorder: '#c0c0c0',  // Gray for Shadows and Borders
      },
    },
  },
  plugins: [],
}
