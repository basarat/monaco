"use strict";
var utils_1 = require("./utils");
var utils = require("./utils");
var path = require('path');
var contentFixes = [
    {
        fileName: './vscode/gulpfile.js',
        orig: "if (isWatch) {",
        new: "if (true) {"
    },
    {
        fileName: './vscode/build/gulpfile.editor.js',
        orig: "result.paths['vs/base/common/marked/marked'] = 'out-build/vs/base/common/marked/marked.mock';",
        new: ""
    },
    {
        fileName: './vscode/gulpfile.js',
        orig: "require('./build/gulpfile.hygiene');",
        new: ""
    },
    {
        fileName: './vscode/gulpfile.js',
        orig: "require('./build/gulpfile.vscode');",
        new: ""
    },
];
for (var _i = 0, contentFixes_1 = contentFixes; _i < contentFixes_1.length; _i++) {
    var fix = contentFixes_1[_i];
    utils_1.writeFile(fix.fileName, utils_1.readFile(fix.fileName).replace(fix.orig, fix.new));
}
var packagesWeDontWant = [
    "pty.js",
    "vscode-textmate",
    "native-keymap",
    "windows-mutex",
    "preinstall",
];
var packageJsonPath = "./vscode/package.json";
packagesWeDontWant.forEach(function (packageName) {
    utils_1.writeFile(packageJsonPath, utils_1.readFile(packageJsonPath).split('\n').filter(function (x) { return !x.includes(packageName); }).join('\n'));
});
var packJsonContents = JSON.parse(utils_1.readFile(packageJsonPath));
delete packJsonContents.config;
delete packJsonContents.devDependencies.ghooks;
var keepThePackages = [
    'gulp',
    'gulp-json-editor',
    'gulp-buffer',
    'gulp-tsb',
    'gulp-filter',
    'gulp-mocha',
    'event-stream',
    'gulp-remote-src',
    'gulp-vinyl-zip',
    'gulp-bom',
    'gulp-sourcemaps',
    'underscore',
    'object-assign',
    'typescript',
    'lazy.js',
    'clone',
    'vinyl',
    'source-map',
    'debounce',
    'gulp-azure-storage',
    'azure-storage',
    'gulp-rename',
    'gulp-vinyl-zip',
    'gulp-util',
    'rimraf',
    'gulp-cssnano',
    'gulp-uglify',
    'gulp-concat',
    'gulp-util',
    'vscode-nls-dev',
    'gulp-watch',
];
Object.keys(packJsonContents.dependencies).forEach(function (dep) {
    if (keepThePackages.indexOf(dep) !== -1)
        return;
    delete packJsonContents.dependencies[dep];
});
Object.keys(packJsonContents.devDependencies).forEach(function (dep) {
    if (keepThePackages.indexOf(dep) !== -1)
        return;
    delete packJsonContents.devDependencies[dep];
});
delete packJsonContents.scripts;
utils_1.writeFile(packageJsonPath, utils_1.stringify(packJsonContents));
utils.remove(utils.resolve('./vscode/npm-shrinkwrap.json'));
var recipeFile = "./vscode/build/monaco/monaco.d.ts.recipe";
var recipeAdditions = "\n/** We wanted CommonEditorRegistry. Rest is brought in for it */\n\ndeclare module monaco {\n\n    /** Stuff from \"types\" */\n    #include(vs/base/common/types): TypeConstraint\n\n\n    /** Stuff from instantiation **/\n    #include(vs/platform/instantiation/common/instantiation): IConstructorSignature1, IConstructorSignature2, ServiceIdentifier, ServicesAccessor, optional\n    /** Was a really deep rabbit hole so shortened */\n    export type IInstantiationService = any;\n}\n\ndeclare module monaco.editor {\n\n    #include(vs/editor/common/editorCommon): ICommonEditorContributionCtor, ICommonEditorContributionDescriptor, IEditorActionContributionCtor, IEditorActionDescriptorData\n\n}\n\ndeclare module monaco.internal {\n\n    #include(vs/editor/common/editorCommonExtensions;editorCommon=>monaco.editor): CommonEditorRegistry, EditorActionDescriptor, IEditorCommandHandler, IEditorActionKeybindingOptions, ContextKey\n    #include(vs/platform/keybinding/common/keybindingService): IKeybindings, ICommandHandler, ICommandHandlerDescription, KbExpr, KbExprType, ICommandsMap, IKeybindingItem\n\n}\n\n/** We wanted KeyBindingsRegistry. Rest is brought in for it */\ndeclare module monaco.internal {\n    #include(vs/platform/keybinding/common/keybindingsRegistry): KeybindingsRegistry, IKeybindingsRegistry, ICommandRule, ICommandDescriptor\n}\n";
utils_1.writeFile(recipeFile, utils_1.readFile(recipeFile) + recipeAdditions);
var editorMainFile = "./vscode/src/vs/editor/editor.main.ts";
var editorMainAdditions = "\n/** expose more stuff from monaco */\nimport {CommonEditorRegistry} from \"vs/editor/common/editorCommonExtensions\";\nimport {KeybindingsRegistry} from 'vs/platform/keybinding/common/keybindingsRegistry';\nglobal.monaco.internal = {\n\tCommonEditorRegistry,\n    KeybindingsRegistry,\n}\n";
utils_1.writeFile(editorMainFile, utils_1.readFile(editorMainFile) + editorMainAdditions);
utils.copy(utils.resolve('./monaco-languages/src'), utils.resolve('./vscode/src/vs/editor/standalone-languages'));
utils.getAllFilesInFolder(utils.resolve('./vscode/src/vs/editor/standalone-languages')).forEach(function (filePath) {
    var contents = utils_1.readFile(filePath).replace('import IRichLanguageConfiguration = monaco.languages.IRichLanguageConfiguration;', 'import IRichLanguageConfiguration = monaco.languages.LanguageConfiguration;');
    utils_1.writeFile(filePath, contents);
});
utils_1.writeFile(editorMainFile, utils_1.readFile(editorMainFile) + utils_1.readFile('./standalone-languages/all.ts'));
utils.copy(utils.resolve('./standalone-languages/buildfile.js'), utils.resolve('./vscode/src/vs/editor/buildfile.js'));
utils.remove(utils.resolve('./vscode/src/vs/editor/standalone-languages/monaco.contribution.ts'));
