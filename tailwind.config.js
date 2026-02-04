/** @type {import('tailwindcss').Config} */
module.exports = {
    // Use class strategy so theme toggling works by adding/removing a `dark` class on <html>
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'flipkart-blue': '#2874f0',
                'flipkart-yellow': '#ff9f00',
            },
        },
    },
    plugins: [],
}
