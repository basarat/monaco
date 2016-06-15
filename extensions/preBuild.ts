/**
 * Make modifications to source pre build
 */
/** imports */
import {readFile, writeFile, getAllFilesInFolder, copy, stringify} from "./utils";
import * as utils from "./utils";
const path = require('path');

/**
 * Any line changes
 */
var contentFixes = [
    {
        /** Allows us to build monaco.d.ts */
        fileName: './vscode/gulpfile.js',
        orig: `if (isWatch) {`,
        new: `if (true) {`
    },
    {
        /** ship marked as a part of the build */
        fileName: './vscode/build/gulpfile.editor.js',
        orig: `result.paths['vs/base/common/marked/marked'] = 'out-build/vs/base/common/marked/marked.mock';`,
        new: ``
    },

    /** Remove gulp target we do not need (also helps us removing thier deps from npm install) */
    {
        fileName: './vscode/gulpfile.js',
        orig: `require('./build/gulpfile.hygiene');`,
        new: ``
    },
    {
        fileName: './vscode/gulpfile.js',
        orig: `require('./build/gulpfile.vscode');`,
        new: ``
    },
];

for (let fix of contentFixes) {
    writeFile(fix.fileName, readFile(fix.fileName).replace(fix.orig, fix.new));
}

/**
 * Package.json cleanups
 */
const packagesWeDontWant = [
    // node-gyp
    "pty.js",
    "vscode-textmate",
    "native-keymap",
    "windows-mutex",
    "preinstall", // Don't want preinstall (its there to protect us from using `npm install` vs. `atom's npm install`. We are fine with npm)
]
const packageJsonPath = "./vscode/package.json";
packagesWeDontWant.forEach(packageName => {
    writeFile(packageJsonPath, readFile(packageJsonPath).split('\n').filter(x => !x.includes(packageName)).join('\n'));
})
const packJsonContents = JSON.parse(readFile(packageJsonPath));

/** We also don't want their ghooks to get triggered */
delete packJsonContents.config;
delete packJsonContents.devDependencies.ghooks;

/** I am tired of installing all these packages so only leave the ones that are *must* for the subset of build we are making */
const keepThePackages = [
    /**
     * Adding to this list is not that hard.
     * You generally get a stack trace on a `require` load fail ;) and then you know all the other require calls in the root of that file
     */
    /** gulpfile.js */
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
    /** build/lib/nls.ts */
    'lazy.js',
    'clone',
    'vinyl',
    'source-map',
    /** build/lib/util.js */
    'debounce',
    'gulp-azure-storage',
    'azure-storage',
    'gulp-rename',
    'gulp-vinyl-zip',
    'gulp-util',
    'rimraf',
    /** build/gulpfile.common.js */
    'gulp-cssnano',
    'gulp-uglify',
    'gulp-concat',
    'gulp-util',
    /** build/gulpfile.extension.js */
    'vscode-nls-dev',
    /** build/watch/index.js */
    'gulp-watch',
]
Object.keys(packJsonContents.dependencies).forEach(dep => {
    if (keepThePackages.indexOf(dep) !== -1) return;
    delete packJsonContents.dependencies[dep];
})
Object.keys(packJsonContents.devDependencies).forEach(dep => {
    if (keepThePackages.indexOf(dep) !== -1) return;
    delete packJsonContents.devDependencies[dep];
})

/** Don't want post install or any other script either */
delete packJsonContents.scripts;

/** Finally write out package.json */
writeFile(packageJsonPath, stringify(packJsonContents));

/**
 * also delete shrinkwrap (otherwise `npm install` will install these too)
 */
utils.remove(utils.resolve('./vscode/npm-shrinkwrap.json'));


/**
 * Extend the monaco API to expose more stuff
 * Some notes:
 * - please append to editor.main whatever you export here to prevent runtime errors
 */
const recipeFile = "./vscode/build/monaco/monaco.d.ts.recipe";
const recipeAdditions = `
/** uplift some stuff from monaco.editor so that we can all have a party in the same namespace */
declare module monaco {
    export type ICommonCodeEditor = monaco.editor.ICommonCodeEditor;
    export type IEditorContribution = monaco.editor.IEditorContribution;
    export type IModel = monaco.editor.IModel;
}

/** We wanted CommonEditorRegistry. Rest is brought in for it */

declare module monaco {

    /** Stuff from "types" */
    #include(vs/base/common/types): TypeConstraint


    /** Stuff from instantiation **/
    #include(vs/platform/instantiation/common/instantiation): IConstructorSignature1, IConstructorSignature2, ServiceIdentifier, ServicesAccessor, optional
    /** Was a really deep rabbit hole so shortened */
    export type IInstantiationService = any;
}

declare module monaco {

    #include(vs/editor/common/editorCommon): ICommonEditorContributionCtor, ICommonEditorContributionDescriptor, IEditorActionContributionCtor, IEditorActionDescriptorData

}

declare module monaco {

    #include(vs/editor/common/editorCommonExtensions;editorCommon.=>): CommonEditorRegistry, EditorActionDescriptor, IEditorCommandHandler, IEditorActionKeybindingOptions, ContextKey
    #include(vs/platform/keybinding/common/keybindingService): IKeybindings, ICommandHandler, ICommandHandlerDescription, KbExpr, KbExprType, ICommandsMap, IKeybindingItem

}

/** We wanted KeyBindingsRegistry. Rest is brought in for it */
declare module monaco {
    #include(vs/platform/keybinding/common/keybindingsRegistry): KeybindingsRegistry, IKeybindingsRegistry, ICommandRule, ICommandDescriptor
}

/** We wanted EditorAction */
declare module monaco {
    #include(vs/editor/common/editorAction): EditorAction
    #include(vs/base/common/actions): Action, IAction, IActionCallback
    #include(vs/editor/common/editorActionEnablement): Behaviour

    /** Placeholder. Bringing it in would be too much work */
    class EventEmitter{
        dispose(): void;
    }
}
`;
writeFile(recipeFile, readFile(recipeFile) + recipeAdditions);

