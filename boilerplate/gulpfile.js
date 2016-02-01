var gulp = require('gulp');
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');


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
    .pipe(cssnano())
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
    gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['csslint', 'jshint', 'uglify', 'cssnano']);

