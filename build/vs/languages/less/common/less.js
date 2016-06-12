/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.3.1(undefined)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/

(function() {
var __m = ["vs/languages/less/common/lessTokenTypes","exports","require","vs/languages/less/common/less","vs/editor/common/modes","vs/editor/common/modes/monarch/monarchCompile","vs/editor/common/modes/abstractMode","vs/platform/thread/common/threadService","vs/editor/common/modes/languageConfigurationRegistry","vs/platform/instantiation/common/instantiation","vs/platform/thread/common/thread","vs/editor/common/services/modelService","vs/editor/common/services/editorWorkerService","vs/base/common/async","vs/editor/common/modes/monarch/monarchLexer","vs/editor/common/services/modeService"];
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
    /* always keep in sync with cssTokenTypes */
    exports.TOKEN_SELECTOR = 'entity.name.selector';
    exports.TOKEN_SELECTOR_TAG = 'entity.name.tag';
    exports.TOKEN_PROPERTY = 'support.type.property-name';
    exports.TOKEN_VALUE = 'support.property-value';
    exports.TOKEN_AT_KEYWORD = 'keyword.control.at-rule';
});

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
define(__m[3], __M([2,1,4,5,0,6,7,15,9,10,11,12,13,14,8]), function (require, exports, modes, Compile, lessTokenTypes, abstractMode_1, threadService_1, modeService_1, instantiation_1, thread_1, modelService_1, editorWorkerService_1, async_1, monarchLexer_1, languageConfigurationRegistry_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    exports.language = {
        defaultToken: '',
        tokenPostfix: '.less',
        identifier: '-?-?([a-zA-Z]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))([\\w\\-]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))*',
        identifierPlus: '-?-?([a-zA-Z:.]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))([\\w\\-:.]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))*',
        brackets: [
            { open: '{', close: '}', token: 'punctuation.curly' },
            { open: '[', close: ']', token: 'punctuation.bracket' },
            { open: '(', close: ')', token: 'punctuation.parenthesis' },
            { open: '<', close: '>', token: 'punctuation.angle' }
        ],
        tokenizer: {
            root: [
                { include: '@nestedJSBegin' },
                ['[ \\t\\r\\n]+', ''],
                { include: '@comments' },
                { include: '@keyword' },
                { include: '@strings' },
                { include: '@numbers' },
                ['[*_]?[a-zA-Z\\-\\s]+(?=:.*(;|(\\\\$)))', lessTokenTypes.TOKEN_PROPERTY, '@attribute'],
                ['url(\\-prefix)?\\(', { token: 'function', bracket: '@open', next: '@urldeclaration' }],
                ['[{}()\\[\\]]', '@brackets'],
                ['[,:;]', 'punctuation'],
                ['#@identifierPlus', lessTokenTypes.TOKEN_SELECTOR + '.id'],
                ['&', lessTokenTypes.TOKEN_SELECTOR_TAG],
                ['\\.@identifierPlus(?=\\()', lessTokenTypes.TOKEN_SELECTOR + '.class', '@attribute'],
                ['\\.@identifierPlus', lessTokenTypes.TOKEN_SELECTOR + '.class'],
                ['@identifierPlus', lessTokenTypes.TOKEN_SELECTOR_TAG],
                { include: '@operators' },
                ['@(@identifier(?=[:,\\)]))', 'variable', '@attribute'],
                ['@(@identifier)', 'variable'],
                ['@', 'key', '@atRules']
            ],
            nestedJSBegin: [
                ['``', 'punctuation.backtick'],
                ['`', { token: 'punctuation.backtick', bracket: '@open', next: '@nestedJSEnd', nextEmbedded: 'text/javascript' }],
            ],
            nestedJSEnd: [
                ['`', { token: 'punctuation.backtick', bracket: '@close', next: '@pop' }],
                ['.', { token: '@rematch', next: '@javascript_block' }],
            ],
            javascript_block: [
                ['`', { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
            ],
            operators: [
                ['[<>=\\+\\-\\*\\/\\^\\|\\~]', 'operator']
            ],
            keyword: [
                ['(@[\\s]*import|![\\s]*important|true|false|when|iscolor|isnumber|isstring|iskeyword|isurl|ispixel|ispercentage|isem|hue|saturation|lightness|alpha|lighten|darken|saturate|desaturate|fadein|fadeout|fade|spin|mix|round|ceil|floor|percentage)\\b', 'keyword']
            ],
            urldeclaration: [
                { include: '@strings' },
                ['[^)\r\n]+', 'string'],
                ['\\)', { token: 'tag', bracket: '@close', next: '@pop' }],
            ],
            attribute: [
                { include: '@nestedJSBegin' },
                { include: '@comments' },
                { include: '@strings' },
                { include: '@numbers' },
                { include: '@keyword' },
                ['[a-zA-Z\\-]+(?=\\()', lessTokenTypes.TOKEN_VALUE, '@attribute'],
                ['>', 'operator', '@pop'],
                ['@identifier', lessTokenTypes.TOKEN_VALUE],
                { include: '@operators' },
                ['@(@identifier)', 'variable'],
                ['[)\\}]', '@brackets', '@pop'],
                ['[{}()\\[\\]>]', '@brackets'],
                ['[;]', 'punctuation', '@pop'],
                ['[,=:]', 'punctuation'],
                ['\\s', ''],
                ['.', lessTokenTypes.TOKEN_VALUE]
            ],
            comments: [
                ['\\/\\*', 'comment', '@comment'],
                ['\\/\\/+.*', 'comment'],
            ],
            comment: [
                ['\\*\\/', 'comment', '@pop'],
                ['.', 'comment'],
            ],
            numbers: [
                ['(\\d*\\.)?\\d+([eE][\\-+]?\\d+)?', { token: lessTokenTypes.TOKEN_VALUE + '.numeric', next: '@units' }],
                ['#[0-9a-fA-F_]+(?!\\w)', lessTokenTypes.TOKEN_VALUE + '.rgb-value']
            ],
            units: [
                ['((em|ex|ch|rem|vw|vh|vm|cm|mm|in|px|pt|pc|deg|grad|rad|turn|s|ms|Hz|kHz|%)\\b)?', lessTokenTypes.TOKEN_VALUE + '.unit', '@pop']
            ],
            strings: [
                ['~?"', { token: 'string.punctuation', bracket: '@open', next: '@stringsEndDoubleQuote' }],
                ['~?\'', { token: 'string.punctuation', bracket: '@open', next: '@stringsEndQuote' }]
            ],
            stringsEndDoubleQuote: [
                ['\\\\"', 'string'],
                ['"', { token: 'string.punctuation', next: '@popall', bracket: '@close' }],
                ['.', 'string']
            ],
            stringsEndQuote: [
                ['\\\\\'', 'string'],
                ['\'', { token: 'string.punctuation', next: '@popall', bracket: '@close' }],
                ['.', 'string']
            ],
            atRules: [
                { include: '@comments' },
                { include: '@strings' },
                ['[()]', 'punctuation'],
                ['[\\{;]', 'punctuation', '@pop'],
                ['.', 'key']
            ]
        }
    };
    var LESSMode = (function (_super) {
        __extends(LESSMode, _super);
        function LESSMode(descriptor, instantiationService, threadService, modeService, modelService, editorWorkerService) {
            var _this = this;
            _super.call(this, descriptor.id);
            var lexer = Compile.compile(descriptor.id, exports.language);
            this._modeWorkerManager = new abstractMode_1.ModeWorkerManager(descriptor, 'vs/languages/less/common/lessWorker', 'LessWorker', 'vs/languages/css/common/cssWorker', instantiationService);
            this._threadService = threadService;
            this.modeService = modeService;
            modes.HoverProviderRegistry.register(this.getId(), {
                provideHover: function (model, position, token) {
                    return async_1.wireCancellationToken(token, _this._provideHover(model.uri, position));
                }
            }, true);
            this.inplaceReplaceSupport = this;
            this.configSupport = this;
            modes.ReferenceProviderRegistry.register(this.getId(), {
                provideReferences: function (model, position, context, token) {
                    return async_1.wireCancellationToken(token, _this._provideReferences(model.uri, position));
                }
            }, true);
            modes.DefinitionProviderRegistry.register(this.getId(), {
                provideDefinition: function (model, position, token) {
                    return async_1.wireCancellationToken(token, _this._provideDefinition(model.uri, position));
                }
            }, true);
            modes.DocumentSymbolProviderRegistry.register(this.getId(), {
                provideDocumentSymbols: function (model, token) {
                    return async_1.wireCancellationToken(token, _this._provideDocumentSymbols(model.uri));
                }
            }, true);
            modes.SuggestRegistry.register(this.getId(), {
                triggerCharacters: [],
                shouldAutotriggerSuggest: true,
                provideCompletionItems: function (model, position, token) {
                    return async_1.wireCancellationToken(token, _this._provideCompletionItems(model.uri, position));
                }
            }, true);
            this.tokenizationSupport = monarchLexer_1.createTokenizationSupport(modeService, this, lexer);
            languageConfigurationRegistry_1.LanguageConfigurationRegistry.register(this.getId(), LESSMode.LANG_CONFIG);
        }
        LESSMode.prototype.creationDone = function () {
            if (this._threadService.isInMainThread) {
                // Pick a worker to do validation
                this._pickAWorkerToValidate();
            }
        };
        LESSMode.prototype._worker = function (runner) {
            return this._modeWorkerManager.worker(runner);
        };
        LESSMode.prototype.configure = function (options) {
            if (this._threadService.isInMainThread) {
                return this._configureWorkers(options);
            }
            else {
                return this._worker(function (w) { return w._doConfigure(options); });
            }
        };
        LESSMode.prototype._configureWorkers = function (options) {
            return this._worker(function (w) { return w._doConfigure(options); });
        };
        LESSMode.prototype.navigateValueSet = function (resource, position, up) {
            return this._worker(function (w) { return w.navigateValueSet(resource, position, up); });
        };
        LESSMode.prototype._pickAWorkerToValidate = function () {
            return this._worker(function (w) { return w.enableValidator(); });
        };
        LESSMode.prototype._provideReferences = function (resource, position) {
            return this._worker(function (w) { return w.provideReferences(resource, position); });
        };
        LESSMode.prototype._provideCompletionItems = function (resource, position) {
            return this._worker(function (w) { return w.provideCompletionItems(resource, position); });
        };
        LESSMode.prototype._provideHover = function (resource, position) {
            return this._worker(function (w) { return w.provideHover(resource, position); });
        };
        LESSMode.prototype._provideDocumentSymbols = function (resource) {
            return this._worker(function (w) { return w.provideDocumentSymbols(resource); });
        };
        LESSMode.prototype._provideDefinition = function (resource, position) {
            return this._worker(function (w) { return w.provideDefinition(resource, position); });
        };
        LESSMode.prototype.findColorDeclarations = function (resource) {
            return this._worker(function (w) { return w.findColorDeclarations(resource); });
        };
        LESSMode.LANG_CONFIG = {
            // TODO@Martin: This definition does not work with umlauts for example
            wordPattern: /(#?-?\d*\.\d\w*%?)|([@#!.:]?[\w-?]+%?)|[@#!.]/g,
            comments: {
                blockComment: ['/*', '*/'],
                lineComment: '//'
            },
            brackets: [['{', '}'], ['[', ']'], ['(', ')'], ['<', '>']],
            autoClosingPairs: [
                { open: '"', close: '"', notIn: ['string', 'comment'] },
                { open: '\'', close: '\'', notIn: ['string', 'comment'] },
                { open: '{', close: '}', notIn: ['string', 'comment'] },
                { open: '[', close: ']', notIn: ['string', 'comment'] },
                { open: '(', close: ')', notIn: ['string', 'comment'] },
                { open: '<', close: '>', notIn: ['string', 'comment'] },
            ]
        };
        LESSMode.$_configureWorkers = threadService_1.AllWorkersAttr(LESSMode, LESSMode.prototype._configureWorkers);
        LESSMode.$navigateValueSet = threadService_1.OneWorkerAttr(LESSMode, LESSMode.prototype.navigateValueSet);
        LESSMode.$_pickAWorkerToValidate = threadService_1.OneWorkerAttr(LESSMode, LESSMode.prototype._pickAWorkerToValidate, thread_1.ThreadAffinity.Group1);
        LESSMode.$_provideReferences = threadService_1.OneWorkerAttr(LESSMode, LESSMode.prototype._provideReferences);
        LESSMode.$_provideCompletionItems = threadService_1.OneWorkerAttr(LESSMode, LESSMode.prototype._provideCompletionItems);
        LESSMode.$_provideHover = threadService_1.OneWorkerAttr(LESSMode, LESSMode.prototype._provideHover);
        LESSMode.$_provideDocumentSymbols = threadService_1.OneWorkerAttr(LESSMode, LESSMode.prototype._provideDocumentSymbols);
        LESSMode.$_provideDefinition = threadService_1.OneWorkerAttr(LESSMode, LESSMode.prototype._provideDefinition);
        LESSMode.$findColorDeclarations = threadService_1.OneWorkerAttr(LESSMode, LESSMode.prototype.findColorDeclarations);
        LESSMode = __decorate([
            __param(1, instantiation_1.IInstantiationService),
            __param(2, thread_1.IThreadService),
            __param(3, modeService_1.IModeService),
            __param(4, modelService_1.IModelService),
            __param(5, editorWorkerService_1.IEditorWorkerService)
        ], LESSMode);
        return LESSMode;
    }(abstractMode_1.AbstractMode));
    exports.LESSMode = LESSMode;
});

}).call(this);
//# sourceMappingURL=less.js.map
