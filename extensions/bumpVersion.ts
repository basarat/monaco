import * as utils from "./utils";

const version = utils.readFile('./kicktravis').split(':')[1].trim();
const pkg = JSON.parse(utils.readFile('./package.json'));
pkg.version = version;
utils.writeFile('./package.json', utils.stringify(pkg));
