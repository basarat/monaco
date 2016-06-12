/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.3.1(undefined)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/

(function() {
var __m = ["exports","require","vs/languages/less/common/parser/lessScanner","vs/languages/css/common/parser/cssScanner","vs/languages/less/common/parser/lessParser","vs/nls!vs/languages/less/common/services/intelliSense","vs/languages/less/common/services/intelliSense","vs/languages/css/common/cssWorker","vs/languages/css/common/parser/cssParser","vs/nls","vs/nls!vs/languages/less/common/lessWorker","vs/languages/css/common/parser/cssNodes","vs/languages/css/common/services/intelliSense","vs/languages/less/common/lessWorker","vs/languages/css/common/parser/cssErrors"];
var __M = function(deps) {
  var result = [];
  for (var i = 0, len = deps.length; i < len; i++) {
    result[i] = __m[deps[i]];
  }
  return result;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(__m[2], __M([1,0,3]), function (require, exports, scanner) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var _FSL = '/'.charCodeAt(0);
    var _NWL = '\n'.charCodeAt(0);
    var _CAR = '\r'.charCodeAt(0);
    var _LFD = '\f'.charCodeAt(0);
    var _TIC = '`'.charCodeAt(0);
    var _DOT = '.'.charCodeAt(0);
    var customTokenValue = scanner.TokenType.CustomToken;
    exports.Ellipsis = customTokenValue++;
    var LessScanner = (function (_super) {
        __extends(LessScanner, _super);
        function LessScanner() {
            _super.apply(this, arguments);
        }
        LessScanner.prototype.scan = function () {
            var triviaToken = this.trivia();
            if (triviaToken !== null) {
                return triviaToken;
            }
            var offset = this.stream.pos();
            // LESS: escaped JavaScript code `let a = "dddd"`
            var tokenType = this.escapedJavaScript();
            if (tokenType !== null) {
                return this.finishToken(offset, tokenType);
            }
            if (this.stream.advanceIfChars([_DOT, _DOT, _DOT])) {
                return this.finishToken(offset, exports.Ellipsis);
            }
            return _super.prototype.scan.call(this);
        };
        LessScanner.prototype.comment = function () {
            if (_super.prototype.comment.call(this)) {
                return true;
            }
            if (this.stream.advanceIfChars([_FSL, _FSL])) {
                this.stream.advanceWhileChar(function (ch) {
                    switch (ch) {
                        case _NWL:
                        case _CAR:
                        case _LFD:
                            return false;
                        default:
                            return true;
                    }
                });
                return true;
            }
            else {
                return false;
            }
        };
        LessScanner.prototype.escapedJavaScript = function () {
            var ch = this.stream.peekChar();
            if (ch === _TIC) {
                this.stream.advance(1);
                this.stream.advanceWhileChar(function (ch) { return ch !== _TIC; });
                return this.stream.advanceIfChar(_TIC) ? scanner.TokenType.EscapedJavaScript : scanner.TokenType.BadEscapedJavaScript;
            }
            return null;
        };
        return LessScanner;
    }(scanner.Scanner));
    exports.LessScanner = LessScanner;
});






define(__m[4], __M([1,0,2,3,8,11,14]), function (require, exports, lessScanner, scanner, cssParser, nodes, errors) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    /// <summary>
    /// A parser for LESS
    /// http://lesscss.org/
    /// </summary>
    var LessParser = (function (_super) {
        __extends(LessParser, _super);
        function LessParser() {
            _super.call(this, new lessScanner.LessScanner());
        }
        LessParser.prototype._parseStylesheetStatement = function () {
            return this._tryParseMixinDeclaration() || _super.prototype._parseStylesheetStatement.call(this) || this._parseVariableDeclaration();
        };
        LessParser.prototype._parseImport = function () {
            var node = this.create(nodes.Import);
            if (!this.accept(scanner.TokenType.AtKeyword, '@import') && !this.accept(scanner.TokenType.AtKeyword, '@import-once') /* deprecated in less 1.4.1 */) {
                return null;
            }
            // less 1.4.1: @import (css) "lib"
            if (this.accept(scanner.TokenType.ParenthesisL)) {
                if (!this.accept(scanner.TokenType.Ident)) {
                    return this.finish(node, errors.ParseError.IdentifierExpected, [scanner.TokenType.SemiColon]);
                }
                if (!this.accept(scanner.TokenType.ParenthesisR)) {
                    return this.finish(node, errors.ParseError.RightParenthesisExpected, [scanner.TokenType.SemiColon]);
                }
            }
            if (!this.accept(scanner.TokenType.URI) && !this.accept(scanner.TokenType.String)) {
                return this.finish(node, errors.ParseError.URIOrStringExpected, [scanner.TokenType.SemiColon]);
            }
            node.setMedialist(this._parseMediaList());
            return this.finish(node);
        };
        LessParser.prototype._parseMediaQuery = function (resyncStopToken) {
            var node = _super.prototype._parseMediaQuery.call(this, resyncStopToken);
            if (!node) {
                var node = this.create(nodes.MediaQuery);
                if (node.addChild(this._parseVariable())) {
                    return this.finish(node);
                }
                return null;
            }
            return node;
        };
        LessParser.prototype._parseVariableDeclaration = function (panic) {
            if (panic === void 0) { panic = []; }
            var node = this.create(nodes.VariableDeclaration);
            var mark = this.mark();
            if (!node.setVariable(this._parseVariable())) {
                return null;
            }
            if (this.accept(scanner.TokenType.Colon, ':')) {
                node.colonPosition = this.prevToken.offset;
                if (!node.setValue(this._parseExpr())) {
                    return this.finish(node, errors.ParseError.VariableValueExpected, [], panic);
                }
            }
            else {
                this.restoreAtMark(mark);
                return null; // at keyword, but no ':', not a variable declaration but some at keyword
            }
            if (this.peek(scanner.TokenType.SemiColon)) {
                node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
            }
            return this.finish(node);
        };
        LessParser.prototype._parseVariable = function () {
            var node = this.create(nodes.Variable);
            var mark = this.mark();
            while (this.accept(scanner.TokenType.Delim, '@')) {
                if (this.hasWhitespace()) {
                    this.restoreAtMark(mark);
                    return null;
                }
            }
            if (!this.accept(scanner.TokenType.AtKeyword)) {
                this.restoreAtMark(mark);
                return null;
            }
            return node;
        };
        LessParser.prototype._parseTerm = function () {
            var term = _super.prototype._parseTerm.call(this);
            if (term) {
                return term;
            }
            term = this.create(nodes.Term);
            if (term.setExpression(this._parseVariable()) ||
                term.setExpression(this._parseEscaped())) {
                return this.finish(term);
            }
            return null;
        };
        LessParser.prototype._parseEscaped = function () {
            var node = this.createNode(nodes.NodeType.EscapedValue);
            if (this.accept(scanner.TokenType.EscapedJavaScript) ||
                this.accept(scanner.TokenType.BadEscapedJavaScript)) {
                return this.finish(node);
            }
            if (this.accept(scanner.TokenType.Delim, '~')) {
                return this.finish(node, this.accept(scanner.TokenType.String) ? null : errors.ParseError.TermExpected);
            }
            return null;
        };
        LessParser.prototype._parseOperator = function () {
            var node = this._parseGuardOperator();
            if (node) {
                return node;
            }
            else {
                return _super.prototype._parseOperator.call(this);
            }
        };
        LessParser.prototype._parseGuardOperator = function () {
            var node = this.createNode(nodes.NodeType.Operator);
            if (this.accept(scanner.TokenType.Delim, '>')) {
                this.accept(scanner.TokenType.Delim, '=');
                return node;
            }
            else if (this.accept(scanner.TokenType.Delim, '=')) {
                this.accept(scanner.TokenType.Delim, '<');
                return node;
            }
            else if (this.accept(scanner.TokenType.Delim, '<')) {
                return node;
            }
            return null;
        };
        LessParser.prototype._parseRuleSetDeclaration = function () {
            if (this.peek(scanner.TokenType.AtKeyword)) {
                return this._parseKeyframe()
                    || this._parseMedia()
                    || this._parseVariableDeclaration(); // Variable declarations
            }
            return this._tryParseMixinDeclaration()
                || this._tryParseRuleset(true) // nested ruleset
                || this._parseMixinReference() // less mixin reference
                || this._parseExtend() // less extend declaration
                || _super.prototype._parseRuleSetDeclaration.call(this); // try css ruleset declaration as the last option
        };
        LessParser.prototype._parseSimpleSelectorBody = function () {
            return this._parseSelectorCombinator() || _super.prototype._parseSimpleSelectorBody.call(this);
        };
        LessParser.prototype._parseSelectorCombinator = function () {
            var node = this.createNode(nodes.NodeType.SelectorCombinator);
            if (this.accept(scanner.TokenType.Delim, '&')) {
                while (!this.hasWhitespace() && (this.accept(scanner.TokenType.Delim, '-') || node.addChild(this._parseIdent()) || this.accept(scanner.TokenType.Delim, '&'))) {
                }
                return this.finish(node);
            }
            return null;
        };
        LessParser.prototype._parseSelectorIdent = function () {
            return this._parseIdent() || this._parseSelectorInterpolation();
        };
        LessParser.prototype._parseSelectorInterpolation = function () {
            // Selector interpolation;  old: ~"@{name}", new: @{name}
            var node = this.createNode(nodes.NodeType.SelectorInterpolation);
            if (this.accept(scanner.TokenType.Delim, '~')) {
                if (!this.hasWhitespace() && (this.accept(scanner.TokenType.String) || this.accept(scanner.TokenType.BadString))) {
                    return this.finish(node);
                }
                return this.finish(node, errors.ParseError.StringLiteralExpected);
            }
            else if (this.accept(scanner.TokenType.Delim, '@')) {
                if (this.hasWhitespace() || !this.accept(scanner.TokenType.CurlyL)) {
                    return this.finish(node, errors.ParseError.LeftCurlyExpected);
                }
                if (!node.addChild(this._parseIdent())) {
                    return this.finish(node, errors.ParseError.IdentifierExpected);
                }
                if (!this.accept(scanner.TokenType.CurlyR)) {
                    return this.finish(node, errors.ParseError.RightCurlyExpected);
                }
                return this.finish(node);
            }
            return null;
        };
        LessParser.prototype._tryParseMixinDeclaration = function () {
            if (!this.peek(scanner.TokenType.Delim, '.')) {
                return null;
            }
            var mark = this.mark();
            var node = this.create(nodes.MixinDeclaration);
            if (!node.setIdentifier(this._parseMixinDeclarationIdentifier()) || !this.accept(scanner.TokenType.ParenthesisL)) {
                this.restoreAtMark(mark);
                return null;
            }
            if (node.getParameters().addChild(this._parseMixinParameter())) {
                while (this.accept(scanner.TokenType.Comma) || this.accept(scanner.TokenType.SemiColon)) {
                    if (!node.getParameters().addChild(this._parseMixinParameter())) {
                        return this.finish(node, errors.ParseError.IdentifierExpected);
                    }
                }
            }
            if (!this.accept(scanner.TokenType.ParenthesisR)) {
                return this.finish(node, errors.ParseError.RightParenthesisExpected);
            }
            node.setGuard(this._parseGuard());
            if (!this.peek(scanner.TokenType.CurlyL)) {
                this.restoreAtMark(mark);
                return null;
            }
            return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
        };
        LessParser.prototype._parseMixinDeclarationIdentifier = function () {
            var identifier = this.create(nodes.Identifier); // identifier should contain dot
            this.consumeToken(); // .
            if (this.hasWhitespace() || !this.accept(scanner.TokenType.Ident)) {
                return null;
            }
            identifier.referenceTypes = [nodes.ReferenceType.Mixin];
            return this.finish(identifier);
        };
        LessParser.prototype._parseExtend = function () {
            if (!this.peek(scanner.TokenType.Delim, '&')) {
                return null;
            }
            var mark = this.mark();
            var node = this.create(nodes.ExtendsReference);
            this.consumeToken(); // &
            if (this.hasWhitespace() || !this.accept(scanner.TokenType.Colon) || !this.accept(scanner.TokenType.Ident, 'extend')) {
                this.restoreAtMark(mark);
                return null;
            }
            if (!this.accept(scanner.TokenType.ParenthesisL)) {
                return this.finish(node, errors.ParseError.LeftParenthesisExpected);
            }
            if (!node.setSelector(this._parseSimpleSelector())) {
                return this.finish(node, errors.ParseError.SelectorExpected);
            }
            if (!this.accept(scanner.TokenType.ParenthesisR)) {
                return this.finish(node, errors.ParseError.RightParenthesisExpected);
            }
            return this.finish(node);
        };
        LessParser.prototype._parseMixinReference = function () {
            if (!this.peek(scanner.TokenType.Delim, '.')) {
                return null;
            }
            var node = this.create(nodes.MixinReference);
            var identifier = this.create(nodes.Identifier);
            this.consumeToken(); // dot, part of the identifier
            if (this.hasWhitespace() || !this.accept(scanner.TokenType.Ident)) {
                return this.finish(node, errors.ParseError.IdentifierExpected);
            }
            node.setIdentifier(this.finish(identifier));
            if (!this.hasWhitespace() && this.accept(scanner.TokenType.ParenthesisL)) {
                if (node.getArguments().addChild(this._parseFunctionArgument())) {
                    while (this.accept(scanner.TokenType.Comma) || this.accept(scanner.TokenType.SemiColon)) {
                        if (!node.getArguments().addChild(this._parseExpr())) {
                            return this.finish(node, errors.ParseError.ExpressionExpected);
                        }
                    }
                }
                if (!this.accept(scanner.TokenType.ParenthesisR)) {
                    return this.finish(node, errors.ParseError.RightParenthesisExpected);
                }
                identifier.referenceTypes = [nodes.ReferenceType.Mixin];
            }
            else {
                identifier.referenceTypes = [nodes.ReferenceType.Mixin, nodes.ReferenceType.Rule];
            }
            node.addChild(this._parsePrio());
            return this.finish(node);
        };
        LessParser.prototype._parseMixinParameter = function () {
            var node = this.create(nodes.FunctionParameter);
            // special rest variable: @rest...
            if (this.peek(scanner.TokenType.AtKeyword, '@rest')) {
                var restNode = this.create(nodes.Node);
                this.consumeToken();
                if (!this.accept(lessScanner.Ellipsis)) {
                    return this.finish(node, errors.ParseError.DotExpected, [], [scanner.TokenType.Comma, scanner.TokenType.ParenthesisR]);
                }
                node.setIdentifier(this.finish(restNode));
                return this.finish(node);
            }
            // special var args: ...
            if (this.peek(lessScanner.Ellipsis)) {
                var varargsNode = this.create(nodes.Node);
                this.consumeToken();
                node.setIdentifier(this.finish(varargsNode));
                return this.finish(node);
            }
            // default variable declaration: @param: 12 or @name
            if (node.setIdentifier(this._parseVariable())) {
                this.accept(scanner.TokenType.Colon);
            }
            node.setDefaultValue(this._parseExpr(true));
            return this.finish(node);
        };
        LessParser.prototype._parseGuard = function () {
            var node = this.create(nodes.LessGuard);
            if (!this.accept(scanner.TokenType.Ident, 'when')) {
                return null;
            }
            node.isNegated = this.accept(scanner.TokenType.Ident, 'not');
            if (!node.getConditions().addChild(this._parseGuardCondition())) {
                return this.finish(node, errors.ParseError.ConditionExpected);
            }
            while (this.accept(scanner.TokenType.Ident, 'and') || this.accept(scanner.TokenType.Comma, ',')) {
                if (!node.getConditions().addChild(this._parseGuardCondition())) {
                    return this.finish(node, errors.ParseError.ConditionExpected);
                }
            }
            return this.finish(node);
        };
        LessParser.prototype._parseGuardCondition = function () {
            var node = this.create(nodes.GuardCondition);
            if (!this.accept(scanner.TokenType.ParenthesisL)) {
                return null;
            }
            if (!node.addChild(this._parseExpr())) {
            }
            if (!this.accept(scanner.TokenType.ParenthesisR)) {
                return this.finish(node, errors.ParseError.RightParenthesisExpected);
            }
            return this.finish(node);
        };
        LessParser.prototype._parseFunctionIdentifier = function () {
            if (this.peek(scanner.TokenType.Delim, '%')) {
                var node = this.create(nodes.Identifier);
                node.referenceTypes = [nodes.ReferenceType.Function];
                this.consumeToken();
                return this.finish(node);
            }
            return _super.prototype._parseFunctionIdentifier.call(this);
        };
        return LessParser;
    }(cssParser.Parser));
    exports.LessParser = LessParser;
});

define(__m[5], __M([9,10]), function(nls, data) { return nls.create("vs/languages/less/common/services/intelliSense", data); });





define(__m[6], __M([1,0,12,5]), function (require, exports, cssIntellisense, nls) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var LESSIntellisense = (function (_super) {
        __extends(LESSIntellisense, _super);
        function LESSIntellisense() {
            _super.call(this, '@');
        }
        LESSIntellisense.prototype.createFunctionProposals = function (proposals, result) {
            proposals.forEach(function (p) {
                result.push({
                    label: p.name,
                    typeLabel: p.example,
                    documentationLabel: p.description,
                    codeSnippet: p.name + '({{}})',
                    type: 'function'
                });
            });
            return result;
        };
        LESSIntellisense.prototype.getTermProposals = function (result) {
            this.createFunctionProposals(LESSIntellisense.builtInProposals, result);
            return _super.prototype.getTermProposals.call(this, result);
        };
        LESSIntellisense.prototype.getColorProposals = function (entry, result) {
            this.createFunctionProposals(LESSIntellisense.colorProposals, result);
            return _super.prototype.getColorProposals.call(this, entry, result);
        };
        LESSIntellisense.builtInProposals = [
            {
                'name': 'escape',
                'example': 'escape(@string);',
                'description': nls.localize(0, null)
            },
            {
                'name': 'e',
                'example': 'e(@string);',
                'description': nls.localize(1, null)
            },
            {
                'name': 'replace',
                'example': 'replace(@string, @pattern, @replacement[, @flags]);',
                'description': nls.localize(2, null)
            },
            {
                'name': 'unit',
                'example': 'unit(@dimension, [@unit: \'\']);',
                'description': nls.localize(3, null)
            },
            {
                'name': 'color',
                'example': 'color(@string);',
                'description': nls.localize(4, null)
            },
            {
                'name': 'convert',
                'example': 'convert(@value, unit);',
                'description': nls.localize(5, null)
            },
            {
                'name': 'data-uri',
                'example': 'data-uri([mimetype,] url);',
                'description': nls.localize(6, null)
            },
            {
                'name': 'length',
                'example': 'length(@list);',
                'description': nls.localize(7, null)
            },
            {
                'name': 'extract',
                'example': 'extract(@list, index);',
                'description': nls.localize(8, null)
            },
            {
                'name': 'abs',
                'description': nls.localize(9, null),
                'example': 'abs(number);'
            },
            {
                'name': 'acos',
                'description': nls.localize(10, null),
                'example': 'acos(number);'
            },
            {
                'name': 'asin',
                'description': nls.localize(11, null),
                'example': 'asin(number);'
            },
            {
                'name': 'ceil',
                'example': 'ceil(@number);',
                'description': nls.localize(12, null)
            },
            {
                'name': 'cos',
                'description': nls.localize(13, null),
                'example': 'cos(number);'
            },
            {
                'name': 'floor',
                'description': nls.localize(14, null),
                'example': 'floor(@number);'
            },
            {
                'name': 'percentage',
                'description': nls.localize(15, null),
                'example': 'percentage(@number);'
            },
            {
                'name': 'round',
                'description': nls.localize(16, null),
                'example': 'round(number, [places: 0]);'
            },
            {
                'name': 'sqrt',
                'description': nls.localize(17, null),
                'example': 'sqrt(number);'
            },
            {
                'name': 'sin',
                'description': nls.localize(18, null),
                'example': 'sin(number);'
            },
            {
                'name': 'tan',
                'description': nls.localize(19, null),
                'example': 'tan(number);'
            },
            {
                'name': 'atan',
                'description': nls.localize(20, null),
                'example': 'atan(number);'
            },
            {
                'name': 'pi',
                'description': nls.localize(21, null),
                'example': 'pi();'
            },
            {
                'name': 'pow',
                'description': nls.localize(22, null),
                'example': 'pow(@base, @exponent);'
            },
            {
                'name': 'mod',
                'description': nls.localize(23, null),
                'example': 'mod(number, number);'
            },
            {
                'name': 'min',
                'description': nls.localize(24, null),
                'example': 'min(@x, @y);'
            },
            {
                'name': 'max',
                'description': nls.localize(25, null),
                'example': 'max(@x, @y);'
            }
        ];
        LESSIntellisense.colorProposals = [
            {
                'name': 'argb',
                'example': 'argb(@color);',
                'description': nls.localize(26, null)
            },
            {
                'name': 'hsl',
                'example': 'hsl(@hue, @saturation, @lightness);',
                'description': nls.localize(27, null)
            },
            {
                'name': 'hsla',
                'example': 'hsla(@hue, @saturation, @lightness, @alpha);',
                'description': nls.localize(28, null)
            },
            {
                'name': 'hsv',
                'example': 'hsv(@hue, @saturation, @value);',
                'description': nls.localize(29, null)
            },
            {
                'name': 'hsva',
                'example': 'hsva(@hue, @saturation, @value, @alpha);',
                'description': nls.localize(30, null)
            },
            {
                'name': 'hue',
                'example': 'hue(@color);',
                'description': nls.localize(31, null)
            },
            {
                'name': 'saturation',
                'example': 'saturation(@color);',
                'description': nls.localize(32, null)
            },
            {
                'name': 'lightness',
                'example': 'lightness(@color);',
                'description': nls.localize(33, null)
            },
            {
                'name': 'hsvhue',
                'example': 'hsvhue(@color);',
                'description': nls.localize(34, null)
            },
            {
                'name': 'hsvsaturation',
                'example': 'hsvsaturation(@color);',
                'description': nls.localize(35, null)
            },
            {
                'name': 'hsvvalue',
                'example': 'hsvvalue(@color);',
                'description': nls.localize(36, null)
            },
            {
                'name': 'red',
                'example': 'red(@color);',
                'description': nls.localize(37, null)
            },
            {
                'name': 'green',
                'example': 'green(@color);',
                'description': nls.localize(38, null)
            },
            {
                'name': 'blue',
                'example': 'blue(@color);',
                'description': nls.localize(39, null)
            },
            {
                'name': 'alpha',
                'example': 'alpha(@color);',
                'description': nls.localize(40, null)
            },
            {
                'name': 'luma',
                'example': 'luma(@color);',
                'description': nls.localize(41, null)
            },
            {
                'name': 'saturate',
                'example': 'saturate(@color, 10%);',
                'description': nls.localize(42, null)
            },
            {
                'name': 'desaturate',
                'example': 'desaturate(@color, 10%);',
                'description': nls.localize(43, null)
            },
            {
                'name': 'lighten',
                'example': 'lighten(@color, 10%);',
                'description': nls.localize(44, null)
            },
            {
                'name': 'darken',
                'example': 'darken(@color, 10%);',
                'description': nls.localize(45, null)
            },
            {
                'name': 'fadein',
                'example': 'fadein(@color, 10%);',
                'description': nls.localize(46, null)
            },
            {
                'name': 'fadeout',
                'example': 'fadeout(@color, 10%);',
                'description': nls.localize(47, null)
            },
            {
                'name': 'fade',
                'example': 'fade(@color, 50%);',
                'description': nls.localize(48, null)
            },
            {
                'name': 'spin',
                'example': 'spin(@color, 10);',
                'description': nls.localize(49, null)
            },
            {
                'name': 'mix',
                'example': 'mix(@color1, @color2, [@weight: 50%]);',
                'description': nls.localize(50, null)
            },
            {
                'name': 'greyscale',
                'example': 'greyscale(@color);',
                'description': nls.localize(51, null)
            },
            {
                'name': 'contrast',
                'example': 'contrast(@color1, [@darkcolor: black], [@lightcolor: white], [@threshold: 43%]);',
                'description': nls.localize(52, null)
            },
            {
                'name': 'multiply',
                'example': 'multiply(@color1, @color2);'
            },
            {
                'name': 'screen',
                'example': 'screen(@color1, @color2);'
            },
            {
                'name': 'overlay',
                'example': 'overlay(@color1, @color2);'
            },
            {
                'name': 'softlight',
                'example': 'softlight(@color1, @color2);'
            },
            {
                'name': 'hardlight',
                'example': 'hardlight(@color1, @color2);'
            },
            {
                'name': 'difference',
                'example': 'difference(@color1, @color2);'
            },
            {
                'name': 'exclusion',
                'example': 'exclusion(@color1, @color2);'
            },
            {
                'name': 'average',
                'example': 'average(@color1, @color2);'
            },
            {
                'name': 'negation',
                'example': 'negation(@color1, @color2);'
            }
        ];
        return LESSIntellisense;
    }(cssIntellisense.CSSIntellisense));
    exports.LESSIntellisense = LESSIntellisense;
});






define(__m[13], __M([1,0,7,4,6]), function (require, exports, cssWorker, lessParser, lessIntellisense) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var LessWorker = (function (_super) {
        __extends(LessWorker, _super);
        function LessWorker() {
            _super.apply(this, arguments);
        }
        LessWorker.prototype.createIntellisense = function () {
            return new lessIntellisense.LESSIntellisense();
        };
        LessWorker.prototype.createParser = function () {
            return new lessParser.LessParser();
        };
        return LessWorker;
    }(cssWorker.CSSWorker));
    exports.LessWorker = LessWorker;
});

}).call(this);
//# sourceMappingURL=lessWorker.js.map
