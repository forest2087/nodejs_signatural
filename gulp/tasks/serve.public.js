'use strict';

var Task = {};

Task.name = __filename.split('/').pop().slice(0, -3).replace(/(\.)/g, ':');

Task.run = function (gulp) {

    return gulp.src([
        'src/public/**/*'
    ])
        .pipe(gulp.dest('./build'))
};

Task.declare = function (gulp) {
    gulp.task(Task.name, function () {
        return Task.run(gulp);
    });
};

module.exports = Task;
