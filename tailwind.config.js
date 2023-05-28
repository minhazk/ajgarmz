/** @type {import('tailwindcss').Config} */

const defaultColours = require('tailwindcss/colors');

module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        colors: {
            ...defaultColours,
            text: '#0a0d0f',
            bg: '#ffffff',
            primary: '#464563',
            secondary: '#f2f0f5',
            accent: '#221b27',
        },
    },
    plugins: [],
};
