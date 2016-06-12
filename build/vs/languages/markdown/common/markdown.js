/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.3.1(undefined)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/

(function() {
var __m = ["vs/languages/markdown/common/markdownTokenTypes","exports","require","vs/languages/markdown/common/markdown","vs/editor/common/modes/monarch/monarchCompile","vs/editor/common/modes","vs/platform/thread/common/threadService","vs/languages/html/common/html","vs/base/common/async","vs/platform/instantiation/common/instantiation","vs/platform/thread/common/thread","vs/platform/configuration/common/configuration","vs/editor/common/services/editorWorkerService","vs/editor/common/modes/abstractMode","vs/editor/common/modes/monarch/monarchLexer","vs/editor/common/modes/languageConfigurationRegistry","vs/editor/common/services/modeService"];
var __M = function(deps) {
  var result = [];
  for (var i = 0, len = deps.length; i < len; i++) {
    result[i] = __m[deps[i]];
  }
  return result;
};
define(__m[0], __M([2,1]), function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    exports.TOKEN_HEADER_LEAD = 'entity.name.tag';
    exports.TOKEN_HEADER = 'entity.name.tag';
    exports.TOKEN_EXT_HEADER = 'entity.other.attribute-name';
    exports.TOKEN_SEPARATOR = 'meta.separator';
    exports.TOKEN_QUOTE = 'comment';
    exports.TOKEN_LIST = 'keyword';
    exports.TOKEN_BLOCK = 'string';
    exports.TOKEN_BLOCK_CODE = 'variable.source';
});
/*
// old settings
export const TOKEN_HEADER_LEAD = 'white';
export const TOKEN_HEADER = 'keyword.1';
export const TOKEN_EXT_HEADER = 'keyword.header';
export const TOKEN_SEPARATOR = 'keyword.header';
export const TOKEN_QUOTE = 'comment';
export const TOKEN_LIST = 'string.list';
export const TOKEN_BLOCK = 'variable';
export const TOKEN_BLOCK_CODE = 'variable.code';
*/ 

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(__m[3], __M([2,1,4,5,6,7,0,16,9,10,11,12,13,14,15,8]), function (require, exports, Compile, Modes, threadService_1, html_1, markdownTokenTypes, modeService_1, instantiation_1, thread_1, configuration_1, editorWorkerService_1, abstractMode_1, monarchLexer_1, languageConfigurationRegistry_1, async_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    exports.language = {
        defaultToken: '',
        tokenPostfix: '.md',
        // escape codes
        control: /[\\`*_\[\]{}()#+\-\.!]/,
        noncontrol: /[^\\`*_\[\]{}()#+\-\.!]/,
        escapes: /\\(?:@control)/,
        // escape codes for javascript/CSS strings
        jsescapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,
        // non matched elements
        empty: [
            'area', 'base', 'basefont', 'br', 'col', 'frame',
            'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param'
        ],
        tokenizer: {
            root: [
                // headers (with #)
                [/^(\s{0,3})(#+)((?:[^\\#]|@escapes)+)((?:#+)?)/, ['white', markdownTokenTypes.TOKEN_HEADER_LEAD, markdownTokenTypes.TOKEN_HEADER, markdownTokenTypes.TOKEN_HEADER]],
                // headers (with =)
                [/^\s*(=+|\-+)\s*$/, markdownTokenTypes.TOKEN_EXT_HEADER],
                // headers (with ***)
                [/^\s*((\*[ ]?)+)\s*$/, markdownTokenTypes.TOKEN_SEPARATOR],
                // quote
                [/^\s*>+/, markdownTokenTypes.TOKEN_QUOTE],
                // list (starting with * or number)
                [/^\s*([\*\-+:]|\d+\.)\s/, markdownTokenTypes.TOKEN_LIST],
                // code block (4 spaces indent)
                [/^(\t|[ ]{4})[^ ].*$/, markdownTokenTypes.TOKEN_BLOCK],
                // code block (3 tilde)
                [/^\s*~{3}\s*((?:\w|[\/\-#])+)?\s*$/, { token: markdownTokenTypes.TOKEN_BLOCK, next: '@codeblock' }],
                // github style code blocks (with backticks and language)
                [/^\s*```\s*((?:\w|[\/\-#])+)\s*$/, { token: markdownTokenTypes.TOKEN_BLOCK, next: '@codeblockgh', nextEmbedded: '$1' }],
                // github style code blocks (with backticks but no language)
                [/^\s*`{3}\s*$/, { token: markdownTokenTypes.TOKEN_BLOCK, next: '@codeblock' }],
                // markup within lines
                { include: '@linecontent' },
            ],
            codeblock: [
                [/^\s*~{3}\s*$/, { token: markdownTokenTypes.TOKEN_BLOCK, next: '@pop' }],
                [/^\s*`{3}\s*$/, { token: markdownTokenTypes.TOKEN_BLOCK, next: '@pop' }],
                [/.*$/, markdownTokenTypes.TOKEN_BLOCK_CODE],
            ],
            // github style code blocks
            codeblockgh: [
                [/```\s*$/, { token: '@rematch', switchTo: '@codeblockghend', nextEmbedded: '@pop' }],
                [/[^`]*$/, markdownTokenTypes.TOKEN_BLOCK_CODE],
            ],
            codeblockghend: [
                [/\s*```/, { token: markdownTokenTypes.TOKEN_BLOCK_CODE, next: '@pop' }],
                [/./, '@rematch', '@pop'],
            ],
            linecontent: [
                // escapes
                [/&\w+;/, 'string.escape'],
                [/@escapes/, 'escape'],
                // various markup
                [/\b__([^\\_]|@escapes|_(?!_))+__\b/, 'strong'],
                [/\*\*([^\\*]|@escapes|\*(?!\*))+\*\*/, 'strong'],
                [/\b_[^_]+_\b/, 'emphasis'],
                [/\*([^\\*]|@escapes)+\*/, 'emphasis'],
                [/`([^\\`]|@escapes)+`/, 'variable'],
                // links
                [/\{[^}]+\}/, 'string.target'],
                [/(!?\[)((?:[^\]\\]|@escapes)*)(\]\([^\)]+\))/, ['string.link', '', 'string.link']],
                [/(!?\[)((?:[^\]\\]|@escapes)*)(\])/, 'string.link'],
                // or html
                { include: 'html' },
            ],
            // Note: it is tempting to rather switch to the real HTML mode instead of building our own here
            // but currently there is a limitation in Monarch that prevents us from doing it: The opening
            // '<' would start the HTML mode, however there is no way to jump 1 character back to let the
            // HTML mode also tokenize the opening angle bracket. Thus, even though we could jump to HTML,
            // we cannot correctly tokenize it in that mode yet.
            html: [
                // html tags
                [/<(\w+)\/>/, html_1.htmlTokenTypes.getTag('$1')],
                [/<(\w+)/, {
                        cases: {
                            '@empty': { token: html_1.htmlTokenTypes.getTag('$1'), next: '@tag.$1' },
                            '@default': { token: html_1.htmlTokenTypes.getTag('$1'), bracket: '@open', next: '@tag.$1' }
                        }
                    }],
                [/<\/(\w+)\s*>/, { token: html_1.htmlTokenTypes.getTag('$1'), bracket: '@close' }],
                [/<!--/, 'comment', '@comment']
            ],
            comment: [
                [/[^<\-]+/, 'comment.content'],
                [/-->/, 'comment', '@pop'],
                [/<!--/, 'comment.content.invalid'],
                [/[<\-]/, 'comment.content']
            ],
            // Almost full HTML tag matching, complete with embedded scripts & styles
            tag: [
                [/[ \t\r\n]+/, 'white'],
                [/(type)(\s*=\s*)(")([^"]+)(")/, [html_1.htmlTokenTypes.ATTRIB_NAME, html_1.htmlTokenTypes.DELIM_ASSIGN, html_1.htmlTokenTypes.ATTRIB_VALUE,
                        { token: html_1.htmlTokenTypes.ATTRIB_VALUE, switchTo: '@tag.$S2.$4' },
                        html_1.htmlTokenTypes.ATTRIB_VALUE]],
                [/(type)(\s*=\s*)(')([^']+)(')/, [html_1.htmlTokenTypes.ATTRIB_NAME, html_1.htmlTokenTypes.DELIM_ASSIGN, html_1.htmlTokenTypes.ATTRIB_VALUE,
                        { token: html_1.htmlTokenTypes.ATTRIB_VALUE, switchTo: '@tag.$S2.$4' },
                        html_1.htmlTokenTypes.ATTRIB_VALUE]],
                [/(\w+)(\s*=\s*)("[^"]*"|'[^']*')/, [html_1.htmlTokenTypes.ATTRIB_NAME, html_1.htmlTokenTypes.DELIM_ASSIGN, html_1.htmlTokenTypes.ATTRIB_VALUE]],
                [/\w+/, html_1.htmlTokenTypes.ATTRIB_NAME],
                [/\/>/, html_1.htmlTokenTypes.getTag('$S2'), '@pop'],
                [/>/, {
                        cases: {
                            '$S2==style': { token: html_1.htmlTokenTypes.getTag('$S2'), switchTo: '@embedded.$S2', nextEmbedded: 'text/css' },
                            '$S2==script': {
                                cases: {
                                    '$S3': { token: html_1.htmlTokenTypes.getTag('$S2'), switchTo: '@embedded.$S2', nextEmbedded: '$S3' },
                                    '@default': { token: html_1.htmlTokenTypes.getTag('$S2'), switchTo: '@embedded.$S2', nextEmbedded: 'text/javascript' }
                                }
                            },
                            '@default': { token: html_1.htmlTokenTypes.getTag('$S2'), next: '@pop' }
                        }
                    }],
            ],
            embedded: [
                [/[^"'<]+/, ''],
                [/<\/(\w+)\s*>/, {
                        cases: {
                            '$1==$S2': { token: '@rematch', next: '@pop', nextEmbedded: '@pop' },
                            '@default': ''
                        }
                    }],
                [/"([^"\\]|\\.)*$/, 'string.invalid'],
                [/'([^'\\]|\\.)*$/, 'string.invalid'],
                [/"/, 'string', '@string."'],
                [/'/, 'string', '@string.\''],
                [/</, '']
            ],
            // scan embedded strings in javascript or css
            string: [
                [/[^\\"']+/, 'string'],
                [/@jsescapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/["']/, {
                        cases: {
                            '$#==$S2': { token: 'string', next: '@pop' },
                            '@default': 'string'
                        }
                    }]
            ]
        }
    };
    var MarkdownMode = (function (_super) {
        __extends(MarkdownMode, _super);
        function MarkdownMode(descriptor, instantiationService, threadService, modeService, editorWorkerService, configurationService) {
            _super.call(this, descriptor.id);
            var lexer = Compile.compile(descriptor.id, exports.language);
            this._modeWorkerManager = new abstractMode_1.ModeWorkerManager(descriptor, 'vs/languages/markdown/common/markdownWorker', 'MarkdownWorker', null, instantiationService);
            this._threadService = threadService;
            this.emitOutputSupport = this;
            this.configSupport = this;
            this.tokenizationSupport = monarchLexer_1.createTokenizationSupport(modeService, this, lexer);
            languageConfigurationRegistry_1.LanguageConfigurationRegistry.register(this.getId(), MarkdownMode.LANG_CONFIG);
            Modes.SuggestRegistry.register(this.getId(), {
                triggerCharacters: [],
                shouldAutotriggerSuggest: false,
                provideCompletionItems: function (model, position, token) {
                    return async_1.wireCancellationToken(token, editorWorkerService.textualSuggest(model.uri, position));
                }
            }, true);
        }
        MarkdownMode.prototype._worker = function (runner) {
            return this._modeWorkerManager.worker(runner);
        };
        MarkdownMode.prototype.configure = function (options) {
            if (this._threadService.isInMainThread) {
                return this._configureWorkers(options);
            }
            else {
                return this._worker(function (w) { return w._doConfigure(options); });
            }
        };
        MarkdownMode.prototype._configureWorkers = function (options) {
            return this._worker(function (w) { return w._doConfigure(options); });
        };
        MarkdownMode.prototype.getEmitOutput = function (resource, absoluteWorkerResourcesPath) {
            return this._worker(function (w) { return w.getEmitOutput(resource, absoluteWorkerResourcesPath); });
        };
        MarkdownMode.LANG_CONFIG = {
            comments: {
                blockComment: ['<!--', '-->',]
            },
            brackets: [['{', '}'], ['[', ']'], ['(', ')'], ['<', '>']],
            autoClosingPairs: []
        };
        MarkdownMode.$_configureWorkers = threadService_1.AllWorkersAttr(MarkdownMode, MarkdownMode.prototype._configureWorkers);
        MarkdownMode.$getEmitOutput = threadService_1.OneWorkerAttr(MarkdownMode, MarkdownMode.prototype.getEmitOutput);
        MarkdownMode = __decorate([
            __param(1, instantiation_1.IInstantiationService),
            __param(2, thread_1.IThreadService),
            __param(3, modeService_1.IModeService),
            __param(4, editorWorkerService_1.IEditorWorkerService),
            __param(5, configuration_1.IConfigurationService)
        ], MarkdownMode);
        return MarkdownMode;
    }(abstractMode_1.AbstractMode));
    exports.MarkdownMode = MarkdownMode;
});

}).call(this);
//# sourceMappingURL=markdown.js.map
