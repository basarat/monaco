/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.3.1(undefined)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/

(function() {
var __m = ["vs/editor/standalone-languages/xml","require","exports"];
var __M = function(deps) {
  var result = [];
  for (var i = 0, len = deps.length; i < len; i++) {
    result[i] = __m[deps[i]];
  }
  return result;
};
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[0], __M([1,2]), function (require, exports) {
    'use strict';
    exports.conf = {
        comments: {
            blockComment: ['<!--', '-->'],
        },
        brackets: [['{', '}'], ['[', ']'], ['(', ')'], ['<', '>']],
        autoClosingPairs: [
            { open: '\'', close: '\'', notIn: ['string', 'comment'] },
            { open: '"', close: '"', notIn: ['string', 'comment'] },
        ]
    };
    exports.language = {
        defaultToken: '',
        tokenPostfix: '.xml',
        ignoreCase: true,
        // Useful regular expressions
        qualifiedName: /(?:[\w\.\-]+:)?[\w\.\-]+/,
        tokenizer: {
            root: [
                [/[^<&]+/, ''],
                { include: '@whitespace' },
                // Standard opening tag
                [/(<)(@qualifiedName)/, [
                        { token: 'delimiter.start', bracket: '@open' },
                        { token: 'tag.tag-$2', bracket: '@open', next: '@tag.$2' }]],
                // Standard closing tag
                [/(<\/)(@qualifiedName)(\s*)(>)/, [
                        { token: 'delimiter.end', bracket: '@open' },
                        { token: 'tag.tag-$2', bracket: '@close' },
                        '',
                        { token: 'delimiter.end', bracket: '@close' }]],
                // Meta tags - instruction
                [/(<\?)(@qualifiedName)/, [
                        { token: 'delimiter.start', bracket: '@open' },
                        { token: 'metatag.instruction', next: '@tag' }]],
                // Meta tags - declaration
                [/(<\!)(@qualifiedName)/, [
                        { token: 'delimiter.start', bracket: '@open' },
                        { token: 'metatag.declaration', next: '@tag' }]],
                // CDATA
                [/<\!\[CDATA\[/, { token: 'delimiter.cdata', bracket: '@open', next: '@cdata' }],
                [/&\w+;/, 'string.escape'],
            ],
            cdata: [
                [/[^\]]+/, ''],
                [/\]\]>/, { token: 'delimiter.cdata', bracket: '@close', next: '@pop' }],
                [/\]/, '']
            ],
            tag: [
                [/[ \t\r\n]+/, ''],
                [/(@qualifiedName)(\s*=\s*)("[^"]*"|'[^']*')/, ['attribute.name', '', 'attribute.value']],
                [/(@qualifiedName)(\s*=\s*)("[^">?\/]*|'[^'>?\/]*)(?=[\?\/]\>)/, ['attribute.name', '', 'attribute.value']],
                [/(@qualifiedName)(\s*=\s*)("[^">]*|'[^'>]*)/, ['attribute.name', '', 'attribute.value']],
                [/@qualifiedName/, 'attribute.name'],
                [/\?>/, { token: 'delimiter.start', bracket: '@close', next: '@pop' }],
                [/(\/)(>)/, [
                        { token: 'tag.tag-$S2', bracket: '@close' },
                        { token: 'delimiter.start', bracket: '@close', next: '@pop' }]],
                [/>/, { token: 'delimiter.start', bracket: '@close', next: '@pop' }],
            ],
            whitespace: [
                [/[ \t\r\n]+/, ''],
                [/<!--/, { token: 'comment', bracket: '@open', next: '@comment' }]
            ],
            comment: [
                [/[^<\-]+/, 'comment.content'],
                [/-->/, { token: 'comment', bracket: '@close', next: '@pop' }],
                [/<!--/, 'comment.content.invalid'],
                [/[<\-]/, 'comment.content']
            ],
        },
    };
});

}).call(this);
//# sourceMappingURL=xml.js.map
