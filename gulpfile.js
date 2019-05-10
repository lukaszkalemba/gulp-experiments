var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
let cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('serve', ['html', 'scss', 'js'], function() {
  browserSync.init({
    server: './dist'
  });

  gulp.watch('./src/scss/**/*.scss', ['scss']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/index.html', ['html']);
  gulp.watch('./dist/index.html').on('change', browserSync.reload);
});

gulp.task('html', function() {
  return gulp
    .src('./src/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('scss', function() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp
    .src('./src/**/*.js')
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['html', 'scss', 'js', 'serve']);
