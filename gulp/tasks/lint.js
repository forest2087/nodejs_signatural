'use strict';

var Task = {};

Task.name = __filename.split('/').pop().slice(0, -3).replace(/(\.)/g, ':');


Task.run = function (gulp) {
    var jshint = require("gulp-jshint"),
        map = require("map-stream");

    return gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
};

Task.declare = function(gulp) {
    gulp.task(Task.name, function(){
        return Task.run(gulp);
    });
};

module.exports = Task;
