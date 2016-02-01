var gulp = require('gulp');
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');

gulp.task('clean', function () {
    gulp.src('dist', { read: false })
    .pipe(rimraf());
});

gulp.task('csslint', function() {
    gulp.src('css/*.css')
    .pipe(csslint({'shorthand' : false}))
    .pipe(csslint.reporter());
}); 

gulp.task('jshint', function() {
    gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('cssnano', function() {
    gulp.src('css/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade:true, 
        remove:true 
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
    gulp.src('js/*.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['csslint', 'jshint', 'uglify', 'cssnano']);

