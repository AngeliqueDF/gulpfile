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
var reload = browserSync.reload;

const paths = {
    html: {
        index: './src/*.html',
        dest: './dist/'
    },
    css: {
        src: './src/scss/style.scss',
        allscss: './src/scss/**/*.scss',
        dest: './dist/css/'
    },
    js: {
        src: './src/js/*.js',
        alljs: 'src/js/**/*.js',
        dest: './dist/js/'
    },
    php: {
        index: 'index.php',
        appFiles: './**/*.php'
    }
}

function html() {
    return gulp.src(paths.html.index)
        //replace file paths in html
        .pipe(htmlreplace({
            'css': './css/style.min.css',
            'js': './js/script.min.js'
        },
            {
                keepBlockTags: false,
            }
        ))
        //minify html
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}
function css() {
    var plugins = [
        //config in .browserslistrc
        autoprefixer(),
        cssnano()
    ];

    return gulp.src(paths.css.src)
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browserSync.stream());
}
function js() {
    //minify
    return gulp.src('./src/js/script.js')
        .pipe(terser())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.stream())
}
function watch() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        }
    });
    browserSync.reload()
    gulp.watch(paths.html.index, html);
    gulp.watch(paths.html.index).on('change', reload);
    gulp.watch(paths.css.allscss, css);
    gulp.watch(paths.css.allscss).on('change', reload);
    gulp.watch(paths.js.alljs, js);
    gulp.watch(paths.js.alljs).on('change', reload);
}
exports.html = html;
exports.css = css;
exports.js = js;
exports.watch = watch;