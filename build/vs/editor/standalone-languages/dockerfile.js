/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.3.1(undefined)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/

(function() {
var __m = ["vs/editor/standalone-languages/dockerfile","require","exports"];
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
    exports.language = {
        defaultToken: '',
        tokenPostfix: '.dockerfile',
        instructions: /FROM|MAINTAINER|RUN|EXPOSE|ENV|ADD|VOLUME|LABEL|USER|WORKDIR|COPY|CMD|ENTRYPOINT/,
        instructionAfter: /ONBUILD/,
        variableAfter: /ENV/,
        variable: /\${?[\w]+}?/,
        tokenizer: {
            root: [
                { include: '@whitespace' },
                { include: '@comment' },
                [/(@instructionAfter)(\s+)/, ['keyword', { token: '', next: '@instructions' }]],
                ['', 'keyword', '@instructions']
            ],
            instructions: [
                [/(@variableAfter)(\s+)([\w]+)/, ['keyword', '', { token: 'variable', next: '@arguments' }]],
                [/(@instructions)/, 'keyword', '@arguments']
            ],
            arguments: [
                { include: '@whitespace' },
                { include: '@strings' },
                [/(@variable)/, { cases: { '@eos': { token: 'variable', next: '@popall' }, '@default': 'variable' } }],
                [/\\/, { cases: { '@eos': '', '@default': '' } }],
                [/./, { cases: { '@eos': { token: '', next: '@popall' }, '@default': '' } }],
            ],
            // Deal with white space, including comments
            whitespace: [
                [/\s+/, { cases: { '@eos': { token: '', next: '@popall' }, '@default': '' } }],
            ],
            comment: [
                [/(^#.*$)/, 'comment', '@popall']
            ],
            // Recognize strings, including those broken across lines with \ (but not without)
            strings: [
                [/'$/, 'string', '@popall'],
                [/'/, 'string', '@stringBody'],
                [/"$/, 'string', '@popall'],
                [/"/, 'string', '@dblStringBody']
            ],
            stringBody: [
                [/[^\\\$']/, { cases: { '@eos': { token: 'string', next: '@popall' }, '@default': 'string' } }],
                [/\\./, 'string.escape'],
                [/'$/, 'string', '@popall'],
                [/'/, 'string', '@pop'],
                [/(@variable)/, 'variable'],
                [/\\$/, 'string'],
                [/$/, 'string', '@popall']
            ],
            dblStringBody: [
                [/[^\\\$"]/, { cases: { '@eos': { token: 'string', next: '@popall' }, '@default': 'string' } }],
                [/\\./, 'string.escape'],
                [/"$/, 'string', '@popall'],
                [/"/, 'string', '@pop'],
                [/(@variable)/, 'variable'],
                [/\\$/, 'string'],
                [/$/, 'string', '@popall']
            ]
        }
    };
});

}).call(this);
//# sourceMappingURL=dockerfile.js.map
