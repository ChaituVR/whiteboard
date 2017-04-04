`use strict`;
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const livereload = require('gulp-livereload');
const webpack = require('webpack');

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
        gulp.src(['server.js']).pipe(webpack( require('./webpack.config.js'))).pipe(livereload()).pipe(notify({
            message: 'Reloading Please wait!!',
            onLast: true,
            wait: true
        }));
    });
    require('opn')('http://127.0.1.1:8080');
});
