"use strict";
var utils_1 = require("./utils");
var utils = require("./utils");
var lineFixes = [
    {
        fileName: './src/vs/editor/browser/standalone/standaloneEditor.ts',
        orig: "export function createMonacoEditorAPI(): typeof monaco.editor {",
        new: "export function createMonacoEditorAPI() {"
    },
    {
        fileName: './src/vs/editor/common/standalone/standaloneBase.ts',
        orig: "export function createMonacoBaseAPI(): typeof monaco {",
        new: "export function createMonacoBaseAPI() {"
    },
    {
        fileName: './src/vs/editor/browser/standalone/standaloneLanguages.ts',
        orig: "export function createMonacoLanguagesAPI(): typeof monaco.languages {",
        new: "export function createMonacoLanguagesAPI() {"
    },
    {
        fileName: './src/vs/editor/common/services/editorSimpleWorker.ts',
        orig: "function createMonacoWorkerAPI(): typeof monaco.worker {",
        new: "function createMonacoWorkerAPI() {"
    },
];
for (var _i = 0, lineFixes_1 = lineFixes; _i < lineFixes_1.length; _i++) {
    var fix = lineFixes_1[_i];
    utils_1.writeFile(fix.fileName, utils_1.readFile(fix.fileName).replace(fix.orig, fix.new));
}
var path = require('path');
var srcDir = path.resolve(__dirname + '/../src');
var allFiles = utils_1.getAllFilesInFolder(srcDir);
var allFolders = allFiles.filter(function (x) { return utils.isDir(x); });
allFolders
    .filter(function (x) {
    return x.endsWith('node')
        || x.endsWith('selectionClipboard');
})
    .forEach(utils.remove);
allFiles.filter(function (x) {
    return x.endsWith('.test.ts')
        || x.endsWith('TMState.ts')
        || x.endsWith('commandTestUtils.ts')
        || x.endsWith('editableTextModelTestUtils.ts')
        || x.endsWith('modesUtil.ts')
        || x.endsWith('nativeExtensionService.ts')
        || x.endsWith('wireProtocol.ts')
        || x.endsWith('ipcRemoteCom.ts')
        || x.endsWith('package.ts')
        || x.endsWith('product.ts');
}).forEach(utils.remove);
