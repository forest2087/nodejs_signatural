'use strict';

var Task = {};

Task.name = __filename.split('/').pop().slice(0, -3).replace(/(\.)/g, ':');

Task.declare = function(gulp) {
    gulp.task(Task.name, ["lint", "build:bundle"]);
};

module.exports = Task;
