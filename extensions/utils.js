"use strict";
var fs = require('fs-extra');
var path = require('path');
function copy(src, dest) {
    return fs.copy(src, dest);
}
exports.copy = copy;
function dir(filePath) {
    return path.dirname(filePath);
}
exports.dir = dir;
