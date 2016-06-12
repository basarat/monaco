/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.3.1(undefined)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/

(function() {
var __m = ["exports","require","vs/languages/css/common/parser/cssNodes","vs/languages/css/common/level","vs/languages/css/common/services/languageFacts","vs/nls!vs/languages/css/common/cssWorker","vs/base/common/strings","vs/nls","vs/languages/css/common/parser/cssSymbols","vs/languages/css/common/services/lintRules","vs/languages/css/common/parser/cssScanner","vs/languages/css/common/services/selectorPrinting","vs/languages/css/common/services/occurrences","vs/editor/common/modes","vs/nls!vs/languages/css/common/parser/cssErrors","vs/languages/css/common/parser/cssErrors","vs/editor/common/services/resourceService","vs/base/common/types","vs/languages/css/common/parser/cssParser","vs/nls!vs/languages/css/common/services/intelliSense","vs/languages/css/common/services/intelliSense","vs/nls!vs/languages/css/common/services/lint","vs/nls!vs/languages/css/common/services/lintRules","vs/base/common/winjs.base","vs/languages/css/common/services/lint","vs/languages/css/common/services/cssLanguageService","vs/languages/css/common/services/browsers","vs/base/common/arrays","vs/base/common/lifecycle","vs/languages/css/common/cssWorker","vs/base/common/severity","vs/platform/markers/common/markers","vs/editor/common/core/range","vs/editor/common/modes/supports/suggestSupport","vs/editor/common/worker/validationHelper"];
var __M = function(deps) {
  var result = [];
  for (var i = 0, len = deps.length; i < len; i++) {
    result[i] = __m[deps[i]];
  }
  return result;
};
define(__m[3], __M([1,0]), function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    (function (Level) {
        Level[Level["Ignore"] = 1] = "Ignore";
        Level[Level["Warning"] = 2] = "Warning";
        Level[Level["Error"] = 4] = "Error";
    })(exports.Level || (exports.Level = {}));
    var Level = exports.Level;
    function toLevel(level) {
        switch (level) {
            case 'ignore': return Level.Ignore;
            case 'warning': return Level.Warning;
            case 'error': return Level.Error;
        }
        return null;
    }
    exports.toLevel = toLevel;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(__m[2], __M([1,0,17]), function (require, exports, types) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    /// <summary>
    /// Nodes for the css 2.1 specification. See for reference:
    /// http://www.w3.org/TR/CSS21/grammar.html#grammar
    /// </summary>
    (function (NodeType) {
        NodeType[NodeType["Undefined"] = 0] = "Undefined";
        NodeType[NodeType["Identifier"] = 1] = "Identifier";
        NodeType[NodeType["Stylesheet"] = 2] = "Stylesheet";
        NodeType[NodeType["Ruleset"] = 3] = "Ruleset";
        NodeType[NodeType["Selector"] = 4] = "Selector";
        NodeType[NodeType["SimpleSelector"] = 5] = "SimpleSelector";
        NodeType[NodeType["SelectorInterpolation"] = 6] = "SelectorInterpolation";
        NodeType[NodeType["SelectorCombinator"] = 7] = "SelectorCombinator";
        NodeType[NodeType["SelectorCombinatorParent"] = 8] = "SelectorCombinatorParent";
        NodeType[NodeType["SelectorCombinatorSibling"] = 9] = "SelectorCombinatorSibling";
        NodeType[NodeType["SelectorCombinatorAllSiblings"] = 10] = "SelectorCombinatorAllSiblings";
        NodeType[NodeType["Page"] = 11] = "Page";
        NodeType[NodeType["PageBoxMarginBox"] = 12] = "PageBoxMarginBox";
        NodeType[NodeType["ClassSelector"] = 13] = "ClassSelector";
        NodeType[NodeType["IdentifierSelector"] = 14] = "IdentifierSelector";
        NodeType[NodeType["ElementNameSelector"] = 15] = "ElementNameSelector";
        NodeType[NodeType["PseudoSelector"] = 16] = "PseudoSelector";
        NodeType[NodeType["AttributeSelector"] = 17] = "AttributeSelector";
        NodeType[NodeType["Declaration"] = 18] = "Declaration";
        NodeType[NodeType["Declarations"] = 19] = "Declarations";
        NodeType[NodeType["Property"] = 20] = "Property";
        NodeType[NodeType["Expression"] = 21] = "Expression";
        NodeType[NodeType["BinaryExpression"] = 22] = "BinaryExpression";
        NodeType[NodeType["Term"] = 23] = "Term";
        NodeType[NodeType["Operator"] = 24] = "Operator";
        NodeType[NodeType["Value"] = 25] = "Value";
        NodeType[NodeType["StringLiteral"] = 26] = "StringLiteral";
        NodeType[NodeType["URILiteral"] = 27] = "URILiteral";
        NodeType[NodeType["EscapedValue"] = 28] = "EscapedValue";
        NodeType[NodeType["Function"] = 29] = "Function";
        NodeType[NodeType["NumericValue"] = 30] = "NumericValue";
        NodeType[NodeType["HexColorValue"] = 31] = "HexColorValue";
        NodeType[NodeType["MixinDeclaration"] = 32] = "MixinDeclaration";
        NodeType[NodeType["MixinReference"] = 33] = "MixinReference";
        NodeType[NodeType["VariableName"] = 34] = "VariableName";
        NodeType[NodeType["VariableDeclaration"] = 35] = "VariableDeclaration";
        NodeType[NodeType["Prio"] = 36] = "Prio";
        NodeType[NodeType["Interpolation"] = 37] = "Interpolation";
        NodeType[NodeType["NestedProperties"] = 38] = "NestedProperties";
        NodeType[NodeType["ExtendsReference"] = 39] = "ExtendsReference";
        NodeType[NodeType["SelectorPlaceholder"] = 40] = "SelectorPlaceholder";
        NodeType[NodeType["Debug"] = 41] = "Debug";
        NodeType[NodeType["If"] = 42] = "If";
        NodeType[NodeType["Else"] = 43] = "Else";
        NodeType[NodeType["For"] = 44] = "For";
        NodeType[NodeType["Each"] = 45] = "Each";
        NodeType[NodeType["While"] = 46] = "While";
        NodeType[NodeType["MixinContent"] = 47] = "MixinContent";
        NodeType[NodeType["Media"] = 48] = "Media";
        NodeType[NodeType["Keyframe"] = 49] = "Keyframe";
        NodeType[NodeType["FontFace"] = 50] = "FontFace";
        NodeType[NodeType["Import"] = 51] = "Import";
        NodeType[NodeType["Namespace"] = 52] = "Namespace";
        NodeType[NodeType["Invocation"] = 53] = "Invocation";
        NodeType[NodeType["FunctionDeclaration"] = 54] = "FunctionDeclaration";
        NodeType[NodeType["ReturnStatement"] = 55] = "ReturnStatement";
        NodeType[NodeType["MediaQuery"] = 56] = "MediaQuery";
        NodeType[NodeType["FunctionParameter"] = 57] = "FunctionParameter";
        NodeType[NodeType["FunctionArgument"] = 58] = "FunctionArgument";
        NodeType[NodeType["KeyframeSelector"] = 59] = "KeyframeSelector";
        NodeType[NodeType["ViewPort"] = 60] = "ViewPort";
        NodeType[NodeType["Document"] = 61] = "Document";
    })(exports.NodeType || (exports.NodeType = {}));
    var NodeType = exports.NodeType;
    (function (ReferenceType) {
        ReferenceType[ReferenceType["Mixin"] = 0] = "Mixin";
        ReferenceType[ReferenceType["Rule"] = 1] = "Rule";
        ReferenceType[ReferenceType["Variable"] = 2] = "Variable";
        ReferenceType[ReferenceType["Function"] = 3] = "Function";
        ReferenceType[ReferenceType["Keyframe"] = 4] = "Keyframe";
        ReferenceType[ReferenceType["Unknown"] = 5] = "Unknown";
    })(exports.ReferenceType || (exports.ReferenceType = {}));
    var ReferenceType = exports.ReferenceType;
    function getNodeAtOffset(node, offset) {
        var candidate = null;
        if (!node || offset < node.offset || offset > node.offset + node.length) {
            return null;
        }
        // Find the shortest node at the position
        node.accept(function (node) {
            if (node.offset === -1 && node.length === -1) {
                return true;
            }
            if (node.offset <= offset && node.offset + node.length >= offset) {
                if (!candidate) {
                    candidate = node;
                }
                else if (node.length <= candidate.length) {
                    candidate = node;
                }
                return true;
            }
            return false;
        });
        return candidate;
    }
    exports.getNodeAtOffset = getNodeAtOffset;
    function getNodePath(node, offset) {
        var candidate = getNodeAtOffset(node, offset), path = [];
        while (candidate) {
            path.unshift(candidate);
            candidate = candidate.parent;
        }
        return path;
    }
    exports.getNodePath = getNodePath;
    function getParentDeclaration(node) {
        var decl = node.findParent(NodeType.Declaration);
        if (decl && decl.getValue() && decl.getValue().encloses(node)) {
            return decl;
        }
        return null;
    }
    exports.getParentDeclaration = getParentDeclaration;
    var Node = (function () {
        function Node(offset, len, nodeType) {
            if (offset === void 0) { offset = -1; }
            if (len === void 0) { len = -1; }
            this.parent = null;
            this.offset = offset;
            this.length = len;
            if (nodeType) {
                this.nodeType = nodeType;
            }
        }
        Object.defineProperty(Node.prototype, "type", {
            get: function () {
                return this.nodeType || NodeType.Undefined;
            },
            set: function (type) {
                this.nodeType = type;
            },
            enumerable: true,
            configurable: true
        });
        Node.prototype.getTextProvider = function () {
            var node = this;
            while (node && !node.textProvider) {
                node = node.parent;
            }
            if (node) {
                return node.textProvider;
            }
            return function () { return 'unknown'; };
        };
        Node.prototype.getText = function () {
            return this.getTextProvider()(this.offset, this.length);
        };
        Node.prototype.matches = function (str) {
            return this.length === str.length && this.getTextProvider()(this.offset, this.length) === str;
        };
        Node.prototype.startsWith = function (str) {
            return this.length >= str.length && this.getTextProvider()(this.offset, str.length) === str;
        };
        Node.prototype.endsWith = function (str) {
            return this.length >= str.length && this.getTextProvider()(this.offset + this.length - str.length, str.length) === str;
        };
        Node.prototype.accept = function (visitor) {
            if (!types.isFunction(visitor)) {
                visitor = visitor.visitNode.bind(visitor);
            }
            if (visitor(this) && this.children) {
                this.children.forEach(function (child) {
                    child.accept(visitor);
                });
            }
        };
        Node.prototype.adoptChild = function (node, index) {
            if (index === void 0) { index = -1; }
            if (node.parent && node.parent.children) {
                var idx = node.parent.children.indexOf(node);
                if (idx >= 0) {
                    node.parent.children.splice(idx, 1);
                }
            }
            node.parent = this;
            var children = this.children;
            if (!children) {
                children = this.children = [];
            }
            if (index !== -1) {
                children.splice(idx, 0, node);
            }
            else {
                children.push(node);
            }
            return node;
        };
        Node.prototype.attachTo = function (parent, index) {
            if (index === void 0) { index = -1; }
            if (parent) {
                parent.adoptChild(this, index);
            }
            return this;
        };
        Node.prototype.collectIssues = function (results) {
            if (this.issues) {
                results.push.apply(results, this.issues);
            }
        };
        Node.prototype.addIssue = function (issue) {
            if (!this.issues) {
                this.issues = [];
            }
            this.issues.push(issue);
        };
        Node.prototype.hasIssue = function (rule) {
            return this.issues && this.issues.some(function (i) { return i.getRule() === rule; });
        };
        Node.prototype.isErroneous = function () {
            return this.issues && this.issues.length > 0;
        };
        Node.prototype.setNode = function (field, node, index) {
            if (index === void 0) { index = -1; }
            if (node) {
                node.attachTo(this, index);
                this[field] = node;
                return true;
            }
            return false;
        };
        Node.prototype.addChild = function (node) {
            if (node) {
                if (!this.children) {
                    this.children = [];
                }
                node.attachTo(this);
                this.updateOffsetAndLength(node);
                return true;
            }
            return false;
        };
        Node.prototype.updateOffsetAndLength = function (node) {
            if (node.offset < this.offset || this.offset === -1) {
                this.offset = node.offset;
            }
            if ((node.offset + node.length > this.offset + this.length) || this.length === -1) {
                this.length = node.offset + node.length - this.offset;
            }
        };
        Node.prototype.hasChildren = function () {
            return this.children && this.children.length > 0;
        };
        Node.prototype.getChildren = function () {
            return this.children ? this.children.slice(0) : [];
        };
        Node.prototype.getChild = function (index) {
            if (this.children && index < this.children.length) {
                return this.children[index];
            }
            return null;
        };
        Node.prototype.addChildren = function (nodes) {
            var _this = this;
            nodes.forEach(function (node) { return _this.addChild(node); });
        };
        Node.prototype.findFirstChildBeforeOffset = function (offset) {
            if (this.children) {
                var current = null;
                for (var i = this.children.length - 1; i >= 0; i--) {
                    // iterate until we find a child that has a start offset smaller than the input offset
                    current = this.children[i];
                    if (current.offset <= offset) {
                        return current;
                    }
                }
            }
            return null;
        };
        Node.prototype.findChildAtOffset = function (offset, goDeep) {
            var current = this.findFirstChildBeforeOffset(offset);
            if (current && current.offset + current.length >= offset) {
                if (goDeep) {
                    return current.findChildAtOffset(offset, true) || current;
                }
                return current;
            }
            return null;
        };
        Node.prototype.encloses = function (candidate) {
            return this.offset <= candidate.offset && this.offset + this.length >= candidate.offset + candidate.length;
        };
        Node.prototype.getParent = function () {
            var result = this.parent;
            while (result instanceof Nodelist) {
                result = result.parent;
            }
            return result;
        };
        Node.prototype.findParent = function (type) {
            var result = this;
            while (result && result.type !== type) {
                result = result.parent;
            }
            return result;
        };
        Node.prototype.setData = function (key, value) {
            if (!this.options) {
                this.options = {};
            }
            this.options[key] = value;
        };
        Node.prototype.getData = function (key) {
            if (!this.options || !this.options.hasOwnProperty(key)) {
                return null;
            }
            return this.options[key];
        };
        return Node;
    }());
    exports.Node = Node;
    var Nodelist = (function (_super) {
        __extends(Nodelist, _super);
        function Nodelist(parent, index) {
            if (index === void 0) { index = -1; }
            _super.call(this, -1, -1);
            this.attachTo(parent, index);
            this.offset = -1;
            this.length = -1;
        }
        return Nodelist;
    }(Node));
    exports.Nodelist = Nodelist;
    var Identifier = (function (_super) {
        __extends(Identifier, _super);
        function Identifier(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Identifier.prototype, "type", {
            get: function () {
                return NodeType.Identifier;
            },
            enumerable: true,
            configurable: true
        });
        Identifier.prototype.containsInterpolation = function () {
            return this.hasChildren();
        };
        return Identifier;
    }(Node));
    exports.Identifier = Identifier;
    var Stylesheet = (function (_super) {
        __extends(Stylesheet, _super);
        function Stylesheet(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Stylesheet.prototype, "type", {
            get: function () {
                return NodeType.Stylesheet;
            },
            enumerable: true,
            configurable: true
        });
        Stylesheet.prototype.setName = function (value) {
            this.name = value;
        };
        return Stylesheet;
    }(Node));
    exports.Stylesheet = Stylesheet;
    var Declarations = (function (_super) {
        __extends(Declarations, _super);
        function Declarations(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Declarations.prototype, "type", {
            get: function () {
                return NodeType.Declarations;
            },
            enumerable: true,
            configurable: true
        });
        return Declarations;
    }(Node));
    exports.Declarations = Declarations;
    var BodyDeclaration = (function (_super) {
        __extends(BodyDeclaration, _super);
        function BodyDeclaration(offset, length) {
            _super.call(this, offset, length);
        }
        BodyDeclaration.prototype.getDeclarations = function () {
            return this.declarations;
        };
        BodyDeclaration.prototype.setDeclarations = function (decls) {
            return this.setNode('declarations', decls);
        };
        return BodyDeclaration;
    }(Node));
    exports.BodyDeclaration = BodyDeclaration;
    var RuleSet = (function (_super) {
        __extends(RuleSet, _super);
        function RuleSet(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(RuleSet.prototype, "type", {
            get: function () {
                return NodeType.Ruleset;
            },
            enumerable: true,
            configurable: true
        });
        RuleSet.prototype.getSelectors = function () {
            if (!this.selectors) {
                this.selectors = new Nodelist(this);
            }
            return this.selectors;
        };
        RuleSet.prototype.isNested = function () {
            return this.parent && this.parent.findParent(NodeType.Ruleset) !== null;
        };
        return RuleSet;
    }(BodyDeclaration));
    exports.RuleSet = RuleSet;
    var Selector = (function (_super) {
        __extends(Selector, _super);
        function Selector(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Selector.prototype, "type", {
            get: function () {
                return NodeType.Selector;
            },
            enumerable: true,
            configurable: true
        });
        return Selector;
    }(Node));
    exports.Selector = Selector;
    var SimpleSelector = (function (_super) {
        __extends(SimpleSelector, _super);
        function SimpleSelector(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(SimpleSelector.prototype, "type", {
            get: function () {
                return NodeType.SimpleSelector;
            },
            enumerable: true,
            configurable: true
        });
        return SimpleSelector;
    }(Node));
    exports.SimpleSelector = SimpleSelector;
    var AbstractDeclaration = (function (_super) {
        __extends(AbstractDeclaration, _super);
        function AbstractDeclaration(offset, length) {
            _super.call(this, offset, length);
        }
        return AbstractDeclaration;
    }(Node));
    exports.AbstractDeclaration = AbstractDeclaration;
    var Declaration = (function (_super) {
        __extends(Declaration, _super);
        function Declaration(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Declaration.prototype, "type", {
            get: function () {
                return NodeType.Declaration;
            },
            enumerable: true,
            configurable: true
        });
        Declaration.prototype.setProperty = function (node) {
            return this.setNode('property', node);
        };
        Declaration.prototype.getProperty = function () {
            return this.property;
        };
        Declaration.prototype.getFullPropertyName = function () {
            var propertyName = this.property ? this.property.getName() : 'unknown';
            if (this.parent instanceof Declarations && this.parent.getParent() instanceof NestedProperties) {
                var parentDecl = this.parent.getParent().getParent();
                if (parentDecl instanceof Declaration) {
                    return parentDecl.getFullPropertyName() + propertyName;
                }
            }
            return propertyName;
        };
        Declaration.prototype.getNonPrefixedPropertyName = function () {
            var propertyName = this.getFullPropertyName();
            if (propertyName && propertyName.charAt(0) === '-') {
                var vendorPrefixEnd = propertyName.indexOf('-', 1);
                if (vendorPrefixEnd !== -1) {
                    return propertyName.substring(vendorPrefixEnd + 1);
                }
            }
            return propertyName;
        };
        Declaration.prototype.setValue = function (value) {
            return this.setNode('value', value);
        };
        Declaration.prototype.getValue = function () {
            return this.value;
        };
        Declaration.prototype.setNestedProperties = function (value) {
            return this.setNode('nestedProprties', value);
        };
        Declaration.prototype.getNestedProperties = function () {
            return this.nestedProprties;
        };
        return Declaration;
    }(AbstractDeclaration));
    exports.Declaration = Declaration;
    var Property = (function (_super) {
        __extends(Property, _super);
        function Property(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Property.prototype, "type", {
            get: function () {
                return NodeType.Property;
            },
            enumerable: true,
            configurable: true
        });
        Property.prototype.setIdentifier = function (value) {
            return this.setNode('identifier', value);
        };
        Property.prototype.getIdentifier = function () {
            return this.identifier;
        };
        Property.prototype.getName = function () {
            return this.getText();
        };
        return Property;
    }(Node));
    exports.Property = Property;
    var Invocation = (function (_super) {
        __extends(Invocation, _super);
        function Invocation(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Invocation.prototype, "type", {
            get: function () {
                return NodeType.Invocation;
            },
            enumerable: true,
            configurable: true
        });
        Invocation.prototype.getArguments = function () {
            if (!this.arguments) {
                this.arguments = new Nodelist(this);
            }
            return this.arguments;
        };
        return Invocation;
    }(Node));
    exports.Invocation = Invocation;
    var Function = (function (_super) {
        __extends(Function, _super);
        function Function(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Function.prototype, "type", {
            get: function () {
                return NodeType.Function;
            },
            enumerable: true,
            configurable: true
        });
        Function.prototype.setIdentifier = function (node) {
            return this.setNode('identifier', node, 0);
        };
        Function.prototype.getIdentifier = function () {
            return this.identifier;
        };
        Function.prototype.getName = function () {
            return this.identifier ? this.identifier.getText() : '';
        };
        return Function;
    }(Invocation));
    exports.Function = Function;
    var FunctionParameter = (function (_super) {
        __extends(FunctionParameter, _super);
        function FunctionParameter(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(FunctionParameter.prototype, "type", {
            get: function () {
                return NodeType.FunctionParameter;
            },
            enumerable: true,
            configurable: true
        });
        FunctionParameter.prototype.setIdentifier = function (node) {
            return this.setNode('identifier', node, 0);
        };
        FunctionParameter.prototype.getIdentifier = function () {
            return this.identifier;
        };
        FunctionParameter.prototype.getName = function () {
            return this.identifier ? this.identifier.getText() : '';
        };
        FunctionParameter.prototype.setDefaultValue = function (node) {
            return this.setNode('defaultValue', node, 0);
        };
        FunctionParameter.prototype.getDefaultValue = function () {
            return this.defaultValue;
        };
        return FunctionParameter;
    }(Node));
    exports.FunctionParameter = FunctionParameter;
    var FunctionArgument = (function (_super) {
        __extends(FunctionArgument, _super);
        function FunctionArgument(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(FunctionArgument.prototype, "type", {
            get: function () {
                return NodeType.FunctionArgument;
            },
            enumerable: true,
            configurable: true
        });
        FunctionArgument.prototype.setIdentifier = function (node) {
            return this.setNode('identifier', node, 0);
        };
        FunctionArgument.prototype.getIdentifier = function () {
            return this.identifier;
        };
        FunctionArgument.prototype.getName = function () {
            return this.identifier ? this.identifier.getText() : '';
        };
        FunctionArgument.prototype.setValue = function (node) {
            return this.setNode('value', node, 0);
        };
        FunctionArgument.prototype.getValue = function () {
            return this.value;
        };
        return FunctionArgument;
    }(Node));
    exports.FunctionArgument = FunctionArgument;
    var IfStatement = (function (_super) {
        __extends(IfStatement, _super);
        function IfStatement(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(IfStatement.prototype, "type", {
            get: function () {
                return NodeType.If;
            },
            enumerable: true,
            configurable: true
        });
        IfStatement.prototype.setExpression = function (node) {
            return this.setNode('expression', node, 0);
        };
        IfStatement.prototype.setElseClause = function (elseClause) {
            return this.setNode('elseClause', elseClause);
        };
        return IfStatement;
    }(BodyDeclaration));
    exports.IfStatement = IfStatement;
    var ForStatement = (function (_super) {
        __extends(ForStatement, _super);
        function ForStatement(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(ForStatement.prototype, "type", {
            get: function () {
                return NodeType.For;
            },
            enumerable: true,
            configurable: true
        });
        ForStatement.prototype.setVariable = function (node) {
            return this.setNode('variable', node, 0);
        };
        return ForStatement;
    }(BodyDeclaration));
    exports.ForStatement = ForStatement;
    var EachStatement = (function (_super) {
        __extends(EachStatement, _super);
        function EachStatement(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(EachStatement.prototype, "type", {
            get: function () {
                return NodeType.Each;
            },
            enumerable: true,
            configurable: true
        });
        EachStatement.prototype.setVariable = function (node) {
            return this.setNode('variable', node, 0);
        };
        return EachStatement;
    }(BodyDeclaration));
    exports.EachStatement = EachStatement;
    var WhileStatement = (function (_super) {
        __extends(WhileStatement, _super);
        function WhileStatement(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(WhileStatement.prototype, "type", {
            get: function () {
                return NodeType.While;
            },
            enumerable: true,
            configurable: true
        });
        return WhileStatement;
    }(BodyDeclaration));
    exports.WhileStatement = WhileStatement;
    var ElseStatement = (function (_super) {
        __extends(ElseStatement, _super);
        function ElseStatement(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(ElseStatement.prototype, "type", {
            get: function () {
                return NodeType.Else;
            },
            enumerable: true,
            configurable: true
        });
        return ElseStatement;
    }(BodyDeclaration));
    exports.ElseStatement = ElseStatement;
    var FunctionDeclaration = (function (_super) {
        __extends(FunctionDeclaration, _super);
        function FunctionDeclaration(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(FunctionDeclaration.prototype, "type", {
            get: function () {
                return NodeType.FunctionDeclaration;
            },
            enumerable: true,
            configurable: true
        });
        FunctionDeclaration.prototype.setIdentifier = function (node) {
            return this.setNode('identifier', node, 0);
        };
        FunctionDeclaration.prototype.getIdentifier = function () {
            return this.identifier;
        };
        FunctionDeclaration.prototype.getName = function () {
            return this.identifier ? this.identifier.getText() : '';
        };
        FunctionDeclaration.prototype.getParameters = function () {
            if (!this.parameters) {
                this.parameters = new Nodelist(this);
            }
            return this.parameters;
        };
        return FunctionDeclaration;
    }(BodyDeclaration));
    exports.FunctionDeclaration = FunctionDeclaration;
    var ViewPort = (function (_super) {
        __extends(ViewPort, _super);
        function ViewPort(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(ViewPort.prototype, "type", {
            get: function () {
                return NodeType.ViewPort;
            },
            enumerable: true,
            configurable: true
        });
        return ViewPort;
    }(BodyDeclaration));
    exports.ViewPort = ViewPort;
    var FontFace = (function (_super) {
        __extends(FontFace, _super);
        function FontFace(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(FontFace.prototype, "type", {
            get: function () {
                return NodeType.FontFace;
            },
            enumerable: true,
            configurable: true
        });
        return FontFace;
    }(BodyDeclaration));
    exports.FontFace = FontFace;
    var NestedProperties = (function (_super) {
        __extends(NestedProperties, _super);
        function NestedProperties(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(NestedProperties.prototype, "type", {
            get: function () {
                return NodeType.NestedProperties;
            },
            enumerable: true,
            configurable: true
        });
        return NestedProperties;
    }(BodyDeclaration));
    exports.NestedProperties = NestedProperties;
    var Keyframe = (function (_super) {
        __extends(Keyframe, _super);
        function Keyframe(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Keyframe.prototype, "type", {
            get: function () {
                return NodeType.Keyframe;
            },
            enumerable: true,
            configurable: true
        });
        Keyframe.prototype.setKeyword = function (keyword) {
            return this.setNode('keyword', keyword, 0);
        };
        Keyframe.prototype.getKeyword = function () {
            return this.keyword;
        };
        Keyframe.prototype.setIdentifier = function (node) {
            return this.setNode('identifier', node, 0);
        };
        Keyframe.prototype.getIdentifier = function () {
            return this.identifier;
        };
        Keyframe.prototype.getName = function () {
            return this.identifier ? this.identifier.getText() : '';
        };
        return Keyframe;
    }(BodyDeclaration));
    exports.Keyframe = Keyframe;
    var KeyframeSelector = (function (_super) {
        __extends(KeyframeSelector, _super);
        function KeyframeSelector(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(KeyframeSelector.prototype, "type", {
            get: function () {
                return NodeType.KeyframeSelector;
            },
            enumerable: true,
            configurable: true
        });
        return KeyframeSelector;
    }(BodyDeclaration));
    exports.KeyframeSelector = KeyframeSelector;
    var Import = (function (_super) {
        __extends(Import, _super);
        function Import(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Import.prototype, "type", {
            get: function () {
                return NodeType.Import;
            },
            enumerable: true,
            configurable: true
        });
        Import.prototype.setMedialist = function (node) {
            if (node) {
                node.attachTo(this);
                this.medialist = node;
                return true;
            }
            return false;
        };
        return Import;
    }(Node));
    exports.Import = Import;
    var Namespace = (function (_super) {
        __extends(Namespace, _super);
        function Namespace(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Namespace.prototype, "type", {
            get: function () {
                return NodeType.Namespace;
            },
            enumerable: true,
            configurable: true
        });
        return Namespace;
    }(Node));
    exports.Namespace = Namespace;
    var Media = (function (_super) {
        __extends(Media, _super);
        function Media(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Media.prototype, "type", {
            get: function () {
                return NodeType.Media;
            },
            enumerable: true,
            configurable: true
        });
        return Media;
    }(BodyDeclaration));
    exports.Media = Media;
    var Document = (function (_super) {
        __extends(Document, _super);
        function Document(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Document.prototype, "type", {
            get: function () {
                return NodeType.Document;
            },
            enumerable: true,
            configurable: true
        });
        return Document;
    }(BodyDeclaration));
    exports.Document = Document;
    var Medialist = (function (_super) {
        __extends(Medialist, _super);
        function Medialist(offset, length) {
            _super.call(this, offset, length);
        }
        Medialist.prototype.getMediums = function () {
            if (!this.mediums) {
                this.mediums = new Nodelist(this);
            }
            return this.mediums;
        };
        return Medialist;
    }(Node));
    exports.Medialist = Medialist;
    var MediaQuery = (function (_super) {
        __extends(MediaQuery, _super);
        function MediaQuery(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(MediaQuery.prototype, "type", {
            get: function () {
                return NodeType.MediaQuery;
            },
            enumerable: true,
            configurable: true
        });
        return MediaQuery;
    }(Node));
    exports.MediaQuery = MediaQuery;
    var Page = (function (_super) {
        __extends(Page, _super);
        function Page(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Page.prototype, "type", {
            get: function () {
                return NodeType.Page;
            },
            enumerable: true,
            configurable: true
        });
        return Page;
    }(BodyDeclaration));
    exports.Page = Page;
    var PageBoxMarginBox = (function (_super) {
        __extends(PageBoxMarginBox, _super);
        function PageBoxMarginBox(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(PageBoxMarginBox.prototype, "type", {
            get: function () {
                return NodeType.PageBoxMarginBox;
            },
            enumerable: true,
            configurable: true
        });
        return PageBoxMarginBox;
    }(BodyDeclaration));
    exports.PageBoxMarginBox = PageBoxMarginBox;
    var Expression = (function (_super) {
        __extends(Expression, _super);
        function Expression(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Expression.prototype, "type", {
            get: function () {
                return NodeType.Expression;
            },
            enumerable: true,
            configurable: true
        });
        return Expression;
    }(Node));
    exports.Expression = Expression;
    var BinaryExpression = (function (_super) {
        __extends(BinaryExpression, _super);
        function BinaryExpression(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(BinaryExpression.prototype, "type", {
            get: function () {
                return NodeType.BinaryExpression;
            },
            enumerable: true,
            configurable: true
        });
        BinaryExpression.prototype.setLeft = function (left) {
            return this.setNode('left', left);
        };
        BinaryExpression.prototype.getLeft = function () {
            return this.left;
        };
        BinaryExpression.prototype.setRight = function (right) {
            return this.setNode('right', right);
        };
        BinaryExpression.prototype.getRight = function () {
            return this.right;
        };
        BinaryExpression.prototype.setOperator = function (value) {
            return this.setNode('operator', value);
        };
        BinaryExpression.prototype.getOperator = function () {
            return this.operator;
        };
        return BinaryExpression;
    }(Node));
    exports.BinaryExpression = BinaryExpression;
    var Term = (function (_super) {
        __extends(Term, _super);
        function Term(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Term.prototype, "type", {
            get: function () {
                return NodeType.Term;
            },
            enumerable: true,
            configurable: true
        });
        Term.prototype.setOperator = function (value) {
            return this.setNode('operator', value);
        };
        Term.prototype.getOperator = function () {
            return this.operator;
        };
        Term.prototype.setExpression = function (value) {
            return this.setNode('expression', value);
        };
        Term.prototype.getExpression = function () {
            return this.expression;
        };
        return Term;
    }(Node));
    exports.Term = Term;
    var Operator = (function (_super) {
        __extends(Operator, _super);
        function Operator(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Operator.prototype, "type", {
            get: function () {
                return NodeType.Operator;
            },
            enumerable: true,
            configurable: true
        });
        return Operator;
    }(Node));
    exports.Operator = Operator;
    var HexColorValue = (function (_super) {
        __extends(HexColorValue, _super);
        function HexColorValue(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(HexColorValue.prototype, "type", {
            get: function () {
                return NodeType.HexColorValue;
            },
            enumerable: true,
            configurable: true
        });
        return HexColorValue;
    }(Node));
    exports.HexColorValue = HexColorValue;
    var NumericValue = (function (_super) {
        __extends(NumericValue, _super);
        function NumericValue(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(NumericValue.prototype, "type", {
            get: function () {
                return NodeType.NumericValue;
            },
            enumerable: true,
            configurable: true
        });
        NumericValue.prototype.getValue = function () {
            var raw = this.getText();
            var unitIdx = 0, code, _dot = '.'.charCodeAt(0), _0 = '0'.charCodeAt(0), _9 = '9'.charCodeAt(0);
            for (var i = 0, len = raw.length; i < len; i++) {
                code = raw.charCodeAt(i);
                if (!(_0 <= code && code <= _9 || code === _dot)) {
                    break;
                }
                unitIdx += 1;
            }
            return {
                value: raw.substring(0, unitIdx),
                unit: unitIdx < len ? raw.substring(unitIdx) : undefined
            };
        };
        return NumericValue;
    }(Node));
    exports.NumericValue = NumericValue;
    var VariableDeclaration = (function (_super) {
        __extends(VariableDeclaration, _super);
        function VariableDeclaration(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(VariableDeclaration.prototype, "type", {
            get: function () {
                return NodeType.VariableDeclaration;
            },
            enumerable: true,
            configurable: true
        });
        VariableDeclaration.prototype.setVariable = function (node) {
            if (node) {
                node.attachTo(this);
                this.variable = node;
                return true;
            }
            return false;
        };
        VariableDeclaration.prototype.getVariable = function () {
            return this.variable;
        };
        VariableDeclaration.prototype.getName = function () {
            return this.variable ? this.variable.getName() : '';
        };
        VariableDeclaration.prototype.setValue = function (node) {
            if (node) {
                node.attachTo(this);
                this.value = node;
                return true;
            }
            return false;
        };
        return VariableDeclaration;
    }(AbstractDeclaration));
    exports.VariableDeclaration = VariableDeclaration;
    var Interpolation = (function (_super) {
        __extends(Interpolation, _super);
        function Interpolation(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Interpolation.prototype, "type", {
            get: function () {
                return NodeType.Interpolation;
            },
            enumerable: true,
            configurable: true
        });
        return Interpolation;
    }(Node));
    exports.Interpolation = Interpolation;
    var Variable = (function (_super) {
        __extends(Variable, _super);
        function Variable(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(Variable.prototype, "type", {
            get: function () {
                return NodeType.VariableName;
            },
            enumerable: true,
            configurable: true
        });
        Variable.prototype.getName = function () {
            return this.getText();
        };
        return Variable;
    }(Node));
    exports.Variable = Variable;
    var ExtendsReference = (function (_super) {
        __extends(ExtendsReference, _super);
        function ExtendsReference(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(ExtendsReference.prototype, "type", {
            get: function () {
                return NodeType.ExtendsReference;
            },
            enumerable: true,
            configurable: true
        });
        ExtendsReference.prototype.setSelector = function (node) {
            return this.setNode('selector', node, 0);
        };
        ExtendsReference.prototype.getSelector = function () {
            return this.selector;
        };
        ExtendsReference.prototype.getName = function () {
            return this.selector ? this.selector.getText() : '';
        };
        return ExtendsReference;
    }(Node));
    exports.ExtendsReference = ExtendsReference;
    var MixinReference = (function (_super) {
        __extends(MixinReference, _super);
        function MixinReference(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(MixinReference.prototype, "type", {
            get: function () {
                return NodeType.MixinReference;
            },
            enumerable: true,
            configurable: true
        });
        MixinReference.prototype.setIdentifier = function (node) {
            return this.setNode('identifier', node, 0);
        };
        MixinReference.prototype.getIdentifier = function () {
            return this.identifier;
        };
        MixinReference.prototype.getName = function () {
            return this.identifier ? this.identifier.getText() : '';
        };
        MixinReference.prototype.getArguments = function () {
            if (!this.arguments) {
                this.arguments = new Nodelist(this);
            }
            return this.arguments;
        };
        MixinReference.prototype.setContent = function (node) {
            return this.setNode('content', node);
        };
        MixinReference.prototype.getContent = function () {
            return this.content;
        };
        return MixinReference;
    }(Node));
    exports.MixinReference = MixinReference;
    var MixinDeclaration = (function (_super) {
        __extends(MixinDeclaration, _super);
        function MixinDeclaration(offset, length) {
            _super.call(this, offset, length);
        }
        Object.defineProperty(MixinDeclaration.prototype, "type", {
            get: function () {
                return NodeType.MixinDeclaration;
            },
            enumerable: true,
            configurable: true
        });
        MixinDeclaration.prototype.setIdentifier = function (node) {
            return this.setNode('identifier', node, 0);
        };
        MixinDeclaration.prototype.getIdentifier = function () {
            return this.identifier;
        };
        MixinDeclaration.prototype.getName = function () {
            return this.identifier ? this.identifier.getText() : '';
        };
        MixinDeclaration.prototype.getParameters = function () {
            if (!this.parameters) {
                this.parameters = new Nodelist(this);
            }
            return this.parameters;
        };
        MixinDeclaration.prototype.setGuard = function (node) {
            if (node) {
                node.attachTo(this);
                this.guard = node;
            }
            return false;
        };
        return MixinDeclaration;
    }(BodyDeclaration));
    exports.MixinDeclaration = MixinDeclaration;
    var LessGuard = (function (_super) {
        __extends(LessGuard, _super);
        function LessGuard() {
            _super.apply(this, arguments);
        }
        LessGuard.prototype.getConditions = function () {
            if (!this.conditions) {
                this.conditions = new Nodelist(this);
            }
            return this.conditions;
        };
        return LessGuard;
    }(Node));
    exports.LessGuard = LessGuard;
    var GuardCondition = (function (_super) {
        __extends(GuardCondition, _super);
        function GuardCondition() {
            _super.apply(this, arguments);
        }
        GuardCondition.prototype.setVariable = function (node) {
            return this.setNode('variable', node);
        };
        return GuardCondition;
    }(Node));
    exports.GuardCondition = GuardCondition;
    var Marker = (function () {
        function Marker(node, rule, level, message, offset, length) {
            if (offset === void 0) { offset = node.offset; }
            if (length === void 0) { length = node.length; }
            this.node = node;
            this.rule = rule;
            this.level = level;
            this.message = message || rule.message;
            this.offset = offset;
            this.length = length;
        }
        Marker.prototype.getRule = function () {
            return this.rule;
        };
        Marker.prototype.getLevel = function () {
            return this.level;
        };
        Marker.prototype.getOffset = function () {
            return this.offset;
        };
        Marker.prototype.getLength = function () {
            return this.length;
        };
        Marker.prototype.getNode = function () {
            return this.node;
        };
        Marker.prototype.getMessage = function () {
            return this.message;
        };
        return Marker;
    }());
    exports.Marker = Marker;
    /*
    export class DefaultVisitor implements IVisitor {
    
        public visitNode(node:Node):boolean {
            switch (node.type) {
                case NodeType.Stylesheet:
                    return this.visitStylesheet(<Stylesheet> node);
                case NodeType.FontFace:
                    return this.visitFontFace(<FontFace> node);
                case NodeType.Ruleset:
                    return this.visitRuleSet(<RuleSet> node);
                case NodeType.Selector:
                    return this.visitSelector(<Selector> node);
                case NodeType.SimpleSelector:
                    return this.visitSimpleSelector(<SimpleSelector> node);
                case NodeType.Declaration:
                    return this.visitDeclaration(<Declaration> node);
                case NodeType.Function:
                    return this.visitFunction(<Function> node);
                case NodeType.FunctionDeclaration:
                    return this.visitFunctionDeclaration(<FunctionDeclaration> node);
                case NodeType.FunctionParameter:
                    return this.visitFunctionParameter(<FunctionParameter> node);
                case NodeType.FunctionArgument:
                    return this.visitFunctionArgument(<FunctionArgument> node);
                case NodeType.Term:
                    return this.visitTerm(<Term> node);
                case NodeType.Declaration:
                    return this.visitExpression(<Expression> node);
                case NodeType.NumericValue:
                    return this.visitNumericValue(<NumericValue> node);
                case NodeType.Page:
                    return this.visitPage(<Page> node);
                case NodeType.PageBoxMarginBox:
                    return this.visitPageBoxMarginBox(<PageBoxMarginBox> node);
                case NodeType.Property:
                    return this.visitProperty(<Property> node);
                case NodeType.NumericValue:
                    return this.visitNodelist(<Nodelist> node);
                case NodeType.Import:
                    return this.visitImport(<Import> node);
                case NodeType.Namespace:
                    return this.visitNamespace(<Namespace> node);
                case NodeType.Keyframe:
                    return this.visitKeyframe(<Keyframe> node);
                case NodeType.KeyframeSelector:
                    return this.visitKeyframeSelector(<KeyframeSelector> node);
                case NodeType.MixinDeclaration:
                    return this.visitMixinDeclaration(<MixinDeclaration> node);
                case NodeType.MixinReference:
                    return this.visitMixinReference(<MixinReference> node);
                case NodeType.Variable:
                    return this.visitVariable(<Variable> node);
                case NodeType.VariableDeclaration:
                    return this.visitVariableDeclaration(<VariableDeclaration> node);
            }
            return this.visitUnknownNode(node);
        }
    
        public visitFontFace(node:FontFace):boolean {
            return true;
        }
    
        public visitKeyframe(node:Keyframe):boolean {
            return true;
        }
    
        public visitKeyframeSelector(node:KeyframeSelector):boolean {
            return true;
        }
    
        public visitStylesheet(node:Stylesheet):boolean {
            return true;
        }
    
        public visitProperty(Node:Property):boolean {
            return true;
        }
    
        public visitRuleSet(node:RuleSet):boolean {
            return true;
        }
    
        public visitSelector(node:Selector):boolean {
            return true;
        }
    
        public visitSimpleSelector(node:SimpleSelector):boolean {
            return true;
        }
    
        public visitDeclaration(node:Declaration):boolean {
            return true;
        }
    
        public visitFunction(node:Function):boolean {
            return true;
        }
    
        public visitFunctionDeclaration(node:FunctionDeclaration):boolean {
            return true;
        }
    
        public visitInvocation(node:Invocation):boolean {
            return true;
        }
    
        public visitTerm(node:Term):boolean {
            return true;
        }
    
        public visitImport(node:Import):boolean {
            return true;
        }
    
        public visitNamespace(node:Namespace):boolean {
            return true;
        }
    
        public visitExpression(node:Expression):boolean {
            return true;
        }
    
        public visitNumericValue(node:NumericValue):boolean {
            return true;
        }
    
        public visitPage(node:Page):boolean {
            return true;
        }
    
        public visitPageBoxMarginBox(node:PageBoxMarginBox):boolean {
            return true;
        }
    
        public visitNodelist(node:Nodelist):boolean {
            return true;
        }
    
        public visitVariableDeclaration(node:VariableDeclaration):boolean {
            return true;
        }
    
        public visitVariable(node:Variable):boolean {
            return true;
        }
    
        public visitMixinDeclaration(node:MixinDeclaration):boolean {
            return true;
        }
    
        public visitMixinReference(node:MixinReference):boolean {
            return true;
        }
    
        public visitUnknownNode(node:Node):boolean {
            return true;
        }
    }
    */
    var ParseErrorCollector = (function () {
        function ParseErrorCollector() {
            this.entries = [];
        }
        ParseErrorCollector.entries = function (node) {
            var visitor = new ParseErrorCollector();
            node.accept(visitor);
            return visitor.entries;
        };
        ParseErrorCollector.prototype.visitNode = function (node) {
            if (node.isErroneous()) {
                node.collectIssues(this.entries);
            }
            return true;
        };
        return ParseErrorCollector;
    }());
    exports.ParseErrorCollector = ParseErrorCollector;
});

define(__m[10], __M([1,0]), function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    (function (TokenType) {
        TokenType[TokenType["Ident"] = 0] = "Ident";
        TokenType[TokenType["AtKeyword"] = 1] = "AtKeyword";
        TokenType[TokenType["String"] = 2] = "String";
        TokenType[TokenType["BadString"] = 3] = "BadString";
        TokenType[TokenType["BadUri"] = 4] = "BadUri";
        TokenType[TokenType["Hash"] = 5] = "Hash";
        TokenType[TokenType["Num"] = 6] = "Num";
        TokenType[TokenType["Percentage"] = 7] = "Percentage";
        TokenType[TokenType["Dimension"] = 8] = "Dimension";
        TokenType[TokenType["URI"] = 9] = "URI";
        TokenType[TokenType["UnicodeRange"] = 10] = "UnicodeRange";
        TokenType[TokenType["CDO"] = 11] = "CDO";
        TokenType[TokenType["CDC"] = 12] = "CDC";
        TokenType[TokenType["Colon"] = 13] = "Colon";
        TokenType[TokenType["SemiColon"] = 14] = "SemiColon";
        TokenType[TokenType["CurlyL"] = 15] = "CurlyL";
        TokenType[TokenType["CurlyR"] = 16] = "CurlyR";
        TokenType[TokenType["ParenthesisL"] = 17] = "ParenthesisL";
        TokenType[TokenType["ParenthesisR"] = 18] = "ParenthesisR";
        TokenType[TokenType["BracketL"] = 19] = "BracketL";
        TokenType[TokenType["BracketR"] = 20] = "BracketR";
        TokenType[TokenType["Whitespace"] = 21] = "Whitespace";
        TokenType[TokenType["Includes"] = 22] = "Includes";
        TokenType[TokenType["Dashmatch"] = 23] = "Dashmatch";
        TokenType[TokenType["SubstringOperator"] = 24] = "SubstringOperator";
        TokenType[TokenType["PrefixOperator"] = 25] = "PrefixOperator";
        TokenType[TokenType["SuffixOperator"] = 26] = "SuffixOperator";
        TokenType[TokenType["Delim"] = 27] = "Delim";
        TokenType[TokenType["EMS"] = 28] = "EMS";
        TokenType[TokenType["EXS"] = 29] = "EXS";
        TokenType[TokenType["Length"] = 30] = "Length";
        TokenType[TokenType["Angle"] = 31] = "Angle";
        TokenType[TokenType["Time"] = 32] = "Time";
        TokenType[TokenType["Freq"] = 33] = "Freq";
        TokenType[TokenType["Exclamation"] = 34] = "Exclamation";
        TokenType[TokenType["Resolution"] = 35] = "Resolution";
        TokenType[TokenType["Comma"] = 36] = "Comma";
        TokenType[TokenType["Charset"] = 37] = "Charset";
        TokenType[TokenType["EscapedJavaScript"] = 38] = "EscapedJavaScript";
        TokenType[TokenType["BadEscapedJavaScript"] = 39] = "BadEscapedJavaScript";
        TokenType[TokenType["Comment"] = 40] = "Comment";
        TokenType[TokenType["SingleLineComment"] = 41] = "SingleLineComment";
        TokenType[TokenType["EOF"] = 42] = "EOF";
        TokenType[TokenType["CustomToken"] = 43] = "CustomToken";
    })(exports.TokenType || (exports.TokenType = {}));
    var TokenType = exports.TokenType;
    var MultiLineStream = (function () {
        function MultiLineStream(source) {
            this.source = source;
            this.len = source.length;
            this.position = 0;
        }
        MultiLineStream.prototype.substring = function (from, to) {
            if (to === void 0) { to = this.position; }
            return this.source.substring(from, to);
        };
        MultiLineStream.prototype.eos = function () {
            return this.len <= this.position;
        };
        MultiLineStream.prototype.pos = function () {
            return this.position;
        };
        MultiLineStream.prototype.goBackTo = function (pos) {
            this.position = pos;
        };
        MultiLineStream.prototype.goBack = function (n) {
            this.position -= n;
        };
        MultiLineStream.prototype.advance = function (n) {
            this.position += n;
        };
        MultiLineStream.prototype.nextChar = function () {
            return this.source.charCodeAt(this.position++) || 0;
        };
        MultiLineStream.prototype.peekChar = function (n) {
            if (n === void 0) { n = 0; }
            return this.source.charCodeAt(this.position + n) || 0;
        };
        MultiLineStream.prototype.lookbackChar = function (n) {
            if (n === void 0) { n = 0; }
            return this.source.charCodeAt(this.position - n) || 0;
        };
        MultiLineStream.prototype.advanceIfChar = function (ch) {
            if (ch === this.source.charCodeAt(this.position)) {
                this.position++;
                return true;
            }
            return false;
        };
        MultiLineStream.prototype.advanceIfChars = function (ch) {
            var i;
            if (this.position + ch.length > this.source.length) {
                return false;
            }
            for (i = 0; i < ch.length; i++) {
                if (this.source.charCodeAt(this.position + i) !== ch[i]) {
                    return false;
                }
            }
            this.advance(i);
            return true;
        };
        MultiLineStream.prototype.advanceWhileChar = function (condition) {
            var posNow = this.position;
            while (this.position < this.len && condition(this.source.charCodeAt(this.position))) {
                this.position++;
            }
            return this.position - posNow;
        };
        return MultiLineStream;
    }());
    exports.MultiLineStream = MultiLineStream;
    var _a = 'a'.charCodeAt(0);
    var _e = 'e'.charCodeAt(0);
    var _f = 'f'.charCodeAt(0);
    var _i = 'i'.charCodeAt(0);
    var _l = 'l'.charCodeAt(0);
    var _p = 'p'.charCodeAt(0);
    var _r = 'r'.charCodeAt(0);
    var _u = 'u'.charCodeAt(0);
    var _x = 'x'.charCodeAt(0);
    var _z = 'z'.charCodeAt(0);
    var _A = 'A'.charCodeAt(0);
    var _E = 'E'.charCodeAt(0);
    var _F = 'F'.charCodeAt(0);
    var _I = 'I'.charCodeAt(0);
    var _L = 'L'.charCodeAt(0);
    var _P = 'P'.charCodeAt(0);
    var _R = 'R'.charCodeAt(0);
    var _U = 'U'.charCodeAt(0);
    var _X = 'X'.charCodeAt(0);
    var _Z = 'Z'.charCodeAt(0);
    var _0 = '0'.charCodeAt(0);
    var _9 = '9'.charCodeAt(0);
    var _TLD = '~'.charCodeAt(0);
    var _HAT = '^'.charCodeAt(0);
    var _EQS = '='.charCodeAt(0);
    var _PIP = '|'.charCodeAt(0);
    var _MIN = '-'.charCodeAt(0);
    var _USC = '_'.charCodeAt(0);
    var _PRC = '%'.charCodeAt(0);
    var _MUL = '*'.charCodeAt(0);
    var _LPA = '('.charCodeAt(0);
    var _RPA = ')'.charCodeAt(0);
    var _LAN = '<'.charCodeAt(0);
    var _RAN = '>'.charCodeAt(0);
    var _ATS = '@'.charCodeAt(0);
    var _HSH = '#'.charCodeAt(0);
    var _DLR = '$'.charCodeAt(0);
    var _BSL = '\\'.charCodeAt(0);
    var _FSL = '/'.charCodeAt(0);
    var _NWL = '\n'.charCodeAt(0);
    var _CAR = '\r'.charCodeAt(0);
    var _LFD = '\f'.charCodeAt(0);
    var _DQO = '"'.charCodeAt(0);
    var _SQO = '\''.charCodeAt(0);
    var _WSP = ' '.charCodeAt(0);
    var _TAB = '\t'.charCodeAt(0);
    var _SEM = ';'.charCodeAt(0);
    var _COL = ':'.charCodeAt(0);
    var _CUL = '{'.charCodeAt(0);
    var _CUR = '}'.charCodeAt(0);
    var _BRL = '['.charCodeAt(0);
    var _BRR = ']'.charCodeAt(0);
    var _CMA = ','.charCodeAt(0);
    var _DOT = '.'.charCodeAt(0);
    var _BNG = '!'.charCodeAt(0);
    var _url = [_u, _U, _r, _R, _l, _L, _LPA, _LPA];
    var _url_prefix = [_u, _U, _r, _R, _l, _L, _MIN, _MIN, _p, _P, _r, _R, _e, _E, _f, _F, _i, _I, _x, _X, _LPA, _LPA];
    var staticTokenTable = {};
    staticTokenTable[_SEM] = TokenType.SemiColon;
    staticTokenTable[_COL] = TokenType.Colon;
    staticTokenTable[_CUL] = TokenType.CurlyL;
    staticTokenTable[_CUR] = TokenType.CurlyR;
    staticTokenTable[_BRR] = TokenType.BracketR;
    staticTokenTable[_BRL] = TokenType.BracketL;
    staticTokenTable[_LPA] = TokenType.ParenthesisL;
    staticTokenTable[_RPA] = TokenType.ParenthesisR;
    staticTokenTable[_CMA] = TokenType.Comma;
    var staticUnitTable = {};
    staticUnitTable['em'] = TokenType.EMS;
    staticUnitTable['ex'] = TokenType.EXS;
    staticUnitTable['px'] = TokenType.Length;
    staticUnitTable['cm'] = TokenType.Length;
    staticUnitTable['mm'] = TokenType.Length;
    staticUnitTable['in'] = TokenType.Length;
    staticUnitTable['pt'] = TokenType.Length;
    staticUnitTable['pc'] = TokenType.Length;
    staticUnitTable['deg'] = TokenType.Angle;
    staticUnitTable['rad'] = TokenType.Angle;
    staticUnitTable['grad'] = TokenType.Angle;
    staticUnitTable['ms'] = TokenType.Time;
    staticUnitTable['s'] = TokenType.Time;
    staticUnitTable['hz'] = TokenType.Freq;
    staticUnitTable['khz'] = TokenType.Freq;
    staticUnitTable['%'] = TokenType.Percentage;
    staticUnitTable['dpi'] = TokenType.Resolution;
    staticUnitTable['dpcm'] = TokenType.Resolution;
    var Scanner = (function () {
        function Scanner() {
            this.ignoreComment = true;
            this.ignoreWhitespace = true;
        }
        Scanner.prototype.setSource = function (input) {
            this.stream = new MultiLineStream(input);
        };
        Scanner.prototype.finishToken = function (offset, type, text) {
            return {
                offset: offset,
                len: this.stream.pos() - offset,
                type: type,
                text: text || this.stream.substring(offset)
            };
        };
        Scanner.prototype.substring = function (offset, len) {
            return this.stream.substring(offset, offset + len);
        };
        Scanner.prototype.pos = function () {
            return this.stream.pos();
        };
        Scanner.prototype.goBackTo = function (pos) {
            this.stream.goBackTo(pos);
        };
        Scanner.prototype.scan = function () {
            // processes all whitespaces and comments
            var triviaToken = this.trivia();
            if (triviaToken !== null) {
                return triviaToken;
            }
            var offset = this.stream.pos();
            // End of file/input
            if (this.stream.eos()) {
                return this.finishToken(offset, TokenType.EOF);
            }
            // CDO <!--
            if (this.stream.advanceIfChars([_LAN, _BNG, _MIN, _MIN])) {
                return this.finishToken(offset, TokenType.CDO);
            }
            // CDC -->
            if (this.stream.advanceIfChars([_MIN, _MIN, _RAN])) {
                return this.finishToken(offset, TokenType.CDC);
            }
            // URL
            var tokenType = this._url();
            if (tokenType !== null) {
                return this.finishToken(offset, tokenType);
            }
            var content = [];
            if (this.ident(content)) {
                return this.finishToken(offset, TokenType.Ident, content.join(''));
            }
            // at-keyword
            if (this.stream.advanceIfChar(_ATS)) {
                content = ['@'];
                if (this._name(content)) {
                    var keywordText = content.join('');
                    if (keywordText === '@charset') {
                        return this.finishToken(offset, TokenType.Charset, keywordText);
                    }
                    return this.finishToken(offset, TokenType.AtKeyword, keywordText);
                }
                else {
                    return this.finishToken(offset, TokenType.Delim);
                }
            }
            // hash
            if (this.stream.advanceIfChar(_HSH)) {
                content = ['#'];
                if (this._name(content)) {
                    return this.finishToken(offset, TokenType.Hash, content.join(''));
                }
                else {
                    return this.finishToken(offset, TokenType.Delim);
                }
            }
            // Important
            if (this.stream.advanceIfChar(_BNG)) {
                return this.finishToken(offset, TokenType.Exclamation);
            }
            // Numbers
            if (this._number()) {
                var pos = this.stream.pos();
                content = [this.stream.substring(offset, pos)];
                if (this.stream.advanceIfChar(_PRC)) {
                    // Percentage 43%
                    return this.finishToken(offset, TokenType.Percentage);
                }
                else if (this.ident(content)) {
                    var dim = this.stream.substring(pos).toLowerCase();
                    tokenType = staticUnitTable[dim];
                    if (typeof tokenType !== 'undefined') {
                        // Known dimension 43px
                        return this.finishToken(offset, tokenType, content.join(''));
                    }
                    else {
                        // Unknown dimension 43ft
                        return this.finishToken(offset, TokenType.Dimension, content.join(''));
                    }
                }
                return this.finishToken(offset, TokenType.Num);
            }
            // String, BadString
            content = [];
            tokenType = this._string(content);
            if (tokenType !== null) {
                return this.finishToken(offset, tokenType, content.join(''));
            }
            // single character tokens
            tokenType = staticTokenTable[this.stream.peekChar()];
            if (typeof tokenType !== 'undefined') {
                this.stream.advance(1);
                return this.finishToken(offset, tokenType);
            }
            // includes ~=
            if (this.stream.peekChar(0) === _TLD && this.stream.peekChar(1) === _EQS) {
                this.stream.advance(2);
                return this.finishToken(offset, TokenType.Includes);
            }
            // DashMatch |=
            if (this.stream.peekChar(0) === _PIP && this.stream.peekChar(1) === _EQS) {
                this.stream.advance(2);
                return this.finishToken(offset, TokenType.Dashmatch);
            }
            // Substring operator *=
            if (this.stream.peekChar(0) === _MUL && this.stream.peekChar(1) === _EQS) {
                this.stream.advance(2);
                return this.finishToken(offset, TokenType.SubstringOperator);
            }
            // Substring operator ^=
            if (this.stream.peekChar(0) === _HAT && this.stream.peekChar(1) === _EQS) {
                this.stream.advance(2);
                return this.finishToken(offset, TokenType.PrefixOperator);
            }
            // Substring operator $=
            if (this.stream.peekChar(0) === _DLR && this.stream.peekChar(1) === _EQS) {
                this.stream.advance(2);
                return this.finishToken(offset, TokenType.SuffixOperator);
            }
            // Delim
            this.stream.nextChar();
            return this.finishToken(offset, TokenType.Delim);
        };
        Scanner.prototype._matchWordAnyCase = function (characters) {
            var index = 0;
            this.stream.advanceWhileChar(function (ch) {
                var result = characters[index] === ch || characters[index + 1] === ch;
                if (result) {
                    index += 2;
                }
                return result;
            });
            if (index === characters.length) {
                return true;
            }
            else {
                this.stream.goBack(index / 2);
                return false;
            }
        };
        Scanner.prototype.trivia = function () {
            while (true) {
                var offset = this.stream.pos();
                if (this._whitespace()) {
                    if (!this.ignoreWhitespace) {
                        return this.finishToken(offset, TokenType.Whitespace);
                    }
                }
                else if (this.comment()) {
                    if (!this.ignoreComment) {
                        return this.finishToken(offset, TokenType.Comment);
                    }
                }
                else {
                    return null;
                }
            }
        };
        Scanner.prototype.comment = function () {
            if (this.stream.advanceIfChars([_FSL, _MUL])) {
                var success_1 = false, hot_1 = false;
                this.stream.advanceWhileChar(function (ch) {
                    if (hot_1 && ch === _FSL) {
                        success_1 = true;
                        return false;
                    }
                    hot_1 = ch === _MUL;
                    return true;
                });
                if (success_1) {
                    this.stream.advance(1);
                }
                return true;
            }
            return false;
        };
        Scanner.prototype._number = function () {
            var npeek = 0, ch;
            if (this.stream.peekChar() === _DOT) {
                npeek = 1;
            }
            ch = this.stream.peekChar(npeek);
            if (ch >= _0 && ch <= _9) {
                this.stream.advance(npeek + 1);
                this.stream.advanceWhileChar(function (ch) {
                    return ch >= _0 && ch <= _9 || npeek === 0 && ch === _DOT;
                });
                return true;
            }
            return false;
        };
        Scanner.prototype._newline = function (result) {
            var ch = this.stream.peekChar();
            switch (ch) {
                case _CAR:
                case _LFD:
                case _NWL:
                    this.stream.advance(1);
                    result.push(String.fromCharCode(ch));
                    if (ch === _CAR && this.stream.advanceIfChar(_NWL)) {
                        result.push('\n');
                    }
                    return true;
            }
            return false;
        };
        Scanner.prototype._escape = function (result, includeNewLines) {
            var ch = this.stream.peekChar();
            if (ch === _BSL) {
                this.stream.advance(1);
                ch = this.stream.peekChar();
                var hexNumCount = 0;
                while (hexNumCount < 6 && (ch >= _0 && ch <= _9 || ch >= _a && ch <= _f || ch >= _A && ch <= _F)) {
                    this.stream.advance(1);
                    ch = this.stream.peekChar();
                    hexNumCount++;
                }
                if (hexNumCount > 0) {
                    try {
                        var hexVal = parseInt(this.stream.substring(this.stream.pos() - hexNumCount), 16);
                        if (hexVal) {
                            result.push(String.fromCharCode(hexVal));
                        }
                    }
                    catch (e) {
                    }
                    // optional whitespace or new line, not part of result text
                    if (ch === _WSP || ch === _TAB) {
                        this.stream.advance(1);
                    }
                    else {
                        this._newline([]);
                    }
                    return true;
                }
                if (ch !== _CAR && ch !== _LFD && ch !== _NWL) {
                    this.stream.advance(1);
                    result.push(String.fromCharCode(ch));
                    return true;
                }
                else if (includeNewLines) {
                    return this._newline(result);
                }
            }
            return false;
        };
        Scanner.prototype._stringChar = function (closeQuote, result) {
            // not closeQuote, not backslash, not newline
            var ch = this.stream.peekChar();
            if (ch !== 0 && ch !== closeQuote && ch !== _BSL && ch !== _CAR && ch !== _LFD && ch !== _NWL) {
                this.stream.advance(1);
                result.push(String.fromCharCode(ch));
                return true;
            }
            return false;
        };
        ;
        Scanner.prototype._string = function (result) {
            if (this.stream.peekChar() === _SQO || this.stream.peekChar() === _DQO) {
                var closeQuote = this.stream.nextChar();
                result.push(String.fromCharCode(closeQuote));
                while (this._stringChar(closeQuote, result) || this._escape(result, true)) {
                }
                if (this.stream.peekChar() === closeQuote) {
                    this.stream.nextChar();
                    result.push(String.fromCharCode(closeQuote));
                    return TokenType.String;
                }
                else {
                    return TokenType.BadString;
                }
            }
            return null;
        };
        Scanner.prototype._url = function () {
            if (this._matchWordAnyCase(_url) || this._matchWordAnyCase(_url_prefix)) {
                this._whitespace();
                var tokenType = TokenType.URI, stringType = this._string([]);
                if (stringType === TokenType.BadString) {
                    tokenType = TokenType.BadUri;
                }
                else if (stringType === null) {
                    this.stream.advanceWhileChar(function (ch) {
                        return ch !== _RPA;
                    });
                    tokenType = TokenType.URI;
                }
                this._whitespace();
                if (this.stream.advanceIfChar(_RPA)) {
                    return tokenType;
                }
                else {
                    return TokenType.BadUri;
                }
            }
            return null;
        };
        Scanner.prototype._whitespace = function () {
            var n = this.stream.advanceWhileChar(function (ch) {
                return ch === _WSP || ch === _TAB || ch === _NWL || ch === _LFD || ch === _CAR;
            });
            return n > 0;
        };
        Scanner.prototype._name = function (result) {
            var matched = false;
            while (this._identChar(result) || this._escape(result)) {
                matched = true;
            }
            return matched;
        };
        Scanner.prototype.ident = function (result) {
            var pos = this.stream.pos();
            var hasMinus = this._minus(result);
            if (hasMinus && this._minus(result) /* -- */) {
                var hasContent = false;
                while (this._identChar(result) || this._escape(result)) {
                    hasContent = true;
                }
                if (hasContent) {
                    return true;
                }
            }
            else if (this._identFirstChar(result) || this._escape(result)) {
                while (this._identChar(result) || this._escape(result)) {
                }
                return true;
            }
            this.stream.goBackTo(pos);
            return false;
        };
        Scanner.prototype._identFirstChar = function (result) {
            var ch = this.stream.peekChar();
            if (ch === _USC ||
                ch >= _a && ch <= _z ||
                ch >= _A && ch <= _Z ||
                ch >= 0x80 && ch <= 0xFFFF) {
                this.stream.advance(1);
                result.push(String.fromCharCode(ch));
                return true;
            }
            return false;
        };
        Scanner.prototype._minus = function (result) {
            var ch = this.stream.peekChar();
            if (ch === _MIN) {
                this.stream.advance(1);
                result.push(String.fromCharCode(ch));
                return true;
            }
            return false;
        };
        Scanner.prototype._identChar = function (result) {
            var ch = this.stream.peekChar();
            if (ch === _USC ||
                ch === _MIN ||
                ch >= _a && ch <= _z ||
                ch >= _A && ch <= _Z ||
                ch >= _0 && ch <= _9 ||
                ch >= 0x80 && ch <= 0xFFFF) {
                this.stream.advance(1);
                result.push(String.fromCharCode(ch));
                return true;
            }
            return false;
        };
        return Scanner;
    }());
    exports.Scanner = Scanner;
});






define(__m[8], __M([1,0,2,27]), function (require, exports, nodes, arrays) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var Scope = (function () {
        function Scope(offset, length) {
            this.offset = offset;
            this.length = length;
            this.symbols = [];
            this.parent = null;
            this.children = [];
        }
        Scope.prototype.addChild = function (scope) {
            this.children.push(scope);
            scope.setParent(this);
        };
        Scope.prototype.setParent = function (scope) {
            this.parent = scope;
        };
        Scope.prototype.findScope = function (offset, length) {
            if (length === void 0) { length = 0; }
            if (this.offset <= offset && this.offset + this.length > offset + length || this.offset === offset && this.length === length) {
                return this.findInScope(offset, length);
            }
            return null;
        };
        Scope.prototype.findInScope = function (offset, length) {
            if (length === void 0) { length = 0; }
            // find the first scope child that has an offset larger than offset + length
            var end = offset + length;
            var idx = arrays.findFirst(this.children, function (s) { return s.offset > end; });
            if (idx === 0) {
                // all scopes have offsets larger than our end
                return this;
            }
            var res = this.children[idx - 1];
            if (res.offset <= offset && res.offset + res.length >= offset + length) {
                return res.findInScope(offset, length);
            }
            return this;
        };
        Scope.prototype.addSymbol = function (symbol) {
            this.symbols.push(symbol);
        };
        Scope.prototype.getSymbol = function (name, type) {
            for (var index = 0; index < this.symbols.length; index++) {
                var symbol = this.symbols[index];
                if (symbol.name === name && symbol.type === type) {
                    return symbol;
                }
            }
            return null;
        };
        Scope.prototype.getSymbols = function () {
            return this.symbols;
        };
        return Scope;
    }());
    exports.Scope = Scope;
    var GlobalScope = (function (_super) {
        __extends(GlobalScope, _super);
        function GlobalScope() {
            _super.call(this, 0, Number.MAX_VALUE);
        }
        return GlobalScope;
    }(Scope));
    exports.GlobalScope = GlobalScope;
    var Symbol = (function () {
        function Symbol(name, node, type) {
            this.name = name;
            this.node = node;
            this.type = type;
        }
        return Symbol;
    }());
    exports.Symbol = Symbol;
    var ScopeBuilder = (function () {
        function ScopeBuilder(scope) {
            this.scope = scope;
        }
        ScopeBuilder.prototype.addSymbol = function (node, name, type) {
            if (node.offset !== -1) {
                var current = this.scope.findScope(node.offset, node.length);
                current.addSymbol(new Symbol(name, node, type));
            }
        };
        ScopeBuilder.prototype.addScope = function (node) {
            if (node.offset !== -1) {
                var current = this.scope.findScope(node.offset, node.length);
                if (current.offset !== node.offset || current.length !== node.length) {
                    var newScope = new Scope(node.offset, node.length);
                    current.addChild(newScope);
                    return newScope;
                }
                return current;
            }
            return null;
        };
        ScopeBuilder.prototype.addSymbolToChildScope = function (scopeNode, node, name, type) {
            if (scopeNode && scopeNode.offset !== -1) {
                var current = this.addScope(scopeNode); // create the scope or gets the existing one
                current.addSymbol(new Symbol(name, node, type));
            }
        };
        ScopeBuilder.prototype.visitNode = function (node) {
            switch (node.type) {
                case nodes.NodeType.Keyframe:
                    this.addSymbol(node, node.getName(), nodes.ReferenceType.Keyframe);
                    return true;
                case nodes.NodeType.Declaration:
                    return this.visitDeclarationNode(node);
                case nodes.NodeType.VariableDeclaration:
                    return this.visitVariableDeclarationNode(node);
                case nodes.NodeType.Ruleset:
                    return this.visitRuleSet(node);
                case nodes.NodeType.MixinDeclaration:
                    this.addSymbol(node, node.getName(), nodes.ReferenceType.Mixin);
                    return true;
                case nodes.NodeType.FunctionDeclaration:
                    this.addSymbol(node, node.getName(), nodes.ReferenceType.Function);
                    return true;
                case nodes.NodeType.FunctionParameter: {
                    // parameters are part of the body scope
                    var scopeNode = node.getParent().getDeclarations();
                    if (scopeNode) {
                        this.addSymbolToChildScope(scopeNode, node, node.getName(), nodes.ReferenceType.Variable);
                    }
                    return true;
                }
                case nodes.NodeType.Declarations:
                    this.addScope(node);
                    return true;
                case nodes.NodeType.For:
                case nodes.NodeType.Each: {
                    var forOrEachNode = node;
                    var scopeNode = forOrEachNode.getDeclarations();
                    if (scopeNode) {
                        this.addSymbolToChildScope(scopeNode, forOrEachNode.variable, forOrEachNode.variable.getName(), nodes.ReferenceType.Variable);
                    }
                    return true;
                }
            }
            return true;
        };
        ScopeBuilder.prototype.visitRuleSet = function (node) {
            var current = this.scope.findScope(node.offset, node.length);
            node.getSelectors().getChildren().forEach(function (child) {
                if (child instanceof nodes.Selector) {
                    if (child.getChildren().length === 1) {
                        current.addSymbol(new Symbol(child.getChild(0).getText(), child, nodes.ReferenceType.Rule));
                    }
                }
            });
            return true;
        };
        ScopeBuilder.prototype.visitVariableDeclarationNode = function (node) {
            this.addSymbol(node, node.getName(), nodes.ReferenceType.Variable);
            return true;
        };
        ScopeBuilder.prototype.visitDeclarationNode = function (node) {
            if (Symbols.isCssVariable(node.getProperty().getIdentifier())) {
                this.addCSSVariable(node.getProperty(), node.getProperty().getName(), nodes.ReferenceType.Variable);
            }
            return true;
        };
        ScopeBuilder.prototype.addCSSVariable = function (node, name, type) {
            if (node.offset !== -1) {
                var globalScope = this.getGlobalScope(node, name, type);
                globalScope.addSymbol(new Symbol(name, node, type));
            }
        };
        ScopeBuilder.prototype.getGlobalScope = function (node, name, type) {
            var current = this.scope.findScope(node.offset, node.length);
            while (current.parent !== null) {
                current = current.parent;
            }
            return current;
        };
        return ScopeBuilder;
    }());
    exports.ScopeBuilder = ScopeBuilder;
    var Symbols = (function () {
        function Symbols(node) {
            this.global = new GlobalScope();
            node.accept(new ScopeBuilder(this.global));
        }
        Symbols.prototype.findSymbolsAtOffset = function (offset, referenceType) {
            var scope = this.global.findScope(offset, 0);
            var result = [];
            var names = {};
            while (scope) {
                var symbols = scope.getSymbols();
                for (var i = 0; i < symbols.length; i++) {
                    var symbol = symbols[i];
                    if (symbol.node.offset <= offset && symbol.type === referenceType && !names[symbol.name]) {
                        result.push(symbol);
                        names[symbol.name] = true;
                    }
                }
                scope = scope.parent;
            }
            return result;
        };
        Symbols.prototype.internalFindSymbol = function (node, referenceTypes) {
            var scopeNode = node;
            if (node.parent instanceof nodes.FunctionParameter && node.parent.getParent() instanceof nodes.BodyDeclaration) {
                scopeNode = node.parent.getParent().getDeclarations();
            }
            if (node.parent instanceof nodes.FunctionArgument && node.parent.getParent() instanceof nodes.Function) {
                var funcId = node.parent.getParent().getIdentifier();
                if (funcId) {
                    var functionSymbol = this.internalFindSymbol(funcId, [nodes.ReferenceType.Function]);
                    if (functionSymbol) {
                        scopeNode = functionSymbol.node.getDeclarations();
                    }
                }
            }
            if (!scopeNode) {
                return null;
            }
            var name = node.getText();
            var scope = this.global.findScope(scopeNode.offset, scopeNode.length);
            while (scope) {
                for (var index = 0; index < referenceTypes.length; index++) {
                    var type = referenceTypes[index];
                    var symbol = scope.getSymbol(name, type);
                    if (symbol) {
                        return symbol;
                    }
                }
                scope = scope.parent;
            }
            return null;
        };
        Symbols.prototype.evaluateReferenceTypes = function (node) {
            if (node instanceof nodes.Identifier) {
                var referenceTypes = node.referenceTypes;
                if (referenceTypes) {
                    return referenceTypes;
                }
                else {
                    if (Symbols.isCssVariable(node)) {
                        return [nodes.ReferenceType.Variable];
                    }
                    // are a reference to a keyframe?
                    var decl = nodes.getParentDeclaration(node);
                    if (decl) {
                        var propertyName = decl.getNonPrefixedPropertyName();
                        if ((propertyName === 'animation' || propertyName === 'animation-name')
                            && decl.getValue() && decl.getValue().offset === node.offset) {
                            return [nodes.ReferenceType.Keyframe];
                        }
                    }
                }
            }
            else if (node instanceof nodes.Variable) {
                return [nodes.ReferenceType.Variable];
            }
            var selector = node.findParent(nodes.NodeType.Selector);
            if (selector) {
                return [nodes.ReferenceType.Rule];
            }
            var extendsRef = node.findParent(nodes.NodeType.ExtendsReference);
            if (extendsRef) {
                return [nodes.ReferenceType.Rule];
            }
            return null;
        };
        Symbols.prototype.findSymbolFromNode = function (node) {
            if (!node) {
                return null;
            }
            while (node.type === nodes.NodeType.Interpolation) {
                node = node.getParent();
            }
            var referenceTypes = this.evaluateReferenceTypes(node);
            if (referenceTypes) {
                return this.internalFindSymbol(node, referenceTypes);
            }
            return null;
        };
        Symbols.prototype.matchesSymbol = function (node, symbol) {
            if (!node) {
                return null;
            }
            while (node.type === nodes.NodeType.Interpolation) {
                node = node.getParent();
            }
            if (symbol.name.length !== node.length || symbol.name !== node.getText()) {
                return false;
            }
            var referenceTypes = this.evaluateReferenceTypes(node);
            if (!referenceTypes || referenceTypes.indexOf(symbol.type) === -1) {
                return false;
            }
            var nodeSymbol = this.internalFindSymbol(node, referenceTypes);
            return nodeSymbol === symbol;
        };
        Symbols.prototype.findSymbol = function (name, type, offset) {
            var scope = this.global.findScope(offset);
            while (scope) {
                var symbol = scope.getSymbol(name, type);
                if (symbol) {
                    return symbol;
                }
                scope = scope.parent;
            }
            return null;
        };
        Symbols.isCssVariable = function (identifier) {
            return /^--/.test(identifier.getText());
        };
        return Symbols;
    }());
    exports.Symbols = Symbols;
});

define(__m[4], __M([1,0,2,26,6]), function (require, exports, nodes, browsers, strings) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    exports.colors = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgrey: '#a9a9a9',
        darkgreen: '#006400',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        grey: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgrey: '#d3d3d3',
        lightgreen: '#90ee90',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370d8',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#d87093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        red: '#ff0000',
        rebeccapurple: '#663399',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
    };
    exports.colorKeywords = {
        'currentColor': 'The value of the \'color\' property. The computed value of the \'currentColor\' keyword is the computed value of the \'color\' property. If the \'currentColor\' keyword is set on the \'color\' property itself, it is treated as \'color:inherit\' at parse time.',
        'transparent': 'Fully transparent. This keyword can be considered a shorthand for rgba(0,0,0,0) which is its computed value.',
    };
    exports.positionKeywords = {
        'bottom': 'Computes to ‘100%’ for the vertical position if one or two values are given, otherwise specifies the bottom edge as the origin for the next offset.',
        'center': 'Computes to ‘50%’ (‘left 50%’) for the horizontal position if the horizontal position is not otherwise specified, or ‘50%’ (‘top 50%’) for the vertical position if it is.',
        'left': 'Computes to ‘0%’ for the horizontal position if one or two values are given, otherwise specifies the left edge as the origin for the next offset.',
        'right': 'Computes to ‘100%’ for the horizontal position if one or two values are given, otherwise specifies the right edge as the origin for the next offset.',
        'top': 'Computes to ‘0%’ for the vertical position if one or two values are given, otherwise specifies the top edge as the origin for the next offset.'
    };
    exports.repeatStyleKeywords = {
        'no-repeat': 'Placed once and not repeated in this direction.',
        'repeat': 'Repeated in this direction as often as needed to cover the background painting area.',
        'repeat-x': 'Computes to ‘repeat no-repeat’.',
        'repeat-y': 'Computes to ‘no-repeat repeat’.',
        'round': 'Repeated as often as will fit within the background positioning area. If it doesn’t fit a whole number of times, it is rescaled so that it does.',
        'space': 'Repeated as often as will fit within the background positioning area without being clipped and then the images are spaced out to fill the area.'
    };
    exports.lineStyleKeywords = {
        'dashed': 'A series of square-ended dashes.',
        'dotted': 'A series of round dots.',
        'double': 'Two parallel solid lines with some space between them.',
        'groove': 'Looks as if it were carved in the canvas.',
        'hidden': 'Same as ‘none’, but has different behavior in the border conflict resolution rules for border-collapsed tables.',
        'inset': 'Looks as if the content on the inside of the border is sunken into the canvas.',
        'none': 'No border. Color and width are ignored.',
        'outset': 'Looks as if the content on the inside of the border is coming out of the canvas.',
        'ridge': 'Looks as if it were coming out of the canvas.',
        'solid': 'A single line segment.'
    };
    exports.lineWidthKeywords = ['medium', 'thick', 'thin'];
    exports.boxKeywords = {
        'border-box': 'The background is painted within (clipped to) the border box.',
        'content-box': 'The background is painted within (clipped to) the content box.',
        'padding-box': 'The background is painted within (clipped to) the padding box.'
    };
    exports.geometryBoxKeywords = {
        'margin-box': 'Uses the margin box as reference box.',
        'fill-box': 'Uses the object bounding box as reference box.',
        'stroke-box': 'Uses the stroke bounding box as reference box.',
        'view-box': 'Uses the nearest SVG viewport as reference box.'
    };
    exports.cssWideKeywords = {
        'initial': 'Represents the value specified as the property’s initial value.',
        'inherit': 'Represents the computed value of the property on the element’s parent.',
        'unset': 'Acts as either `inherit` or `initial`, depending on whether the property is inherited or not.'
    };
    exports.imageFunctions = {
        'url()': 'Reference an image file by URL',
        'image()': 'Provide image fallbacks and annotations.',
        '-webkit-image-set()': 'Provide multiple resolutions. Remember to use unprefixed image-set() in addition.',
        'image-set()': 'Provide multiple resolutions of an image and let the UA decide which is most appropriate in a given situation.',
        '-moz-element()': 'Use an element in the document as an image. Remember to use unprefixed element() in addition.',
        'element()': 'Use an element in the document as an image.',
        'cross-fade()': 'Indicates the two images to be combined and how far along in the transition the combination is.',
        '-webkit-gradient()': 'Deprecated. Use modern linear-gradient() or radial-gradient() instead.',
        '-webkit-linear-gradient()': 'Linear gradient. Remember to use unprefixed version in addition.',
        '-moz-linear-gradient()': 'Linear gradient. Remember to use unprefixed version in addition.',
        '-o-linear-gradient()': 'Linear gradient. Remember to use unprefixed version in addition.',
        'linear-gradient()': 'A linear gradient is created by specifying a straight gradient line, and then several colors placed along that line.',
        '-webkit-repeating-linear-gradient()': 'Repeating Linear gradient. Remember to use unprefixed version in addition.',
        '-moz-repeating-linear-gradient()': 'Repeating Linear gradient. Remember to use unprefixed version in addition.',
        '-o-repeating-linear-gradient()': 'RepeatingLinear gradient. Remember to use unprefixed version in addition.',
        'repeating-linear-gradient()': 'Same as linear-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position.',
        '-webkit-radial-gradient()': 'Radial gradient. Remember to use unprefixed version in addition.',
        '-moz-radial-gradient()': 'Radial gradient. Remember to use unprefixed version in addition.',
        'radial-gradient()': 'Colors emerge from a single point and smoothly spread outward in a circular or elliptical shape.',
        '-webkit-repeating-radial-gradient()': 'Repeating radial gradient. Remember to use unprefixed version in addition.',
        '-moz-repeating-radial-gradient()': 'Repeating radial gradient. Remember to use unprefixed version in addition.',
        'repeating-radial-gradient()': 'Same as radial-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position.'
    };
    exports.transitionTimingFunctions = {
        'ease': 'Equivalent to cubic-bezier(0.25, 0.1, 0.25, 1.0).',
        'ease-in': 'Equivalent to cubic-bezier(0.42, 0, 1.0, 1.0).',
        'ease-in-out': 'Equivalent to cubic-bezier(0.42, 0, 0.58, 1.0).',
        'ease-out': 'Equivalent to cubic-bezier(0, 0, 0.58, 1.0).',
        'linear': 'Equivalent to cubic-bezier(0.0, 0.0, 1.0, 1.0).',
        'step-end': 'Equivalent to steps(1, end).',
        'step-start': 'Equivalent to steps(1, start).',
        'steps()': 'The first parameter specifies the number of intervals in the function. The second parameter, which is optional, is either the value “start” or “end”.',
        'cubic-bezier()': 'Specifies a cubic-bezier curve. The four values specify points P1 and P2  of the curve as (x1, y1, x2, y2).',
        'cubic-bezier(0.6, -0.28, 0.735, 0.045)': 'Ease-in Back. Overshoots.',
        'cubic-bezier(0.68, -0.55, 0.265, 1.55)': 'Ease-in-out Back. Overshoots.',
        'cubic-bezier(0.175, 0.885, 0.32, 1.275)': 'Ease-out Back. Overshoots.',
        'cubic-bezier(0.6, 0.04, 0.98, 0.335)': 'Ease-in Circular. Based on half circle.',
        'cubic-bezier(0.785, 0.135, 0.15, 0.86)': 'Ease-in-out Circular. Based on half circle.',
        'cubic-bezier(0.075, 0.82, 0.165, 1)': 'Ease-out Circular. Based on half circle.',
        'cubic-bezier(0.55, 0.055, 0.675, 0.19)': 'Ease-in Cubic. Based on power of three.',
        'cubic-bezier(0.645, 0.045, 0.355, 1)': 'Ease-in-out Cubic. Based on power of three.',
        'cubic-bezier(0.215, 0.610, 0.355, 1)': 'Ease-out Cubic. Based on power of three.',
        'cubic-bezier(0.95, 0.05, 0.795, 0.035)': 'Ease-in Exponential. Based on two to the power ten.',
        'cubic-bezier(1, 0, 0, 1)': 'Ease-in-out Exponential. Based on two to the power ten.',
        'cubic-bezier(0.19, 1, 0.22, 1)': 'Ease-out Exponential. Based on two to the power ten.',
        'cubic-bezier(0.47, 0, 0.745, 0.715)': 'Ease-in Sine.',
        'cubic-bezier(0.445, 0.05, 0.55, 0.95)': 'Ease-in-out Sine.',
        'cubic-bezier(0.39, 0.575, 0.565, 1)': 'Ease-out Sine.',
        'cubic-bezier(0.55, 0.085, 0.68, 0.53)': 'Ease-in Quadratic. Based on power of two.',
        'cubic-bezier(0.455, 0.03, 0.515, 0.955)': 'Ease-in-out Quadratic. Based on power of two.',
        'cubic-bezier(0.25, 0.46, 0.45, 0.94)': 'Ease-out Quadratic. Based on power of two.',
        'cubic-bezier(0.895, 0.03, 0.685, 0.22)': 'Ease-in Quartic. Based on power of four.',
        'cubic-bezier(0.77, 0, 0.175, 1)': 'Ease-in-out Quartic. Based on power of four.',
        'cubic-bezier(0.165, 0.84, 0.44, 1)': 'Ease-out Quartic. Based on power of four.',
        'cubic-bezier(0.755, 0.05, 0.855, 0.06)': 'Ease-in Quintic. Based on power of five.',
        'cubic-bezier(0.86, 0, 0.07, 1)': 'Ease-in-out Quintic. Based on power of five.',
        'cubic-bezier(0.23, 1, 0.320, 1)': 'Ease-out Quintic. Based on power of five.'
    };
    exports.basicShapeFunctions = {
        'circle()': 'Defines a circle.',
        'ellipse()': 'Defines an ellipse.',
        'inset()': 'Defines an inset rectangle.',
        'polygon()': 'Defines a polygon.'
    };
    exports.units = {
        'length': ['em', 'rem', 'ex', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'vw', 'vh', 'vmin', 'vmax'],
        'angle': ['deg', 'rad', 'grad', 'turn'],
        'time': ['ms', 's'],
        'frequency': ['Hz', 'kHz'],
        'resolution': ['dpi', 'dpcm', 'dppx'],
        'percentage': ['%']
    };
    exports.html5Tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
        'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer',
        'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link',
        'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q',
        'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td',
        'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'];
    exports.svgElements = ['circle', 'clipPath', 'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
        'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology',
        'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'foreignObject', 'g', 'hatch', 'hatchpath', 'image', 'line', 'linearGradient',
        'marker', 'mask', 'mesh', 'meshpatch', 'meshrow', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'set', 'solidcolor', 'stop', 'svg', 'switch',
        'symbol', 'text', 'textPath', 'tspan', 'use', 'view'];
    function isColorConstructor(node) {
        var name = node.getName();
        if (!name) {
            return false;
        }
        return strings.equalsIgnoreCase(name, 'rgb') ||
            strings.equalsIgnoreCase(name, 'rgba') ||
            strings.equalsIgnoreCase(name, 'hsl') ||
            strings.equalsIgnoreCase(name, 'hsla');
    }
    exports.isColorConstructor = isColorConstructor;
    /**
     * Returns true if the node is a color value - either
     * defined a hex number, as rgb or rgba function, or
     * as color name.
     */
    function isColorValue(node) {
        if (node.type === nodes.NodeType.HexColorValue) {
            return true;
        }
        else if (node.type === nodes.NodeType.Function) {
            return this.isColorConstructor(node);
        }
        else if (node.type === nodes.NodeType.Identifier) {
            if (node.parent && node.parent.type !== nodes.NodeType.Term) {
                return false;
            }
            var candidateColor = node.getText().toLowerCase();
            if (candidateColor === 'none') {
                return false;
            }
            if (exports.colors[candidateColor]) {
                return true;
            }
        }
        return false;
    }
    exports.isColorValue = isColorValue;
    /**
     * Returns true if the given name is a known property.
     */
    function isKnownProperty(name) {
        if (!name) {
            return false;
        }
        else {
            name = name.toLowerCase();
            return getProperties().hasOwnProperty(name);
        }
    }
    exports.isKnownProperty = isKnownProperty;
    function isCommonValue(entry) {
        return entry.browsers.count > 1;
    }
    exports.isCommonValue = isCommonValue;
    function getPageBoxDirectives() {
        return [
            '@bottom-center', '@bottom-left', '@bottom-left-corner', '@bottom-right', '@bottom-right-corner',
            '@left-bottom', '@left-middle', '@left-top', '@right-bottom', '@right-middle', '@right-top',
            '@top-center', '@top-left', '@top-left-corner', '@top-right', '@top-right-corner'
        ];
    }
    exports.getPageBoxDirectives = getPageBoxDirectives;
    function getEntryDescription(entry) {
        var desc = entry.description || '';
        var browserLabel = this.getBrowserLabel(entry.browsers);
        if (browserLabel) {
            if (desc) {
                desc = desc + '\n';
            }
            desc = desc + '(' + browserLabel + ')';
        }
        return desc;
    }
    exports.getEntryDescription = getEntryDescription;
    function getBrowserLabel(b) {
        var result = '';
        if (!b || b.all || b.count === 0) {
            return null;
        }
        for (var curr in exports.browserNames) {
            if (typeof b[curr] === 'string') {
                if (result.length > 0) {
                    result = result + ', ';
                }
                result = result + exports.browserNames[curr];
                var version = b[curr];
                if (version.length > 0) {
                    result = result + ' ' + version;
                }
            }
        }
        return result;
    }
    exports.getBrowserLabel = getBrowserLabel;
    function evalBrowserEntry(browsers) {
        var browserEntry = { all: false, count: 0, onCodeComplete: false };
        var count = 0;
        if (browsers) {
            browsers.split(',').forEach(function (s) {
                s = s.trim();
                if (s === 'all') {
                    browserEntry.all = true;
                    count = Number.MAX_VALUE;
                }
                else if (s !== 'none') {
                    for (var key in exports.browserNames) {
                        if (s.indexOf(key) === 0) {
                            browserEntry[key] = s.substring(key.length).trim();
                            count++;
                        }
                    }
                }
            });
        }
        else {
            browserEntry.all = true;
            count = Number.MAX_VALUE;
        }
        browserEntry.count = count;
        browserEntry.onCodeComplete = count > 0; // to be refined
        return browserEntry;
    }
    var ValueImpl = (function () {
        function ValueImpl(data) {
            this.data = data;
        }
        Object.defineProperty(ValueImpl.prototype, "name", {
            get: function () {
                return this.data.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValueImpl.prototype, "description", {
            get: function () {
                return this.data.desc || browsers.descriptions[this.data.name];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ValueImpl.prototype, "browsers", {
            get: function () {
                if (!this.browserEntry) {
                    this.browserEntry = evalBrowserEntry(this.data.browsers);
                }
                return this.browserEntry;
            },
            enumerable: true,
            configurable: true
        });
        return ValueImpl;
    }());
    var EntryImpl = (function () {
        function EntryImpl(data) {
            this.data = data;
        }
        Object.defineProperty(EntryImpl.prototype, "name", {
            get: function () {
                return this.data.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntryImpl.prototype, "description", {
            get: function () {
                return this.data.desc || browsers.descriptions[this.data.name];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntryImpl.prototype, "browsers", {
            get: function () {
                if (!this.browserEntry) {
                    this.browserEntry = evalBrowserEntry(this.data.browsers);
                }
                return this.browserEntry;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntryImpl.prototype, "restrictions", {
            get: function () {
                if (this.data.restriction) {
                    return this.data.restriction.split(',').map(function (s) { return s.trim(); });
                }
                else {
                    return [];
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntryImpl.prototype, "values", {
            get: function () {
                if (!this.data.values) {
                    return [];
                }
                if (!Array.isArray(this.data.values)) {
                    return [new ValueImpl(this.data.values.value)];
                }
                return this.data.values.map(function (v) {
                    return new ValueImpl(v);
                });
            },
            enumerable: true,
            configurable: true
        });
        return EntryImpl;
    }());
    var propertySet;
    var properties = browsers.data.css.properties;
    function getProperties() {
        if (!propertySet) {
            propertySet = {};
            for (var i = 0, len = properties.length; i < len; i++) {
                var rawEntry = properties[i];
                propertySet[rawEntry.name] = new EntryImpl(rawEntry);
            }
        }
        return propertySet;
    }
    exports.getProperties = getProperties;
    var atDirectives = browsers.data.css.atdirectives;
    var atDirectiveList;
    function getAtDirectives() {
        if (!atDirectiveList) {
            atDirectiveList = [];
            for (var i = 0, len = atDirectives.length; i < len; i++) {
                var rawEntry = atDirectives[i];
                atDirectiveList.push(new EntryImpl(rawEntry));
            }
        }
        return atDirectiveList;
    }
    exports.getAtDirectives = getAtDirectives;
    var pseudoElements = browsers.data.css.pseudoelements;
    var pseudoElementList;
    function getPseudoElements() {
        if (!pseudoElementList) {
            pseudoElementList = [];
            for (var i = 0, len = pseudoElements.length; i < len; i++) {
                var rawEntry = pseudoElements[i];
                pseudoClassesList.push(new EntryImpl(rawEntry));
            }
        }
        return pseudoElementList;
    }
    exports.getPseudoElements = getPseudoElements;
    var pseudoClasses = browsers.data.css.pseudoclasses;
    var pseudoClassesList;
    function getPseudoClasses() {
        if (!pseudoClassesList) {
            pseudoClassesList = [];
            for (var i = 0, len = pseudoClasses.length; i < len; i++) {
                var rawEntry = pseudoClasses[i];
                pseudoClassesList.push(new EntryImpl(rawEntry));
            }
        }
        return pseudoClassesList;
    }
    exports.getPseudoClasses = getPseudoClasses;
    exports.browserNames = {
        E: 'Edge',
        FF: 'Firefox',
        S: 'Safari',
        C: 'Chrome',
        IE: 'IE',
        O: 'Opera'
    };
});






define(__m[11], __M([1,0,2,6]), function (require, exports, nodes, strings) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var Element = (function () {
        function Element() {
        }
        Element.prototype.addChild = function (child) {
            if (child instanceof Element) {
                child.parent = this;
            }
            if (!this.children) {
                this.children = [];
            }
            this.children.push(child);
        };
        Element.prototype.findRoot = function () {
            var curr = this;
            while (curr.parent && !(curr.parent instanceof RootElement)) {
                curr = curr.parent;
            }
            return curr;
        };
        Element.prototype.removeChild = function (child) {
            if (this.children) {
                var index = this.children.indexOf(child);
                if (index !== -1) {
                    this.children.splice(index, 1);
                    return true;
                }
            }
            return false;
        };
        Element.prototype.addAttr = function (name, value) {
            if (!this.attributes) {
                this.attributes = {};
            }
            if (this.attributes.hasOwnProperty(name)) {
                this.attributes[name] += ' ' + value;
            }
            else {
                this.attributes[name] = value;
            }
        };
        Element.prototype.clone = function (cloneChildren) {
            if (cloneChildren === void 0) { cloneChildren = true; }
            var elem = new Element();
            elem.name = this.name;
            if (this.attributes) {
                elem.attributes = {};
                for (var key in this.attributes) {
                    elem.addAttr(key, this.attributes[key]);
                }
            }
            if (cloneChildren && this.children) {
                elem.children = [];
                for (var index = 0; index < this.children.length; index++) {
                    elem.addChild(this.children[index].clone());
                }
            }
            return elem;
        };
        Element.prototype.cloneWithParent = function () {
            var clone = this.clone(false);
            if (this.parent && !(this.parent instanceof RootElement)) {
                var parentClone = this.parent.cloneWithParent();
                parentClone.addChild(clone);
            }
            return clone;
        };
        return Element;
    }());
    exports.Element = Element;
    var RootElement = (function (_super) {
        __extends(RootElement, _super);
        function RootElement() {
            _super.apply(this, arguments);
        }
        return RootElement;
    }(Element));
    exports.RootElement = RootElement;
    var LabelElement = (function (_super) {
        __extends(LabelElement, _super);
        function LabelElement(label) {
            _super.call(this);
            this.name = label;
        }
        return LabelElement;
    }(Element));
    exports.LabelElement = LabelElement;
    var HtmlPrinter = (function () {
        function HtmlPrinter(quote) {
            this.quote = quote;
            // empty
        }
        HtmlPrinter.prototype.print = function (element) {
            if (element instanceof RootElement) {
                return this.doPrint(element.children);
            }
            else {
                return this.doPrint([element]);
            }
        };
        HtmlPrinter.prototype.doPrint = function (elements) {
            var root = { children: [] }, parent = root;
            while (elements.length > 0) {
                var element = elements.shift(), content = this.doPrintElement(element);
                parent.children.push(content);
                if (element.children) {
                    elements.push.apply(elements, element.children);
                    parent = content;
                }
            }
            return root.children;
        };
        HtmlPrinter.prototype.doPrintElement = function (element) {
            var _this = this;
            // special case: a simple label
            if (element instanceof LabelElement) {
                return {
                    tagName: 'ul',
                    children: [{
                            tagName: 'li',
                            children: [{
                                    tagName: 'span',
                                    className: 'label',
                                    text: element.name
                                }]
                        }]
                };
            }
            // the real deal
            var children = [{
                    isText: true,
                    text: '<'
                }];
            // element name
            if (element.name) {
                children.push({
                    tagName: 'span',
                    className: 'name',
                    text: element.name
                });
            }
            else {
                children.push({
                    tagName: 'span',
                    text: 'element'
                });
            }
            // attributes
            if (element.attributes) {
                Object.keys(element.attributes).forEach(function (attr) {
                    children.push({
                        isText: true,
                        text: ' '
                    });
                    children.push({
                        tagName: 'span',
                        className: 'key',
                        text: attr
                    });
                    var value = element.attributes[attr];
                    if (value) {
                        children.push({
                            isText: true,
                            text: '='
                        });
                        children.push({
                            tagName: 'span',
                            className: 'value',
                            text: quotes.ensure(value, _this.quote)
                        });
                    }
                });
            }
            children.push({
                isText: true,
                text: '>'
            });
            return {
                tagName: 'ul',
                children: [{
                        tagName: 'li',
                        children: children
                    }]
            };
        };
        return HtmlPrinter;
    }());
    var quotes;
    (function (quotes) {
        function ensure(value, which) {
            return which + remove(value) + which;
        }
        quotes.ensure = ensure;
        function remove(value) {
            value = strings.trim(value, '\'');
            value = strings.trim(value, '"');
            return value;
        }
        quotes.remove = remove;
    })(quotes || (quotes = {}));
    function toElement(node, parentElement) {
        var result = new Element();
        node.getChildren().forEach(function (child) {
            switch (child.type) {
                case nodes.NodeType.SelectorCombinator:
                    if (parentElement) {
                        var segments = child.getText().split('&');
                        if (segments.length === 1) {
                            // should not happen
                            result.name = segments[0];
                            break;
                        }
                        result = parentElement.cloneWithParent();
                        if (segments[0]) {
                            var root = result.findRoot();
                            root.name = segments[0] + root.name;
                        }
                        for (var i = 1; i < segments.length; i++) {
                            if (i > 1) {
                                var clone = parentElement.cloneWithParent();
                                result.addChild(clone.findRoot());
                                result = clone;
                            }
                            result.name += segments[i];
                        }
                    }
                    break;
                case nodes.NodeType.SelectorPlaceholder:
                case nodes.NodeType.ElementNameSelector:
                    var text = child.getText();
                    result.name = text === '*' ? 'element' : text;
                    break;
                case nodes.NodeType.ClassSelector:
                    result.addAttr('class', child.getText().substring(1));
                    break;
                case nodes.NodeType.IdentifierSelector:
                    result.addAttr('id', child.getText().substring(1));
                    break;
                case nodes.NodeType.MixinDeclaration:
                    result.addAttr('class', child.getName());
                    break;
                case nodes.NodeType.PseudoSelector:
                    result.addAttr(child.getText(), strings.empty);
                    break;
                case nodes.NodeType.AttributeSelector:
                    var expr = child.getChildren()[0];
                    if (expr) {
                        if (expr.getRight()) {
                            var value;
                            switch (expr.getOperator().getText()) {
                                case '|=':
                                    // excatly or followed by -words
                                    value = strings.format('{0}-\u2026', quotes.remove(expr.getRight().getText()));
                                    break;
                                case '^=':
                                    // prefix
                                    value = strings.format('{0}\u2026', quotes.remove(expr.getRight().getText()));
                                    break;
                                case '$=':
                                    // suffix
                                    value = strings.format('\u2026{0}', quotes.remove(expr.getRight().getText()));
                                    break;
                                case '~=':
                                    // one of a list of words
                                    value = strings.format(' \u2026 {0} \u2026 ', quotes.remove(expr.getRight().getText()));
                                    break;
                                case '*=':
                                    // substring
                                    value = strings.format('\u2026{0}\u2026', quotes.remove(expr.getRight().getText()));
                                    break;
                                default:
                                    value = quotes.remove(expr.getRight().getText());
                                    break;
                            }
                        }
                        result.addAttr(expr.getLeft().getText(), value);
                    }
                    break;
            }
        });
        return result;
    }
    exports.toElement = toElement;
    function simpleSelectorToHtml(node) {
        var element = toElement(node);
        var body = new HtmlPrinter('"').print(element);
        return {
            tagName: 'span',
            className: 'css-selector-hover',
            children: body
        };
    }
    exports.simpleSelectorToHtml = simpleSelectorToHtml;
    var SelectorElementBuilder = (function () {
        function SelectorElementBuilder(element) {
            this.prev = null;
            this.element = element;
        }
        SelectorElementBuilder.prototype.processSelector = function (selector) {
            var _this = this;
            var parentElement = null;
            if (!(this.element instanceof RootElement)) {
                if (selector.getChildren().some(function (c) { return c.hasChildren() && c.getChild(0).type === nodes.NodeType.SelectorCombinator; })) {
                    var curr = this.element.findRoot();
                    if (curr.parent instanceof RootElement) {
                        parentElement = this.element;
                        this.element = curr.parent;
                        this.element.removeChild(curr);
                        this.prev = null;
                    }
                }
            }
            selector.getChildren().forEach(function (selectorChild) {
                if (selectorChild instanceof nodes.SimpleSelector) {
                    if (_this.prev instanceof nodes.SimpleSelector) {
                        var labelElement = new LabelElement('\u2026');
                        _this.element.addChild(labelElement);
                        _this.element = labelElement;
                    }
                    else if (_this.prev && (_this.prev.matches('+') || _this.prev.matches('~'))) {
                        _this.element = _this.element.parent;
                    }
                    if (_this.prev && _this.prev.matches('~')) {
                        _this.element.addChild(toElement(selectorChild));
                        _this.element.addChild(new LabelElement('\u22EE'));
                    }
                    var thisElement = toElement(selectorChild, parentElement);
                    var root = thisElement.findRoot();
                    _this.element.addChild(root);
                    _this.element = thisElement;
                }
                if (selectorChild instanceof nodes.SimpleSelector ||
                    selectorChild.type === nodes.NodeType.SelectorCombinatorParent ||
                    selectorChild.type === nodes.NodeType.SelectorCombinatorSibling ||
                    selectorChild.type === nodes.NodeType.SelectorCombinatorAllSiblings) {
                    _this.prev = selectorChild;
                }
            });
        };
        return SelectorElementBuilder;
    }());
    function isNewSelectorContext(node) {
        switch (node.type) {
            case nodes.NodeType.MixinDeclaration:
            case nodes.NodeType.Stylesheet:
                return true;
        }
        return false;
    }
    function selectorToElement(node) {
        var root = new RootElement();
        var parentRuleSets = [];
        if (node.getParent() instanceof nodes.RuleSet) {
            var parent = node.getParent().getParent(); // parent of the selector's ruleset
            while (parent && !isNewSelectorContext(parent)) {
                if (parent instanceof nodes.RuleSet) {
                    parentRuleSets.push(parent);
                }
                parent = parent.getParent();
            }
        }
        var builder = new SelectorElementBuilder(root);
        for (var i = parentRuleSets.length - 1; i >= 0; i--) {
            var selector = parentRuleSets[i].getSelectors().getChild(0);
            if (selector) {
                builder.processSelector(selector);
            }
        }
        builder.processSelector(node);
        return root;
    }
    exports.selectorToElement = selectorToElement;
    function selectorToHtml(node) {
        var root = selectorToElement(node);
        var body = new HtmlPrinter('"').print(root);
        return {
            tagName: 'span',
            className: 'css-selector-hover',
            children: body
        };
    }
    exports.selectorToHtml = selectorToHtml;
});

define(__m[12], __M([1,0,2,8,13]), function (require, exports, nodes, _symbols, modes_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    function findDeclaration(stylesheet, offset) {
        var symbols = new _symbols.Symbols(stylesheet);
        var node = nodes.getNodeAtOffset(stylesheet, offset);
        if (!node) {
            return null;
        }
        var symbol = symbols.findSymbolFromNode(node);
        if (!symbol) {
            return null;
        }
        return symbol.node;
    }
    exports.findDeclaration = findDeclaration;
    function findOccurrences(stylesheet, offset) {
        var result = [];
        var node = nodes.getNodeAtOffset(stylesheet, offset);
        if (!node || node.type === nodes.NodeType.Stylesheet || node.type === nodes.NodeType.Declarations) {
            return result;
        }
        var symbols = new _symbols.Symbols(stylesheet);
        var symbol = symbols.findSymbolFromNode(node);
        var name = node.getText();
        stylesheet.accept(function (candidate) {
            if (symbol) {
                if (symbols.matchesSymbol(candidate, symbol)) {
                    result.push({
                        kind: getKind(candidate),
                        type: symbol.type,
                        node: candidate
                    });
                    return false;
                }
            }
            else if (node.type === candidate.type && node.length === candidate.length && name === candidate.getText()) {
                // Same node type and data
                result.push({
                    kind: getKind(candidate),
                    node: candidate,
                    type: nodes.ReferenceType.Unknown
                });
            }
            return true;
        });
        return result;
    }
    exports.findOccurrences = findOccurrences;
    function getKind(node) {
        if (node.type === nodes.NodeType.Selector) {
            return modes_1.DocumentHighlightKind.Write;
        }
        if (node instanceof nodes.Identifier) {
            if (node.parent && node.parent instanceof nodes.Property) {
                if (_symbols.Symbols.isCssVariable(node)) {
                    return modes_1.DocumentHighlightKind.Write;
                }
            }
        }
        if (node.parent) {
            switch (node.parent.type) {
                case nodes.NodeType.FunctionDeclaration:
                case nodes.NodeType.MixinDeclaration:
                case nodes.NodeType.Keyframe:
                case nodes.NodeType.VariableDeclaration:
                case nodes.NodeType.FunctionParameter:
                    return modes_1.DocumentHighlightKind.Write;
            }
        }
        return modes_1.DocumentHighlightKind.Read;
    }
});


define(__m[14], __M([7,5]), function(nls, data) { return nls.create("vs/languages/css/common/parser/cssErrors", data); });
define(__m[15], __M([1,0,14]), function (require, exports, nls) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var CSSIssueType = (function () {
        function CSSIssueType(id, message) {
            this.id = id;
            this.message = message;
        }
        return CSSIssueType;
    }());
    exports.CSSIssueType = CSSIssueType;
    exports.ParseError = {
        NumberExpected: new CSSIssueType('css-numberexpected', nls.localize(0, null)),
        ConditionExpected: new CSSIssueType('css-conditionexpected', nls.localize(1, null)),
        RuleOrSelectorExpected: new CSSIssueType('css-ruleorselectorexpected', nls.localize(2, null)),
        DotExpected: new CSSIssueType('css-dotexpected', nls.localize(3, null)),
        ColonExpected: new CSSIssueType('css-colonexpected', nls.localize(4, null)),
        SemiColonExpected: new CSSIssueType('css-semicolonexpected', nls.localize(5, null)),
        TermExpected: new CSSIssueType('css-termexpected', nls.localize(6, null)),
        ExpressionExpected: new CSSIssueType('css-expressionexpected', nls.localize(7, null)),
        OperatorExpected: new CSSIssueType('css-operatorexpected', nls.localize(8, null)),
        IdentifierExpected: new CSSIssueType('css-identifierexpected', nls.localize(9, null)),
        PercentageExpected: new CSSIssueType('css-percentageexpected', nls.localize(10, null)),
        URIOrStringExpected: new CSSIssueType('css-uriorstringexpected', nls.localize(11, null)),
        URIExpected: new CSSIssueType('css-uriexpected', nls.localize(12, null)),
        VariableNameExpected: new CSSIssueType('css-varnameexpected', nls.localize(13, null)),
        VariableValueExpected: new CSSIssueType('css-varvalueexpected', nls.localize(14, null)),
        PropertyValueExpected: new CSSIssueType('css-propertyvalueexpected', nls.localize(15, null)),
        LeftCurlyExpected: new CSSIssueType('css-lcurlyexpected', nls.localize(16, null)),
        RightCurlyExpected: new CSSIssueType('css-rcurlyexpected', nls.localize(17, null)),
        LeftSquareBracketExpected: new CSSIssueType('css-rbracketexpected', nls.localize(18, null)),
        RightSquareBracketExpected: new CSSIssueType('css-lbracketexpected', nls.localize(19, null)),
        LeftParenthesisExpected: new CSSIssueType('css-lparentexpected', nls.localize(20, null)),
        RightParenthesisExpected: new CSSIssueType('css-rparentexpected', nls.localize(21, null)),
        CommaExpected: new CSSIssueType('css-commaexpected', nls.localize(22, null)),
        PageDirectiveOrDeclarationExpected: new CSSIssueType('css-pagedirordeclexpected', nls.localize(23, null)),
        UnknownAtRule: new CSSIssueType('css-unknownatrule', nls.localize(24, null)),
        UnknownKeyword: new CSSIssueType('css-unknownkeyword', nls.localize(25, null)),
        SelectorExpected: new CSSIssueType('css-selectorexpected', nls.localize(26, null)),
        StringLiteralExpected: new CSSIssueType('css-stringliteralexpected', nls.localize(27, null)),
    };
});

define(__m[18], __M([1,0,17,10,2,3,15,4]), function (require, exports, types, scanner, nodes, _level, errors, languageFacts) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    /// <summary>
    /// A parser for the css core specification. See for reference:
    /// http://www.w3.org/TR/CSS21/syndata.html#tokenization
    /// </summary>
    var Parser = (function () {
        function Parser(scnr) {
            if (scnr === void 0) { scnr = new scanner.Scanner(); }
            this.scanner = scnr;
            this.token = null;
            this.prevToken = null;
        }
        Parser.prototype.peek = function (type, text, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            if (type !== this.token.type) {
                return false;
            }
            if (typeof text !== 'undefined') {
                if (ignoreCase) {
                    return text.toLowerCase() === this.token.text.toLowerCase();
                }
                else {
                    return text === this.token.text;
                }
            }
            return true;
        };
        Parser.prototype.peekRegExp = function (type, regEx) {
            if (type !== this.token.type) {
                return false;
            }
            return regEx.test(this.token.text);
        };
        Parser.prototype.hasWhitespace = function () {
            return this.prevToken && (this.prevToken.offset + this.prevToken.len !== this.token.offset);
        };
        Parser.prototype.consumeToken = function () {
            this.prevToken = this.token;
            this.token = this.scanner.scan();
        };
        Parser.prototype.mark = function () {
            return {
                prev: this.prevToken,
                curr: this.token,
                pos: this.scanner.pos()
            };
        };
        Parser.prototype.restoreAtMark = function (mark) {
            this.prevToken = mark.prev;
            this.token = mark.curr;
            this.scanner.goBackTo(mark.pos);
        };
        Parser.prototype.acceptOne = function (type, text, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            for (var i = 0; i < text.length; i++) {
                if (this.peek(type, text[i], ignoreCase)) {
                    this.consumeToken();
                    return true;
                }
            }
            return false;
        };
        Parser.prototype.accept = function (type, text, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            if (this.peek(type, text, ignoreCase)) {
                this.consumeToken();
                return true;
            }
            return false;
        };
        Parser.prototype.resync = function (resyncTokens, resyncStopTokens) {
            while (true) {
                if (resyncTokens && resyncTokens.indexOf(this.token.type) !== -1) {
                    this.consumeToken();
                    return true;
                }
                else if (resyncStopTokens && resyncStopTokens.indexOf(this.token.type) !== -1) {
                    return true;
                }
                else {
                    if (this.token.type === scanner.TokenType.EOF) {
                        return false;
                    }
                    this.token = this.scanner.scan();
                }
            }
        };
        Parser.prototype.createNode = function (nodeType) {
            return new nodes.Node(this.token.offset, this.token.len, nodeType);
        };
        Parser.prototype.create = function (ctor) {
            return types.create(ctor, this.token.offset, this.token.len);
        };
        Parser.prototype.finish = function (node, error, resyncTokens, resyncStopTokens) {
            // parseNumeric misuses error for boolean flagging (however the real error mustn't be a false)
            // + nodelist offsets mustn't be modified, because there is a offset hack in rulesets for smartselection
            if (!(node instanceof nodes.Nodelist)) {
                if (error) {
                    this.markError(node, error, resyncTokens, resyncStopTokens);
                }
                // set the node end position
                if (this.prevToken !== null) {
                    // length with more elements belonging together
                    var prevEnd = this.prevToken.offset + this.prevToken.len;
                    node.length = prevEnd > node.offset ? prevEnd - node.offset : 0; // offset is taken from current token, end from previous: Use 0 for empty nodes
                }
            }
            return node;
        };
        Parser.prototype.markError = function (node, error, resyncTokens, resyncStopTokens) {
            if (this.token !== this.lastErrorToken) {
                node.addIssue(new nodes.Marker(node, error, _level.Level.Error, null, this.token.offset, this.token.len));
                this.lastErrorToken = this.token;
            }
            if (resyncTokens || resyncStopTokens) {
                this.resync(resyncTokens, resyncStopTokens);
            }
        };
        Parser.prototype.parseStylesheet = function (model) {
            var versionId = model.getVersionId();
            var textProvider = function (offset, length) {
                if (model.getVersionId() !== versionId) {
                    throw new Error('Underlying model has changed, AST is no longer valid');
                }
                var range = model.getRangeFromOffsetAndLength(offset, length);
                return model.getValueInRange(range);
            };
            return this.internalParse(model.getValue(), this._parseStylesheet, textProvider);
        };
        Parser.prototype.internalParse = function (input, parseFunc, textProvider) {
            this.scanner.setSource(input);
            this.token = this.scanner.scan();
            var node = parseFunc.bind(this)();
            if (node) {
                if (textProvider) {
                    node.textProvider = textProvider;
                }
                else {
                    node.textProvider = function (offset, length) { return input.substr(offset, length); };
                }
            }
            return node;
        };
        Parser.prototype._parseStylesheet = function () {
            var node = this.create(nodes.Stylesheet);
            node.addChild(this._parseCharset());
            var inRecovery = false;
            do {
                var hasMatch = false;
                do {
                    hasMatch = false;
                    var statement = this._parseStylesheetStatement();
                    if (statement) {
                        node.addChild(statement);
                        hasMatch = true;
                        inRecovery = false;
                        if (!this.peek(scanner.TokenType.EOF) && this._needsSemicolonAfter(statement) && !this.accept(scanner.TokenType.SemiColon)) {
                            this.markError(node, errors.ParseError.SemiColonExpected);
                        }
                    }
                    while (this.accept(scanner.TokenType.SemiColon) || this.accept(scanner.TokenType.CDO) || this.accept(scanner.TokenType.CDC)) {
                        // accept empty statements
                        hasMatch = true;
                        inRecovery = false;
                    }
                } while (hasMatch);
                if (this.peek(scanner.TokenType.EOF)) {
                    break;
                }
                if (!inRecovery) {
                    if (this.peek(scanner.TokenType.AtKeyword)) {
                        this.markError(node, errors.ParseError.UnknownAtRule);
                    }
                    else {
                        this.markError(node, errors.ParseError.RuleOrSelectorExpected);
                    }
                    inRecovery = true;
                }
                this.consumeToken();
            } while (!this.peek(scanner.TokenType.EOF));
            return this.finish(node);
        };
        Parser.prototype._parseStylesheetStatement = function () {
            return this._parseRuleset(false)
                || this._parseImport()
                || this._parseMedia()
                || this._parsePage()
                || this._parseFontFace()
                || this._parseKeyframe()
                || this._parseViewPort()
                || this._parseNamespace()
                || this._parseDocument();
        };
        Parser.prototype._tryParseRuleset = function (isNested) {
            var mark = this.mark();
            if (this._parseSelector(isNested)) {
                while (this.accept(scanner.TokenType.Comma) && this._parseSelector(isNested)) {
                }
                if (this.accept(scanner.TokenType.CurlyL)) {
                    this.restoreAtMark(mark);
                    return this._parseRuleset(isNested);
                }
            }
            this.restoreAtMark(mark);
            return null;
        };
        Parser.prototype._parseRuleset = function (isNested) {
            if (isNested === void 0) { isNested = false; }
            var node = this.create(nodes.RuleSet);
            if (!node.getSelectors().addChild(this._parseSelector(isNested))) {
                return null;
            }
            while (this.accept(scanner.TokenType.Comma) && node.getSelectors().addChild(this._parseSelector(isNested))) {
            }
            return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
        };
        Parser.prototype._parseRuleSetDeclaration = function () {
            return this._parseDeclaration();
        };
        Parser.prototype._needsSemicolonAfter = function (node) {
            switch (node.type) {
                case nodes.NodeType.Keyframe:
                case nodes.NodeType.ViewPort:
                case nodes.NodeType.Media:
                case nodes.NodeType.Ruleset:
                case nodes.NodeType.Namespace:
                case nodes.NodeType.If:
                case nodes.NodeType.For:
                case nodes.NodeType.Each:
                case nodes.NodeType.While:
                case nodes.NodeType.MixinDeclaration:
                case nodes.NodeType.FunctionDeclaration:
                    return false;
                case nodes.NodeType.VariableDeclaration:
                case nodes.NodeType.ExtendsReference:
                case nodes.NodeType.MixinContent:
                case nodes.NodeType.ReturnStatement:
                case nodes.NodeType.MediaQuery:
                case nodes.NodeType.Debug:
                case nodes.NodeType.Import:
                    return true;
                case nodes.NodeType.MixinReference:
                    return !node.getContent();
                case nodes.NodeType.Declaration:
                    return !node.getNestedProperties();
            }
            return false;
        };
        Parser.prototype._parseDeclarations = function (parseDeclaration) {
            var node = this.create(nodes.Declarations);
            if (!this.accept(scanner.TokenType.CurlyL)) {
                return null;
            }
            var decl = parseDeclaration();
            while (node.addChild(decl)) {
                if (this.peek(scanner.TokenType.CurlyR)) {
                    break;
                }
                if (this._needsSemicolonAfter(decl) && !this.accept(scanner.TokenType.SemiColon)) {
                    return this.finish(node, errors.ParseError.SemiColonExpected, [scanner.TokenType.SemiColon, scanner.TokenType.CurlyR]);
                }
                while (this.accept(scanner.TokenType.SemiColon)) {
                }
                decl = parseDeclaration();
            }
            if (!this.accept(scanner.TokenType.CurlyR)) {
                return this.finish(node, errors.ParseError.RightCurlyExpected, [scanner.TokenType.CurlyR, scanner.TokenType.SemiColon]);
            }
            return this.finish(node);
        };
        Parser.prototype._parseBody = function (node, parseDeclaration) {
            if (!node.setDeclarations(this._parseDeclarations(parseDeclaration))) {
                return this.finish(node, errors.ParseError.LeftCurlyExpected, [scanner.TokenType.CurlyR, scanner.TokenType.SemiColon]);
            }
            return this.finish(node);
        };
        Parser.prototype._parseSelector = function (isNested) {
            var node = this.create(nodes.Selector);
            var hasContent = false;
            if (isNested) {
                // nested selectors can start with a combinator
                hasContent = node.addChild(this._parseCombinator());
            }
            while (node.addChild(this._parseSimpleSelector())) {
                hasContent = true;
                node.addChild(this._parseCombinator()); // optional
            }
            return hasContent ? this.finish(node) : null;
        };
        Parser.prototype._parseDeclaration = function (resyncStopTokens) {
            var node = this.create(nodes.Declaration);
            if (!node.setProperty(this._parseProperty())) {
                return null;
            }
            if (!this.accept(scanner.TokenType.Colon)) {
                return this.finish(node, errors.ParseError.ColonExpected, [scanner.TokenType.Colon], resyncStopTokens);
            }
            node.colonPosition = this.prevToken.offset;
            if (!node.setValue(this._parseExpr())) {
                return this.finish(node, errors.ParseError.PropertyValueExpected);
            }
            node.addChild(this._parsePrio());
            if (this.peek(scanner.TokenType.SemiColon)) {
                node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
            }
            return this.finish(node);
        };
        Parser.prototype._tryToParseDeclaration = function () {
            var mark = this.mark();
            if (this._parseProperty() && this.accept(scanner.TokenType.Colon)) {
                // looks like a declaration, go ahead
                this.restoreAtMark(mark);
                return this._parseDeclaration();
            }
            this.restoreAtMark(mark);
            return null;
        };
        Parser.prototype._parseProperty = function () {
            var node = this.create(nodes.Property);
            var mark = this.mark();
            if (this.accept(scanner.TokenType.Delim, '*') || this.accept(scanner.TokenType.Delim, '_')) {
                // support for  IE 5.x, 6 and 7 star hack: see http://en.wikipedia.org/wiki/CSS_filter#Star_hack
                if (this.hasWhitespace()) {
                    this.restoreAtMark(mark);
                    return null;
                }
            }
            if (node.setIdentifier(this._parseIdent())) {
                return this.finish(node);
            }
            return null;
        };
        Parser.prototype._parseCharset = function () {
            var node = this.create(nodes.Node);
            if (!this.accept(scanner.TokenType.Charset)) {
                return null;
            }
            if (!this.accept(scanner.TokenType.String)) {
                return this.finish(node, errors.ParseError.IdentifierExpected);
            }
            if (!this.accept(scanner.TokenType.SemiColon)) {
                return this.finish(node, errors.ParseError.SemiColonExpected);
            }
            return this.finish(node);
        };
        Parser.prototype._parseImport = function () {
            var node = this.create(nodes.Import);
            if (!this.accept(scanner.TokenType.AtKeyword, '@import')) {
                return null;
            }
            if (!this.accept(scanner.TokenType.URI) && !this.accept(scanner.TokenType.String)) {
                return this.finish(node, errors.ParseError.URIOrStringExpected);
            }
            node.setMedialist(this._parseMediaList());
            return this.finish(node);
        };
        Parser.prototype._parseNamespace = function () {
            // http://www.w3.org/TR/css3-namespace/
            // namespace  : NAMESPACE_SYM S* [IDENT S*]? [STRING|URI] S* ';' S*
            var node = this.create(nodes.Namespace);
            if (!this.accept(scanner.TokenType.AtKeyword, '@namespace')) {
                return null;
            }
            node.addChild(this._parseIdent()); // optional prefix
            if (!this.accept(scanner.TokenType.URI) && !this.accept(scanner.TokenType.String)) {
                return this.finish(node, errors.ParseError.URIExpected, [scanner.TokenType.SemiColon]);
            }
            if (!this.accept(scanner.TokenType.SemiColon)) {
                return this.finish(node, errors.ParseError.SemiColonExpected);
            }
            return this.finish(node);
        };
        Parser.prototype._parseFontFace = function () {
            if (!this.peek(scanner.TokenType.AtKeyword, '@font-face')) {
                return null;
            }
            var node = this.create(nodes.FontFace);
            this.consumeToken(); // @font-face
            return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
        };
        Parser.prototype._parseViewPort = function () {
            if (!this.peek(scanner.TokenType.AtKeyword, '@-ms-viewport') &&
                !this.peek(scanner.TokenType.AtKeyword, '@-o-viewport') &&
                !this.peek(scanner.TokenType.AtKeyword, '@viewport')) {
                return null;
            }
            var node = this.create(nodes.ViewPort);
            this.consumeToken(); // @-ms-viewport
            return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
        };
        Parser.prototype._parseKeyframe = function () {
            var node = this.create(nodes.Keyframe);
            var atNode = this.create(nodes.Node);
            if (!this.accept(scanner.TokenType.AtKeyword, '@keyframes') &&
                !this.accept(scanner.TokenType.AtKeyword, '@-webkit-keyframes') &&
                !this.accept(scanner.TokenType.AtKeyword, '@-ms-keyframes') &&
                !this.accept(scanner.TokenType.AtKeyword, '@-moz-keyframes') &&
                !this.accept(scanner.TokenType.AtKeyword, '@-o-keyframes')) {
                return null;
            }
            node.setKeyword(this.finish(atNode));
            if (atNode.getText() === '@-ms-keyframes') {
                this.markError(atNode, errors.ParseError.UnknownKeyword);
            }
            if (!node.setIdentifier(this._parseIdent([nodes.ReferenceType.Keyframe]))) {
                return this.finish(node, errors.ParseError.IdentifierExpected, [scanner.TokenType.CurlyR]);
            }
            return this._parseBody(node, this._parseKeyframeSelector.bind(this));
        };
        Parser.prototype._parseKeyframeSelector = function () {
            var node = this.create(nodes.KeyframeSelector);
            if (!node.addChild(this._parseIdent()) && !this.accept(scanner.TokenType.Percentage)) {
                return null;
            }
            while (this.accept(scanner.TokenType.Comma)) {
                if (!node.addChild(this._parseIdent()) && !this.accept(scanner.TokenType.Percentage)) {
                    return this.finish(node, errors.ParseError.PercentageExpected);
                }
            }
            return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
        };
        Parser.prototype._parseMediaDeclaration = function () {
            return this._tryParseRuleset(false) || this._tryToParseDeclaration() || this._parseStylesheetStatement();
        };
        Parser.prototype._parseMedia = function () {
            // MEDIA_SYM S* media_query_list '{' S* ruleset* '}' S*
            // media_query_list : S* [media_query [ ',' S* media_query ]* ]?
            var node = this.create(nodes.Media);
            if (!this.accept(scanner.TokenType.AtKeyword, '@media')) {
                return null;
            }
            if (!node.addChild(this._parseMediaQuery([scanner.TokenType.CurlyL]))) {
                return this.finish(node, errors.ParseError.IdentifierExpected);
            }
            while (this.accept(scanner.TokenType.Comma)) {
                if (!node.addChild(this._parseMediaQuery([scanner.TokenType.CurlyL]))) {
                    return this.finish(node, errors.ParseError.IdentifierExpected);
                }
            }
            return this._parseBody(node, this._parseMediaDeclaration.bind(this));
        };
        Parser.prototype._parseMediaQuery = function (resyncStopToken) {
            // http://www.w3.org/TR/css3-mediaqueries/
            // media_query : [ONLY | NOT]? S* IDENT S* [ AND S* expression ]* | expression [ AND S* expression ]*
            // expression : '(' S* IDENT S* [ ':' S* expr ]? ')' S*
            var node = this.create(nodes.MediaQuery);
            var parseExpression = true;
            var hasContent = false;
            if (!this.peek(scanner.TokenType.ParenthesisL)) {
                if (this.accept(scanner.TokenType.Ident, 'only', true) || this.accept(scanner.TokenType.Ident, 'not', true)) {
                }
                if (!node.addChild(this._parseIdent())) {
                    return null;
                }
                hasContent = true;
                parseExpression = this.accept(scanner.TokenType.Ident, 'and', true);
            }
            while (parseExpression) {
                if (!this.accept(scanner.TokenType.ParenthesisL)) {
                    if (hasContent) {
                        return this.finish(node, errors.ParseError.LeftParenthesisExpected, [], resyncStopToken);
                    }
                    return null;
                }
                if (!node.addChild(this._parseMediaFeatureName())) {
                    return this.finish(node, errors.ParseError.IdentifierExpected, [], resyncStopToken);
                }
                if (this.accept(scanner.TokenType.Colon)) {
                    if (!node.addChild(this._parseExpr())) {
                        return this.finish(node, errors.ParseError.TermExpected, [], resyncStopToken);
                    }
                }
                if (!this.accept(scanner.TokenType.ParenthesisR)) {
                    return this.finish(node, errors.ParseError.RightParenthesisExpected, [], resyncStopToken);
                }
                parseExpression = this.accept(scanner.TokenType.Ident, 'and', true);
            }
            return node;
        };
        Parser.prototype._parseMediaFeatureName = function () {
            return this._parseIdent();
        };
        Parser.prototype._parseMediaList = function () {
            var node = this.create(nodes.Medialist);
            if (node.getMediums().addChild(this._parseMedium())) {
                while (this.accept(scanner.TokenType.Comma)) {
                    if (!node.getMediums().addChild(this._parseMedium())) {
                        return this.finish(node, errors.ParseError.IdentifierExpected);
                    }
                }
                return this.finish(node);
            }
            return null;
        };
        Parser.prototype._parseMedium = function () {
            var node = this.create(nodes.Node);
            if (node.addChild(this._parseIdent())) {
                return this.finish(node);
            }
            else {
                return null;
            }
        };
        Parser.prototype._parsePageDeclaration = function () {
            return this._parsePageMarginBox() || this._parseRuleSetDeclaration();
        };
        Parser.prototype._parsePage = function () {
            // http://www.w3.org/TR/css3-page/
            // page_rule : PAGE_SYM S* page_selector_list '{' S* page_body '}' S*
            // page_body :  /* Can be empty */ declaration? [ ';' S* page_body ]? | page_margin_box page_body
            var node = this.create(nodes.Page);
            if (!this.accept(scanner.TokenType.AtKeyword, '@Page')) {
                return null;
            }
            if (node.addChild(this._parsePageSelector())) {
                while (this.accept(scanner.TokenType.Comma)) {
                    if (!node.addChild(this._parsePageSelector())) {
                        return this.finish(node, errors.ParseError.IdentifierExpected);
                    }
                }
            }
            return this._parseBody(node, this._parsePageDeclaration.bind(this));
        };
        Parser.prototype._parsePageMarginBox = function () {
            // page_margin_box :  margin_sym S* '{' S* declaration? [ ';' S* declaration? ]* '}' S*
            var node = this.create(nodes.PageBoxMarginBox);
            if (!this.peek(scanner.TokenType.AtKeyword)) {
                return null;
            }
            if (!this.acceptOne(scanner.TokenType.AtKeyword, languageFacts.getPageBoxDirectives())) {
                this.markError(node, errors.ParseError.UnknownAtRule, [], [scanner.TokenType.CurlyL]);
            }
            return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
        };
        Parser.prototype._parsePageSelector = function () {
            // page_selector : pseudo_page+ | IDENT pseudo_page*
            // pseudo_page :  ':' [ "left" | "right" | "first" | "blank" ];
            var node = this.create(nodes.Node);
            if (!this.peek(scanner.TokenType.Ident) && !this.peek(scanner.TokenType.Colon)) {
                return null;
            }
            node.addChild(this._parseIdent()); // optional ident
            if (this.accept(scanner.TokenType.Colon)) {
                if (!node.addChild(this._parseIdent())) {
                    return this.finish(node, errors.ParseError.IdentifierExpected);
                }
            }
            return this.finish(node);
        };
        Parser.prototype._parseDocument = function () {
            // -moz-document is experimental but has been pushed to css4
            var node = this.create(nodes.Document);
            if (!this.accept(scanner.TokenType.AtKeyword, '@-moz-document')) {
                return null;
            }
            this.resync([], [scanner.TokenType.CurlyL]); // ignore all the rules
            return this._parseBody(node, this._parseStylesheetStatement.bind(this));
        };
        Parser.prototype._parseOperator = function () {
            // these are operators for binary expressions
            var node = this.createNode(nodes.NodeType.Operator);
            if (this.accept(scanner.TokenType.Delim, '/') ||
                this.accept(scanner.TokenType.Delim, '*') ||
                this.accept(scanner.TokenType.Delim, '+') ||
                this.accept(scanner.TokenType.Delim, '-') ||
                this.accept(scanner.TokenType.Dashmatch) ||
                this.accept(scanner.TokenType.Includes) ||
                this.accept(scanner.TokenType.SubstringOperator) ||
                this.accept(scanner.TokenType.PrefixOperator) ||
                this.accept(scanner.TokenType.SuffixOperator) ||
                this.accept(scanner.TokenType.Delim, '=')) {
                return this.finish(node);
            }
            else {
                return null;
            }
        };
        Parser.prototype._parseUnaryOperator = function () {
            var node = this.create(nodes.Node);
            if (this.accept(scanner.TokenType.Delim, '+') || this.accept(scanner.TokenType.Delim, '-')) {
                return this.finish(node);
            }
            else {
                return null;
            }
        };
        Parser.prototype._parseCombinator = function () {
            var node = this.create(nodes.Node);
            if (this.accept(scanner.TokenType.Delim, '>')) {
                node.type = nodes.NodeType.SelectorCombinatorParent;
                return this.finish(node);
            }
            else if (this.accept(scanner.TokenType.Delim, '+')) {
                node.type = nodes.NodeType.SelectorCombinatorSibling;
                return this.finish(node);
            }
            else if (this.accept(scanner.TokenType.Delim, '~')) {
                node.type = nodes.NodeType.SelectorCombinatorAllSiblings;
                return this.finish(node);
            }
            else {
                return null;
            }
        };
        Parser.prototype._parseSimpleSelector = function () {
            // simple_selector
            //  : element_name [ HASH | class | attrib | pseudo ]* | [ HASH | class | attrib | pseudo ]+ ;
            var node = this.create(nodes.SimpleSelector);
            var c = 0;
            if (node.addChild(this._parseElementName())) {
                c++;
            }
            while ((c === 0 || !this.hasWhitespace()) && node.addChild(this._parseSimpleSelectorBody())) {
                c++;
            }
            return c > 0 ? this.finish(node) : null;
        };
        Parser.prototype._parseSimpleSelectorBody = function () {
            return this._parsePseudo() || this._parseHash() || this._parseClass() || this._parseAttrib();
        };
        Parser.prototype._parseSelectorIdent = function () {
            return this._parseIdent();
        };
        Parser.prototype._parseHash = function () {
            if (!this.peek(scanner.TokenType.Hash) && !this.peek(scanner.TokenType.Delim, '#')) {
                return null;
            }
            var node = this.createNode(nodes.NodeType.IdentifierSelector);
            if (this.accept(scanner.TokenType.Delim, '#')) {
                if (this.hasWhitespace() || !node.addChild(this._parseSelectorIdent())) {
                    return this.finish(node, errors.ParseError.IdentifierExpected);
                }
            }
            else {
                this.consumeToken(); // TokenType.Hash
            }
            return this.finish(node);
        };
        Parser.prototype._parseClass = function () {
            // class: '.' IDENT ;
            if (!this.peek(scanner.TokenType.Delim, '.')) {
                return null;
            }
            var node = this.createNode(nodes.NodeType.ClassSelector);
            this.consumeToken(); // '.'
            if (this.hasWhitespace() || !node.addChild(this._parseSelectorIdent())) {
                return this.finish(node, errors.ParseError.IdentifierExpected);
            }
            return this.finish(node);
        };
        Parser.prototype._parseElementName = function () {
            // element_name: IDENT | '*';
            var node = this.createNode(nodes.NodeType.ElementNameSelector);
            if (node.addChild(this._parseSelectorIdent()) || this.accept(scanner.TokenType.Delim, '*')) {
                return this.finish(node);
            }
            return null;
        };
        Parser.prototype._parseAttrib = function () {
            // attrib : '[' S* IDENT S* [ [ '=' | INCLUDES | DASHMATCH ] S*   [ IDENT | STRING ] S* ]? ']'
            if (!this.peek(scanner.TokenType.BracketL)) {
                return null;
            }
            var node = this.createNode(nodes.NodeType.AttributeSelector);
            this.consumeToken(); // BracketL
            if (!node.addChild(this._parseBinaryExpr())) {
            }
            if (!this.accept(scanner.TokenType.BracketR)) {
                return this.finish(node, errors.ParseError.RightSquareBracketExpected);
            }
            return this.finish(node);
        };
        Parser.prototype._parsePseudo = function () {
            // pseudo: ':' [ IDENT | FUNCTION S* [IDENT S*]? ')' ]
            if (!this.peek(scanner.TokenType.Colon)) {
                return null;
            }
            var pos = this.mark();
            var node = this.createNode(nodes.NodeType.PseudoSelector);
            this.consumeToken(); // Colon
            if (!this.hasWhitespace() && this.accept(scanner.TokenType.Colon)) {
            }
            if (!this.hasWhitespace()) {
                if (!node.addChild(this._parseIdent())) {
                    return this.finish(node, errors.ParseError.IdentifierExpected);
                }
                if (!this.hasWhitespace() && this.accept(scanner.TokenType.ParenthesisL)) {
                    node.addChild(this._parseBinaryExpr() || this._parseSimpleSelector());
                    if (!this.accept(scanner.TokenType.ParenthesisR)) {
                        return this.finish(node, errors.ParseError.RightParenthesisExpected);
                    }
                }
                return this.finish(node);
            }
            this.restoreAtMark(pos);
            return null;
        };
        Parser.prototype._parsePrio = function () {
            if (!this.peek(scanner.TokenType.Exclamation)) {
                return null;
            }
            var node = this.createNode(nodes.NodeType.Prio);
            if (this.accept(scanner.TokenType.Exclamation) && this.accept(scanner.TokenType.Ident, 'important', true)) {
                return this.finish(node);
            }
            return null;
        };
        Parser.prototype._parseExpr = function (stopOnComma) {
            if (stopOnComma === void 0) { stopOnComma = false; }
            var node = this.create(nodes.Expression);
            if (!node.addChild(this._parseBinaryExpr())) {
                return null;
            }
            while (true) {
                if (this.peek(scanner.TokenType.Comma)) {
                    if (stopOnComma) {
                        return this.finish(node);
                    }
                    this.consumeToken();
                }
                if (!node.addChild(this._parseBinaryExpr())) {
                    break;
                }
            }
            return this.finish(node);
        };
        Parser.prototype._parseBinaryExpr = function (preparsedLeft, preparsedOper) {
            var node = this.create(nodes.BinaryExpression);
            if (!node.setLeft((preparsedLeft || this._parseTerm()))) {
                return null;
            }
            if (!node.setOperator(preparsedOper || this._parseOperator())) {
                return this.finish(node);
            }
            if (!node.setRight(this._parseTerm())) {
                return this.finish(node, errors.ParseError.TermExpected);
            }
            // things needed for multiple binary expressions
            node = this.finish(node);
            var operator = this._parseOperator();
            if (operator) {
                node = this._parseBinaryExpr(node, operator);
            }
            return this.finish(node);
        };
        Parser.prototype._parseTerm = function () {
            var node = this.create(nodes.Term);
            node.setOperator(this._parseUnaryOperator()); // optional
            if (node.setExpression(this._parseFunction()) ||
                node.setExpression(this._parseIdent()) ||
                node.setExpression(this._parseURILiteral()) ||
                node.setExpression(this._parseStringLiteral()) ||
                node.setExpression(this._parseNumeric()) ||
                node.setExpression(this._parseHexColor()) ||
                node.setExpression(this._parseOperation())) {
                return this.finish(node);
            }
            return null;
        };
        Parser.prototype._parseOperation = function () {
            var node = this.create(nodes.Node);
            if (!this.accept(scanner.TokenType.ParenthesisL)) {
                return null;
            }
            node.addChild(this._parseExpr());
            if (!this.accept(scanner.TokenType.ParenthesisR)) {
                return this.finish(node, errors.ParseError.RightParenthesisExpected);
            }
            return this.finish(node);
        };
        Parser.prototype._parseNumeric = function () {
            var node = this.create(nodes.NumericValue);
            if (this.accept(scanner.TokenType.Num) ||
                this.accept(scanner.TokenType.Percentage) ||
                this.accept(scanner.TokenType.Resolution) ||
                this.accept(scanner.TokenType.Length) ||
                this.accept(scanner.TokenType.EMS) ||
                this.accept(scanner.TokenType.EXS) ||
                this.accept(scanner.TokenType.Angle) ||
                this.accept(scanner.TokenType.Time) ||
                this.accept(scanner.TokenType.Dimension) ||
                this.accept(scanner.TokenType.Freq)) {
                return this.finish(node);
            }
            return null;
        };
        Parser.prototype._parseStringLiteral = function () {
            var node = this.createNode(nodes.NodeType.StringLiteral);
            if (this.accept(scanner.TokenType.String) || this.accept(scanner.TokenType.BadString)) {
                return this.finish(node);
            }
            return null;
        };
        Parser.prototype._parseURILiteral = function () {
            var node = this.createNode(nodes.NodeType.URILiteral);
            if (this.accept(scanner.TokenType.URI) || this.accept(scanner.TokenType.BadUri)) {
                return this.finish(node);
            }
            return null;
        };
        Parser.prototype._parseIdent = function (referenceTypes) {
            var node = this.create(nodes.Identifier);
            if (referenceTypes) {
                node.referenceTypes = referenceTypes;
            }
            if (this.accept(scanner.TokenType.Ident)) {
                return this.finish(node);
            }
            return null;
        };
        Parser.prototype._parseFunction = function () {
            var pos = this.mark();
            var node = this.create(nodes.Function);
            if (!node.setIdentifier(this._parseFunctionIdentifier())) {
                return null;
            }
            if (this.hasWhitespace() || !this.accept(scanner.TokenType.ParenthesisL)) {
                this.restoreAtMark(pos);
                return null;
            }
            if (node.getArguments().addChild(this._parseFunctionArgument())) {
                while (this.accept(scanner.TokenType.Comma)) {
                    if (!node.getArguments().addChild(this._parseFunctionArgument())) {
                        this.markError(node, errors.ParseError.ExpressionExpected);
                    }
                }
            }
            if (!this.accept(scanner.TokenType.ParenthesisR)) {
                return this.finish(node, errors.ParseError.RightParenthesisExpected);
            }
            return this.finish(node);
        };
        Parser.prototype._parseFunctionIdentifier = function () {
            var node = this.create(nodes.Identifier);
            node.referenceTypes = [nodes.ReferenceType.Function];
            if (this.accept(scanner.TokenType.Ident, 'progid')) {
                // support for IE7 specific filters: 'progid:DXImageTransform.Microsoft.MotionBlur(strength=13, direction=310)'
                if (this.accept(scanner.TokenType.Colon)) {
                    while (this.accept(scanner.TokenType.Ident) && this.accept(scanner.TokenType.Delim, '.')) {
                    }
                }
                return this.finish(node);
            }
            else if (this.accept(scanner.TokenType.Ident)) {
                return this.finish(node);
            }
            return null;
        };
        Parser.prototype._parseFunctionArgument = function () {
            var node = this.create(nodes.FunctionArgument);
            if (node.setValue(this._parseExpr(true))) {
                return this.finish(node);
            }
            return null;
        };
        Parser.prototype._parseHexColor = function () {
            if (this.peekRegExp(scanner.TokenType.Hash, /^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/g)) {
                var node = this.create(nodes.HexColorValue);
                this.consumeToken();
                return this.finish(node);
            }
            else {
                return null;
            }
        };
        return Parser;
    }());
    exports.Parser = Parser;
});

define(__m[19], __M([7,5]), function(nls, data) { return nls.create("vs/languages/css/common/services/intelliSense", data); });
define(__m[20], __M([1,0,2,8,4,6,19]), function (require, exports, nodes, cssSymbols, languageFacts, strings, nls) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var CSSIntellisense = (function () {
        function CSSIntellisense(variablePrefix) {
            if (variablePrefix === void 0) { variablePrefix = null; }
            this.variablePrefix = variablePrefix;
        }
        CSSIntellisense.prototype.getSymbolContext = function () {
            if (!this.symbolContext) {
                this.symbolContext = new cssSymbols.Symbols(this.styleSheet);
            }
            return this.symbolContext;
        };
        CSSIntellisense.prototype.getCompletionsAtPosition = function (languageService, model, resource, position) {
            this.offset = model.getOffsetFromPosition(position);
            this.position = position;
            this.currentWord = model.getWordUntilPosition(position).word;
            this.model = model;
            this.styleSheet = languageService.getStylesheet(resource);
            var result = [];
            var nodepath = nodes.getNodePath(this.styleSheet, this.offset);
            this.isIncomplete = false;
            for (var i = nodepath.length - 1; i >= 0; i--) {
                var node = nodepath[i];
                if (node instanceof nodes.Property) {
                    this.getCompletionsForDeclarationProperty(result);
                }
                else if (node instanceof nodes.Expression) {
                    this.getCompletionsForExpression(node, result);
                }
                else if (node instanceof nodes.SimpleSelector) {
                    var parentRuleSet = node.findParent(nodes.NodeType.Ruleset);
                    this.getCompletionsForSelector(parentRuleSet, result);
                }
                else if (node instanceof nodes.Declarations) {
                    this.getCompletionsForDeclarations(node, result);
                }
                else if (node instanceof nodes.VariableDeclaration) {
                    this.getCompletionsForVariableDeclaration(node, result);
                }
                else if (node instanceof nodes.RuleSet) {
                    this.getCompletionsForRuleSet(node, result);
                }
                else if (node instanceof nodes.Interpolation) {
                    this.getCompletionsForInterpolation(node, result);
                }
                else if (node instanceof nodes.FunctionArgument) {
                    this.getCompletionsForFunctionArgument(node, node.getParent(), result);
                }
                else if (node instanceof nodes.FunctionDeclaration) {
                    this.getCompletionsForFunctionDeclaration(node, result);
                }
                else if (node instanceof nodes.Function) {
                    this.getCompletionsForFunctionArgument(null, node, result);
                }
                if (result.length > 0) {
                    return { currentWord: this.currentWord, suggestions: result, incomplete: this.isIncomplete };
                }
            }
            this.getCompletionsForStylesheet(result);
            if (result.length > 0) {
                return { currentWord: this.currentWord, suggestions: result };
            }
            if (this.variablePrefix && this.currentWord.indexOf(this.variablePrefix) === 0) {
                this.getVariableProposals(result);
                if (result.length > 0) {
                    return { currentWord: this.currentWord, suggestions: result };
                }
                model.getAllUniqueWords(this.currentWord).forEach(function (word) {
                    result.push({ type: 'text', label: word, codeSnippet: word });
                });
            }
            // no match, don't show text matches
            return {
                currentWord: this.currentWord,
                suggestions: result
            };
        };
        CSSIntellisense.prototype.getCompletionsForDeclarationProperty = function (result) {
            return this.getPropertyProposals(result);
        };
        CSSIntellisense.prototype.getPropertyProposals = function (result) {
            var properties = languageFacts.getProperties();
            for (var key in properties) {
                if (properties.hasOwnProperty(key)) {
                    var entry = properties[key];
                    if (entry.browsers.onCodeComplete) {
                        result.push({
                            label: entry.name,
                            documentationLabel: languageFacts.getEntryDescription(entry),
                            codeSnippet: entry.name + ': ',
                            type: 'property'
                        });
                    }
                }
            }
            return result;
        };
        CSSIntellisense.prototype.getCompletionsForDeclarationValue = function (node, result) {
            var propertyName = node.getFullPropertyName();
            var entry = languageFacts.getProperties()[propertyName];
            if (entry) {
                this.getColorProposals(entry, result);
                this.getPositionProposals(entry, result);
                this.getRepeatStyleProposals(entry, result);
                this.getLineProposals(entry, result);
                this.getBoxProposals(entry, result);
                this.getImageProposals(entry, result);
                this.getTimingFunctionProposals(entry, result);
                this.getBasicShapeProposals(entry, result);
                this.getValueEnumProposals(entry, result);
                this.getCSSWideKeywordProposals(entry, result);
                this.getUnitProposals(entry, result);
            }
            else {
                var existingValues = new Set();
                this.styleSheet.accept(new ValuesCollector(propertyName, existingValues));
                existingValues.getEntries().forEach(function (existingValue) {
                    result.push({
                        label: existingValue,
                        codeSnippet: existingValue,
                        type: 'value'
                    });
                });
            }
            this.getVariableProposals(result);
            this.getTermProposals(result);
            return result;
        };
        CSSIntellisense.prototype.getValueEnumProposals = function (entry, result) {
            if (entry.values) {
                entry.values.forEach(function (value) {
                    if (languageFacts.isCommonValue(value)) {
                        result.push({
                            label: value.name,
                            documentationLabel: languageFacts.getEntryDescription(value),
                            codeSnippet: value.name,
                            type: 'value'
                        });
                    }
                });
            }
            return result;
        };
        CSSIntellisense.prototype.getCSSWideKeywordProposals = function (entry, result) {
            for (var keywords in languageFacts.cssWideKeywords) {
                result.push({
                    label: keywords,
                    documentationLabel: languageFacts.cssWideKeywords[keywords],
                    codeSnippet: keywords,
                    type: 'value'
                });
            }
            return result;
        };
        CSSIntellisense.prototype.getCompletionsForInterpolation = function (node, result) {
            if (this.offset >= node.offset + 2) {
                this.getVariableProposals(result);
            }
            return result;
        };
        CSSIntellisense.prototype.getVariableProposals = function (result) {
            var symbols = this.getSymbolContext().findSymbolsAtOffset(this.offset, nodes.ReferenceType.Variable);
            symbols.forEach(function (symbol) {
                result.push({
                    label: symbol.name,
                    codeSnippet: strings.startsWith(symbol.name, '--') ? "var(" + symbol.name + ")" : symbol.name,
                    type: 'variable'
                });
            });
            return result;
        };
        CSSIntellisense.prototype.getVariableProposalsForCSSVarFunction = function (result) {
            var symbols = this.getSymbolContext().findSymbolsAtOffset(this.offset, nodes.ReferenceType.Variable);
            symbols = symbols.filter(function (symbol) {
                return strings.startsWith(symbol.name, '--');
            });
            symbols.forEach(function (symbol) {
                result.push({
                    label: symbol.name,
                    codeSnippet: symbol.name,
                    type: 'variable'
                });
            });
            return result;
        };
        CSSIntellisense.prototype.getUnitProposals = function (entry, result) {
            var currentWord = '0';
            if (this.currentWord.length > 0) {
                var numMatch = this.currentWord.match(/-?\d[\.\d+]*/);
                if (numMatch) {
                    currentWord = numMatch[0];
                }
            }
            entry.restrictions.forEach(function (restriction) {
                var units = languageFacts.units[restriction];
                if (units) {
                    units.forEach(function (unit) {
                        result.push({
                            label: currentWord + unit,
                            codeSnippet: currentWord + unit,
                            type: 'unit'
                        });
                    });
                }
            });
            this.isIncomplete = true;
            return result;
        };
        CSSIntellisense.prototype.getColorProposals = function (entry, result) {
            if (entry.restrictions.indexOf('color') !== -1) {
                for (var color in languageFacts.colors) {
                    result.push({
                        label: color,
                        documentationLabel: languageFacts.colors[color],
                        codeSnippet: color,
                        type: 'customcolor'
                    });
                }
                for (var color in languageFacts.colorKeywords) {
                    result.push({
                        label: color,
                        documentationLabel: languageFacts.colorKeywords[color],
                        codeSnippet: color,
                        type: 'value'
                    });
                }
                var colorValues = new Set();
                this.styleSheet.accept(new ColorValueCollector(colorValues));
                colorValues.getEntries().forEach(function (color) {
                    result.push({
                        label: color,
                        codeSnippet: color,
                        type: 'customcolor'
                    });
                });
                CSSIntellisense.colorFunctions.forEach(function (p) {
                    result.push({
                        label: p.func.substr(0, p.func.indexOf('(')),
                        typeLabel: p.func,
                        documentationLabel: p.desc,
                        codeSnippet: p.func.replace(/\[?\$(\w+)\]?/g, '{{$1}}'),
                        type: 'function'
                    });
                });
            }
            return result;
        };
        CSSIntellisense.prototype.getPositionProposals = function (entry, result) {
            if (entry.restrictions.indexOf('position') !== -1) {
                for (var position in languageFacts.positionKeywords) {
                    result.push({
                        label: position,
                        documentationLabel: languageFacts.positionKeywords[position],
                        codeSnippet: position,
                        type: 'value'
                    });
                }
            }
            return result;
        };
        CSSIntellisense.prototype.getRepeatStyleProposals = function (entry, result) {
            if (entry.restrictions.indexOf('repeat') !== -1) {
                for (var repeat in languageFacts.repeatStyleKeywords) {
                    result.push({
                        label: repeat,
                        documentationLabel: languageFacts.repeatStyleKeywords[repeat],
                        codeSnippet: repeat,
                        type: 'value'
                    });
                }
            }
            return result;
        };
        CSSIntellisense.prototype.getLineProposals = function (entry, result) {
            if (entry.restrictions.indexOf('line-style') !== -1) {
                for (var lineStyle in languageFacts.lineStyleKeywords) {
                    result.push({
                        label: lineStyle,
                        documentationLabel: languageFacts.lineStyleKeywords[lineStyle],
                        codeSnippet: lineStyle,
                        type: 'value'
                    });
                }
            }
            if (entry.restrictions.indexOf('line-width') !== -1) {
                languageFacts.lineWidthKeywords.forEach(function (lineWidth) {
                    result.push({
                        label: lineWidth,
                        codeSnippet: lineWidth,
                        type: 'value'
                    });
                });
            }
            return result;
        };
        CSSIntellisense.prototype.getBoxProposals = function (entry, result) {
            var geometryBox = entry.restrictions.indexOf('geometry-box');
            if (geometryBox !== -1) {
                for (var box in languageFacts.geometryBoxKeywords) {
                    result.push({
                        label: box,
                        documentationLabel: languageFacts.geometryBoxKeywords[box],
                        codeSnippet: box,
                        type: 'value'
                    });
                }
            }
            if (entry.restrictions.indexOf('box') !== -1 || geometryBox !== -1) {
                for (var box in languageFacts.boxKeywords) {
                    result.push({
                        label: box,
                        documentationLabel: languageFacts.boxKeywords[box],
                        codeSnippet: box,
                        type: 'value'
                    });
                }
            }
            return result;
        };
        CSSIntellisense.prototype.getImageProposals = function (entry, result) {
            if (entry.restrictions.indexOf('image') !== -1) {
                for (var image in languageFacts.imageFunctions) {
                    result.push({
                        label: image,
                        documentationLabel: languageFacts.imageFunctions[image],
                        codeSnippet: image,
                        type: 'function'
                    });
                }
            }
            return result;
        };
        CSSIntellisense.prototype.getTimingFunctionProposals = function (entry, result) {
            if (entry.restrictions.indexOf('timing-function') !== -1) {
                for (var timing in languageFacts.transitionTimingFunctions) {
                    result.push({
                        label: timing,
                        documentationLabel: languageFacts.transitionTimingFunctions[timing],
                        codeSnippet: timing,
                        type: 'function'
                    });
                }
            }
            return result;
        };
        CSSIntellisense.prototype.getBasicShapeProposals = function (entry, result) {
            if (entry.restrictions.indexOf('shape') !== -1) {
                for (var shape in languageFacts.basicShapeFunctions) {
                    result.push({
                        label: shape,
                        documentationLabel: languageFacts.basicShapeFunctions[shape],
                        codeSnippet: shape,
                        type: 'function'
                    });
                }
            }
            return result;
        };
        CSSIntellisense.prototype.getCompletionsForStylesheet = function (result) {
            var node = this.styleSheet.findFirstChildBeforeOffset(this.offset);
            if (!node) {
                return this.getCompletionForTopLevel(result);
            }
            if (node instanceof nodes.RuleSet) {
                return this.getCompletionsForRuleSet(node, result);
            }
            return result;
        };
        CSSIntellisense.prototype.getCompletionForTopLevel = function (result) {
            languageFacts.getAtDirectives().forEach(function (entry) {
                if (entry.browsers.count > 0) {
                    result.push({
                        label: entry.name,
                        codeSnippet: entry.name,
                        documentationLabel: languageFacts.getEntryDescription(entry),
                        type: 'keyword'
                    });
                }
            });
            this.getCompletionsForSelector(null, result);
            return result;
        };
        CSSIntellisense.prototype.getCompletionsForRuleSet = function (ruleSet, result) {
            var declarations = ruleSet.getDeclarations();
            var isAfter = declarations && declarations.endsWith('}') && this.offset >= declarations.offset + declarations.length;
            if (isAfter) {
                return this.getCompletionForTopLevel(result);
            }
            var isInSelectors = !declarations || this.offset <= declarations.offset;
            if (isInSelectors) {
                return this.getCompletionsForSelector(ruleSet, result);
            }
            ruleSet.findParent(nodes.NodeType.Ruleset);
            return this.getCompletionsForDeclarations(ruleSet.getDeclarations(), result);
        };
        CSSIntellisense.prototype.getCompletionsForSelector = function (ruleSet, result) {
            languageFacts.getPseudoClasses().forEach(function (entry) {
                if (entry.browsers.onCodeComplete) {
                    result.push({
                        label: entry.name,
                        codeSnippet: entry.name,
                        documentationLabel: languageFacts.getEntryDescription(entry),
                        type: 'function'
                    });
                }
            });
            languageFacts.getPseudoElements().forEach(function (entry) {
                if (entry.browsers.onCodeComplete) {
                    result.push({
                        label: entry.name,
                        codeSnippet: entry.name,
                        documentationLabel: languageFacts.getEntryDescription(entry),
                        type: 'function'
                    });
                }
            });
            languageFacts.html5Tags.forEach(function (entry) {
                result.push({
                    label: entry,
                    codeSnippet: entry,
                    type: 'keyword'
                });
            });
            languageFacts.svgElements.forEach(function (entry) {
                result.push({
                    label: entry,
                    codeSnippet: entry,
                    type: 'keyword'
                });
            });
            var visited = {};
            visited[this.currentWord] = true;
            var textProvider = this.styleSheet.getTextProvider();
            this.styleSheet.accept(function (n) {
                if (n.type === nodes.NodeType.SimpleSelector && n.length > 0) {
                    var selector = textProvider(n.offset, n.length);
                    if (selector.charAt(0) === '.' && !visited[selector]) {
                        visited[selector] = true;
                        result.push({
                            label: selector,
                            codeSnippet: selector,
                            type: 'keyword'
                        });
                    }
                    return false;
                }
                return true;
            });
            if (ruleSet && ruleSet.isNested()) {
                var selector = ruleSet.getSelectors().findFirstChildBeforeOffset(this.offset);
                if (selector && ruleSet.getSelectors().getChildren().indexOf(selector) === 0) {
                    this.getPropertyProposals(result);
                }
            }
            return result;
        };
        CSSIntellisense.prototype.getCompletionsForDeclarations = function (declarations, result) {
            if (!declarations) {
                return result;
            }
            var node = declarations.findFirstChildBeforeOffset(this.offset);
            if (!node) {
                return this.getCompletionsForDeclarationProperty(result);
            }
            if (node instanceof nodes.AbstractDeclaration) {
                var declaration = node;
                if ((!isDefined(declaration.colonPosition) || this.offset <= declaration.colonPosition) || (isDefined(declaration.semicolonPosition) && declaration.semicolonPosition < this.offset)) {
                    if (this.offset === declaration.semicolonPosition + 1) {
                        return result; // don't show new properties right after semicolon (see Bug 15421:[intellisense] [css] Be less aggressive when manually typing CSS)
                    }
                    // complete property
                    return this.getCompletionsForDeclarationProperty(result);
                }
                if (declaration instanceof nodes.Declaration) {
                    // complete value
                    return this.getCompletionsForDeclarationValue(declaration, result);
                }
            }
            return result;
        };
        CSSIntellisense.prototype.getCompletionsForVariableDeclaration = function (declaration, result) {
            if (this.offset > declaration.colonPosition) {
                this.getVariableProposals(result);
            }
            return result;
        };
        CSSIntellisense.prototype.getCompletionsForExpression = function (expression, result) {
            if (expression.getParent() instanceof nodes.FunctionArgument) {
                this.getCompletionsForFunctionArgument(expression.getParent(), expression.getParent().getParent(), result);
                return result;
            }
            var declaration = expression.findParent(nodes.NodeType.Declaration);
            if (!declaration) {
                this.getTermProposals(result);
                return result;
            }
            var node = expression.findChildAtOffset(this.offset, true);
            if (!node) {
                return this.getCompletionsForDeclarationValue(declaration, result);
            }
            if (node instanceof nodes.NumericValue || node instanceof nodes.Identifier) {
                return this.getCompletionsForDeclarationValue(declaration, result);
            }
            return result;
        };
        CSSIntellisense.prototype.getCompletionsForFunctionArgument = function (arg, func, result) {
            if (func.getIdentifier().getText() === 'var') {
                if (!func.getArguments().hasChildren() || func.getArguments().getChild(0) === arg) {
                    this.getVariableProposalsForCSSVarFunction(result);
                }
            }
            return result;
        };
        CSSIntellisense.prototype.getCompletionsForFunctionDeclaration = function (decl, result) {
            var declarations = decl.getDeclarations();
            if (declarations && this.offset > declarations.offset && this.offset < declarations.offset + declarations.length) {
                this.getTermProposals(result);
            }
            return result;
        };
        CSSIntellisense.prototype.getTermProposals = function (result) {
            var allFunctions = this.getSymbolContext().findSymbolsAtOffset(this.offset, nodes.ReferenceType.Function);
            allFunctions.forEach(function (functionSymbol) {
                if (functionSymbol.node instanceof nodes.FunctionDeclaration) {
                    var functionDecl = functionSymbol.node;
                    var params = functionDecl.getParameters().getChildren().map(function (c) {
                        return (c instanceof nodes.FunctionParameter) ? c.getName() : c.getText();
                    });
                    result.push({
                        label: functionSymbol.name,
                        typeLabel: functionSymbol.name + '(' + params.join(', ') + ')',
                        codeSnippet: functionSymbol.name + '(' + params.map(function (p) { return '{{' + p + '}}'; }).join(', ') + ')',
                        type: 'function'
                    });
                }
            });
            return result;
        };
        CSSIntellisense.colorFunctions = [
            { func: 'rgb($red, $green, $blue)', desc: nls.localize(0, null) },
            { func: 'rgba($red, $green, $blue, $alpha)', desc: nls.localize(1, null) },
            { func: 'hsl($hue, $saturation, $lightness)', desc: nls.localize(2, null) },
            { func: 'hsla($hue, $saturation, $lightness, $alpha)', desc: nls.localize(3, null) }
        ];
        return CSSIntellisense;
    }());
    exports.CSSIntellisense = CSSIntellisense;
    var Set = (function () {
        function Set() {
            this.entries = {};
        }
        Set.prototype.add = function (entry) {
            this.entries[entry] = true;
        };
        Set.prototype.getEntries = function () {
            return Object.keys(this.entries);
        };
        return Set;
    }());
    var InternalValueCollector = (function () {
        function InternalValueCollector(entries) {
            this.entries = entries;
            // nothing to do
        }
        InternalValueCollector.prototype.visitNode = function (node) {
            if (node instanceof nodes.Identifier || node instanceof nodes.NumericValue || node instanceof nodes.HexColorValue) {
                this.entries.add(node.getText());
            }
            return true;
        };
        return InternalValueCollector;
    }());
    var ValuesCollector = (function () {
        function ValuesCollector(propertyName, entries) {
            this.propertyName = propertyName;
            this.entries = entries;
            // nothing to do
        }
        ValuesCollector.prototype.matchesProperty = function (decl) {
            var propertyName = decl.getFullPropertyName();
            return this.propertyName === propertyName;
        };
        ValuesCollector.prototype.visitNode = function (node) {
            if (node instanceof nodes.Declaration) {
                if (this.matchesProperty(node)) {
                    var value = node.getValue();
                    if (value) {
                        value.accept(new InternalValueCollector(this.entries));
                    }
                }
            }
            return true;
        };
        return ValuesCollector;
    }());
    var ColorValueCollector = (function () {
        function ColorValueCollector(entries) {
            this.entries = entries;
            // nothing to do
        }
        ColorValueCollector.prototype.visitNode = function (node) {
            if (node instanceof nodes.HexColorValue || (node instanceof nodes.Function && languageFacts.isColorConstructor(node))) {
                this.entries.add(node.getText());
            }
            return true;
        };
        return ColorValueCollector;
    }());
    function isDefined(obj) {
        return typeof obj !== 'undefined';
    }
});

define(__m[21], __M([7,5]), function(nls, data) { return nls.create("vs/languages/css/common/services/lint", data); });
define(__m[22], __M([7,5]), function(nls, data) { return nls.create("vs/languages/css/common/services/lintRules", data); });
define(__m[9], __M([1,0,22,3]), function (require, exports, nls, _level) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var Warning = 'warning';
    var Error = 'error';
    var Ignore = 'ignore';
    var Rule = (function () {
        function Rule(id, message, defaultValue) {
            this.id = id;
            this.message = message;
            this.defaultValue = defaultValue;
            // nothing to do
        }
        Rule.prototype.getConfiguration = function () {
            return {
                type: 'string',
                enum: [Ignore, Warning, Error],
                default: this.defaultValue,
                description: this.message
            };
        };
        return Rule;
    }());
    exports.Rule = Rule;
    exports.Rules = {
        AllVendorPrefixes: new Rule('compatibleVendorPrefixes', nls.localize(0, null), Ignore),
        IncludeStandardPropertyWhenUsingVendorPrefix: new Rule('vendorPrefix', nls.localize(1, null), Warning),
        DuplicateDeclarations: new Rule('duplicateProperties', nls.localize(2, null), Ignore),
        EmptyRuleSet: new Rule('emptyRules', nls.localize(3, null), Warning),
        ImportStatemement: new Rule('importStatement', nls.localize(4, null), Ignore),
        NoWidthOrHeightWhenPaddingOrBorder: new Rule('boxModel', nls.localize(5, null), Ignore),
        UniversalSelector: new Rule('universalSelector', nls.localize(6, null), Ignore),
        ZeroWithUnit: new Rule('zeroUnits', nls.localize(7, null), Ignore),
        RequiredPropertiesForFontFace: new Rule('fontFaceProperties', nls.localize(8, null), Warning),
        HexColorLength: new Rule('hexColorLength', nls.localize(9, null), Error),
        ArgsInColorFunction: new Rule('argumentsInColorFunction', nls.localize(10, null), Error),
        UnknownProperty: new Rule('unknownProperties', nls.localize(11, null), Warning),
        IEStarHack: new Rule('ieHack', nls.localize(12, null), Ignore),
        UnknownVendorSpecificProperty: new Rule('unknownVendorSpecificProperties', nls.localize(13, null), Ignore),
        PropertyIgnoredDueToDisplay: new Rule('propertyIgnoredDueToDisplay', nls.localize(14, null), Warning),
        AvoidImportant: new Rule('important', nls.localize(15, null), Ignore),
        AvoidFloat: new Rule('float', nls.localize(16, null), Ignore),
        AvoidIdSelector: new Rule('idSelector', nls.localize(17, null), Ignore),
    };
    function getConfigurationProperties(keyPrefix) {
        var properties = {};
        properties[keyPrefix + '.validate'] = {
            type: 'boolean',
            default: true,
            description: nls.localize(18, null)
        };
        for (var ruleName in exports.Rules) {
            var rule = exports.Rules[ruleName];
            properties[keyPrefix + '.lint.' + rule.id] = rule.getConfiguration();
        }
        return properties;
    }
    exports.getConfigurationProperties = getConfigurationProperties;
    function sanitize(conf) {
        var settings = {};
        for (var ruleName in exports.Rules) {
            var rule = exports.Rules[ruleName];
            var level = _level.toLevel(conf[rule.id]);
            if (level) {
                settings[rule.id] = level;
            }
        }
        return settings;
    }
    exports.sanitize = sanitize;
});
/* old rules
        'duplicate-background-images' : {
            'type': 'string',
            'enum': ['ignore', 'warning', 'error'],
            'default': 'ignore',
            'description': nls.localize('duplicateBackgroundImages', "Every background-image should be unique. Use a common class for e.g. sprites.")
        },
        'gradients' : {
            'type': 'string',
            'enum': ['ignore', 'warning', 'error'],
            'default': 'warning',
            'description': nls.localize('gradients', "When using a vendor-prefixed gradient, make sure to use them all.")
        },
        'outline-none' : {
            'type': 'string',
            'enum': ['ignore', 'warning', 'error'],
            'default': 'warning',
            'description': nls.localize('outlineNone', "Use of outline: none or outline: 0 should be limited to :focus rules.")
        },
        'overqualified-elements' : {
            'type': 'string',
            'enum': ['ignore', 'warning', 'error'],
            'default': 'ignore',
            'description': nls.localize('overqualifiedElements', "Don't use classes or IDs with elements (a.foo or a#foo).")
        },
        'qualified-headings' : {
            'type': 'string',
            'enum': ['ignore', 'warning', 'error'],
            'default': 'ignore',
            'description': nls.localize('qualifiedHeadings', "Headings should not be qualified (namespaced).")
        },
        'regex-selectors' : {
            'type': 'string',
            'enum': ['ignore', 'warning', 'error'],
            'default': 'ignore',
            'description': nls.localize('regexSelectors', "Selectors that look like regular expressions are slow and should be avoided.")
        },
        'shorthand' : {
            'type': 'string',
            'enum': ['ignore', 'warning', 'error'],
            'default': 'ignore',
            'description': nls.localize('shorthand', "Use shorthand properties where possible.")
        },
        'text-indent' : {
            'type': 'string',
            'enum': ['ignore', 'warning', 'error'],
            'default': 'ignore',
            'description': nls.localize('textIndent', "Checks for text indent less than -99px.")
        },
        'unique-headings' : {
            'type': 'string',
            'enum': ['ignore', 'warning', 'error'],
            'default': 'ignore',
            'description': nls.localize('uniqueHeadings', "Headings should be defined only once.")
        },

        'unqualified-attributes' : {
            'type': 'string',
            'enum': ['ignore', 'warning', 'error'],
            'default': 'ignore',
            'description': nls.localize('unqualifiedAttributes', "Unqualified attribute selectors are known to be slow.")
        },
        */

define(__m[24], __M([1,0,4,9,2,21,3]), function (require, exports, languageFacts, lintRules, nodes, nls, _level) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var Element = (function () {
        function Element(text, data) {
            this.name = text;
            this.node = data;
        }
        return Element;
    }());
    var NodesByRootMap = (function () {
        function NodesByRootMap() {
            this.data = {};
        }
        NodesByRootMap.prototype.add = function (root, name, node) {
            var entry = this.data[root];
            if (!entry) {
                entry = { nodes: [], names: [] };
                this.data[root] = entry;
            }
            entry.names.push(name);
            if (node) {
                entry.nodes.push(node);
            }
        };
        return NodesByRootMap;
    }());
    var LintVisitor = (function () {
        function LintVisitor(settings) {
            if (settings === void 0) { settings = {}; }
            this.warnings = [];
            this.configuration = {};
            for (var ruleKey in lintRules.Rules) {
                var rule = lintRules.Rules[ruleKey];
                var level = settings[rule.id] || _level.toLevel(rule.defaultValue);
                this.configuration[rule.id] = level;
            }
        }
        LintVisitor.entries = function (node, settings) {
            var visitor = new LintVisitor(settings);
            node.accept(visitor);
            return visitor.getEntries();
        };
        LintVisitor.prototype.fetch = function (input, s) {
            var elements = [];
            for (var i = 0; i < input.length; i++) {
                if (input[i].name.toLowerCase() === s) {
                    elements.push(input[i]);
                }
            }
            return elements;
        };
        LintVisitor.prototype.fetchWithValue = function (input, s, v) {
            var elements = [];
            for (var i = 0; i < input.length; i++) {
                if (input[i].name.toLowerCase() === s) {
                    var expression = input[i].node.getValue();
                    if (expression && this.findValueInExpression(expression, v)) {
                        elements.push(input[i]);
                    }
                }
            }
            return elements;
        };
        LintVisitor.prototype.findValueInExpression = function (expression, v) {
            var found = false;
            expression.accept(function (node) {
                if (node.type === nodes.NodeType.Identifier && node.getText() === v) {
                    found = true;
                }
                return !found;
            });
            return found;
        };
        LintVisitor.prototype.fetchWithin = function (input, s) {
            var elements = [];
            for (var i = 0; i < input.length; i++) {
                if (input[i].name.toLowerCase().indexOf(s) >= 0) {
                    elements.push(input[i]);
                }
            }
            return elements;
        };
        LintVisitor.prototype.getEntries = function (filter) {
            if (filter === void 0) { filter = (_level.Level.Warning | _level.Level.Error); }
            return this.warnings.filter(function (entry) {
                return (entry.getLevel() & filter) !== 0;
            });
        };
        LintVisitor.prototype.addEntry = function (node, rule, details) {
            var entry = new nodes.Marker(node, rule, this.configuration[rule.id], details);
            this.warnings.push(entry);
        };
        LintVisitor.prototype.getMissingNames = function (expected, actual) {
            expected = expected.slice(0); // clone
            for (var i = 0; i < actual.length; i++) {
                var k = expected.indexOf(actual[i]);
                if (k !== -1) {
                    expected[k] = null;
                }
            }
            var result = null;
            for (var i = 0; i < expected.length; i++) {
                var curr = expected[i];
                if (curr) {
                    if (result === null) {
                        result = nls.localize(0, null, curr);
                    }
                    else {
                        result = nls.localize(1, null, result, curr);
                    }
                }
            }
            return result;
        };
        LintVisitor.prototype.visitNode = function (node) {
            switch (node.type) {
                case nodes.NodeType.Stylesheet:
                    return this.visitStylesheet(node);
                case nodes.NodeType.FontFace:
                    return this.visitFontFace(node);
                case nodes.NodeType.Ruleset:
                    return this.visitRuleSet(node);
                case nodes.NodeType.SimpleSelector:
                    return this.visitSimpleSelector(node);
                case nodes.NodeType.Function:
                    return this.visitFunction(node);
                case nodes.NodeType.NumericValue:
                    return this.visitNumericValue(node);
                case nodes.NodeType.Import:
                    return this.visitImport(node);
            }
            return this.visitUnknownNode(node);
        };
        LintVisitor.prototype.visitStylesheet = function (node) {
            // @keyframe and it's vendor specific alternatives
            // @keyframe should be included
            var _this = this;
            var keyframes = new NodesByRootMap();
            node.accept(function (node) {
                if (node instanceof nodes.Keyframe) {
                    var keyword = node.getKeyword();
                    var text = keyword.getText();
                    keyframes.add(node.getName(), text, (text !== '@keyframes') ? keyword : null);
                }
                return true;
            });
            var expected = ['@-webkit-keyframes', '@-moz-keyframes', '@-o-keyframes'];
            var addVendorSpecificWarnings = function (node) {
                if (needsStandard) {
                    var message = nls.localize(2, null);
                    _this.addEntry(node, lintRules.Rules.IncludeStandardPropertyWhenUsingVendorPrefix, message);
                }
                if (missingVendorSpecific) {
                    var message = nls.localize(3, null, missingVendorSpecific);
                    _this.addEntry(node, lintRules.Rules.AllVendorPrefixes, message);
                }
            };
            for (var name in keyframes.data) {
                var actual = keyframes.data[name].names;
                var needsStandard = (actual.indexOf('@keyframes') === -1);
                if (!needsStandard && actual.length === 1) {
                    continue; // only the non-vendor specific keyword is used, that's fine, no warning
                }
                var missingVendorSpecific = this.getMissingNames(expected, actual);
                if (missingVendorSpecific || needsStandard) {
                    keyframes.data[name].nodes.forEach(addVendorSpecificWarnings);
                }
            }
            return true;
        };
        LintVisitor.prototype.visitSimpleSelector = function (node) {
            var text = node.getText();
            /////////////////////////////////////////////////////////////
            //	Lint - The universal selector (*) is known to be slow.
            /////////////////////////////////////////////////////////////
            if (text === '*') {
                this.addEntry(node, lintRules.Rules.UniversalSelector);
            }
            /////////////////////////////////////////////////////////////
            //	Lint - Avoid id selectors
            /////////////////////////////////////////////////////////////
            if (text.indexOf('#') === 0) {
                this.addEntry(node, lintRules.Rules.AvoidIdSelector);
            }
            return true;
        };
        LintVisitor.prototype.visitImport = function (node) {
            /////////////////////////////////////////////////////////////
            //	Lint - Import statements shouldn't be used, because they aren't offering parallel downloads.
            /////////////////////////////////////////////////////////////
            this.addEntry(node, lintRules.Rules.ImportStatemement);
            return true;
        };
        LintVisitor.prototype.visitRuleSet = function (node) {
            var _this = this;
            /////////////////////////////////////////////////////////////
            //	Lint - Don't use empty rulesets.
            /////////////////////////////////////////////////////////////
            var declarations = node.getDeclarations();
            if (!declarations) {
                // syntax error
                return false;
            }
            if (!declarations.hasChildren()) {
                this.addEntry(node.getSelectors(), lintRules.Rules.EmptyRuleSet);
            }
            var self = this;
            var propertyTable = [];
            declarations.getChildren().forEach(function (element) {
                if (element instanceof nodes.Declaration) {
                    var decl = element;
                    propertyTable.push(new Element(decl.getFullPropertyName(), decl));
                }
            }, this);
            /////////////////////////////////////////////////////////////
            //	Don't use width or height when using padding or border.
            /////////////////////////////////////////////////////////////
            if ((this.fetch(propertyTable, 'width').length > 0 || this.fetch(propertyTable, 'height').length > 0) && (this.fetchWithin(propertyTable, 'padding').length > 0 || this.fetchWithin(propertyTable, 'border').length > 0)) {
                var elements = this.fetch(propertyTable, 'width');
                for (var index = 0; index < elements.length; index++) {
                    this.addEntry(elements[index].node, lintRules.Rules.NoWidthOrHeightWhenPaddingOrBorder);
                }
                elements = this.fetch(propertyTable, 'height');
                for (var index = 0; index < elements.length; index++) {
                    this.addEntry(elements[index].node, lintRules.Rules.NoWidthOrHeightWhenPaddingOrBorder);
                }
                elements = this.fetchWithin(propertyTable, 'padding');
                for (var index = 0; index < elements.length; index++) {
                    this.addEntry(elements[index].node, lintRules.Rules.NoWidthOrHeightWhenPaddingOrBorder);
                }
                elements = this.fetchWithin(propertyTable, 'border');
                for (var index = 0; index < elements.length; index++) {
                    this.addEntry(elements[index].node, lintRules.Rules.NoWidthOrHeightWhenPaddingOrBorder);
                }
            }
            /////////////////////////////////////////////////////////////
            //	Properties ignored due to display
            /////////////////////////////////////////////////////////////
            // With 'display: inline', the width, height, margin-top, margin-bottom, and float properties have no effect
            var displayElems = this.fetchWithValue(propertyTable, 'display', 'inline');
            if (displayElems.length > 0) {
                ['width', 'height', 'margin-top', 'margin-bottom', 'float'].forEach(function (prop) {
                    var elem = self.fetch(propertyTable, prop);
                    for (var index = 0; index < elem.length; index++) {
                        self.addEntry(elem[index].node, lintRules.Rules.PropertyIgnoredDueToDisplay);
                    }
                });
            }
            // With 'display: inline-block', 'float' has no effect
            displayElems = this.fetchWithValue(propertyTable, 'display', 'inline-block');
            if (displayElems.length > 0) {
                var elem = this.fetch(propertyTable, 'float');
                for (var index = 0; index < elem.length; index++) {
                    this.addEntry(elem[index].node, lintRules.Rules.PropertyIgnoredDueToDisplay);
                }
            }
            // With 'display: block', 'vertical-align' has no effect
            displayElems = this.fetchWithValue(propertyTable, 'display', 'block');
            if (displayElems.length > 0) {
                var elem = this.fetch(propertyTable, 'vertical-align');
                for (var index = 0; index < elem.length; index++) {
                    this.addEntry(elem[index].node, lintRules.Rules.PropertyIgnoredDueToDisplay);
                }
            }
            /////////////////////////////////////////////////////////////
            //	Don't use !important
            /////////////////////////////////////////////////////////////
            node.accept(function (n) {
                if (n.type === nodes.NodeType.Prio) {
                    self.addEntry(n, lintRules.Rules.AvoidImportant);
                }
                return true;
            });
            /////////////////////////////////////////////////////////////
            //	Avoid 'float'
            /////////////////////////////////////////////////////////////
            var elements = this.fetch(propertyTable, 'float');
            for (var index = 0; index < elements.length; index++) {
                this.addEntry(elements[index].node, lintRules.Rules.AvoidFloat);
            }
            /////////////////////////////////////////////////////////////
            //	Don't use duplicate declarations.
            /////////////////////////////////////////////////////////////
            for (var i = 0; i < propertyTable.length; i++) {
                var element = propertyTable[i];
                if (element.name.toLowerCase() !== 'background') {
                    var value = element.node.getValue();
                    if (value && value.getText()[0] !== '-') {
                        var elements = this.fetch(propertyTable, element.name);
                        if (elements.length > 1) {
                            for (var k = 0; k < elements.length; k++) {
                                var value = elements[k].node.getValue();
                                if (value && value.getText()[0] !== '-' && elements[k] !== element) {
                                    this.addEntry(element.node, lintRules.Rules.DuplicateDeclarations);
                                }
                            }
                        }
                    }
                }
            }
            /////////////////////////////////////////////////////////////
            //	Unknown propery & When using a vendor-prefixed gradient, make sure to use them all.
            /////////////////////////////////////////////////////////////
            var propertiesBySuffix = new NodesByRootMap();
            var containsUnknowns = false;
            declarations.getChildren().forEach(function (node) {
                if (_this.isCSSDeclaration(node)) {
                    var decl = node;
                    var name = decl.getFullPropertyName();
                    var firstChar = name.charAt(0);
                    if (firstChar === '-') {
                        if (name.charAt(1) !== '-') {
                            if (!languageFacts.isKnownProperty(name)) {
                                _this.addEntry(decl.getProperty(), lintRules.Rules.UnknownVendorSpecificProperty);
                            }
                            var nonPrefixedName = decl.getNonPrefixedPropertyName();
                            propertiesBySuffix.add(nonPrefixedName, name, decl.getProperty());
                        }
                    }
                    else {
                        if (firstChar === '*' || firstChar === '_') {
                            _this.addEntry(decl.getProperty(), lintRules.Rules.IEStarHack);
                            name = name.substr(1);
                        }
                        if (!languageFacts.isKnownProperty(name)) {
                            _this.addEntry(decl.getProperty(), lintRules.Rules.UnknownProperty);
                        }
                        propertiesBySuffix.add(name, name, null); // don't pass the node as we don't show errors on the standard
                    }
                }
                else {
                    containsUnknowns = true;
                }
            });
            if (!containsUnknowns) {
                var addVendorSpecificWarnings = function (node) {
                    if (needsStandard) {
                        var message = nls.localize(4, null, suffix);
                        _this.addEntry(node, lintRules.Rules.IncludeStandardPropertyWhenUsingVendorPrefix, message);
                    }
                    if (missingVendorSpecific) {
                        var message = nls.localize(5, null, missingVendorSpecific);
                        _this.addEntry(node, lintRules.Rules.AllVendorPrefixes, message);
                    }
                };
                for (var suffix in propertiesBySuffix.data) {
                    var entry = propertiesBySuffix.data[suffix];
                    var actual = entry.names;
                    var needsStandard = languageFacts.isKnownProperty(suffix) && (actual.indexOf(suffix) === -1);
                    if (!needsStandard && actual.length === 1) {
                        continue; // only the non-vendor specific rule is used, that's fine, no warning
                    }
                    var expected = [];
                    for (var i = 0, len = LintVisitor.prefixes.length; i < len; i++) {
                        var prefix = LintVisitor.prefixes[i];
                        if (languageFacts.isKnownProperty(prefix + suffix)) {
                            expected.push(prefix + suffix);
                        }
                    }
                    var missingVendorSpecific = this.getMissingNames(expected, actual);
                    if (missingVendorSpecific || needsStandard) {
                        entry.nodes.forEach(addVendorSpecificWarnings);
                    }
                }
            }
            return true;
        };
        LintVisitor.prototype.visitNumericValue = function (node) {
            /////////////////////////////////////////////////////////////
            //	0 has no following unit
            /////////////////////////////////////////////////////////////
            var value = node.getValue();
            if (value.unit === '%') {
                return true;
            }
            if (parseFloat(value.value) === 0.0 && !!value.unit) {
                this.addEntry(node, lintRules.Rules.ZeroWithUnit);
            }
            return true;
        };
        LintVisitor.prototype.visitFontFace = function (node) {
            var _this = this;
            var declarations = node.getDeclarations();
            if (!declarations) {
                // syntax error
                return;
            }
            var definesSrc = false, definesFontFamily = false;
            var containsUnknowns = false;
            declarations.getChildren().forEach(function (node) {
                if (_this.isCSSDeclaration(node)) {
                    var name = (node.getProperty().getName().toLocaleLowerCase());
                    if (name === 'src') {
                        definesSrc = true;
                    }
                    if (name === 'font-family') {
                        definesFontFamily = true;
                    }
                }
                else {
                    containsUnknowns = true;
                }
            });
            if (!containsUnknowns && (!definesSrc || !definesFontFamily)) {
                this.addEntry(node, lintRules.Rules.RequiredPropertiesForFontFace);
            }
            return true;
        };
        LintVisitor.prototype.isCSSDeclaration = function (node) {
            if (node instanceof nodes.Declaration) {
                if (!node.getValue()) {
                    return false;
                }
                var property = node.getProperty();
                if (!property || property.getIdentifier().containsInterpolation()) {
                    return false;
                }
                return true;
            }
            return false;
        };
        LintVisitor.prototype.visitUnknownNode = function (node) {
            // Rule: #eeff00 or #ef0
            if (node.type === nodes.NodeType.HexColorValue) {
                var text = node.getText();
                if (text.length !== 7 && text.length !== 4) {
                    this.addEntry(node, lintRules.Rules.HexColorLength);
                }
            }
            return true;
        };
        LintVisitor.prototype.visitFunction = function (node) {
            var fnName = node.getName().toLowerCase(), expectedAttrCount = -1, actualAttrCount = 0;
            switch (fnName) {
                case 'rgb(':
                case 'hsl(':
                    expectedAttrCount = 3;
                    break;
                case 'rgba(':
                case 'hsla(':
                    expectedAttrCount = 4;
                    break;
            }
            if (expectedAttrCount !== -1) {
                node.getArguments().accept(function (n) {
                    if (n instanceof nodes.BinaryExpression) {
                        actualAttrCount += 1;
                        return false;
                    }
                    return true;
                });
                if (actualAttrCount !== expectedAttrCount) {
                    this.addEntry(node, lintRules.Rules.ArgsInColorFunction);
                }
            }
            return true;
        };
        LintVisitor.prefixes = [
            '-ms-', '-moz-', '-o-', '-webkit-',
        ];
        return LintVisitor;
    }());
    exports.LintVisitor = LintVisitor;
});






define(__m[25], __M([1,0,23,16,28]), function (require, exports, winjs, resourceService, lifecycle_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var PromiseWithTrigger = (function (_super) {
        __extends(PromiseWithTrigger, _super);
        function PromiseWithTrigger() {
            var _this = this;
            _super.call(this, function (c, e, p) {
                _this._valueCallback = c;
                _this._errorCallback = e;
            });
        }
        PromiseWithTrigger.prototype.resolve = function (data) {
            this._valueCallback(data);
            return this;
        };
        PromiseWithTrigger.prototype.reject = function (err) {
            this._errorCallback(err);
            return this;
        };
        return PromiseWithTrigger;
    }(winjs.TPromise));
    var CSSLanguageService = (function () {
        function CSSLanguageService(service, createParser, _cssModeId) {
            var _this = this;
            this._cssModeId = _cssModeId;
            this.resourceService = service;
            this.entries = {};
            this.callOnDispose = [];
            this.createParser = createParser;
            this.updateResources();
            this.callOnDispose.push(this.resourceService.addListener2_(resourceService.ResourceEvents.ADDED, function (e) { return _this.onResourceAdded(e); }));
            this.callOnDispose.push(this.resourceService.addListener2_(resourceService.ResourceEvents.REMOVED, function (e) { return _this.onResourceRemoved(e); }));
            this.callOnDispose.push(this.resourceService.addListener2_(resourceService.ResourceEvents.CHANGED, function (e) { return _this.onResourceChange(e); }));
        }
        CSSLanguageService.prototype.dispose = function () {
            this.callOnDispose = lifecycle_1.dispose(this.callOnDispose);
            clearTimeout(this.onChangeHandle);
            this.onChangeHandle = null;
            this.entries = null;
        };
        CSSLanguageService.prototype.onResourceAdded = function (e) {
            if (this._isMyMirrorModel(e.addedElement)) {
                this._scheduleRefreshLanguageService();
            }
        };
        CSSLanguageService.prototype.onResourceRemoved = function (e) {
            var url = e.url.toString();
            if (this.entries.hasOwnProperty(url)) {
                delete this.entries[url];
            }
        };
        CSSLanguageService.prototype.onResourceChange = function (e) {
            if (this._isMyModel(e.url)) {
                this._scheduleRefreshLanguageService();
            }
        };
        CSSLanguageService.prototype._scheduleRefreshLanguageService = function () {
            var _this = this;
            if (!this.activeDelay) {
                this.activeDelay = new PromiseWithTrigger();
            }
            if (this.onChangeHandle) {
                clearTimeout(this.onChangeHandle);
            }
            this.onChangeHandle = setTimeout(function () {
                _this.updateResources();
                _this.activeDelay.resolve(null);
                _this.activeDelay = null;
                _this.onChangeHandle = null;
            }, 50);
        };
        CSSLanguageService.prototype.join = function () {
            return (this.activeDelay || winjs.TPromise.as(null));
        };
        CSSLanguageService.prototype._isMyMirrorModel = function (resource) {
            return resource.getMode().getId() === this._cssModeId;
        };
        CSSLanguageService.prototype._isMyModel = function (url) {
            return this._isMyMirrorModel(this.resourceService.get(url));
        };
        CSSLanguageService.prototype.updateResources = function () {
            var _this = this;
            var n = 0;
            this.resourceService.all().filter(function (element) { return _this._isMyMirrorModel(element); }).forEach(function (model) {
                // Reparse changes or new models
                var url = model.uri.toString(), entry = _this.entries[url], hasEntry = typeof entry !== 'undefined';
                if (!hasEntry || entry.version !== model.getVersionId()) {
                    if (!hasEntry) {
                        entry = { node: null, version: -1 };
                        _this.entries[url] = entry;
                    }
                    entry.node = _this.createParser().parseStylesheet(model);
                    entry.node.setName(url);
                    entry.version = model.getVersionId();
                    n += 1;
                }
            });
            //		console.info('[less] updating ' + n + ' resources took ms' + (new Date().getTime() - t1));
        };
        CSSLanguageService.prototype.getStylesheet = function (resource) {
            if (this.entries.hasOwnProperty(resource.toString())) {
                return this.entries[resource.toString()].node;
            }
            return null;
        };
        return CSSLanguageService;
    }());
    exports.CSSLanguageService = CSSLanguageService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(__m[29], __M([1,0,5,30,6,23,25,4,12,20,13,2,3,18,11,24,9,31,32,16,33,34]), function (require, exports, nls, severity_1, strings, winjs, languageService, languageFacts, occurrences, cssIntellisense, modes, nodes, _level, parser, selectorPrinting, lint, lintRules, markers_1, range_1, resourceService_1, suggestSupport_1, validationHelper_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var CSSWorker = (function () {
        function CSSWorker(modeId, resourceService, markerService) {
            var _this = this;
            this._modeId = modeId;
            this.resourceService = resourceService;
            this.markerService = markerService;
            this._validationHelper = new validationHelper_1.ValidationHelper(this.resourceService, this._modeId, function (toValidate) { return _this.doValidate(toValidate); });
            this.languageService = this.createLanguageService(resourceService, modeId);
            this.lintSettings = {};
            this.validationEnabled = true;
        }
        CSSWorker.prototype.navigateValueSet = function (resource, range, up) {
            var _this = this;
            return this.languageService.join().then(function () {
                var model = _this.resourceService.get(resource);
                var offset = model.getOffsetFromPosition({ lineNumber: range.startLineNumber, column: range.startColumn });
                var styleSheet = _this.languageService.getStylesheet(resource);
                var node = nodes.getNodeAtOffset(styleSheet, offset);
                if (!node) {
                    return;
                }
                var declaration = nodes.getParentDeclaration(node);
                if (!declaration) {
                    return;
                }
                var entry = languageFacts.getProperties()[declaration.getFullPropertyName()];
                if (!entry || !entry.values) {
                    return;
                }
                var values = entry.values.filter(function (value) { return languageFacts.isCommonValue(value); }).map(function (v) { return v.name; });
                var isColor = (entry.restrictions.indexOf('color') >= 0);
                if (isColor) {
                    values = values.concat(Object.getOwnPropertyNames(languageFacts.colors), Object.getOwnPropertyNames(languageFacts.colorKeywords));
                }
                var text = node.getText();
                for (var i = 0, len = values.length; i < len; i++) {
                    if (strings.equalsIgnoreCase(values[i], text)) {
                        var nextIdx = i;
                        if (up) {
                            nextIdx = (i + 1) % len;
                        }
                        else {
                            nextIdx = i - 1;
                            if (nextIdx < 0) {
                                nextIdx = len - 1;
                            }
                        }
                        var result = {
                            value: values[nextIdx],
                            range: _this._range(node, model)
                        };
                        return result;
                    }
                }
                // if none matches, take the first one
                if (values.length > 0) {
                    var result = {
                        value: values[0],
                        range: _this._range(node, model)
                    };
                    return result;
                }
                return null;
            });
        };
        CSSWorker.prototype.createLanguageService = function (resourceService, modeId) {
            return new languageService.CSSLanguageService(resourceService, this.createParser.bind(this), modeId);
        };
        CSSWorker.prototype.createParser = function () {
            return new parser.Parser();
        };
        CSSWorker.prototype._doConfigure = function (raw) {
            if (raw) {
                this.validationEnabled = raw.validate;
                if (raw.lint) {
                    this.lintSettings = lintRules.sanitize(raw.lint);
                }
                else {
                    this.lintSettings = {};
                }
                this._validationHelper.triggerDueToConfigurationChange();
            }
            return winjs.TPromise.as(void 0);
        };
        CSSWorker.prototype.enableValidator = function () {
            this._validationHelper.enable();
            return winjs.TPromise.as(null);
        };
        CSSWorker.prototype.doValidate = function (resources) {
            for (var i = 0; i < resources.length; i++) {
                this.doValidate1(resources[i]);
            }
        };
        CSSWorker.prototype.doValidate1 = function (resource) {
            var _this = this;
            if (!this.validationEnabled) {
                this.markerService.changeOne(this._modeId, resource, []);
                return;
            }
            this.languageService.join().then(function () {
                var modelMirror = _this.resourceService.get(resource), node = _this.languageService.getStylesheet(resource), entries = [];
                entries.push.apply(entries, nodes.ParseErrorCollector.entries(node));
                entries.push.apply(entries, _this.collectLintEntries(node));
                var markerData = entries
                    .filter(function (entry) { return entry.getLevel() !== _level.Level.Ignore; })
                    .map(function (entry) { return _this._createMarkerData(modelMirror, entry); });
                _this.markerService.changeOne(_this._modeId, resource, markerData);
            });
        };
        CSSWorker.prototype._createMarkerData = function (model, marker) {
            var range = model.getRangeFromOffsetAndLength(marker.getOffset(), marker.getLength());
            return {
                code: marker.getRule().id,
                message: marker.getMessage(),
                severity: marker.getLevel() === _level.Level.Warning ? severity_1.default.Warning : severity_1.default.Error,
                startLineNumber: range.startLineNumber,
                startColumn: range.startColumn,
                endLineNumber: range.endLineNumber,
                endColumn: range.endColumn
            };
        };
        CSSWorker.prototype.collectLintEntries = function (stylesheet) {
            return lint.LintVisitor.entries(stylesheet, this.lintSettings);
        };
        CSSWorker.prototype.createIntellisense = function () {
            return new cssIntellisense.CSSIntellisense();
        };
        CSSWorker.prototype.provideCompletionItems = function (resource, position) {
            return this.doSuggest(resource, position).then(function (value) { return suggestSupport_1.filterSuggestions(value); });
        };
        CSSWorker.prototype.doSuggest = function (resource, position) {
            var _this = this;
            return this.languageService.join().then(function () {
                var model = _this.resourceService.get(resource);
                var result = _this.createIntellisense().getCompletionsAtPosition(_this.languageService, model, resource, position);
                return result;
            });
        };
        CSSWorker.prototype.provideDocumentSymbols = function (resource) {
            var _this = this;
            return this.languageService.join().then(function () {
                var model = _this.resourceService.get(resource), stylesheet = _this.languageService.getStylesheet(resource), result = [];
                stylesheet.accept(function (node) {
                    var entry = {
                        name: null,
                        kind: modes.SymbolKind.Class,
                        location: null
                    };
                    if (node instanceof nodes.Selector) {
                        entry.name = node.getText();
                    }
                    else if (node instanceof nodes.VariableDeclaration) {
                        entry.name = node.getName();
                        entry.kind = modes.SymbolKind.Variable;
                    }
                    else if (node instanceof nodes.MixinDeclaration) {
                        entry.name = node.getName();
                        entry.kind = modes.SymbolKind.Method;
                    }
                    else if (node instanceof nodes.FunctionDeclaration) {
                        entry.name = node.getName();
                        entry.kind = modes.SymbolKind.Function;
                    }
                    else if (node instanceof nodes.Keyframe) {
                        entry.name = nls.localize(0, null, node.getName());
                    }
                    else if (node instanceof nodes.FontFace) {
                        entry.name = nls.localize(1, null);
                    }
                    if (entry.name) {
                        entry.location = {
                            uri: resource,
                            range: _this._range(node, model, true)
                        };
                        result.push(entry);
                    }
                    return true;
                });
                return result;
            });
        };
        CSSWorker.prototype.provideHover = function (resource, position) {
            var _this = this;
            return this.languageService.join().then(function () {
                var model = _this.resourceService.get(resource), offset = model.getOffsetFromPosition(position), stylesheet = _this.languageService.getStylesheet(resource), nodepath = nodes.getNodePath(stylesheet, offset);
                for (var i = 0; i < nodepath.length; i++) {
                    var node = nodepath[i];
                    if (node instanceof nodes.Selector) {
                        return {
                            htmlContent: [selectorPrinting.selectorToHtml(node)],
                            range: _this._range(node, model)
                        };
                    }
                    if (node instanceof nodes.SimpleSelector) {
                        return {
                            htmlContent: [selectorPrinting.simpleSelectorToHtml(node)],
                            range: _this._range(node, model)
                        };
                    }
                    if (node instanceof nodes.Declaration) {
                        var propertyName = node.getFullPropertyName();
                        var entry = languageFacts.getProperties()[propertyName];
                        if (entry) {
                            return {
                                htmlContent: [{ text: entry.description }],
                                range: _this._range(node, model)
                            };
                        }
                    }
                }
                return null;
            });
        };
        CSSWorker.prototype.provideDefinition = function (resource, position) {
            var _this = this;
            return this.languageService.join().then(function () {
                var model = _this.resourceService.get(resource), offset = model.getOffsetFromPosition(position), node = occurrences.findDeclaration(_this.languageService.getStylesheet(resource), offset);
                if (!node) {
                    return null;
                }
                return {
                    uri: resource,
                    range: _this._range(node, model, true)
                };
            });
        };
        CSSWorker.prototype.provideDocumentHighlights = function (resource, position) {
            var _this = this;
            return this.languageService.join().then(function () {
                var model = _this.resourceService.get(resource), offset = model.getOffsetFromPosition(position), nodes = occurrences.findOccurrences(_this.languageService.getStylesheet(resource), offset);
                return nodes.map(function (occurrence) {
                    return {
                        range: _this._range(occurrence.node, model),
                        kind: occurrence.kind
                    };
                });
            });
        };
        CSSWorker.prototype.provideReferences = function (resource, position) {
            var _this = this;
            return this.languageService.join().then(function () {
                var model = _this.resourceService.get(resource), offset = model.getOffsetFromPosition(position), nodes = occurrences.findOccurrences(_this.languageService.getStylesheet(resource), offset);
                return nodes.map(function (occurrence) {
                    return {
                        uri: model.uri,
                        range: _this._range(occurrence.node, model)
                    };
                });
            });
        };
        CSSWorker.prototype.findColorDeclarations = function (resource) {
            var _this = this;
            return this.languageService.join().then(function () {
                var model = _this.resourceService.get(resource), styleSheet = _this.languageService.getStylesheet(resource), result = [];
                styleSheet.accept(function (node) {
                    if (languageFacts.isColorValue(node)) {
                        result.push({
                            range: _this._range(node, model),
                            value: node.getText()
                        });
                    }
                    return true;
                });
                return result;
            });
        };
        CSSWorker.prototype._range = function (node, model, empty) {
            if (empty === void 0) { empty = false; }
            if (empty) {
                var position = model.getPositionFromOffset(node.offset);
                return {
                    startLineNumber: position.lineNumber,
                    startColumn: position.column,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column
                };
            }
            else {
                return model.getRangeFromOffsetAndLength(node.offset, node.length);
            }
        };
        CSSWorker.prototype.getFixesForUnknownProperty = function (property, marker) {
            var propertyName = property.getName();
            var result = [];
            for (var p in languageFacts.getProperties()) {
                var score = strings.difference(propertyName, p);
                if (score >= propertyName.length / 2 /*score_lim*/) {
                    result.push({
                        command: {
                            id: '_css.replaceText',
                            title: nls.localize(2, null, p),
                            arguments: [{ range: range_1.Range.lift(marker), newText: p }]
                        },
                        score: score
                    });
                }
            }
            // Sort in descending order.
            result.sort(function (a, b) {
                return b.score - a.score;
            });
            return result.slice(0, 3 /*max_result*/);
        };
        CSSWorker.prototype.appendFixesForMarker = function (bucket, marker) {
            if (marker.code !== lintRules.Rules.UnknownProperty.id) {
                return;
            }
            var model = this.resourceService.get(marker.resource), offset = model.getOffsetFromPosition({ column: marker.startColumn, lineNumber: marker.startLineNumber }), stylesheet = this.languageService.getStylesheet(marker.resource), nodepath = nodes.getNodePath(stylesheet, offset);
            for (var i = nodepath.length - 1; i >= 0; i--) {
                var node = nodepath[i];
                if (node instanceof nodes.Declaration) {
                    var property = node.getProperty();
                    if (property && property.offset === offset && property.length === marker.endColumn - marker.startColumn) {
                        bucket.push.apply(bucket, this.getFixesForUnknownProperty(property, marker));
                        return;
                    }
                }
            }
        };
        CSSWorker.prototype.provideCodeActions = function (resource, range) {
            var _this = this;
            return this.languageService.join().then(function () {
                var result = [];
                _this.markerService.read({ resource: resource })
                    .filter(function (marker) { return range_1.Range.containsRange(range, marker); })
                    .forEach(function (marker) { return _this.appendFixesForMarker(result, marker); });
                return result;
            });
        };
        CSSWorker = __decorate([
            __param(1, resourceService_1.IResourceService),
            __param(2, markers_1.IMarkerService)
        ], CSSWorker);
        return CSSWorker;
    }());
    exports.CSSWorker = CSSWorker;
});

}).call(this);
//# sourceMappingURL=cssWorker.js.map
