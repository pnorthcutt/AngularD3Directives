var gulp = require('gulp');
var angularProtractor = require('gulp-angular-protractor');
//Protractor Task
// Setting up the test task 
gulp.task('protractor', function(callback) {
    gulp
        .src(['protractor/protractor.js'])
        .pipe(angularProtractor({
            'configFile': 'config.js',
            'debug': false,
            'autoStartStopServer': true
        }))
        .on('error', function(e) {
            console.log(e);
        })
        .on('end', callback);
});