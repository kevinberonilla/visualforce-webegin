var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minify = require('gulp-minify'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'));
});

gulp.task('minify-js', function() {
    gulp.src('js/**/*.js')
        .pipe(minify({
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js', '.min.js', 'gulpfile.js']
        }));
});

gulp.task('minify-css', function() {
    gulp.src('css/**/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}));
});

gulp.task('prefix', function() {
    return gulp.src('css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 5 versions', '> 5%', 'ie 9'],
            cascade: false
        }));
});
 
gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('css/**/*.css', ['prefix']);
    gulp.watch('css/**/*.css', ['minify-css']);
    gulp.watch('js/**/*.js', ['minify-js']);
});

gulp.task('default', ['sass', 'prefix', 'minify-css', 'minify-js', 'watch']);