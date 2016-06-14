/**
 * Copied off https://github.com/Microsoft/vscode/blob/d436ded577a95a9cc3d43f4ece8f848b524ce430/src/vs/editor/standalone-languages/all.ts
 * Which was the last vscode version to ship these languages built in
 */

'use strict';

export let MonacoEditorLanguages: any[] = [];

// MonacoEditorLanguages.push({
// 	id: 'bat',
// 	extensions: [ '.bat', '.cmd'],
// 	aliases: [ 'Batch', 'bat' ],
// 	moduleId: 'vs/editor/standalone-languages/bat'
// });
MonacoEditorLanguages.push({
	id: 'coffeescript',
	extensions: [ '.coffee' ],
	aliases: [ 'CoffeeScript', 'coffeescript', 'coffee' ],
	mimetypes: ['text/x-coffeescript', 'text/coffeescript'],
	module: 'vs/editor/standalone-languages/coffee'
});
MonacoEditorLanguages.push({
	id: 'c',
	extensions: [ '.c', '.h' ],
	aliases: [ 'C', 'c' ],
	module: 'vs/editor/standalone-languages/cpp'
});
MonacoEditorLanguages.push({
	id: 'cpp',
	extensions: [ '.cpp', '.cc', '.cxx', '.hpp', '.hh', '.hxx' ],
	aliases: [ 'C++', 'Cpp', 'cpp'],
	module: 'vs/editor/standalone-languages/cpp'
});
MonacoEditorLanguages.push({
	id: 'csharp',
	extensions: [ '.cs', '.csx' ],
	aliases: [ 'C#', 'csharp' ],
	module: 'vs/editor/standalone-languages/csharp'
});
MonacoEditorLanguages.push({
	id: 'dockerfile',
	extensions: [ '.dockerfile' ],
	filenames: [ 'Dockerfile' ],
	aliases: [ 'Dockerfile' ],
	module: 'vs/editor/standalone-languages/dockerfile'
});
MonacoEditorLanguages.push({
	id: 'fsharp',
	extensions: [ '.fs', '.fsi', '.ml', '.mli', '.fsx', '.fsscript' ],
	aliases: [ 'F#', 'FSharp', 'fsharp' ],
	module: 'vs/editor/standalone-languages/fsharp'
});
MonacoEditorLanguages.push({
	id: 'go',
	extensions: [ '.go' ],
	aliases: [ 'Go' ],
	module: 'vs/editor/standalone-languages/go'
});
MonacoEditorLanguages.push({
	id: 'ini',
	extensions: [ '.ini', '.properties', '.gitconfig' ],
	filenames: ['config', '.gitattributes', '.gitconfig', '.editorconfig'],
	aliases: [ 'Ini', 'ini' ],
	module: 'vs/editor/standalone-languages/ini'
});
MonacoEditorLanguages.push({
	id: 'jade',
	extensions: [ '.jade', '.pug' ],
	aliases: [ 'Jade', 'jade' ],
	module: 'vs/editor/standalone-languages/jade'
});
MonacoEditorLanguages.push({
	id: 'java',
	extensions: [ '.java', '.jav' ],
	aliases: [ 'Java', 'java' ],
	mimetypes: ['text/x-java-source', 'text/x-java'],
	module: 'vs/editor/standalone-languages/java'
});
MonacoEditorLanguages.push({
	id: 'lua',
	extensions: [ '.lua' ],
	aliases: [ 'Lua', 'lua' ],
	module: 'vs/editor/standalone-languages/lua'
});
MonacoEditorLanguages.push({
	id: 'objective-c',
	extensions: [ '.m' ],
	aliases: [ 'Objective-C'],
	module: 'vs/editor/standalone-languages/objective-c'
});
MonacoEditorLanguages.push({
	id: 'powershell',
	extensions: [ '.ps1', '.psm1', '.psd1' ],
	aliases: [ 'PowerShell', 'powershell', 'ps', 'ps1' ],
	module: 'vs/editor/standalone-languages/powershell'
});
MonacoEditorLanguages.push({
	id: 'python',
	extensions: [ '.py', '.rpy', '.pyw', '.cpy', '.gyp', '.gypi' ],
	aliases: [ 'Python', 'py' ],
	firstLine: '^#!/.*\\bpython[0-9.-]*\\b',
	module: 'vs/editor/standalone-languages/python'
});
MonacoEditorLanguages.push({
	id: 'r',
	extensions: [ '.r', '.rhistory', '.rprofile', '.rt' ],
	aliases: [ 'R', 'r' ],
	module: 'vs/editor/standalone-languages/r'
});
MonacoEditorLanguages.push({
	id: 'ruby',
	extensions: [ '.rb', '.rbx', '.rjs', '.gemspec', '.pp' ],
	filenames: [ 'rakefile' ],
	aliases: [ 'Ruby', 'rb' ],
	module: 'vs/editor/standalone-languages/ruby'
});
MonacoEditorLanguages.push({
	id: 'swift',
	aliases: ['Swift','swift'],
	extensions: ['.swift'],
	mimetypes: ['text/swift'],
	module: 'vs/editor/standalone-languages/swift'
});
MonacoEditorLanguages.push({
	id: 'sql',
	extensions: [ '.sql' ],
	aliases: [ 'SQL' ],
	module: 'vs/editor/standalone-languages/sql'
});
MonacoEditorLanguages.push({
	id: 'vb',
	extensions: [ '.vb' ],
	aliases: [ 'Visual Basic', 'vb' ],
	module: 'vs/editor/standalone-languages/vb'
});
MonacoEditorLanguages.push({
	id: 'xml',
	extensions: [ '.xml', '.dtd', '.ascx', '.csproj', '.config', '.wxi', '.wxl', '.wxs', '.xaml', '.svg', '.svgz' ],
	firstLine : '(\\<\\?xml.*)|(\\<svg)|(\\<\\!doctype\\s+svg)',
	aliases: [ 'XML', 'xml' ],
	mimetypes: ['text/xml', 'application/xml', 'application/xaml+xml', 'application/xml-dtd'],
	module: 'vs/editor/standalone-languages/xml'
});


declare var require:<T>(moduleId:[string], callback:(module:T)=>void, error:(err:any)=>void)=>void;
interface ILang extends monaco.languages.ILanguageExtensionPoint {
	module: string;
}
interface ILangImpl {
	conf: monaco.languages.LanguageConfiguration;
	language: monaco.languages.IMonarchLanguage;
}
let languageDefinitions:{[languageId:string]:ILang} = {};
export function loadLanguage(languageId:string): monaco.Promise<void> {
	let module = languageDefinitions[languageId].module;
	return new monaco.Promise<void>((c, e, p) => {
		require<ILangImpl>([module], (mod) => {
			monaco.languages.setMonarchTokensProvider(languageId, mod.language);
			monaco.languages.setLanguageConfiguration(languageId, mod.conf);
			c(void 0);
		}, e);
	});
}

function registerLanguage(def:any): void {
	let languageId = def.id;

	languageDefinitions[languageId] = def;
	monaco.languages.register(def);
	monaco.languages.onLanguage(languageId, () => {
		loadLanguage(languageId);
	});
}

MonacoEditorLanguages.forEach(registerLanguage);
