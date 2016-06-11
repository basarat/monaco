/**
 * Make modifications to source post build
 */
/** Imports */
import * as utils from "./utils";
const path = require('path');
/** The src dir */
const srcDir = path.resolve(__dirname + '/../src');
const buildDir = path.resolve(__dirname + '/../build');
/** All the files in `src` */
const allFiles: string[] = require('glob').sync('./**/*', { cwd: srcDir }).map(p=>path.resolve(srcDir,p));

/** Move any `.css` files in source to build */
allFiles.filter(f => f.endsWith('.css')).forEach(srcCss => {
    utils.copy(srcCss, srcCss.replace(srcDir, buildDir));
})
