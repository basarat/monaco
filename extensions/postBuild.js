"use strict";
var utils = require("./utils");
var srcDir = require('path').resolve(__dirname + '/../src');
var buildDir = require('path').resolve(__dirname + '/../build');
var allFiles = require('glob').sync('./**/*', { cwd: srcDir });
allFiles.filter(function (f) { return f.endsWith('.css'); }).forEach(function (srcCss) {
    utils.copy(srcCss, srcCss.replace(srcDir, buildDir));
});
