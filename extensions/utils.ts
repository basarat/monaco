/**
 * NOTE : all relative paths are relative to project root 🌹
 */
var fse = require('fs-extra');
var fs = require('fs');
var path = require('path');
var EOL: string = require('os').EOL;
const glob = require('glob');

export function copy(src: string, dest: string) {
    return fse.copy(src, dest);
}
export function dir(filePath: string): string {
    return path.dirname(filePath);
}
export function readFile(filePath: string): string {
    return fs.readFileSync(__dirname + '/../' + filePath, 'utf8');
}
export function writeFile(filePath: string, content: string) {
    fs.writeFileSync(__dirname + '/../' + filePath, content);
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
export function getAllFilesInFolder(fullSrcDir: string): string[] {
    return glob.sync('./**/*', { cwd: fullSrcDir }).map(p => path.resolve(fullSrcDir, p));
}
export function isDir(filePath: string): boolean {
    return fs.lstatSync(filePath).isDirectory();
}
