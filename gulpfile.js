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
var autoprefixer = require('autoprefixer');
//optimize css
var cssnano = require('cssnano');
//rename files, add .min
var rename = require('gulp-rename');
//minify js files, es6 compatible
var terser = require('gulp-terser');
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
    var plugins = [
        autoprefixer(),
        cssnano()
    ];

    return gulp.src('./app/scss/style.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('./app/css/'))
        //parse CSS once
        //autoprefixer
        //optimization
        .pipe(postcss(plugins))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css/'))
}
function scripts() {
    //minify
    return gulp.src('./app/js/script.js')
        .pipe(terser())
        .pipe(rename({
            //rename
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js'))
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
    gulp.watch('app/scss/**/*.scss', style);
    gulp.watch('app/scss/**/*.scss').on('change', browserSync.reload);
    gulp.watch('app/js/**/*.js', scripts);
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
}
exports.html = html;
exports.style = style;
exports.scripts = scripts;
exports.watch = watch;