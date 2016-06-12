/**
 * Make modifications to source pre build
 */
/** imports */
import {readFile, writeFile, getAllFilesInFolder, copy} from "./utils";
import * as utils from "./utils";
/**
 * Any line changes
 */
var lineFixes = [
    /** Instead of `monaco` we let the type inference flow */
    {
        fileName: './src/vs/editor/browser/standalone/standaloneEditor.ts',
        orig: `export function createMonacoEditorAPI(): typeof monaco.editor {`,
        new: `export function createMonacoEditorAPI() {`
    },
    {
        fileName: './src/vs/editor/common/standalone/standaloneBase.ts',
        orig: `export function createMonacoBaseAPI(): typeof monaco {`,
        new: `export function createMonacoBaseAPI() {`
    },
    {
        fileName: './src/vs/editor/browser/standalone/standaloneLanguages.ts',
        orig: `export function createMonacoLanguagesAPI(): typeof monaco.languages {`,
        new: `export function createMonacoLanguagesAPI() {`
    },
    {
        fileName: './src/vs/editor/common/services/editorSimpleWorker.ts',
        orig: `function createMonacoWorkerAPI(): typeof monaco.worker {`,
        new: `function createMonacoWorkerAPI() {`
    },
];

for (let fix of lineFixes) {
    writeFile(fix.fileName, readFile(fix.fileName).replace(fix.orig, fix.new));
}

/**
 * Delete folders that are `node`
 */
const path = require('path');
/** The src dir */
const srcDir = path.resolve(__dirname + '/../src');
const allFiles = getAllFilesInFolder(srcDir);
const allFolders = allFiles.filter(x => utils.isDir(x));

const nodeFolders = allFolders.filter(x=>x.endsWith('node'));
// console.log(nodeFolders)
