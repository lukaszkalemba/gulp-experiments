var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
let cleanCSS = require('gulp-clean-css');

gulp.task('html', function() {
  return gulp.src('./src/index.html').pipe(gulp.dest('./dist'));
});
