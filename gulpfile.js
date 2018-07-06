'use strict';

/*---------- REQUIRE ----------*/
let gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      maps = require('gulp-sourcemaps'),
   miniCss = require('gulp-clean-css'),
     image = require('gulp-image'),
     clean = require('gulp-clean'),
 webserver = require('gulp-webserver');

//set options
let options = {
  src: 'src',
  dist: 'dist',
};

//concat and minify js files
gulp.task('scripts', function() {
  return  gulp.src([options.src + '/js/**/*.js'])
  .pipe(maps.init())
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(rename('all.min.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest(options.dist + '/scripts'));
});

//compile and minify scss files
gulp.task('styles', function () {
  return gulp.src(options.src + '/sass/global.scss')
  .pipe(maps.init())
  .pipe(sass())
  .pipe(miniCss())
  .pipe(rename('all.min.css'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest(options.dist + '/styles'))
});

//optimize images
gulp.task('images', function(){
  return gulp.src(options.src + '/images/**')
  .pipe(image())
  .pipe(maps.write('./'))
  .pipe(gulp.dest(options.dist + '/content'))
});

//remove all files/folders in dist folder
gulp.task('clean', function() {
  return gulp.src('dist/*')
  .pipe(clean());
});

//watch sass folder for any changes
gulp.task('watchSass', function() {
  gulp.watch([options.src + '/sass/**'], ['styles']);
});

//run clean, scripts, styles, and images tasks; move all files/folders (including index.html) into dist folder
gulp.task('build', ['clean','scripts', 'styles', 'images'], function (){
  gulp.src(options.src + '/index.html')
  .pipe(gulp.dest('dist'));
});

//run build task; run webserver on port 3000 and reload page if any changes are made
gulp.task('webserver', ['build'], function() {
  gulp.src('dist')
  .pipe(webserver({
    livereload: true,
    port: 3000,
  }));
});

//run webserver and watch for any changes in the sass folder
gulp.task('default', ['clean', 'watchSass'], function() {
  gulp.start('webserver');
});
