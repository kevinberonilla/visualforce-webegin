var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

gulp.task('compile:sass', () => {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        })
        .on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'ie 10'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'));
});

gulp.task('minify:css', () => {
    return gulp.src(['./css/**/*.css', '!./css/**/*.min.css'])
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano({
            discardUnused: {
                fontFace: false
            }
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('minify:js', () => {
    return gulp.src(['./js/**/*.js', '!./js/**/*.min.js'])
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('init:watch', () => {
    gulp.watch('./scss/**/*.scss', ['compile:sass']);
    gulp.watch(['./css/**/*.css', '!./css/**/*.min.css'], ['minify:css']);
    gulp.watch(['./js/**/*.js', '!./js/**/*.min.js'], ['minify:js']);
});

gulp.task('default', () => {
    return runSequence('compile:sass', ['minify:css', 'minify:js', 'init:watch']);
});