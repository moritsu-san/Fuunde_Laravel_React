const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: [
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],

    darkMode: false, // or 'media' or 'class'

    theme: {
        extend: {},
    },

    content: [
    ],

    variants: {
        extend: {},
    },

    plugins: [
        function({addComponents}) {
            addComponents({
              ".container": {
                maxWidth: "90%",
                "@screen sm": {
                  maxWidth: "500px",
                },
                "@screen md": {
                  maxWidth: "700px",
                },
                "@screen lg": {
                  maxWidth: "800x",
                },
                "@screen xl": {
                  maxWidth: "700px",
                },
                "@screen 2xl": {
                  maxWidth: "1000px",
                },
              }
            })
        },
    ],
};
