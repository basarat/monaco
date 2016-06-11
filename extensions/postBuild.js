"use strict";
var utils = require("./utils");
var path = require('path');
var srcDir = path.resolve(__dirname + '/../src');
var buildDir = path.resolve(__dirname + '/../build');
var allFiles = require('glob').sync('./**/*', { cwd: srcDir }).map(function (p) { return path.resolve(srcDir, p); });
allFiles.filter(function (f) { return f.endsWith('.css'); }).forEach(function (src) {
    utils.copy(src, src.replace(srcDir, buildDir));
});
allFiles.filter(function (f) { return f.endsWith('.svg'); }).forEach(function (src) {
    utils.copy(src, src.replace(srcDir, buildDir));
});
