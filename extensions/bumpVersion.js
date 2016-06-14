"use strict";
var utils = require("./utils");
var version = utils.readFile('./kicktravis').split(':')[1].trim();
var pkg = JSON.parse(utils.readFile('./package.json'));
pkg.version = version;
utils.writeFile('./package.json', utils.stringify(pkg));
