// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
var gulp        = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
var browserSync = require('browser-sync').create();



// File paths
const files = {
    scssPath: 'assets/scss/**/*.scss',
    jQuery: 'node_modules/jquery/dist/jquery.min.js',
    bootstrap: 'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    aos: 'node_modules/aos/dist/aos.js',
    splide: 'node_modules/@splidejs/splide/dist/js/splide.min.js',
    slickSlider: 'node_modules/slick-carousel/slick/slick.min.js',
    jsPath: 'assets/js/**/*.js',
    fancybox: 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js'
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('./dist/css/')
    ); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return src([
        files.jQuery,
        files.bootstrap,
        files.slickSlider,
        files.aos,
        files.fancybox,
        files.splide,
        files.jsPath,
        ])
        .pipe(concat('stkit-bundle.js'))
        .pipe(uglify())
        .pipe(dest('dist/js')
    );
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
    browserSync.init({
        server: "./"
    });

    watch([files.scssPath, files.jsPath],
        //{interval: 1000, usePolling: true}, //Makes docker work
        series(
            parallel(scssTask, jsTask),
        )
    );

    gulp.watch("./*.html").on('change', browserSync.reload);
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask),
    watchTask
);