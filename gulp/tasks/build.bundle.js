'use strict';

var Task = {};

Task.name = __filename.split('/').pop().slice(0, -3).replace(/(\.)/g, ':');

Task.run = function (gulp) {
    var concat = require("gulp-concat"),
        rename = require("gulp-rename"),
        uglify = require("gulp-uglify");

    return gulp.src([
        'src/Signatural.js',
        'src/MouseEvents.js',
        'src/TouchEvents.js',
        'src/Drawing.js',
        'src/Point.js',
        'src/Bezier.js'
    ])
        .pipe(concat('signatural.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename("signatural.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'))
};

Task.declare = function (gulp) {
    gulp.task(Task.name, function () {
        return Task.run(gulp);
    });
};

module.exports = Task;
