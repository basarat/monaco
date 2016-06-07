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
function stringify(object, eol) {
    if (eol === void 0) { eol = '\n'; }
    var cache = [];
    var value = JSON.stringify(object, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return;
            }
            cache.push(value);
        }
        return value;
    }, 2);
    value = value.split('\n').join(eol) + eol;
    cache = null;
    return value;
}
exports.stringify = stringify;
var lineFixes = [{
        fileName: '../vscode/gulpfile.js',
        orig: "var declaration = !!process.env['VSCODE_BUILD_DECLARATION_FILES']",
        new: "var declaration = true;"
    }, {
        fileName: '../vscode/build/lib/nls.js',
        orig: "if (!f.sourceMap) {",
        new: "if (!f.sourceMap) { return;"
    }];
for (var _i = 0, lineFixes_1 = lineFixes; _i < lineFixes_1.length; _i++) {
    var fix = lineFixes_1[_i];
    writeFile(fix.fileName, readFile(fix.fileName).replace(fix.orig, fix.new));
}
var nodeGypPackagesWeDontWant = [
    "vscode-textmate",
    "native-keymap",
    "preinstall"
];
var packageJsonPath = "../vscode/package.json";
nodeGypPackagesWeDontWant.forEach(function (packageName) {
    writeFile(packageJsonPath, readFile(packageJsonPath).split('\n').filter(function (x) { return !x.includes(packageName); }).join('\n'));
});
var packJsonContents = JSON.parse(readFile(packageJsonPath));
delete packJsonContents.config;
delete packJsonContents.devDependencies.ghooks;
writeFile(packageJsonPath, stringify(packJsonContents));
