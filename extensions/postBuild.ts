/**
 * Make modifications to source post build
 */
/** Imports */
import * as utils from "./utils";

/** The src dir */
const srcDir = require('path').resolve(__dirname + '/../src');
const buildDir = require('path').resolve(__dirname + '/../build');
/** All the files in `src` */
const allFiles: string[] = require('glob').sync('./**/*', { cwd: srcDir });

/** Move any `.css` files in source to build */
allFiles.filter(f=>f.endsWith('.css')).forEach(srcCss => {
    utils.copy(srcCss, srcCss.replace(srcDir,buildDir));
})
