var gulp        = require('gulp');
// var browserSync = require('browser-sync').create();
// var sass        = require('gulp-sass');
// var sourcemaps = require('gulp-sourcemaps');

// gulp.task('sass', ()  => {
//     return gulp.src("./assets/scss/*.scss")
//     .pipe(sourcemaps.init())
//     .pipe(sass())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest("dist/"))
//     .pipe(browserSync.stream());
// });

// gulp.task('min-sass', () => {
//     return gulp.src("./assets/scss/theme1/*.scss")
//         .pipe(sourcemaps.init())
//         .pipe(sass())
//         .pipe(gulp.dest("dist/"))
//         .pipe(browserSync.stream());
// });

// gulp.task('template-sass', () => {
//     return gulp.src("./assets/scss/theme1/template-block/*.scss")
//         .pipe(sourcemaps.init())
//         .pipe(sass())
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest("dist/"))
//         .pipe(browserSync.stream());
// });

// gulp.task('start', gulp.series('sass', function() {

//     browserSync.init({
//         server: "./"
//     });

//     gulp.watch("./assets/scss/theme1/*.scss", gulp.series('min-sass'));
//     gulp.watch("./assets/scss/theme1/template-block/*.scss", gulp.series('template-sass'));
//     gulp.watch("./assets/scss/*.scss", gulp.series('sass'));
//     gulp.watch("./*.html").on('change', browserSync.reload);
// }));

// gulp.task('default', gulp.series('start'));


// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
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
    jsPath: 'assets/js/**/*.js'
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('./dist')
        // .pipe(browserSync.stream())
    ); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
// function jsTask(){
//     return src([
//         files.bootstrap,
//         files.swiper,
//         files.select,
//         files.owl,
//         files.lightbox,
//         // files.readmore,
//         files.jsPath
//         //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
//         ])
//         .pipe(concat('stkit-bundle.js'))
//         .pipe(uglify())
//         .pipe(dest('assets/dist/js')
//     );
// }

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){

    browserSync.init({
        server: "./"
    });


    // gulp.watch("assets/scss/**/*.scss").on('change', browserSync.reload);

    watch([files.scssPath],
        //{interval: 1000, usePolling: true}, //Makes docker work
        series(
            parallel(scssTask),
        )
    );

    gulp.watch("./*.html").on('change', browserSync.reload);
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask),
    watchTask
);