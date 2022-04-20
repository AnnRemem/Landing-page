const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const gulpStylelint = require('gulp-stylelint');

function style () {
    return src('./css/**/*.scss')
        .pipe(gulpStylelint({
            reporters: [
                {
                    formatter: 'string', 
                    console: true
                }
            ]
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./css'))
        .pipe(browserSync.stream());
}

function lintCss () {
    return gulp.src('./css/**/*.scss')
        .pipe(gulpStylelint({
			fix: true,
            reporters: [
                {
                    formatter: 'string', 
                    console: true
                }
            ]
        }))
}

function watch () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./css/**/*.scss', style)
    gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.lintCss = lintCss;
exports.watch = watch;
