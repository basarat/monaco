/**
 * Make modifications to source pre build
 */
/** imports */
import { readFile, writeFile, getAllFilesInFolder, copy, stringify } from "./utils";
import * as utils from "./utils";
const path = require('path');

/**
 * Any line changes
 */
var contentFixes = [
  {
    /** 
     * Allows us to build monaco.d.ts with our modifications
     * Without this the build will fail with:
     * "Error: monaco.d.ts is no longer up to date. Please run gulp watch and commit the new file."
     */
    fileName: './vscode/build/lib/compilation.js',
    orig: `if (isWatch) {`,
    new: `if (true) {`
  }
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
  'gulp-flatmap',
  'pump',
  /** build/gulpfile.extension.js */
  'vscode-nls-dev',
  /** build/watch/index.js */
  'gulp-watch',
  /** build/gulpfile.hygiene.js */
  'gulp-tslint',
  'tslint',
  'typescript-formatter',
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

/**
 * also delete shrinkwrap (otherwise `npm install` will install these too)
 */
utils.remove(utils.resolve('./vscode/npm-shrinkwrap.json'));

/**
 * Also add all the `package.json` stuff from `vscode/build/monaco/packages.json`
 * as it contains the types etc needed for `api.ts` to work
 */
const monacoPackageJson = require('../vscode/build/monaco/package.json');
Object.keys(monacoPackageJson.devDependencies).forEach(dep => {
  /** Excluding a few that break build */
  if ([
    'ghooks'
  ].indexOf(dep) !== -1) return;

  packJsonContents.devDependencies[dep] = monacoPackageJson.devDependencies[dep];
});

/** Finally write out package.json */
writeFile(packageJsonPath, stringify(packJsonContents));

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

    /** Stuff from "types" */
    #include(vs/base/common/types): TypeConstraint
}

/** We wanted CommonEditorRegistry and EditorAction. Rest is brought in for it */
declare module monaco {
    #include(vs/platform/instantiation/common/instantiation): IConstructorSignature0,IConstructorSignature1,IConstructorSignature2,IConstructorSignature3,IConstructorSignature4,IConstructorSignature5,IConstructorSignature6,IConstructorSignature7,IConstructorSignature8
    #include(vs/platform/instantiation/common/instantiation): ServicesAccessor,optional

    /** Was a really deep rabbit hole so shortened */
    export type IInstantiationService = any;

    /** Tired so leaving it untyped */
    export type ServiceIdentifier<T> = any;
    export type Map<K,V> = any;

    #include(vs/editor/common/editorCommon): ICommonEditorContributionCtor, ICommonEditorContributionDescriptor, IEditorActionContributionCtor
}
declare module monaco {
    /** Just shut up */
    type ConfigBasicCommand = any;

    #include(vs/platform/contextkey/common/contextkey):ContextKeyExpr,ContextKeyExprType
    #include(vs/platform/actions/common/actions):IMenuItem,ICommandAction
    #include(vs/editor/common/config/config;editorCommon.=>): ICommandOptions,ICommandKeybindingsOptions,EditorCommand,Command,EditorControllerCommand,IContributionCommandOptions
    #include(vs/platform/keybinding/common/keybinding): IKeybindings,IKeybindingItem
    #include(vs/platform/commands/common/commands): ICommandHandler, ICommandHandlerDescription

    /** Because its aliased */
    type ConfigEditorCommand = EditorCommand;
    var ConfigEditorCommand:typeof EditorCommand;

    #include(vs/editor/common/editorCommonExtensions;editorCommon.=>): IActionOptions, IEditorCommandMenuOptions

    #include(vs/editor/common/editorCommonExtensions;editorCommon.=>): CommonEditorRegistry, EditorAction
}

/** We wanted KeyBindingsRegistry, EditorContextKeys. Rest is brought in for it */
declare module monaco {
    /** Shortcut: we don't care */
    type RawContextKey<T> = any;

    #include(vs/editor/common/editorCommon): EditorContextKeys

