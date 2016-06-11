var fs = require('fs-extra');
var path = require('path');

export function copy(src: string, dest: string) {
    return fs.copy(src, dest);
}
export function dir(filePath: string): string {
    return path.dirname(filePath);
}
