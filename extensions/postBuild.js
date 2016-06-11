var srcDir = require('path').resolve(__dirname + '/../src');
var allFiles = require('glob').sync('./**/*', { cwd: srcDir });
console.log(allFiles.length);