    /** Shortcut: I don't care */
    type IKeybindingService = any;

    #include(vs/platform/keybinding/common/keybindingsRegistry): KeybindingsRegistry, IKeybindingsRegistry, ICommandAndKeybindingRule, IKeybindingRule
}

/** We wanted CodeSnippet and getSnippetController */
declare module monaco {
    // Simplified the api surface to only export what I want
    class CodeSnippet {
        static fromInternal(snippetTemplate: string): CodeSnippet;
    }
    class SnippetController {
        static get(editor: ICommonCodeEditor): SnippetController;
        run(snippet: CodeSnippet, overwriteBefore: number, overwriteAfter: number, stripPrefix?: boolean): void;
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
import {CommonEditorRegistry, EditorAction} from "vs/editor/common/editorCommonExtensions";
global.monaco.CommonEditorRegistry = CommonEditorRegistry;
global.monaco.EditorAction = EditorAction;
import {EditorContextKeys} from 'vs/editor/common/editorCommon';
import {KeybindingsRegistry} from 'vs/platform/keybinding/common/keybindingsRegistry';
global.monaco.EditorContextKeys = EditorContextKeys;
global.monaco.KeybindingsRegistry = KeybindingsRegistry;
import {CodeSnippet} from 'vs/editor/contrib/snippet/common/snippet';
global.monaco.CodeSnippet = CodeSnippet;
import {SnippetController} from 'vs/editor/contrib/snippet/common/snippetController';
global.monaco.SnippetController = SnippetController;
`;
writeFile(editorMainFile, readFile(editorMainFile) + editorMainAdditions);


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
  /** Keybinding: Expand select / Shrink select my shortcuts */
  {
    filePath: './vscode/src/vs/editor/contrib/smartSelect/common/smartSelect.ts',
    fixes: [
      {
        orig: `Expand Select`,
        new: 'Smart Expand Selection'
      },
      {
        orig: `Shrink Select`,
        new: 'Smart Shrink Selection'
      },
      {
        orig: `
				primary: KeyMod.Shift | KeyMod.Alt | KeyCode.RightArrow,
				mac: { primary: KeyMod.CtrlCmd | KeyMod.WinCtrl | KeyMod.Shift | KeyCode.RightArrow }
			`,
        new: `
				primary: KeyMod.CtrlCmd | KeyCode.KEY_E,
			`
      },
      {
        orig: `
				primary: KeyMod.Shift | KeyMod.Alt | KeyCode.LeftArrow,
				mac: { primary: KeyMod.CtrlCmd | KeyMod.WinCtrl | KeyMod.Shift | KeyCode.LeftArrow }
			`,
        new: `
				// I tried cmd+shift+e and it doesn't work on a mac so "alt"
				primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_E,
			`
      }
    ]
  },

  /** Keybinding: Prefer sublime jump to bracket */
  {
    filePath: './vscode/src/vs/editor/contrib/bracketMatching/common/bracketMatching.ts',
    fixes: [
      {
        orig: `primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.US_BACKSLASH`,
        new: `primary: KeyMod.CtrlCmd | KeyCode.KEY_M`
      }
    ]
  },

  {
    filePath: './vscode/src/vs/editor/contrib/linesOperations/common/linesOperations.ts',
    fixes: [
      {
        // We want to use this for jumpy and tab jumps
        orig: `
@editorAction
class InsertLineBeforeAction extends HandlerEditorAction {
	constructor() {
		super({
			id: 'editor.action.insertLineBefore',
			label: nls.localize('lines.insertBefore', "Insert Line Above"),
			alias: 'Insert Line Above',
			precondition: EditorContextKeys.Writable,
			handlerId: Handler.LineInsertBefore,
			kbOpts: {
				kbExpr: EditorContextKeys.TextFocus,
				primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.Enter
			}
		});
	}
}

@editorAction
class InsertLineAfterAction extends HandlerEditorAction {
	constructor() {
		super({
			id: 'editor.action.insertLineAfter',
			label: nls.localize('lines.insertAfter', "Insert Line Below"),
			alias: 'Insert Line Below',
			precondition: EditorContextKeys.Writable,
			handlerId: Handler.LineInsertAfter,
			kbOpts: {
				kbExpr: EditorContextKeys.TextFocus,
				primary: KeyMod.CtrlCmd | KeyCode.Enter
			}
		});
	}
}
                `,
        new: ''
      }
    ],
    /**
     * Duplicate copy line down action code reused to -> duplicate line with a new shortcut
     */
    additions: `
@editorAction
class DuplicateLinesAction extends AbstractCopyLinesAction {
	constructor() {
		super(true, {
			id: 'editor.action.duplicateLinesAction',
			label: 'Duplicate Line',
			alias: 'Duplicate Line',
			precondition: EditorContextKeys.Writable,
			kbOpts: {
				kbExpr: EditorContextKeys.TextFocus,
				primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_D
			}
		});
	}
}
        `
  },
  /** 
   * We never want to use to use `tab` to navigate the window.
   * Also this shortcut conflicted with our match bracket shortcut
   **/
  {
    filePath: './vscode/src/vs/editor/contrib/toggleTabFocusMode/common/toggleTabFocusMode.ts',
    fixes: [
      {
        orig: `
@editorAction
export class ToggleTabFocusModeAction extends EditorAction {
`,
        /** Leave the class (as its used elsewhere) but don't register as an action ;) */
        new: `
export class ToggleTabFocusModeAction extends EditorAction {
`
      }
    ]
  },
  /**
   * Our find and replace are consolidated.
   * We want to use `ctrl+h` for symbols (project / current file)
   */
  {
    filePath: './vscode/src/vs/editor/contrib/find/common/findController.ts',
    fixes: [
      {
        orig: `

@editorAction
export class StartFindReplaceAction extends EditorAction {

