//gulp
const gulp = require('gulp')
//replace file paths in html
const htmlreplace = require('gulp-html-replace');
//minify html
const htmlmin = require('gulp-htmlmin');
//convert sass to css
var sass = require('gulp-sass');
//PostCSS gulp plugin to pipe CSS through several plugins, but parse CSS only once.
var postcss = require('gulp-postcss');
//autoprefixer
var autoprefixer = require('gulp-autoprefixer');
//optimize css
var cssnano = require('cssnano');
//combine js files

//minify js files

//live reload
const browserSync = require('browser-sync').create();

function html() {
    return gulp.src('./app/index.html')
        //replace file paths in html
        .pipe(htmlreplace({
            'css': 'style.min.css',
            'js': 'script.min.js'
        }))
        //minify html
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))
    // .pipe(browserSync.stream());
}
function style() {
    return gulp.src('./app/scss/style.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        //parse CSS once
        //autoprefixer
        //optimization
        .pipe(postcss(autoprefixer({ browsers: ['last 1 version'] }), cssnano()))
        .pipe(gulp.dest('./app/css/'))
}
function script() {
    pass
}
function watch() {
    browserSync.init({
        server: {
            baseDir: "./app",
            index: "index.html"
        }
    });
    gulp.watch('app/*.html', html);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
}
exports.html = html;
exports.html = html;
exports.watch = watch;