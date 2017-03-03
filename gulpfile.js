var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

// Task

gulp.task('default', function() {

    // listen for changes
    livereload.listen();
    // configure nodemon
    nodemon({
        // the script to runa the app
        script: 'server.js',
        ext: 'js css html' // for all Js css and html file changes
    }).on('restart', function() {
        // when the app has restarted, run livereload.
        gulp.src(['server.js']).pipe(livereload()).pipe(notify({message: 'Reloading Please wait!!', onLast: true,wait:true}));
    })
    require('opn')('http://127.0.1.1:3000');
})
