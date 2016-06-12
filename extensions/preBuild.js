"use strict";
var utils_1 = require("./utils");
var nodeGypPackagesWeDontWant = [
    "vscode-textmate",
    "native-keymap",
    "preinstall"
];
var packageJsonPath = "./vscode/package.json";
nodeGypPackagesWeDontWant.forEach(function (packageName) {
    utils_1.writeFile(packageJsonPath, utils_1.readFile(packageJsonPath).split('\n').filter(function (x) { return !x.includes(packageName); }).join('\n'));
});
var packJsonContents = JSON.parse(utils_1.readFile(packageJsonPath));
delete packJsonContents.config;
delete packJsonContents.devDependencies.ghooks;
utils_1.writeFile(packageJsonPath, utils_1.stringify(packJsonContents));
var lineFixes = [{
        fileName: '../vscode/gulpfile.js',
        orig: "if (isWatch) {",
        new: "if (true) {"
    }];
for (var _i = 0, lineFixes_1 = lineFixes; _i < lineFixes_1.length; _i++) {
    var fix = lineFixes_1[_i];
    utils_1.writeFile(fix.fileName, utils_1.readFile(fix.fileName).replace(fix.orig, fix.new));
}
var recipeFile = "./vscode/build/monaco/monaco.d.ts.recipe";
var recipeAdditions = "\n";
utils_1.writeFile(recipeFile, utils_1.readFile(recipeFile) + recipeAdditions);
