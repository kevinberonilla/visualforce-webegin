var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    save = require('gulp-save'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'))
        .pipe(autoprefixer({
            browsers: ['last 5 versions', '> 5%', 'ie 9'],
            cascade: false
        }))
        .pipe(save('before-sourcemaps')) // Cache file
        .pipe(sourcemaps.write('css'))
        .pipe(rename({ extname: '.css.map' }))
        .pipe(save.restore('before-sourcemaps')) // Restore cached file
        .pipe(gulp.dest('css'));
});

gulp.task('minify-css', function() {
    return gulp.src(['css/**/*.css', '!css/**/*.min.css'])
        .pipe(save('before-minify-css')) // Cache file
        .pipe(minifyCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(save.restore('before-minify-css')) // Restore cached file
        .pipe(gulp.dest('css'));
});

gulp.task('uglify', function() {
    return gulp.src(['js/**/*.js', '!js/**/*.min.js'])
        .pipe(save('before-uglify')) // Cache file
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(save.restore('before-uglify')) // Restore cached file
        .pipe(gulp.dest('js'));
});

gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('css/**/*.css', ['minify-css']);
    gulp.watch('js/**/*.js', ['uglify']);
});

gulp.task('default', ['sass', 'minify-css', 'uglify', 'watch']);