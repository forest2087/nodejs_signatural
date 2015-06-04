'use strict';

var Task = {};

Task.name = __filename.split('/').pop().slice(0, -3).replace(/(\.)/g, ':');

Task.run = function (gulp) {
    var gls = require("gulp-live-server");

    var server = gls.static("build", 3000);
    server.start();
};

Task.declare = function (gulp) {
    gulp.task(Task.name, ["serve:public", "serve:signatural"], function () {
        return Task.run(gulp);
    });
};

module.exports = Task;
