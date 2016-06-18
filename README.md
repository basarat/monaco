# Monaco

[![BuildStatus](https://travis-ci.org/TypeStrong/ntypescript.svg)](https://travis-ci.org/TypeStrong/ntypescript)

A daily automated build of Microsoft Monaco.

> Warning: This is personal endeavour.

## Why?
If you just want a quick editor on a web page the `monaco-editor` will get you there quicker : https://www.npmjs.com/package/monaco-editor. This internally uses stuff like `monaco-langauges` and `monaco-editor-core`.

But if you want to specialize the experience for a particular language ([in our case `JavaScript`/`TypeScript` as we do in alm.tools](http://alm.tools)) you can use this as a reference for [build automation](https://github.com/basarat/monaco/blob/master/CONTRIBUTING.md) to make your own version.

## Some notes on vscode dirs

* `src` : the source code
* `out-*` (e.g. `out-editor`) : the built assets
* `build` : scripts for building various stuff (including monaco)

## How monaco-editor-core is built

Please see `vscode/build/monaco/README.md`. We simplified it and the process is documented in `prepare.sh`. Some notes on monaco-editor-core:

* the `build/gulpfile.editor.js` contains the monaco building stuff.
* the `monaco.d.ts` api is built with `build/monaco/api.ts`.

Note: the `monaco.d.ts.recipe` is loosely related to `editor.main.ts` etc. You get to use the outcome of the recipe (i.e. `monaco.d.ts`) as `typeof monaco.something` in your `editor.main` stuff to ensure types match but it can fail silently due to excessive use of `any` so be careful 🌹

Also `@internal` stuff is stripped by `api.ts`, if you try to bring it all in you will get errors as a lot of stuff is hidden and you will need to bring
in all of it using `api` + `editor.main` (quite a bit of work.)

## Our Build

All done using `prepare.sh` (with the help of stuff in the `extensions` folder).

## Installation

Due to limited testing and automated release we recommend hard version installs:

```
npm install monaco --save --save-exact
```

You can put this your package.json to make it easier for you to update to latest (and now you can `npm run umonaco`):

```
    "umonaco": "npm install nmonaco@latest --save --save-exact && npm run tsc",
```
