const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    watchOptions: {
        ignored: /node_modules/,
    },
});

mix.ts("resources/ts/app.tsx", "public/js")
    .postCss("resources/css/app.css", "public/css", [])
    .browserSync({
        files: ["./resources/views/**/*", "./public/**/*"],
        proxy: {
            target: "web",
        },
        open: true,
        reloadOnRestart: true,
    })
    .version();
