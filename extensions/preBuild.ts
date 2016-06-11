/**
 * Make modifications to source pre build
 */

// Utilities
var fs = require('fs');
var EOL: string = require('os').EOL;
export function readFile(filePath: string): string {
    return fs.readFileSync(__dirname + '/' + filePath, 'utf8');
}
export function writeFile(filePath: string, content: string) {
    fs.writeFileSync(__dirname + '/' + filePath, content);
}
export function stringify(object: Object, eol: string = '\n'): string {
    var cache = [];
    var value = JSON.stringify(object,
        // fixup circular reference
        function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        },
        // indent 2 spaces
        2);
    value = value.split('\n').join(eol) + eol;
    cache = null;
    return value;
}

/**
 * Any line changes
 */
var lineFixes = [
    /** Instead of `monaco` we let the type inference flow */
    {
      fileName: '../src/vs/editor/browser/standalone/standaloneEditor.ts',
      orig: `export function createMonacoEditorAPI(): typeof monaco.editor {`,
      new: `export function createMonacoEditorAPI() {`
    },
    {
      fileName: '../src/vs/editor/common/standalone/standaloneBase.ts',
      orig: `export function createMonacoBaseAPI(): typeof monaco {`,
      new: `export function createMonacoBaseAPI() {`
    },
    {
      fileName: '../src/vs/editor/browser/standalone/standaloneLanguages.ts',
      orig: `export function createMonacoLanguagesAPI(): typeof monaco.languages {`,
      new: `export function createMonacoLanguagesAPI() {`
    },
    {
      fileName: '../src/vs/editor/common/services/editorSimpleWorker.ts',
      orig: `function createMonacoWorkerAPI(): typeof monaco.worker {`,
      new: `function createMonacoWorkerAPI() {`
    },
];

for (let fix of lineFixes) {
    writeFile(fix.fileName, readFile(fix.fileName).replace(fix.orig, fix.new));
}
//
// /**
//  * Package.json cleanups
//  */
// declare global {
//     interface String {
//         includes(str: string): boolean;
//     }
// }
// const nodeGypPackagesWeDontWant = [
//     "vscode-textmate",
//     "native-keymap",
//     "preinstall" // Don't want preinstall (its there to protect us from using `npm install` vs. `atom's npm install`. We are fine with npm)
// ]
// const packageJsonPath = "../vscode/package.json";
// nodeGypPackagesWeDontWant.forEach(packageName => {
//     writeFile(packageJsonPath, readFile(packageJsonPath).split('\n').filter(x => !x.includes(packageName)).join('\n'));
// })
// /** We also don't want their ghooks to get triggered */
// const packJsonContents = JSON.parse(readFile(packageJsonPath));
// delete packJsonContents.config;
// delete packJsonContents.devDependencies.ghooks;
// writeFile(packageJsonPath, stringify(packJsonContents));
//
// /**
//  * Extend the monaco API to expose more stuff
//  */
// const recipeFile = "../vscode/build/monaco/monaco.d.ts.recipe";
// const recipeAdditions = `
// declare module monaco.editor {
//
// #include(vs/editor/common/services/editorWorkerServiceImpl): EditorWorkerClient
//
// }
// `;
// writeFile(recipeFile, readFile(recipeFile) + recipeAdditions);
