'use strict';

var Task = {};

Task.name = __filename.split('/').pop().slice(0, -3).replace(/(\.)/g, ':');

Task.run = function (gulp) {

    return gulp.src([
        'dist/signatural.min.js'
    ])
        .pipe(gulp.dest('./build/assets/js/'))
};

Task.declare = function (gulp) {
    gulp.task(Task.name, ["build"], function () {
        return Task.run(gulp);
    });
};

module.exports = Task;
