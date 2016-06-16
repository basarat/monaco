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
var recipeAdditions = "\n/** uplift some stuff from monaco.editor so that we can all have a party in the same namespace */\ndeclare module monaco {\n    export type ICommonCodeEditor = monaco.editor.ICommonCodeEditor;\n    export type IEditorContribution = monaco.editor.IEditorContribution;\n    export type IModel = monaco.editor.IModel;\n}\n\n/** We wanted CommonEditorRegistry. Rest is brought in for it */\n\ndeclare module monaco {\n\n    /** Stuff from \"types\" */\n    #include(vs/base/common/types): TypeConstraint\n\n\n    /** Stuff from instantiation **/\n    #include(vs/platform/instantiation/common/instantiation): IConstructorSignature1, IConstructorSignature2, ServiceIdentifier, ServicesAccessor, optional\n    /** Was a really deep rabbit hole so shortened */\n    export type IInstantiationService = any;\n}\n\ndeclare module monaco {\n\n    #include(vs/editor/common/editorCommon): ICommonEditorContributionCtor, ICommonEditorContributionDescriptor, IEditorActionContributionCtor, IEditorActionDescriptorData\n\n}\n\ndeclare module monaco {\n\n    #include(vs/editor/common/editorCommonExtensions;editorCommon.=>): CommonEditorRegistry, EditorActionDescriptor, IEditorCommandHandler, IEditorActionKeybindingOptions, ContextKey\n    #include(vs/platform/keybinding/common/keybindingService): IKeybindings, ICommandHandler, ICommandHandlerDescription, KbExpr, KbExprType, ICommandsMap, IKeybindingItem\n\n}\n\n/** We wanted KeyBindingsRegistry. Rest is brought in for it */\ndeclare module monaco {\n    #include(vs/platform/keybinding/common/keybindingsRegistry): KeybindingsRegistry, IKeybindingsRegistry, ICommandRule, ICommandDescriptor\n}\n\n/** We wanted EditorAction */\ndeclare module monaco {\n    #include(vs/editor/common/editorAction): EditorAction\n    #include(vs/base/common/actions): Action, IAction, IActionCallback\n    #include(vs/editor/common/editorActionEnablement): Behaviour\n\n    /** Placeholder. Bringing it in would be too much work */\n    class EventEmitter{\n        dispose(): void;\n    }\n}\n";
utils_1.writeFile(recipeFile, utils_1.readFile(recipeFile) + recipeAdditions);
var editorMainFile = "./vscode/src/vs/editor/editor.main.ts";
var editorMainAdditions = "\n/** expose more stuff from monaco */\nimport {CommonEditorRegistry, EditorActionDescriptor, ContextKey} from \"vs/editor/common/editorCommonExtensions\";\nglobal.monaco.CommonEditorRegistry = CommonEditorRegistry;\nglobal.monaco.EditorActionDescriptor = EditorActionDescriptor;\nglobal.monaco.ContextKey = ContextKey;\nimport {KeybindingsRegistry} from 'vs/platform/keybinding/common/keybindingsRegistry';\nglobal.monaco.KeybindingsRegistry = KeybindingsRegistry;\nimport {EditorAction} from 'vs/editor/common/editorAction';\nglobal.monaco.EditorAction = EditorAction;\n";
utils_1.writeFile(editorMainFile, utils_1.readFile(editorMainFile) + editorMainAdditions);
utils.copy(utils.resolve('./monaco-languages/src'), utils.resolve('./vscode/src/vs/editor/standalone-languages'));
utils_1.writeFile(editorMainFile, utils_1.readFile(editorMainFile) + utils_1.readFile('./standalone-languages/all.ts'));
utils.copy(utils.resolve('./standalone-languages/buildfile.js'), utils.resolve('./vscode/src/vs/editor/buildfile.js'));
utils.remove(utils.resolve('./vscode/src/vs/editor/standalone-languages/monaco.contribution.ts'));
var fixesForFiles = [
    {
        filePath: './vscode/src/vs/editor/contrib/format/common/formatActions.ts',
        fixes: [
            {
                orig: "primary: KeyMod.Shift | KeyMod.Alt | KeyCode.KEY_F,",
                new: "primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_L,"
            },
            {
                orig: "linux: { primary:KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_I }",
                new: "linux: { primary:KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_L }"
            },
        ]
    },
    {
        filePath: './vscode/src/vs/editor/contrib/smartSelect/common/smartSelect.ts',
        fixes: [
            {
                orig: "\n\tprimary: KeyMod.Shift | KeyMod.Alt | KeyCode.RightArrow,\n\tmac: { primary: KeyMod.CtrlCmd | KeyMod.WinCtrl | KeyMod.Shift | KeyCode.RightArrow }\n                ",
                new: "\n\tprimary: KeyMod.CtrlCmd | KeyCode.KEY_E,\n    mac: { primary: KeyMod.CtrlCmd | KeyMod.WinCtrl | KeyCode.KEY_E }\n                "
            },
            {
                orig: "\n\tprimary: KeyMod.Shift | KeyMod.Alt | KeyCode.LeftArrow,\n\tmac: { primary: KeyMod.CtrlCmd | KeyMod.WinCtrl | KeyMod.Shift | KeyCode.LeftArrow }\n                ",
                new: "\n\tprimary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_E,\n    mac: { primary: KeyMod.CtrlCmd | KeyMod.WinCtrl | KeyMod.Shift | KeyCode.KEY_E }\n                "
            }
        ]
    },
    {
        filePath: './vscode/src/vs/editor/contrib/smartSelect/common/jumpToBracket.ts',
        fixes: [
            {
                orig: "primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.US_BACKSLASH",
                new: "primary: KeyMod.CtrlCmd | KeyCode.KEY_M"
            }
        ]
    },
    {
        filePath: './vscode/src/vs/editor/contrib/linesOperations/common/linesOperations.ts',
        fixes: [
            {
                orig: "\nCommonEditorRegistry.registerEditorAction(new EditorActionDescriptor(InsertLineBeforeAction, InsertLineBeforeAction.ID, nls.localize('lines.insertBefore', \"Insert Line Above\"), {\n\tcontext: ContextKey.EditorTextFocus,\n\tprimary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.Enter\n}, 'Insert Line Above'));\nCommonEditorRegistry.registerEditorAction(new EditorActionDescriptor(InsertLineAfterAction, InsertLineAfterAction.ID, nls.localize('lines.insertAfter', \"Insert Line Below\"), {\n\tcontext: ContextKey.EditorTextFocus,\n\tprimary: KeyMod.CtrlCmd | KeyCode.Enter\n}, 'Insert Line Below'));\n                ",
                new: ''
            }
        ],
        additions: "\nclass DuplicateLinesAction extends CopyLinesAction {\n\tstatic ID = 'editor.action.duplicateLinesAction';\n\n\tconstructor(descriptor:IEditorActionDescriptorData, editor:ICommonCodeEditor) {\n\t\tsuper(descriptor, editor, true);\n\t}\n}\nCommonEditorRegistry.registerEditorAction(new EditorActionDescriptor(DuplicateLinesAction, DuplicateLinesAction.ID, nls.localize('lines.copyDown', \"Duplicate Line\"), {\n\tcontext: ContextKey.EditorTextFocus,\n\tprimary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_D\n}, 'Duplicate Line'));\n        "
    },
];
fixesForFiles.forEach(function (fff) {
    var content = utils_1.readFile(fff.filePath);
    content = content.split(/\r\n?|\n/).join('\n');
    fff.fixes.forEach(function (fix) {
        content = content.replace(fix.orig.split(/\r\n?|\n/).join('\n').trim(), fix.new);
    });
    if (fff.additions) {
        content = content + fff.additions;
    }
    utils_1.writeFile(fff.filePath, content);
});
