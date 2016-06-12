/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.3.1(undefined)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/

(function() {
var __m = ["exports","require","vs/languages/sass/common/parser/sassParser","vs/languages/css/common/parser/cssScanner","vs/nls!vs/languages/sass/common/parser/sassErrors","vs/nls","vs/nls!vs/languages/sass/common/sassWorker","vs/languages/sass/common/parser/sassErrors","vs/languages/sass/common/parser/sassScanner","vs/languages/sass/common/services/intelliSense","vs/nls!vs/languages/sass/common/services/intelliSense","vs/languages/css/common/parser/cssErrors","vs/languages/css/common/parser/cssNodes","vs/languages/css/common/parser/cssParser","vs/languages/css/common/services/intelliSense","vs/languages/sass/common/sassWorker","vs/languages/css/common/cssWorker"];
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
define(__m[8], __M([1,0,3]), function (require, exports, scanner) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var _FSL = '/'.charCodeAt(0);
    var _NWL = '\n'.charCodeAt(0);
    var _CAR = '\r'.charCodeAt(0);
    var _LFD = '\f'.charCodeAt(0);
    var _DLR = '$'.charCodeAt(0);
    var _HSH = '#'.charCodeAt(0);
    var _CUL = '{'.charCodeAt(0);
    var _EQS = '='.charCodeAt(0);
    var _BNG = '!'.charCodeAt(0);
    var _LAN = '<'.charCodeAt(0);
    var _RAN = '>'.charCodeAt(0);
    var _DOT = '.'.charCodeAt(0);
    var customTokenValue = scanner.TokenType.CustomToken;
    exports.VariableName = customTokenValue++;
    exports.InterpolationFunction = customTokenValue++;
    exports.Default = customTokenValue++;
    exports.EqualsOperator = customTokenValue++;
    exports.NotEqualsOperator = customTokenValue++;
    exports.GreaterEqualsOperator = customTokenValue++;
    exports.SmallerEqualsOperator = customTokenValue++;
    exports.Ellipsis = customTokenValue++;
    var SassScanner = (function (_super) {
        __extends(SassScanner, _super);
        function SassScanner() {
            _super.apply(this, arguments);
        }
        SassScanner.prototype.scan = function () {
            // processes all whitespaces and comments
            var triviaToken = this.trivia();
            if (triviaToken !== null) {
                return triviaToken;
            }
            var offset = this.stream.pos();
            // sass variable
            if (this.stream.advanceIfChar(_DLR)) {
                var content = ['$'];
                if (this.ident(content)) {
                    return this.finishToken(offset, exports.VariableName, content.join(''));
                }
                else {
                    this.stream.goBackTo(offset);
                }
            }
            // Sass: interpolation function #{..})
            if (this.stream.advanceIfChars([_HSH, _CUL])) {
                return this.finishToken(offset, exports.InterpolationFunction);
            }
            // operator ==
            if (this.stream.advanceIfChars([_EQS, _EQS])) {
                return this.finishToken(offset, exports.EqualsOperator);
            }
            // operator !=
            if (this.stream.advanceIfChars([_BNG, _EQS])) {
                return this.finishToken(offset, exports.NotEqualsOperator);
            }
            // operators <, <=
            if (this.stream.advanceIfChar(_LAN)) {
                if (this.stream.advanceIfChar(_EQS)) {
                    return this.finishToken(offset, exports.SmallerEqualsOperator);
                }
                return this.finishToken(offset, scanner.TokenType.Delim);
            }
            // ooperators >, >=
            if (this.stream.advanceIfChar(_RAN)) {
                if (this.stream.advanceIfChar(_EQS)) {
                    return this.finishToken(offset, exports.GreaterEqualsOperator);
                }
                return this.finishToken(offset, scanner.TokenType.Delim);
            }
            // ellipis
            if (this.stream.advanceIfChars([_DOT, _DOT, _DOT])) {
                return this.finishToken(offset, exports.Ellipsis);
            }
            return _super.prototype.scan.call(this);
        };
        SassScanner.prototype.comment = function () {
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
        return SassScanner;
    }(scanner.Scanner));
    exports.SassScanner = SassScanner;
});

define(__m[4], __M([5,6]), function(nls, data) { return nls.create("vs/languages/sass/common/parser/sassErrors", data); });
define(__m[7], __M([1,0,4]), function (require, exports, nls) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var SassIssueType = (function () {
        function SassIssueType(id, message) {
            this.id = id;
            this.message = message;
        }
        return SassIssueType;
    }());
    exports.SassIssueType = SassIssueType;
    exports.ParseError = {
        FromExpected: new SassIssueType('sass-fromexpected', nls.localize(0, null)),
        ThroughOrToExpected: new SassIssueType('sass-throughexpected', nls.localize(1, null)),
        InExpected: new SassIssueType('sass-fromexpected', nls.localize(2, null)),
    };
});






define(__m[2], __M([1,0,8,7,3,13,12,11]), function (require, exports, sassScanner, sassErrors, scanner, cssParser, nodes, errors) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    /// <summary>
    /// A parser for Sass
    /// http://sass-lang.com/documentation/file.SASS_REFERENCE.html
    /// </summary>
    var SassParser = (function (_super) {
        __extends(SassParser, _super);
        function SassParser() {
            _super.call(this, new sassScanner.SassScanner());
        }
        SassParser.prototype._parseStylesheetStatement = function () {
            return _super.prototype._parseStylesheetStatement.call(this)
                || this._parseVariableDeclaration()
                || this._parseWarnAndDebug()
                || this._parseControlStatement()
                || this._parseMixinDeclaration()
                || this._parseMixinContent()
                || this._parseMixinReference() // @include
                || this._parseFunctionDeclaration();
        };
        SassParser.prototype._parseImport = function () {
            var node = this.create(nodes.Import);
            if (!this.accept(scanner.TokenType.AtKeyword, '@import')) {
                return null;
            }
            if (!this.accept(scanner.TokenType.URI) && !this.accept(scanner.TokenType.String)) {
                return this.finish(node, errors.ParseError.URIOrStringExpected);
            }
            while (this.accept(scanner.TokenType.Comma)) {
                if (!this.accept(scanner.TokenType.URI) && !this.accept(scanner.TokenType.String)) {
                    return this.finish(node, errors.ParseError.URIOrStringExpected);
                }
            }
            node.setMedialist(this._parseMediaList());
            return this.finish(node);
        };
        // Sass variables: $font-size: 12px;
        SassParser.prototype._parseVariableDeclaration = function (panic) {
            if (panic === void 0) { panic = []; }
            var node = this.create(nodes.VariableDeclaration);
            if (!node.setVariable(this._parseVariable())) {
                return null;
            }
            if (!this.accept(scanner.TokenType.Colon, ':')) {
                return this.finish(node, errors.ParseError.ColonExpected);
            }
            node.colonPosition = this.prevToken.offset;
            if (!node.setValue(this._parseExpr())) {
                return this.finish(node, errors.ParseError.VariableValueExpected, [], panic);
            }
            if (this.accept(scanner.TokenType.Exclamation)) {
                if (!this.accept(scanner.TokenType.Ident, 'default', true)) {
                    return this.finish(node, errors.ParseError.UnknownKeyword);
                }
            }
            if (this.peek(scanner.TokenType.SemiColon)) {
                node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
            }
            return this.finish(node);
        };
        SassParser.prototype._parseMediaFeatureName = function () {
            return this._parseFunction() || this._parseIdent() || this._parseVariable(); // first function, the indent
        };
        SassParser.prototype._parseKeyframeSelector = function () {
            return _super.prototype._parseKeyframeSelector.call(this) || this._parseMixinContent();
        };
        SassParser.prototype._parseVariable = function () {
            var node = this.create(nodes.Variable);
            if (!this.accept(sassScanner.VariableName)) {
                return null;
            }
            return node;
        };
        SassParser.prototype._parseIdent = function (referenceTypes) {
            var node = this.create(nodes.Identifier);
            node.referenceTypes = referenceTypes;
            var hasContent = false;
            while (this.accept(scanner.TokenType.Ident) || node.addChild(this._parseInterpolation())) {
                hasContent = true;
                if (!this.hasWhitespace() && this.accept(scanner.TokenType.Delim, '-')) {
                }
                if (this.hasWhitespace()) {
                    break;
                }
            }
            return hasContent ? this.finish(node) : null;
        };
        SassParser.prototype._parseTerm = function () {
            var term = _super.prototype._parseTerm.call(this);
            if (term) {
                return term;
            }
            term = this.create(nodes.Term);
            if (term.setExpression(this._parseVariable())) {
                return this.finish(term);
            }
            return null;
        };
        SassParser.prototype._parseInterpolation = function () {
            var node = this.create(nodes.Interpolation);
            if (this.accept(sassScanner.InterpolationFunction)) {
                if (!node.addChild(this._parseBinaryExpr())) {
                    return this.finish(node, errors.ParseError.ExpressionExpected);
                }
                if (!this.accept(scanner.TokenType.CurlyR)) {
                    return this.finish(node, errors.ParseError.RightCurlyExpected);
                }
                return this.finish(node);
            }
            return null;
        };
        SassParser.prototype._parseOperator = function () {
            var node = this.createNode(nodes.NodeType.Operator);
            if (this.peek(sassScanner.EqualsOperator) || this.peek(sassScanner.NotEqualsOperator)
                || this.peek(sassScanner.GreaterEqualsOperator) || this.peek(sassScanner.SmallerEqualsOperator)
                || this.peek(scanner.TokenType.Delim, '>') || this.peek(scanner.TokenType.Delim, '<')
                || this.peek(scanner.TokenType.Ident, 'and') || this.peek(scanner.TokenType.Ident, 'or')
                || this.peek(scanner.TokenType.Delim, '%')) {
                var node = this.createNode(nodes.NodeType.Operator);
                this.consumeToken();
                return this.finish(node);
            }
            return _super.prototype._parseOperator.call(this);
        };
        SassParser.prototype._parseUnaryOperator = function () {
            if (this.peek(scanner.TokenType.Ident, 'not')) {
                var node = this.create(nodes.Node);
                this.consumeToken();
                return this.finish(node);
            }
            return _super.prototype._parseUnaryOperator.call(this);
        };
        SassParser.prototype._parseRuleSetDeclaration = function () {
            if (this.peek(scanner.TokenType.AtKeyword)) {
                return this._parseKeyframe() // nested @keyframe
                    || this._parseImport() // nested @import
                    || this._parseMedia() // nested @media
                    || this._parseFontFace() // nested @font-face
                    || this._parseWarnAndDebug() // @warn and @debug statements
                    || this._parseControlStatement() // @if, @while, @for, @each
                    || this._parseFunctionDeclaration() // @function
                    || this._parseExtends() // @extends
                    || this._parseMixinReference() // @include
                    || this._parseMixinContent() // @content
                    || this._parseMixinDeclaration(); // nested @mixin
            }
            return this._parseVariableDeclaration() // variable declaration
                || this._tryParseRuleset(true) // nested ruleset
                || _super.prototype._parseRuleSetDeclaration.call(this); // try css ruleset declaration as last so in the error case, the ast will contain a declaration
        };
        SassParser.prototype._parseDeclaration = function (resyncStopTokens) {
            var node = this.create(nodes.Declaration);
            if (!node.setProperty(this._parseProperty())) {
                return null;
            }
            if (!this.accept(scanner.TokenType.Colon, ':')) {
                return this.finish(node, errors.ParseError.ColonExpected, [scanner.TokenType.Colon], resyncStopTokens);
            }
            node.colonPosition = this.prevToken.offset;
            var hasContent = false;
            if (node.setValue(this._parseExpr())) {
                hasContent = true;
                node.addChild(this._parsePrio());
            }
            if (this.peek(scanner.TokenType.CurlyL)) {
                node.setNestedProperties(this._parseNestedProperties());
            }
            else {
                if (!hasContent) {
                    return this.finish(node, errors.ParseError.PropertyValueExpected);
                }
            }
            if (this.peek(scanner.TokenType.SemiColon)) {
                node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
            }
            return this.finish(node);
        };
        SassParser.prototype._parseNestedProperties = function () {
            var node = this.create(nodes.NestedProperties);
            return this._parseBody(node, this._parseDeclaration.bind(this));
        };
        SassParser.prototype._parseExtends = function () {
            var node = this.create(nodes.ExtendsReference);
            if (this.accept(scanner.TokenType.AtKeyword, '@extend')) {
                if (!node.setSelector(this._parseSimpleSelector())) {
                    return this.finish(node, errors.ParseError.SelectorExpected);
                }
                if (this.accept(scanner.TokenType.Exclamation)) {
                    if (!this.accept(scanner.TokenType.Ident, 'optional', true)) {
                        return this.finish(node, errors.ParseError.UnknownKeyword);
                    }
                }
                return this.finish(node);
            }
            return null;
        };
        SassParser.prototype._parseSimpleSelectorBody = function () {
            return this._parseSelectorCombinator() || this._parseSelectorPlaceholder() || _super.prototype._parseSimpleSelectorBody.call(this);
        };
        SassParser.prototype._parseSelectorCombinator = function () {
            var node = this.createNode(nodes.NodeType.SelectorCombinator);
            if (this.accept(scanner.TokenType.Delim, '&')) {
                while (!this.hasWhitespace() && (this.accept(scanner.TokenType.Delim, '-') || node.addChild(this._parseIdent()) || this.accept(scanner.TokenType.Delim, '&'))) {
                }
                return this.finish(node);
            }
            return null;
        };
        SassParser.prototype._parseSelectorPlaceholder = function () {
            var node = this.createNode(nodes.NodeType.SelectorPlaceholder);
            if (this.accept(scanner.TokenType.Delim, '%')) {
                this._parseIdent();
                return this.finish(node);
            }
            return null;
        };
        SassParser.prototype._parseWarnAndDebug = function () {
            if (!this.peek(scanner.TokenType.AtKeyword, '@debug') && !this.peek(scanner.TokenType.AtKeyword, '@warn')) {
                return null;
            }
            var node = this.createNode(nodes.NodeType.Debug);
            this.consumeToken(); // @debug or @warn
            node.addChild(this._parseExpr()); // optional
            return this.finish(node);
        };
        SassParser.prototype._parseControlStatement = function (parseStatement) {
            if (parseStatement === void 0) { parseStatement = this._parseRuleSetDeclaration.bind(this); }
            if (!this.peek(scanner.TokenType.AtKeyword)) {
                return null;
            }
            return this._parseIfStatement(parseStatement) || this._parseForStatement(parseStatement)
                || this._parseEachStatement(parseStatement) || this._parseWhileStatement(parseStatement);
        };
        SassParser.prototype._parseIfStatement = function (parseStatement) {
            if (!this.peek(scanner.TokenType.AtKeyword, '@if')) {
                return null;
            }
            return this._internalParseIfStatement(parseStatement);
        };
        SassParser.prototype._internalParseIfStatement = function (parseStatement) {
            var node = this.create(nodes.IfStatement);
            this.consumeToken(); // @if or if
            if (!node.setExpression(this._parseBinaryExpr())) {
                return this.finish(node, errors.ParseError.ExpressionExpected);
            }
            this._parseBody(node, parseStatement);
            if (this.accept(scanner.TokenType.AtKeyword, '@else')) {
                if (this.peek(scanner.TokenType.Ident, 'if')) {
                    node.setElseClause(this._internalParseIfStatement(parseStatement));
                }
                else if (this.peek(scanner.TokenType.CurlyL)) {
                    var elseNode = this.create(nodes.ElseStatement);
                    this._parseBody(elseNode, parseStatement);
                    node.setElseClause(elseNode);
                }
            }
            return this.finish(node);
        };
        SassParser.prototype._parseForStatement = function (parseStatement) {
            if (!this.peek(scanner.TokenType.AtKeyword, '@for')) {
                return null;
            }
            var node = this.create(nodes.ForStatement);
            this.consumeToken(); // @for
            if (!node.setVariable(this._parseVariable())) {
                return this.finish(node, errors.ParseError.VariableNameExpected, [scanner.TokenType.CurlyR]);
            }
            if (!this.accept(scanner.TokenType.Ident, 'from')) {
                return this.finish(node, sassErrors.ParseError.FromExpected, [scanner.TokenType.CurlyR]);
            }
            if (!node.addChild(this._parseBinaryExpr())) {
                return this.finish(node, errors.ParseError.ExpressionExpected, [scanner.TokenType.CurlyR]);
            }
            if (!this.accept(scanner.TokenType.Ident, 'to') && !this.accept(scanner.TokenType.Ident, 'through')) {
                return this.finish(node, sassErrors.ParseError.ThroughOrToExpected, [scanner.TokenType.CurlyR]);
            }
            if (!node.addChild(this._parseBinaryExpr())) {
                return this.finish(node, errors.ParseError.ExpressionExpected, [scanner.TokenType.CurlyR]);
            }
            return this._parseBody(node, parseStatement);
        };
        SassParser.prototype._parseEachStatement = function (parseStatement) {
            if (!this.peek(scanner.TokenType.AtKeyword, '@each')) {
                return null;
            }
            var node = this.create(nodes.EachStatement);
            this.consumeToken(); // @each
            if (!node.setVariable(this._parseVariable())) {
                return this.finish(node, errors.ParseError.VariableNameExpected, [scanner.TokenType.CurlyR]);
            }
            if (!this.accept(scanner.TokenType.Ident, 'in')) {
                return this.finish(node, sassErrors.ParseError.InExpected, [scanner.TokenType.CurlyR]);
            }
            if (!node.addChild(this._parseExpr())) {
                return this.finish(node, errors.ParseError.ExpressionExpected, [scanner.TokenType.CurlyR]);
            }
            return this._parseBody(node, parseStatement);
        };
        SassParser.prototype._parseWhileStatement = function (parseStatement) {
            if (!this.peek(scanner.TokenType.AtKeyword, '@while')) {
                return null;
            }
            var node = this.create(nodes.WhileStatement);
            this.consumeToken(); // @while
            if (!node.addChild(this._parseBinaryExpr())) {
                return this.finish(node, errors.ParseError.ExpressionExpected, [scanner.TokenType.CurlyR]);
            }
            return this._parseBody(node, parseStatement);
        };
        SassParser.prototype._parseFunctionBodyDeclaration = function () {
            return this._parseVariableDeclaration() || this._parseReturnStatement()
                || this._parseControlStatement(this._parseFunctionBodyDeclaration.bind(this));
        };
        SassParser.prototype._parseFunctionDeclaration = function () {
            if (!this.peek(scanner.TokenType.AtKeyword, '@function')) {
                return null;
            }
            var node = this.create(nodes.FunctionDeclaration);
            this.consumeToken(); // @function
            if (!node.setIdentifier(this._parseIdent([nodes.ReferenceType.Function]))) {
                return this.finish(node, errors.ParseError.IdentifierExpected, [scanner.TokenType.CurlyR]);
            }
            if (!this.accept(scanner.TokenType.ParenthesisL)) {
                return this.finish(node, errors.ParseError.LeftParenthesisExpected, [scanner.TokenType.CurlyR]);
            }
            if (node.getParameters().addChild(this._parseParameterDeclaration())) {
                while (this.accept(scanner.TokenType.Comma)) {
                    if (!node.getParameters().addChild(this._parseParameterDeclaration())) {
                        return this.finish(node, errors.ParseError.VariableNameExpected);
                    }
                }
            }
            if (!this.accept(scanner.TokenType.ParenthesisR)) {
                return this.finish(node, errors.ParseError.RightParenthesisExpected, [scanner.TokenType.CurlyR]);
            }
            return this._parseBody(node, this._parseFunctionBodyDeclaration.bind(this));
        };
        SassParser.prototype._parseReturnStatement = function () {
            if (!this.peek(scanner.TokenType.AtKeyword, '@return')) {
                return null;
            }
            var node = this.createNode(nodes.NodeType.ReturnStatement);
            this.consumeToken(); // @function
            if (!node.addChild(this._parseExpr())) {
                return this.finish(node, errors.ParseError.ExpressionExpected);
            }
            return this.finish(node);
        };
        SassParser.prototype._parseMixinDeclaration = function () {
            if (!this.peek(scanner.TokenType.AtKeyword, '@mixin')) {
                return null;
            }
            var node = this.create(nodes.MixinDeclaration);
            this.consumeToken();
            if (!node.setIdentifier(this._parseIdent([nodes.ReferenceType.Mixin]))) {
                return this.finish(node, errors.ParseError.IdentifierExpected, [scanner.TokenType.CurlyR]);
            }
            if (this.accept(scanner.TokenType.ParenthesisL)) {
                if (node.getParameters().addChild(this._parseParameterDeclaration())) {
                    while (this.accept(scanner.TokenType.Comma)) {
                        if (!node.getParameters().addChild(this._parseParameterDeclaration())) {
                            return this.finish(node, errors.ParseError.VariableNameExpected);
                        }
                    }
                }
                if (!this.accept(scanner.TokenType.ParenthesisR)) {
                    return this.finish(node, errors.ParseError.RightParenthesisExpected, [scanner.TokenType.CurlyR]);
                }
            }
            return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
        };
        SassParser.prototype._parseParameterDeclaration = function () {
            var node = this.create(nodes.FunctionParameter);
            if (!node.setIdentifier(this._parseVariable())) {
                return null;
            }
            if (this.accept(sassScanner.Ellipsis)) {
            }
            if (this.accept(scanner.TokenType.Colon)) {
                if (!node.setDefaultValue(this._parseExpr(true))) {
                    return this.finish(node, errors.ParseError.VariableValueExpected, [], [scanner.TokenType.Comma, scanner.TokenType.ParenthesisR]);
                }
            }
            return this.finish(node);
        };
        SassParser.prototype._parseMixinContent = function () {
            if (!this.peek(scanner.TokenType.AtKeyword, '@content')) {
                return null;
            }
            var node = this.createNode(nodes.NodeType.MixinContent);
            this.consumeToken();
            return this.finish(node);
        };
        SassParser.prototype._parseMixinReference = function () {
            if (!this.peek(scanner.TokenType.AtKeyword, '@include')) {
                return null;
            }
            var node = this.create(nodes.MixinReference);
            this.consumeToken();
            if (!node.setIdentifier(this._parseIdent([nodes.ReferenceType.Mixin]))) {
                return this.finish(node, errors.ParseError.IdentifierExpected, [scanner.TokenType.CurlyR]);
            }
            if (this.accept(scanner.TokenType.ParenthesisL)) {
                if (node.getArguments().addChild(this._parseFunctionArgument())) {
                    while (this.accept(scanner.TokenType.Comma)) {
                        if (!node.getArguments().addChild(this._parseFunctionArgument())) {
                            return this.finish(node, errors.ParseError.ExpressionExpected);
                        }
                    }
                }
                if (!this.accept(scanner.TokenType.ParenthesisR)) {
                    return this.finish(node, errors.ParseError.RightParenthesisExpected);
                }
            }
            if (this.peek(scanner.TokenType.CurlyL)) {
                var content = this.create(nodes.BodyDeclaration);
                this._parseBody(content, this._parseMixinReferenceBodyStatement.bind(this));
                node.setContent(content);
            }
            return this.finish(node);
        };
        SassParser.prototype._parseMixinReferenceBodyStatement = function () {
            return this._parseRuleSetDeclaration() || this._parseKeyframeSelector();
        };
        SassParser.prototype._parseFunctionArgument = function () {
            // [variableName ':'] expression | variableName '...'
            var node = this.create(nodes.FunctionArgument);
            var pos = this.mark();
            var argument = this._parseVariable();
            if (argument) {
                if (!this.accept(scanner.TokenType.Colon)) {
                    if (this.accept(sassScanner.Ellipsis)) {
                        node.setValue(argument);
                        return this.finish(node);
                    }
                    else {
                        this.restoreAtMark(pos);
                    }
                }
                else {
                    node.setIdentifier(argument);
                }
            }
            if (node.setValue(this._parseExpr(true))) {
                return this.finish(node);
            }
            return null;
        };
        return SassParser;
    }(cssParser.Parser));
    exports.SassParser = SassParser;
});

