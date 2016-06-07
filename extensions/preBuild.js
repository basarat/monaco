"use strict";
var fs = require('fs');
var EOL = require('os').EOL;
function readFile(filePath) {
    return fs.readFileSync(__dirname + '/' + filePath, 'utf8');
}
exports.readFile = readFile;
function writeFile(filePath, content) {
    fs.writeFileSync(__dirname + '/' + filePath, content);
}
exports.writeFile = writeFile;
var lineFixes = [{
        fileName: '../vscode/gulpfile.js',
        orig: "var declaration = !!process.env['VSCODE_BUILD_DECLARATION_FILES']",
        new: "var declaration = true;"
    }];
for (var _i = 0, lineFixes_1 = lineFixes; _i < lineFixes_1.length; _i++) {
    var fix = lineFixes_1[_i];
    writeFile(fix.fileName, readFile(fix.fileName).replace(fix.orig, fix.new));
}
var nodeGypPackagesWeDontWant = [
    "vscode-textmate",
    "preinstall"
];
var packageJsonPath = "../vscode/package.json";
nodeGypPackagesWeDontWant.forEach(function (packageName) {
    writeFile(packageJsonPath, readFile(packageJsonPath).split('\n').filter(function (x) { return !x.includes(packageName); }).join('\n'));
});
