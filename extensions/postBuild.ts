/**
 * Make modifications to source post build
 */
/** imports */
import {getAllFilesInFolder, copy} from "./utils";
/**
 * Copy some more files over
 */
const path = require('path');
/** The src dir */
const srcDir = path.resolve(__dirname + '/../src');
const buildDir = path.resolve(__dirname + '/../build');
/** All the files in `src` */
const allFiles: string[] = getAllFilesInFolder(srcDir);

/** Move any `.css` files in source to build */
allFiles.filter(f => f.endsWith('.css')).forEach(src => {
    copy(src, src.replace(srcDir, buildDir));
})
/** copy all svg files */
allFiles.filter(f => f.endsWith('.svg')).forEach(src => {
    copy(src, src.replace(srcDir, buildDir));
})
/** If there are any `.js` files, they should be copied over as well! */
allFiles.filter(f => f.endsWith('.js')).forEach(src => {
    copy(src, src.replace(srcDir, buildDir));
})
