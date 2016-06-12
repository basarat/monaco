/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.3.1(undefined)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/

(function() {
var __m = ["vs/languages/sass/common/sassTokenTypes","exports","require","vs/languages/sass/common/sass","vs/editor/common/modes/monarch/monarchCompile","vs/editor/common/modes","vs/editor/common/modes/abstractMode","vs/platform/thread/common/threadService","vs/editor/common/modes/languageConfigurationRegistry","vs/platform/instantiation/common/instantiation","vs/platform/thread/common/thread","vs/editor/common/services/modelService","vs/editor/common/services/editorWorkerService","vs/base/common/async","vs/editor/common/modes/monarch/monarchLexer","vs/editor/common/services/modeService"];
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
define(__m[3], __M([2,1,4,5,0,6,7,15,9,10,11,12,13,14,8]), function (require, exports, Compile, modes, sassTokenTypes, abstractMode_1, threadService_1, modeService_1, instantiation_1, thread_1, modelService_1, editorWorkerService_1, async_1, monarchLexer_1, languageConfigurationRegistry_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    exports.language = {
        defaultToken: '',
        tokenPostfix: '.scss',
        ws: '[ \t\n\r\f]*',
        identifier: '-?-?([a-zA-Z]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))([\\w\\-]|(\\\\(([0-9a-fA-F]{1,6}\\s?)|[^[0-9a-fA-F])))*',
        brackets: [
            { open: '{', close: '}', token: 'punctuation.curly' },
            { open: '[', close: ']', token: 'punctuation.bracket' },
            { open: '(', close: ')', token: 'punctuation.parenthesis' },
            { open: '<', close: '>', token: 'punctuation.angle' }
        ],
        tokenizer: {
            root: [
                { include: '@selector' },
            ],
            selector: [
                { include: '@comments' },
                { include: '@import' },
                { include: '@variabledeclaration' },
                { include: '@warndebug' },
                ['[@](include)', { token: sassTokenTypes.TOKEN_AT_KEYWORD, next: '@includedeclaration' }],
                ['[@](keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes)', { token: sassTokenTypes.TOKEN_AT_KEYWORD, next: '@keyframedeclaration' }],
                ['[@](page|content|font-face|-moz-document)', { token: sassTokenTypes.TOKEN_AT_KEYWORD }],
                ['[@](charset|namespace)', { token: sassTokenTypes.TOKEN_AT_KEYWORD, next: '@declarationbody' }],
                ['[@](function)', { token: sassTokenTypes.TOKEN_AT_KEYWORD, next: '@functiondeclaration' }],
                ['[@](mixin)', { token: sassTokenTypes.TOKEN_AT_KEYWORD, next: '@mixindeclaration' }],
                ['url(\\-prefix)?\\(', { token: 'support.function.name', bracket: '@open', next: '@urldeclaration' }],
                { include: '@controlstatement' },
                { include: '@selectorname' },
                ['[&\\*]', sassTokenTypes.TOKEN_SELECTOR_TAG],
                ['[>\\+,]', 'punctuation'],
                ['\\[', { token: 'punctuation.bracket', bracket: '@open', next: '@selectorattribute' }],
                ['{', { token: 'punctuation.curly', bracket: '@open', next: '@selectorbody' }],
            ],
            selectorbody: [
                ['[*_]?@identifier@ws:(?=(\\s|\\d|[^{;}]*[;}]))', sassTokenTypes.TOKEN_PROPERTY, '@rulevalue'],
                { include: '@selector' },
                ['[@](extend)', { token: sassTokenTypes.TOKEN_AT_KEYWORD, next: '@extendbody' }],
                ['[@](return)', { token: sassTokenTypes.TOKEN_AT_KEYWORD, next: '@declarationbody' }],
                ['}', { token: 'punctuation.curly', bracket: '@close', next: '@pop' }],
            ],
            selectorname: [
                ['#{', { token: 'support.function.interpolation', bracket: '@open', next: '@variableinterpolation' }],
                ['(\\.|#(?=[^{])|%|(@identifier)|:)+', sassTokenTypes.TOKEN_SELECTOR],
            ],
            selectorattribute: [
                { include: '@term' },
                [']', { token: 'punctuation.bracket', bracket: '@close', next: '@pop' }],
            ],
            term: [
                { include: '@comments' },
                ['url(\\-prefix)?\\(', { token: 'support.function.name', bracket: '@open', next: '@urldeclaration' }],
                { include: '@functioninvocation' },
                { include: '@numbers' },
                { include: '@strings' },
                { include: '@variablereference' },
                ['(and\\b|or\\b|not\\b)', 'keyword.operator'],
                { include: '@name' },
                ['([<>=\\+\\-\\*\\/\\^\\|\\~,])', 'keyword.operator'],
                [',', 'punctuation'],
                ['!default', 'literal'],
                ['\\(', { token: 'punctuation.parenthesis', bracket: '@open', next: '@parenthizedterm' }],
            ],
            rulevalue: [
                { include: '@term' },
                ['!important', 'literal'],
                [';', 'punctuation', '@pop'],
                ['{', { token: 'punctuation.curly', bracket: '@open', switchTo: '@nestedproperty' }],
                ['(?=})', { token: '', next: '@pop' }],
            ],
            nestedproperty: [
                ['[*_]?@identifier@ws:', sassTokenTypes.TOKEN_PROPERTY, '@rulevalue'],
                { include: '@comments' },
                ['}', { token: 'punctuation.curly', bracket: '@close', next: '@pop' }],
            ],
            warndebug: [
                ['[@](warn|debug)', { token: sassTokenTypes.TOKEN_AT_KEYWORD, next: '@declarationbody' }],
            ],
            import: [
                ['[@](import)', { token: sassTokenTypes.TOKEN_AT_KEYWORD, next: '@declarationbody' }],
            ],
            variabledeclaration: [
                ['\\$@identifier@ws:', 'variable.decl', '@declarationbody'],
            ],
            urldeclaration: [
                { include: '@strings' },
                ['[^)\r\n]+', 'string'],
                ['\\)', { token: 'support.function.name', bracket: '@close', next: '@pop' }],
            ],
            parenthizedterm: [
                { include: '@term' },
                ['\\)', { token: 'punctuation.parenthesis', bracket: '@close', next: '@pop' }],
            ],
            declarationbody: [
                { include: '@term' },
                [';', 'punctuation', '@pop'],
                ['(?=})', { token: '', next: '@pop' }],
            ],
            extendbody: [
                { include: '@selectorname' },
                ['!optional', 'literal'],
                [';', 'punctuation', '@pop'],
                ['(?=})', { token: '', next: '@pop' }],
            ],
            variablereference: [
                ['\\$@identifier', 'variable.ref'],
                ['\\.\\.\\.', 'keyword.operator'],
                ['#{', { token: 'support.function.interpolation', bracket: '@open', next: '@variableinterpolation' }],
            ],
            variableinterpolation: [
                { include: '@variablereference' },
                ['}', { token: 'support.function.interpolation', bracket: '@close', next: '@pop' }],
            ],
            comments: [
                ['\\/\\*', 'comment', '@comment'],
                ['\\/\\/+.*', 'comment'],
            ],
            comment: [
                ['\\*\\/', 'comment', '@pop'],
                ['.', 'comment'],
            ],
            name: [
                ['@identifier', sassTokenTypes.TOKEN_VALUE],
            ],
            numbers: [
                ['(\\d*\\.)?\\d+([eE][\\-+]?\\d+)?', { token: 'constant.numeric', next: '@units' }],
                ['#[0-9a-fA-F_]+(?!\\w)', 'constant.rgb-value'],
            ],
            units: [
                ['(em|ex|ch|rem|vw|vh|vm|cm|mm|in|px|pt|pc|deg|grad|rad|turn|s|ms|Hz|kHz|%)?', 'constant.numeric', '@pop']
            ],
            functiondeclaration: [
                ['@identifier@ws\\(', { token: 'support.function.name', bracket: '@open', next: '@parameterdeclaration' }],
                ['{', { token: 'punctuation.curly', bracket: '@open', switchTo: '@functionbody' }],
            ],
            mixindeclaration: [
                // mixin with parameters
                ['@identifier@ws\\(', { token: 'support.function.name', bracket: '@open', next: '@parameterdeclaration' }],
                // mixin without parameters
                ['@identifier', 'support.function.name'],
                ['{', { token: 'punctuation.curly', bracket: '@open', switchTo: '@selectorbody' }],
            ],
            parameterdeclaration: [
                ['\\$@identifier@ws:', 'variable'],
                ['\\.\\.\\.', 'keyword.operator'],
                [',', 'punctuation'],
                { include: '@term' },
                ['\\)', { token: 'support.function.name', bracket: '@close', next: '@pop' }],
            ],
            includedeclaration: [
                { include: '@functioninvocation' },
                ['@identifier', 'support.function.name'],
                [';', 'punctuation', '@pop'],
                ['(?=})', { token: '', next: '@pop' }],
                ['{', { token: 'punctuation.curly', bracket: '@open', switchTo: '@selectorbody' }],
            ],
            keyframedeclaration: [
                ['@identifier', 'support.function.name'],
                ['{', { token: 'punctuation.curly', bracket: '@open', switchTo: '@keyframebody' }],
            ],
            keyframebody: [
                { include: '@term' },
                ['{', { token: 'punctuation.curly', bracket: '@open', next: '@selectorbody' }],
                ['}', { token: 'punctuation.curly', bracket: '@close', next: '@pop' }],
            ],
            controlstatement: [
                ['[@](if|else|for|while|each|media)', { token: 'keyword.flow.control.at-rule', next: '@controlstatementdeclaration' }],
            ],
            controlstatementdeclaration: [
                ['(in|from|through|if|to)\\b', { token: 'keyword.flow.control.at-rule' }],
                { include: '@term' },
                ['{', { token: 'punctuation.curly', bracket: '@open', switchTo: '@selectorbody' }],
            ],
            functionbody: [
                ['[@](return)', { token: sassTokenTypes.TOKEN_AT_KEYWORD }],
                { include: '@variabledeclaration' },
                { include: '@term' },
                { include: '@controlstatement' },
                [';', 'punctuation'],
                ['}', { token: 'punctuation.curly', bracket: '@close', next: '@pop' }],
            ],
            functioninvocation: [
                ['@identifier\\(', { token: 'support.function.name', bracket: '@open', next: '@functionarguments' }],
            ],
            functionarguments: [
                ['\\$@identifier@ws:', sassTokenTypes.TOKEN_PROPERTY],
                ['[,]', 'punctuation'],
                { include: '@term' },
                ['\\)', { token: 'support.function.name', bracket: '@close', next: '@pop' }],
            ],
            strings: [
                ['~?"', { token: 'string.punctuation', bracket: '@open', next: '@stringenddoublequote' }],
                ['~?\'', { token: 'string.punctuation', bracket: '@open', next: '@stringendquote' }]
            ],
            stringenddoublequote: [
                ['\\\\.', 'string'],
                ['"', { token: 'string.punctuation', next: '@pop', bracket: '@close' }],
                ['.', 'string']
            ],
            stringendquote: [
                ['\\\\.', 'string'],
                ['\'', { token: 'string.punctuation', next: '@pop', bracket: '@close' }],
                ['.', 'string']
            ]
        }
    };
    var SASSMode = (function (_super) {
        __extends(SASSMode, _super);
        function SASSMode(descriptor, instantiationService, threadService, modeService, modelService, editorWorkerService) {
            var _this = this;
            _super.call(this, descriptor.id);
            var lexer = Compile.compile(descriptor.id, exports.language);
            this._modeWorkerManager = new abstractMode_1.ModeWorkerManager(descriptor, 'vs/languages/sass/common/sassWorker', 'SassWorker', 'vs/languages/css/common/cssWorker', instantiationService);
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
            languageConfigurationRegistry_1.LanguageConfigurationRegistry.register(this.getId(), SASSMode.LANG_CONFIG);
        }
        SASSMode.prototype.creationDone = function () {
            if (this._threadService.isInMainThread) {
                // Pick a worker to do validation
                this._pickAWorkerToValidate();
            }
        };
        SASSMode.prototype._worker = function (runner) {
            return this._modeWorkerManager.worker(runner);
        };
        SASSMode.prototype.configure = function (options) {
            if (this._threadService.isInMainThread) {
                return this._configureWorkers(options);
            }
            else {
                return this._worker(function (w) { return w._doConfigure(options); });
            }
        };
        SASSMode.prototype._configureWorkers = function (options) {
            return this._worker(function (w) { return w._doConfigure(options); });
        };
        SASSMode.prototype.navigateValueSet = function (resource, position, up) {
            return this._worker(function (w) { return w.navigateValueSet(resource, position, up); });
        };
        SASSMode.prototype._pickAWorkerToValidate = function () {
            return this._worker(function (w) { return w.enableValidator(); });
        };
        SASSMode.prototype._provideReferences = function (resource, position) {
            return this._worker(function (w) { return w.provideReferences(resource, position); });
        };
        SASSMode.prototype._provideCompletionItems = function (resource, position) {
            return this._worker(function (w) { return w.provideCompletionItems(resource, position); });
        };
        SASSMode.prototype._provideHover = function (resource, position) {
            return this._worker(function (w) { return w.provideHover(resource, position); });
        };
        SASSMode.prototype._provideDocumentSymbols = function (resource) {
            return this._worker(function (w) { return w.provideDocumentSymbols(resource); });
        };
        SASSMode.prototype._provideDefinition = function (resource, position) {
            return this._worker(function (w) { return w.provideDefinition(resource, position); });
        };
        SASSMode.prototype.findColorDeclarations = function (resource) {
            return this._worker(function (w) { return w.findColorDeclarations(resource); });
        };
        SASSMode.LANG_CONFIG = {
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
        SASSMode.$_configureWorkers = threadService_1.AllWorkersAttr(SASSMode, SASSMode.prototype._configureWorkers);
        SASSMode.$navigateValueSet = threadService_1.OneWorkerAttr(SASSMode, SASSMode.prototype.navigateValueSet);
        SASSMode.$_pickAWorkerToValidate = threadService_1.OneWorkerAttr(SASSMode, SASSMode.prototype._pickAWorkerToValidate, thread_1.ThreadAffinity.Group1);
        SASSMode.$_provideReferences = threadService_1.OneWorkerAttr(SASSMode, SASSMode.prototype._provideReferences);
        SASSMode.$_provideCompletionItems = threadService_1.OneWorkerAttr(SASSMode, SASSMode.prototype._provideCompletionItems);
        SASSMode.$_provideHover = threadService_1.OneWorkerAttr(SASSMode, SASSMode.prototype._provideHover);
        SASSMode.$_provideDocumentSymbols = threadService_1.OneWorkerAttr(SASSMode, SASSMode.prototype._provideDocumentSymbols);
        SASSMode.$_provideDefinition = threadService_1.OneWorkerAttr(SASSMode, SASSMode.prototype._provideDefinition);
        SASSMode.$findColorDeclarations = threadService_1.OneWorkerAttr(SASSMode, SASSMode.prototype.findColorDeclarations);
        SASSMode = __decorate([
            __param(1, instantiation_1.IInstantiationService),
            __param(2, thread_1.IThreadService),
            __param(3, modeService_1.IModeService),
            __param(4, modelService_1.IModelService),
            __param(5, editorWorkerService_1.IEditorWorkerService)
        ], SASSMode);
        return SASSMode;
    }(abstractMode_1.AbstractMode));
    exports.SASSMode = SASSMode;
});

}).call(this);
//# sourceMappingURL=sass.js.map
