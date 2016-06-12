/**
 * Make modifications to source pre build
 */
/** imports */
import {readFile, writeFile, getAllFilesInFolder, copy, stringify} from "./utils";
import * as utils from "./utils";

/**
 * Package.json cleanups
 */
const packagesWeDontWant = [
    // node-gyp
    "pty.js",
    "vscode-textmate",
    "native-keymap",
    "windows-mutex",
    "preinstall", // Don't want preinstall (its there to protect us from using `npm install` vs. `atom's npm install`. We are fine with npm)
]
const packageJsonPath = "./vscode/package.json";
packagesWeDontWant.forEach(packageName => {
    writeFile(packageJsonPath, readFile(packageJsonPath).split('\n').filter(x => !x.includes(packageName)).join('\n'));
})
/** We also don't want their ghooks to get triggered */
const packJsonContents = JSON.parse(readFile(packageJsonPath));
delete packJsonContents.config;
delete packJsonContents.devDependencies.ghooks;
writeFile(packageJsonPath, stringify(packJsonContents));


/**
 * Any line changes
 */
var lineFixes = [
    {
        /** Allows us to build monaco.d.ts */
        fileName: './vscode/gulpfile.js',
        orig: `if (isWatch) {`,
        new: `if (true) {`
    },
    {
        /** ship marked as a part of the build */
        fileName: './vscode/build/gulpfile.editor.js',
        orig: `result.paths['vs/base/common/marked/marked'] = 'out-build/vs/base/common/marked/marked.mock';`,
        new: ``
    }
];

for (let fix of lineFixes) {
    writeFile(fix.fileName, readFile(fix.fileName).replace(fix.orig, fix.new));
}

/**
 * Extend the monaco API to expose more stuff
 */
const recipeFile = "./vscode/build/monaco/monaco.d.ts.recipe";
const recipeAdditions = `
`;
writeFile(recipeFile, readFile(recipeFile) + recipeAdditions);
