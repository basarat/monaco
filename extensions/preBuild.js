"use strict";
var utils_1 = require("./utils");
var utils = require("./utils");
var path = require('path');
var contentFixes = [
    {
        fileName: './vscode/build/lib/compilation.js',
        orig: "if (isWatch) {",
        new: "if (true) {"
    }
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
    'gulp-flatmap',
    'pump',
    'vscode-nls-dev',
    'gulp-watch',
    'gulp-tslint',
    'tslint',
    'typescript-formatter',
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
packJsonContents.devDependencies['gulp-watch'] = "^4.3.9";
delete packJsonContents.scripts;
utils_1.writeFile(packageJsonPath, utils_1.stringify(packJsonContents));
utils.remove(utils.resolve('./vscode/npm-shrinkwrap.json'));
var recipeFile = "./vscode/build/monaco/monaco.d.ts.recipe";
var recipeAdditions = "\n/** uplift some stuff from monaco.editor so that we can all have a party in the same namespace */\ndeclare module monaco {\n    export type ICommonCodeEditor = monaco.editor.ICommonCodeEditor;\n    export type IEditorContribution = monaco.editor.IEditorContribution;\n    export type IModel = monaco.editor.IModel;\n\n    /** Stuff from \"types\" */\n    #include(vs/base/common/types): TypeConstraint\n}\n\n/** We wanted CommonEditorRegistry and EditorAction. Rest is brought in for it */\ndeclare module monaco {\n    #include(vs/platform/instantiation/common/instantiation): IConstructorSignature0,IConstructorSignature1,IConstructorSignature2,IConstructorSignature3,IConstructorSignature4,IConstructorSignature5,IConstructorSignature6,IConstructorSignature7,IConstructorSignature8\n    #include(vs/platform/instantiation/common/instantiation): ServicesAccessor,ServiceIdentifier,optional\n\n    /** Was a really deep rabbit hole so shortened */\n    export type IInstantiationService = any;\n\n    #include(vs/editor/common/editorCommon): ICommonEditorContributionCtor, ICommonEditorContributionDescriptor, IEditorActionContributionCtor\n}\ndeclare module monaco {\n    /** Just shut up */\n    type ConfigBasicCommand = any;\n\n    #include(vs/platform/contextkey/common/contextkey):ContextKeyExpr,ContextKeyExprType\n    #include(vs/platform/actions/common/actions):IMenuItem,ICommandAction\n    #include(vs/editor/common/config/config;editorCommon.=>): ICommandOptions,ICommandKeybindingsOptions,EditorCommand,Command,EditorControllerCommand,IContributionCommandOptions\n    #include(vs/platform/keybinding/common/keybinding): IKeybindings,IKeybindingItem\n    #include(vs/platform/commands/common/commands): ICommandHandler, ICommandHandlerDescription\n\n    /** Because its aliased */\n    type ConfigEditorCommand = EditorCommand;\n    var ConfigEditorCommand:typeof EditorCommand;\n\n    #include(vs/editor/common/editorCommonExtensions;editorCommon.=>): IActionOptions, IEditorCommandMenuOptions\n\n    #include(vs/editor/common/editorCommonExtensions;editorCommon.=>): CommonEditorRegistry, EditorAction\n}\n\n/** We wanted KeyBindingsRegistry, EditorContextKeys. Rest is brought in for it */\ndeclare module monaco {\n    /** Shortcut: we don't care */\n    type RawContextKey<T> = any;\n\n    #include(vs/editor/common/editorCommon): EditorContextKeys\n\n    /** Shortcut: I don't care */\n    type IKeybindingService = any;\n\n    #include(vs/platform/keybinding/common/keybindingsRegistry): KeybindingsRegistry, IKeybindingsRegistry, ICommandAndKeybindingRule, IKeybindingRule\n}\n\n/** We wanted CodeSnippet and getSnippetController */\ndeclare module monaco {\n    // Simplified the api surface to only export what I want\n    class CodeSnippet {\n        static fromInternal(snippetTemplate: string): CodeSnippet;\n    }\n    class SnippetController {\n        static get(editor: ICommonCodeEditor): SnippetController;\n        run(snippet: CodeSnippet, overwriteBefore: number, overwriteAfter: number, stripPrefix?: boolean): void;\n    }\n}\n";
utils_1.writeFile(recipeFile, utils_1.readFile(recipeFile) + recipeAdditions);
var editorMainFile = "./vscode/src/vs/editor/editor.main.ts";
var editorMainAdditions = "\n/** expose more stuff from monaco */\nimport {CommonEditorRegistry, EditorAction} from \"vs/editor/common/editorCommonExtensions\";\nglobal.monaco.CommonEditorRegistry = CommonEditorRegistry;\nglobal.monaco.EditorAction = EditorAction;\nimport {EditorContextKeys} from 'vs/editor/common/editorCommon';\nimport {KeybindingsRegistry} from 'vs/platform/keybinding/common/keybindingsRegistry';\nglobal.monaco.EditorContextKeys = EditorContextKeys;\nglobal.monaco.KeybindingsRegistry = KeybindingsRegistry;\nimport {CodeSnippet} from 'vs/editor/contrib/snippet/common/snippet';\nglobal.monaco.CodeSnippet = CodeSnippet;\nimport {SnippetController} from 'vs/editor/contrib/snippet/common/snippetController';\nglobal.monaco.SnippetController = SnippetController;\n";
utils_1.writeFile(editorMainFile, utils_1.readFile(editorMainFile) + editorMainAdditions);
var fixesForFiles = [
    {
        filePath: './vscode/src/vs/editor/contrib/format/common/formatActions.ts',
        fixes: [
            {
                orig: "primary: KeyMod.Shift | KeyMod.Alt | KeyCode.KEY_F,",
                new: "primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_L,"
            },
        ]
    },
    {
        filePath: './vscode/src/vs/editor/contrib/smartSelect/common/smartSelect.ts',
        fixes: [
            {
                orig: "Expand Select",
                new: 'Smart Expand Selection'
            },
            {
                orig: "Shrink Select",
                new: 'Smart Shrink Selection'
            },
            {
                orig: "\n\t\t\t\tprimary: KeyMod.Shift | KeyMod.Alt | KeyCode.RightArrow,\n\t\t\t\tmac: { primary: KeyMod.CtrlCmd | KeyMod.WinCtrl | KeyMod.Shift | KeyCode.RightArrow }\n\t\t\t",
                new: "\n\t\t\t\tprimary: KeyMod.CtrlCmd | KeyCode.KEY_E,\n\t\t\t"
            },
            {
                orig: "\n\t\t\t\tprimary: KeyMod.Shift | KeyMod.Alt | KeyCode.LeftArrow,\n\t\t\t\tmac: { primary: KeyMod.CtrlCmd | KeyMod.WinCtrl | KeyMod.Shift | KeyCode.LeftArrow }\n\t\t\t",
                new: "\n\t\t\t\t// I tried cmd+shift+e and it doesn't work on a mac so \"alt\"\n\t\t\t\tprimary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_E,\n\t\t\t"
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
                orig: "\n@editorAction\nclass InsertLineBeforeAction extends HandlerEditorAction {\n\tconstructor() {\n\t\tsuper({\n\t\t\tid: 'editor.action.insertLineBefore',\n\t\t\tlabel: nls.localize('lines.insertBefore', \"Insert Line Above\"),\n\t\t\talias: 'Insert Line Above',\n\t\t\tprecondition: EditorContextKeys.Writable,\n\t\t\thandlerId: Handler.LineInsertBefore,\n\t\t\tkbOpts: {\n\t\t\t\tkbExpr: EditorContextKeys.TextFocus,\n\t\t\t\tprimary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.Enter\n\t\t\t}\n\t\t});\n\t}\n}\n\n@editorAction\nclass InsertLineAfterAction extends HandlerEditorAction {\n\tconstructor() {\n\t\tsuper({\n\t\t\tid: 'editor.action.insertLineAfter',\n\t\t\tlabel: nls.localize('lines.insertAfter', \"Insert Line Below\"),\n\t\t\talias: 'Insert Line Below',\n\t\t\tprecondition: EditorContextKeys.Writable,\n\t\t\thandlerId: Handler.LineInsertAfter,\n\t\t\tkbOpts: {\n\t\t\t\tkbExpr: EditorContextKeys.TextFocus,\n\t\t\t\tprimary: KeyMod.CtrlCmd | KeyCode.Enter\n\t\t\t}\n\t\t});\n\t}\n}\n                ",
                new: ''
            }
        ],
        additions: "\n@editorAction\nclass DuplicateLinesAction extends AbstractCopyLinesAction {\n\tconstructor() {\n\t\tsuper(true, {\n\t\t\tid: 'editor.action.duplicateLinesAction',\n\t\t\tlabel: 'Duplicate Line',\n\t\t\talias: 'Duplicate Line',\n\t\t\tprecondition: EditorContextKeys.Writable,\n\t\t\tkbOpts: {\n\t\t\t\tkbExpr: EditorContextKeys.TextFocus,\n\t\t\t\tprimary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_D\n\t\t\t}\n\t\t});\n\t}\n}\n        "
    },
    {
        filePath: './vscode/src/vs/editor/contrib/toggleTabFocusMode/common/toggleTabFocusMode.ts',
        fixes: [
            {
                orig: "\n@editorAction\nexport class ToggleTabFocusModeAction extends EditorAction {\n",
                new: "\nexport class ToggleTabFocusModeAction extends EditorAction {\n"
            }
        ]
    },
    {
        filePath: './vscode/src/vs/editor/contrib/find/common/findController.ts',
        fixes: [
            {
                orig: "\n\n@editorAction\nexport class StartFindReplaceAction extends EditorAction {\n\n\tconstructor() {\n\t\tsuper({\n\t\t\tid: FIND_IDS.StartFindReplaceAction,\n\t\t\tlabel: nls.localize('startReplace', \"Replace\"),\n\t\t\talias: 'Replace',\n\t\t\tprecondition: null,\n\t\t\tkbOpts: {\n\t\t\t\tkbExpr: null,\n\t\t\t\tprimary: KeyMod.CtrlCmd | KeyCode.KEY_H,\n\t\t\t\tmac: { primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_F }\n\t\t\t}\n\t\t});\n\t}\n\n\tpublic run(accessor: ServicesAccessor, editor: editorCommon.ICommonCodeEditor): void {\n\t\tif (editor.getConfiguration().readOnly) {\n\t\t\treturn;\n\t\t}\n\n\t\tlet controller = CommonFindController.get(editor);\n\t\tif (controller) {\n\t\t\tcontroller.start({\n\t\t\t\tforceRevealReplace: true,\n\t\t\t\tseedSearchStringFromSelection: true,\n\t\t\t\tshouldFocus: FindStartFocusAction.FocusReplaceInput,\n\t\t\t\tshouldAnimate: true\n\t\t\t});\n\t\t}\n\t}\n}\n                ",
                new: ""
            }
        ]
    },
    {
        filePath: './vscode/src/vs/editor/common/config/config.ts',
        fixes: [
            {
                orig: "mac: { primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_Z }",
                new: ""
            }
        ]
    },
    {
        filePath: './vscode/src/vs/editor/browser/viewParts/contentWidgets/contentWidgets.ts',
        fixes: [
            {
                orig: "let fitsAbove = (absoluteAboveTop >= TOP_PADDING),",
                new: "let fitsAbove = (aboveTop >= 0),"
            }
        ]
    },
    {
        filePath: './vscode/src/vs/editor/contrib/gotoError/browser/gotoError.ts',
        fixes: [
            {
                orig: 'this.focus();',
                new: ''
            }
        ]
    },
    {
        filePath: './vscode/src/vs/editor/browser/widget/media/red-squiggly.svg',
        fixes: [
            {
                orig: 'fill="#F00"',
                new: 'fill="#F92672"'
            }
        ]
    },
    {
        filePath: './vscode/src/vs/editor/browser/widget/media/green-squiggly.svg',
        fixes: [
            {
                orig: 'fill="#080"',
                new: 'fill="#F6D675"'
            }
        ]
    },
    {
        filePath: './vscode/src/vs/editor/contrib/gotoError/browser/gotoError.ts',
        fixes: [
            {
                orig: "this.options.frameColor = '#ff5a5a';",
                new: "this.options.frameColor = '#F92672';"
            },
            {
                orig: "this.options.frameColor = '#5aac5a';",
                new: "this.options.frameColor = '#F6D675';"
            }
        ]
    },
    {
        filePath: './vscode/src/vs/editor/contrib/suggest/common/completionModel.ts',
        fixes: [
            {
                orig: "\nconst score = CompletionModel._scoreByHighlight(item, word, word.toLowerCase());\n                 ",
                new: "\nlet score = CompletionModel._scoreByHighlight(item, word, word.toLowerCase());\nif (item.suggestion.label == word && item.suggestion.type === 'snippet') {\n  score = 1000;\n}\n"
            }
        ]
    },
];
fixesForFiles.forEach(function (fff) {
    var content = utils_1.readFile(fff.filePath);
    content = content.split(/\r\n?|\n/).join('\n');
    fff.fixes.forEach(function (fix) {
        var orig = fix.orig.split(/\r\n?|\n/).join('\n').trim();
        if (content.indexOf(orig) === -1) {
            console.log('FIX ORIG NOT FOUND:');
            console.log(fix);
            process.exit(1);
        }
        content = content.replace(orig, fix.new);
    });
    if (fff.additions) {
        content = content + fff.additions;
    }
    utils_1.writeFile(fff.filePath, content);
});
