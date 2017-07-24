var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');

gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions', '> 5%', 'ie 9'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'));
});

gulp.task('cssnano', function() {
    return gulp.src(['./css/**/*.css', '!./css/**/*.min.css'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano({ discardUnused: { fontFace: false } }))
        .pipe(gulp.dest('./css'));
});

gulp.task('uglify', function() {
    return gulp.src(['./js/**/*.js', '!./js/**/*.min.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', function() {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch(['./css/**/*.css', '!./css/**/*.min.css'], ['cssnano']);
    gulp.watch(['./js/**/*.js', '!./js/**/*.min.js'], ['uglify']);
});

gulp.task('default', function() {
    return runSequence('sass', ['cssnano', 'uglify', 'watch']);
});