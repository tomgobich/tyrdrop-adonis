const mix = require('laravel-mix');
const path = require('path');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');

mix.js('resources/js/app.js', 'public/js/app.js').vue({
    version: 3,
    extractStyles: true,
    globalStyles: false
})
    .postCss('resources/css/app.css', 'public/css/app.css')
    .options({
        postCss: [
            autoprefixer(),
            tailwindcss('tailwind.config.js'),
            ...mix.inProduction() ? [
                purgecss({
                    content: ['./resources/views/**/*.edge', './resources/js/**/*.vue'],
                    defaultExtractor: content => content.match(/[\w-/:.]+(?<!:)/g) || [],
                    whitelistPatternsChildren: [/nprogress/],
                })
            ] : [],
        ],
    }).
    webpackConfig({
        output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },
        resolve: {
            alias: {
                '@': path.resolve('resources/js')
            }
        }
    })
    //.version()
    // .sourceMaps()
