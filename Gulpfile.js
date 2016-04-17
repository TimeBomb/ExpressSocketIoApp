/*jslint node: true */
'use strict';

require("babel-register");
var gulp = require('gulp');

var tasks = {};

tasks.start = function() {
	require('./src/start.js')();
};

tasks.default = tasks.start;

// Register tasks with gulp
Object.keys(tasks).forEach(function(taskName) {
	var taskFunction = tasks[taskName];
	gulp.task(taskName, taskFunction);
});

module.exports = tasks;