'use strict';

let gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      maps = require('gulp-sourcemaps')

//concat js files
gulp.task('concatScripts', function(){
return  gulp.src([
    'js/circle/autogrow.js',
    'js/circle/circle.js',
    'js/global.js',
  ])
  .pipe(maps.init())
  .pipe(concat('all.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/scripts'));
});

//minify scripts
gulp.task('scripts', ['concatScripts'], function () {
  return gulp.src('dist/scripts/all.js')
  .pipe(uglify())
  .pipe(rename('all.min.js'))
  .pipe(gulp.dest('dist/scripts'));
});

//compile scss files
gulp.task('styles', function () {
  return gulp.src('sass/global.scss')
  .pipe(maps.init())
  .pipe(sass())
  // .pipe(uglify())
  .pipe(rename('all.min.css'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/styles'));
})


gulp.task('watchSass', function(){
  gulp.watch(['sass/**/*.scss'], ['styles'])
})

gulp.task('watchJs', function(){
  gulp.watch(['js/**/*.js'], ['scripts'])
})

gulp.task('build', ['scripts', 'styles'])
gulp.task('default', ['build'])