define(__m[10], __M([5,6]), function(nls, data) { return nls.create("vs/languages/sass/common/services/intelliSense", data); });





define(__m[9], __M([1,0,14,10]), function (require, exports, cssIntellisense, nls) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var SASSIntellisense = (function (_super) {
        __extends(SASSIntellisense, _super);
        function SASSIntellisense() {
            _super.call(this, '$');
        }
        SASSIntellisense.prototype.createFunctionProposals = function (proposals, result) {
            var replaceFunction = function (match, p1) { return p1 + ': {{' + (SASSIntellisense.variableDefaults[p1] || '') + '}}'; };
            proposals.forEach(function (p) {
                result.push({
                    label: p.func.substr(0, p.func.indexOf('(')),
                    typeLabel: p.func,
                    documentationLabel: p.desc,
                    codeSnippet: p.func.replace(/\[?(\$\w+)\]?/g, replaceFunction),
                    type: 'function'
                });
            });
            return result;
        };
        SASSIntellisense.prototype.getCompletionsForSelector = function (ruleSet, result) {
            this.createFunctionProposals(SASSIntellisense.selectorFuncs, result);
            return _super.prototype.getCompletionsForSelector.call(this, ruleSet, result);
        };
        SASSIntellisense.prototype.getTermProposals = function (result) {
            this.createFunctionProposals(SASSIntellisense.builtInFuncs, result);
            return _super.prototype.getTermProposals.call(this, result);
        };
        SASSIntellisense.prototype.getColorProposals = function (entry, result) {
            this.createFunctionProposals(SASSIntellisense.colorProposals, result);
            return _super.prototype.getColorProposals.call(this, entry, result);
        };
        SASSIntellisense.prototype.getCompletionsForDeclarationProperty = function (result) {
            this.getCompletionsForSelector(null, result);
            return _super.prototype.getCompletionsForDeclarationProperty.call(this, result);
        };
        SASSIntellisense.variableDefaults = {
            '$red': '1',
            '$green': '2',
            '$blue': '3',
            '$alpha': '1.0',
            '$color': '$color',
            '$weight': '0.5',
            '$hue': '0',
            '$saturation': '0%',
            '$lightness': '0%',
            '$degrees': '0',
            '$amount': '0',
            '$string': '""',
            '$substring': '"s"',
            '$number': '0',
            '$limit': '1'
        };
        SASSIntellisense.colorProposals = [
            { func: 'red($color)', desc: nls.localize(0, null) },
            { func: 'green($color)', desc: nls.localize(1, null) },
            { func: 'blue($color)', desc: nls.localize(2, null) },
            { func: 'mix($color, $color, [$weight])', desc: nls.localize(3, null) },
            { func: 'hue($color)', desc: nls.localize(4, null) },
            { func: 'saturation($color)', desc: nls.localize(5, null) },
            { func: 'lightness($color)', desc: nls.localize(6, null) },
            { func: 'adjust-hue($color, $degrees)', desc: nls.localize(7, null) },
            { func: 'lighten($color, $amount)', desc: nls.localize(8, null) },
            { func: 'darken($color, $amount)', desc: nls.localize(9, null) },
            { func: 'saturate($color, $amount)', desc: nls.localize(10, null) },
            { func: 'desaturate($color, $amount)', desc: nls.localize(11, null) },
            { func: 'grayscale($color)', desc: nls.localize(12, null) },
            { func: 'complement($color)', desc: nls.localize(13, null) },
            { func: 'invert($color)', desc: nls.localize(14, null) },
            { func: 'alpha($color)', desc: nls.localize(15, null) },
            { func: 'opacity($color)', desc: 'Gets the alpha component (opacity) of a color.' },
            { func: 'rgba($color, $alpha)', desc: nls.localize(16, null) },
            { func: 'opacify($color, $amount)', desc: nls.localize(17, null) },
            { func: 'fade-in($color, $amount)', desc: nls.localize(18, null) },
            { func: 'transparentize($color, $amount) / fade-out($color, $amount)', desc: nls.localize(19, null) },
            { func: 'adjust-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])', desc: nls.localize(20, null) },
            { func: 'scale-color($color, [$red], [$green], [$blue], [$saturation], [$lightness], [$alpha])', desc: nls.localize(21, null) },
            { func: 'change-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])', desc: nls.localize(22, null) },
            { func: 'ie-hex-str($color)', desc: nls.localize(23, null) }
        ];
        SASSIntellisense.selectorFuncs = [
            { func: 'selector-nest($selectors…)', desc: nls.localize(24, null) },
            { func: 'selector-append($selectors…)', desc: nls.localize(25, null) },
            { func: 'selector-extend($selector, $extendee, $extender)', desc: nls.localize(26, null) },
            { func: 'selector-replace($selector, $original, $replacement)', desc: nls.localize(27, null) },
            { func: 'selector-unify($selector1, $selector2)', desc: nls.localize(28, null) },
            { func: 'is-superselector($super, $sub)', desc: nls.localize(29, null) },
            { func: 'simple-selectors($selector)', desc: nls.localize(30, null) },
            { func: 'selector-parse($selector)', desc: nls.localize(31, null) }
        ];
        SASSIntellisense.builtInFuncs = [
            { func: 'unquote($string)', desc: nls.localize(32, null) },
            { func: 'quote($string)', desc: nls.localize(33, null) },
            { func: 'str-length($string)', desc: nls.localize(34, null) },
            { func: 'str-insert($string, $insert, $index)', desc: nls.localize(35, null) },
            { func: 'str-index($string, $substring)', desc: nls.localize(36, null) },
            { func: 'str-slice($string, $start-at, [$end-at])', desc: nls.localize(37, null) },
            { func: 'to-upper-case($string)', desc: nls.localize(38, null) },
            { func: 'to-lower-case($string)', desc: nls.localize(39, null) },
            { func: 'percentage($number)', desc: nls.localize(40, null) },
            { func: 'round($number)', desc: nls.localize(41, null) },
            { func: 'ceil($number)', desc: nls.localize(42, null) },
            { func: 'floor($number)', desc: nls.localize(43, null) },
            { func: 'abs($number)', desc: nls.localize(44, null) },
            { func: 'min($numbers)', desc: nls.localize(45, null) },
            { func: 'max($numbers)', desc: nls.localize(46, null) },
            { func: 'random([$limit])', desc: nls.localize(47, null) },
            { func: 'length($list)', desc: nls.localize(48, null) },
            { func: 'nth($list, $n)', desc: nls.localize(49, null) },
            { func: 'set-nth($list, $n, $value)', desc: nls.localize(50, null) },
            { func: 'join($list1, $list2, [$separator])', desc: nls.localize(51, null) },
            { func: 'append($list1, $val, [$separator])', desc: nls.localize(52, null) },
            { func: 'zip($lists)', desc: nls.localize(53, null) },
            { func: 'index($list, $value)', desc: nls.localize(54, null) },
            { func: 'list-separator(#list)', desc: nls.localize(55, null) },
            { func: 'map-get($map, $key)', desc: nls.localize(56, null) },
            { func: 'map-merge($map1, $map2)', desc: nls.localize(57, null) },
            { func: 'map-remove($map, $keys)', desc: nls.localize(58, null) },
            { func: 'map-keys($map)', desc: nls.localize(59, null) },
            { func: 'map-values($map)', desc: nls.localize(60, null) },
            { func: 'map-has-key($map, $key)', desc: nls.localize(61, null) },
            { func: 'keywords($args)', desc: nls.localize(62, null) },
            { func: 'feature-exists($feature)', desc: nls.localize(63, null) },
            { func: 'variable-exists($name)', desc: nls.localize(64, null) },
            { func: 'global-variable-exists($name)', desc: nls.localize(65, null) },
            { func: 'function-exists($name)', desc: nls.localize(66, null) },
            { func: 'mixin-exists($name)', desc: nls.localize(67, null) },
            { func: 'inspect($value)', desc: nls.localize(68, null) },
            { func: 'type-of($value)', desc: nls.localize(69, null) },
            { func: 'unit($number)', desc: nls.localize(70, null) },
            { func: 'unitless($number)', desc: nls.localize(71, null) },
            { func: 'comparable($number1, $number2)', desc: nls.localize(72, null) },
            { func: 'call($name, $args…)', desc: nls.localize(73, null) }
        ];
        return SASSIntellisense;
    }(cssIntellisense.CSSIntellisense));
    exports.SASSIntellisense = SASSIntellisense;
});






define(__m[15], __M([1,0,16,2,9]), function (require, exports, cssWorker, sassParser, sassIntellisense) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var SassWorker = (function (_super) {
        __extends(SassWorker, _super);
        function SassWorker() {
            _super.apply(this, arguments);
        }
        SassWorker.prototype.createIntellisense = function () {
            return new sassIntellisense.SASSIntellisense();
        };
        SassWorker.prototype.createParser = function () {
            return new sassParser.SassParser();
        };
        return SassWorker;
    }(cssWorker.CSSWorker));
    exports.SassWorker = SassWorker;
});

}).call(this);
//# sourceMappingURL=sassWorker.js.map
