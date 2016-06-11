/**
 * Make modifications to source post build
 */

/** The src dir */
const srcDir = require('path').resolve(__dirname + '/../src');
/** All the files in `src` */
const allFiles: string[] = require('glob').sync('./**/*', { cwd: srcDir });

/** Move any `.css` files in source to build */
console.log(allFiles.length)
