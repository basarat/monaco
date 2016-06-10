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
var lineFixes = [
    {
        fileName: '../src/vs/editor/browser/standalone/standaloneEditor.ts',
        orig: "export function createMonacoEditorAPI(): typeof monaco.editor {",
        new: "export function createMonacoEditorAPI() {"
    },
    {
        fileName: '../src/vs/editor/common/standalone/standaloneBase.ts',
        orig: "export function createMonacoBaseAPI(): typeof monaco {",
        new: "export function createMonacoBaseAPI() {"
    },
];
for (var _i = 0, lineFixes_1 = lineFixes; _i < lineFixes_1.length; _i++) {
    var fix = lineFixes_1[_i];
    writeFile(fix.fileName, readFile(fix.fileName).replace(fix.orig, fix.new));
}
