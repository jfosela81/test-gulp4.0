'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

function buildStyles() {
  return gulp.src('./sass/style.scss')
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(concat('style.css'))
    .pipe(gulp.dest('./'));
};

exports.buildStyles = buildStyles;

function scripts() {
  return gulp.src('./assets/js/**/*.js', { sourcemaps: true })
    .pipe( babel() )
    .pipe( uglify() )
    .pipe( concat('main.min.js') )
    .pipe( gulp.dest('./') );
}

exports.scripts = scripts;

exports.watch = function () {
  gulp.watch( './sass/**/*.scss', gulp.series( 'buildStyles' ) );
	gulp.watch( './assests/**/*.js', scripts );
};