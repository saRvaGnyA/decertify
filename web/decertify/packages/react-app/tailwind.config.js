/** @type {import('tailwindcss').Config} */

module.exports = {
    darkmode: 'class',
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                /** primary */
                "prosperity": "#FCFF52",
                "forest": "#476520",
                /** base */
                "gypsum": "#FCF6F1",
                "sand": "#E7E3D4",
                "wood": "#655947",
                "fig": "#1E002B",
                /** functional */
                "snow": "#FFFFFF",
                "onyx": "#CCCCCC",
                "success": "#329F3B",
                "error": "#E70532",
                "disabled": "#9B9B9B",
                /** accent */
                "sky": "#7CC0FF",
                "citrus": "#FF9A51",
                "lotus": "#FFA3EB",
                "lavender": "#B490FF"
            },
            'animation': {
                'text': 'text 5s ease infinite',
            },
            'keyframes': {
                'text': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                },
            }
        },
    },
    plugins: [
        require('flowbite/plugin'),
    ],
    output: {
        scriptType: 'text/javascript'
    },
}