/**
 * Created by didia on 15-10-27.
 */

var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower', function() {
    return bower('app/bower_components').pipe(gulp.dest('app/lib'));
});

gulp.task('build', ['bower']);


