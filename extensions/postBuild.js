"use strict";
var utils_1 = require("./utils");
var path = require('path');
var srcDir = path.resolve(__dirname + '/../src');
var buildDir = path.resolve(__dirname + '/../build');
var allFiles = utils_1.getAllFilesInFolder(srcDir);
allFiles.filter(function (f) { return f.endsWith('.css'); }).forEach(function (src) {
    utils_1.copy(src, src.replace(srcDir, buildDir));
});
allFiles.filter(function (f) { return f.endsWith('.svg'); }).forEach(function (src) {
    utils_1.copy(src, src.replace(srcDir, buildDir));
});
allFiles.filter(function (f) { return f.endsWith('.js'); }).forEach(function (src) {
    utils_1.copy(src, src.replace(srcDir, buildDir));
});
