const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./ui/*.{js,jsx,ts,tsx}",
        "./components/*.{js,jsx,ts,tsx}",
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./pages/*.{js,jsx,ts,tsx}",
        "./public/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.green,
            },
            spacing: {
                '0.75': '3px'
            }
        },
    },
    plugins: [],
}
