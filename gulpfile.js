"use strict";

var gulp = require("gulp");
var taskListing = require("gulp-task-listing");

gulp.task("default", taskListing.withFilters(null, 'default'));

require("./gulp")(gulp);
