const gulp = require('gulp');
// Requires the gulp-sass plugin
const htmlmin = require('gulp-htmlmin');
const htmlreplace = require('gulp-html-replace');
var sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function htmlMinify() {
    return gulp.src('app/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
}
// with PHP
// function htmlMinify() {
//     return gulp.src(['./app/*.html', './app/*.php'])
//         .pipe(htmlmin({
//             collapseWhitespace: true,
//             ignoreCustomFragments: [/<%[\s\S]*?%>/, /<\?[=|php]?[\s\S]*?\?>/]
//         }))
//         .pipe(gulp.dest('dist'))
//         .pipe(browserSync.stream())
// }
function htmlReplace() {
    return gulp.src('./app/index.html')
        .pipe(htmlreplace({
            'css': 'style.min.css',
            'js': 'script.min.js'
        }))
        .pipe(gulp.dest('./dist/css'))
}
function sass() {
    return gulp.src('./app/scss/style.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('./app/css/'))
        .pipe(browserSync.stream())
}

function js() {
    return gulp.src('./app/js/*.js', { sourcemaps: true })
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/js', { sourcemaps: true }))
        .pipe(browserSync.stream())
}
function watch() {
    browserSync.init({
        server: {
            baseDir: "./app",
            index: "/index.html"
        }
    });
    gulp.watch('app/js/*.js', js);
    gulp.watch('app/*.html', minifyHTML);
    gulp.watch('app/scss/**/*.scss', sass);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
}
exports.htmlreplace = htmlReplace;
exports.htmlMinify = htmlMinify;
exports.sass = sass;
exports.js = js;
exports.watch = watch;