	constructor() {
		super({
			id: FIND_IDS.StartFindReplaceAction,
			label: nls.localize('startReplace', "Replace"),
			alias: 'Replace',
			precondition: null,
			kbOpts: {
				kbExpr: null,
				primary: KeyMod.CtrlCmd | KeyCode.KEY_H,
				mac: { primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KEY_F }
			}
		});
	}

	public run(accessor: ServicesAccessor, editor: editorCommon.ICommonCodeEditor): void {
		if (editor.getConfiguration().readOnly) {
			return;
		}

		let controller = CommonFindController.get(editor);
		if (controller) {
			controller.start({
				forceRevealReplace: true,
				seedSearchStringFromSelection: true,
				shouldFocus: FindStartFocusAction.FocusReplaceInput,
				shouldAnimate: true
			});
		}
	}
}
                `,
        new: ``
      }
    ]
  },
  /**
   * We want to allow Cmd+Y to redo on a mac.
   * Otherwise we end up opening history (which makes for an aweful demo mistake)
   * So delete the extreneous mac extra bindings.
   */
  {
    filePath: './vscode/src/vs/editor/common/config/config.ts',
    fixes: [
      {
        orig: `mac: { primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_Z }`,
        new: ``
      }
    ]
  },
  /**
   * We want the hover widget to show above *only* if it is still going to be *inside*
   * the editor. Currently it tries to overlay anywhere in the body which doesn't
   * work well with our layout
   */
  {
    filePath: './vscode/src/vs/editor/browser/viewParts/contentWidgets/contentWidgets.ts',
    fixes: [
      {
        orig: `let fitsAbove = (absoluteAboveTop >= TOP_PADDING),`,
        new: `let fitsAbove = (aboveTop >= 0),`
      }
    ]
  },
  /**
   * The f8 error navigation should not steal the focus from the editor. Reasons:
   * - We want the error widget to show but still keep the focus on the editor as we
   * want the user to be able to fix the error
   */
  {
    filePath: './vscode/src/vs/editor/contrib/gotoError/browser/gotoError.ts',
    fixes: [
      {
        orig: 'this.focus();',
        new: ''
      }
    ]
  },
  /**
   * We want
   * - reg squiggly color to match our IDE `error` color.
   * - green squiggly color to match our IDE `warning` color.
   * Also do the same for `gotoError` inline widget
   */
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
        orig: `this.options.frameColor = '#ff5a5a';`,
        new: `this.options.frameColor = '#F92672';`
      },
      {
        orig: `this.options.frameColor = '#5aac5a';`,
        new: `this.options.frameColor = '#F6D675';`
      }
    ]
  },
  /**
   * Improved completionModel sorting to get exact match snippets up.
   * TODO: But only if there isn't a property match in the list.
   */
  {
    filePath: './vscode/src/vs/editor/contrib/suggest/common/completionModel.ts',
    fixes: [
      {
        orig: `
const score = CompletionModel._scoreByHighlight(item, word);
                 `,
        new: `
let score = CompletionModel._scoreByHighlight(item, word);
if (item.suggestion.label == word && item.suggestion.type === 'snippet') {
  score = 301010000 /* a number that came from debuggin scores */ * 10000;
}
`
      }
    ]
  },
  /**
   * Allow tokenizer to know the filePath
   */
  {
    filePath: './vscode/src/vs/editor/common/modes.ts',
    fixes: [
      {
        orig: 'tokenize2(line: string, state: IState, offsetDelta: number): TokenizationResult2;',
        new: 'tokenize2(line: string, state: IState, offsetDelta: number, filePath?: string): TokenizationResult2;'
      }
    ]
  },
  {
    filePath: './vscode/src/vs/editor/common/model/textModelWithTokens.ts',
    fixes: [
      {
        orig: 'r = this._tokenizationSupport.tokenize2(this._lines[lineIndex].text, freshState, 0);',
        new: 'r = this._tokenizationSupport.tokenize2(this._lines[lineIndex].text, freshState, 0, (this as any).filePath);'
      }
    ]
  },
  {
    filePath: './vscode/src/vs/editor/browser/standalone/standaloneLanguages.ts',
    fixes: [
      {
        orig: 'tokenize(line: string, state: modes.IState): ILineTokens;',
        new: 'tokenize(line: string, state: modes.IState, filePath?: string): ILineTokens;'
      },
      {
        orig: `
  public tokenize2(line: string, state: modes.IState, offsetDelta: number): TokenizationResult2 {
		let actualResult = this._actual.tokenize(line, state);
        `,
        new: `
        public tokenize2(line: string, state: modes.IState, offsetDelta: number, filePath?: string): TokenizationResult2 {
		let actualResult = this._actual.tokenize(line, state, filePath);
        `
      }
    ]
  },
  /**
   * We have our own better rename experience
   */
  {
    filePath: './vscode/src/vs/editor/contrib/rename/browser/rename.ts',
    fixes: [
      {
        orig: `
@editorAction
export class RenameAction extends EditorAction {
        `,
        new: `
export class RenameAction extends EditorAction {
        `
      }
    ],
  },
  /**
   * Fix bug https://github.com/Microsoft/vscode/issues/18002
   */
  {
    filePath: './vscode/src/vs/editor/contrib/rename/browser/rename.ts',
    fixes: [
      {
        orig: `
@editorContribution
class RenameController implements IEditorContribution {
        `,
        new: `
class RenameController implements IEditorContribution {
        `
      }
    ]
  }
]
declare var process;
fixesForFiles.forEach(fff => {
  let content = readFile(fff.filePath);
  content = content.split(/\r\n?|\n/).join('\n');
  fff.fixes.forEach(fix => {
    const orig = fix.orig.split(/\r\n?|\n/).join('\n').trim();
    if (content.indexOf(orig) === -1) {
      // OH OH . Fix no longer valid
      console.log('FIX ORIG NOT FOUND:', fff.filePath);
      console.log(fix)
      process.exit(1);
    }
    content = content.replace(orig, fix.new);
  })
  if (fff.additions) {
    content = content + fff.additions;
  }
  writeFile(fff.filePath, content);
})