/**
 * Add to editor.main
 */
const editorMainFile = "./vscode/src/vs/editor/editor.main.ts";
const editorMainAdditions = `
/** expose more stuff from monaco */
import {CommonEditorRegistry, EditorActionDescriptor, ContextKey} from "vs/editor/common/editorCommonExtensions";
global.monaco.CommonEditorRegistry = CommonEditorRegistry;
global.monaco.EditorActionDescriptor = EditorActionDescriptor;
global.monaco.ContextKey = ContextKey;
import {KeybindingsRegistry} from 'vs/platform/keybinding/common/keybindingsRegistry';
global.monaco.KeybindingsRegistry = KeybindingsRegistry;
import {EditorAction} from 'vs/editor/common/editorAction';
global.monaco.EditorAction = EditorAction;
`;
writeFile(editorMainFile, readFile(editorMainFile) + editorMainAdditions);


/**
 * Also add in all the languages from `monaco-languages`
 */
// Copy monaco-languages src to vscode
utils.copy(utils.resolve('./monaco-languages/src'), utils.resolve('./vscode/src/vs/editor/standalone-languages'));
// Fix monaco-languages names
utils.getAllFilesInFolder(utils.resolve('./vscode/src/vs/editor/standalone-languages')).forEach(filePath => {
    const contents = readFile(filePath).replace(
        'import IRichLanguageConfiguration = monaco.languages.IRichLanguageConfiguration;',
        'import IRichLanguageConfiguration = monaco.languages.LanguageConfiguration;'
    );
    writeFile(filePath, contents);
});
// Copy the `all.ts` which loads these languages
writeFile(editorMainFile, readFile(editorMainFile) + readFile('./standalone-languages/all.ts'));
/** Copy `buildfile.js` to include the language modules */
utils.copy(utils.resolve('./standalone-languages/buildfile.js'), utils.resolve('./vscode/src/vs/editor/buildfile.js'));
// remove `monaco.contribution`
utils.remove(utils.resolve('./vscode/src/vs/editor/standalone-languages/monaco.contribution.ts'));


/**
 * Moar fixes
 */
interface IFix {
    orig: string;
    new: string;
}
interface IFixForFile {
    filePath: string,
    fixes: IFix[],
    additions?: string,
}
const fixesForFiles: IFixForFile[] = [
    /** Keybinding change : prefer format command shortcut in intellij idea */
    {
        filePath: './vscode/src/vs/editor/contrib/format/common/formatActions.ts',
        fixes: [
            {
                orig: `primary: KeyMod.Shift | KeyMod.Alt | KeyCode.KEY_F,`,
                new: `primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_L,`
            },
            {
                orig: `linux: { primary:KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_I }`,
                new: `linux: { primary:KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_L }`
            },
        ]
    },

    {
        filePath: './vscode/src/vs/editor/contrib/linesOperations/common/linesOperations.ts',
        fixes: [
            {
                // We want to use this for jumpy and tab jumps
                orig: `
CommonEditorRegistry.registerEditorAction(new EditorActionDescriptor(InsertLineBeforeAction, InsertLineBeforeAction.ID, nls.localize('lines.insertBefore', "Insert Line Above"), {
	context: ContextKey.EditorTextFocus,
	primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.Enter
}, 'Insert Line Above'));
CommonEditorRegistry.registerEditorAction(new EditorActionDescriptor(InsertLineAfterAction, InsertLineAfterAction.ID, nls.localize('lines.insertAfter', "Insert Line Below"), {
	context: ContextKey.EditorTextFocus,
	primary: KeyMod.CtrlCmd | KeyCode.Enter
}, 'Insert Line Below'));
                `,
                new: ''
            }
        ],
        /**
         * Duplicate copy line down action code reused to -> duplicate line with a new shortcut
         */
        additions: `
class DuplicateLinesAction extends CopyLinesAction {
	static ID = 'editor.action.duplicateLinesAction';

	constructor(descriptor:IEditorActionDescriptorData, editor:ICommonCodeEditor) {
		super(descriptor, editor, true);
	}
}
CommonEditorRegistry.registerEditorAction(new EditorActionDescriptor(DuplicateLinesAction, DuplicateLinesAction.ID, nls.localize('lines.copyDown', "Duplicate Line"), {
	context: ContextKey.EditorTextFocus,
	primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_D
}, 'Duplicate Line'));
        `
    },

    // Bring back `css`/`sass`/`less` languages
    {
        filePath: './vscode/src/vs/languages/languages.main.ts',
        fixes: [
            {
                orig: `
//import 'vs/languages/less/common/less.contribution';
//import 'vs/languages/sass/common/sass.contribution';
//import 'vs/languages/css/common/css.contribution';
                `,
                new: `
import 'vs/languages/less/common/less.contribution';
import 'vs/languages/sass/common/sass.contribution';
import 'vs/languages/css/common/css.contribution';
                `
            }
        ]
    }
]

fixesForFiles.forEach(fff => {
    let content = readFile(fff.filePath);
    content = content.split(/\r\n?|\n/).join('\n');
    fff.fixes.forEach(fix => {
        content = content.replace(fix.orig.split(/\r\n?|\n/).join('\n').trim(), fix.new);
    })
    if (fff.additions) {
        content = content + fff.additions;
    }
    writeFile(fff.filePath, content);
})
