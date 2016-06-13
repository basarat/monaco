# Monaco

The plan is to provide daily automated builds on microsoft monaco.

## Some notes on monaco dirs
* src : the source code
* out : the built assets
* build : scripts for building various stuff

## How original monaco is built

Please see `build/monaco/README.md`. We simplified it (for our purposes) by reading a bunch of source code around the gulpfiles.

* the `build/gulpfile.editor.js` contains the monaco building stuff.
* the `monaco.d.ts` api is built with `build/monaco/api.ts`.

Warning: the `monaco.d.ts.recipe` is loosely related to `editor.main.ts` etc so you need to make changes to both in sync :-/

Also `@internal` stuff is stripped by `api.ts`, if you try to bring it all in you will get errors as a lot of stuff is hidden and you will need to bring
in all of it using `api` + `editor.main` (quite a bit of work.)

## Our Build

All done using `prepare.sh` (with the help of stuff in the `extensions` folder).

## Installation

Due to limited testing and automated release we recommend hard version installs:

```
npm install nmonaco --save --save-exact
```

you can put this your package.json (and now you can `npm run unmonaco`):

```
    "unmonaco": "npm install nmonaco@latest --save --save-exact && npm run tsc",
```

## Why?
If you just want a quick editor on a web page the `monaco-editor` will get you there quick : https://www.npmjs.com/package/monaco-editor. But if you want to specialize the experience for a particular language (in our case `JavaScript`/`TypeScript` as we do in [alm.tools](http://alm.tools) you might want to use this package).
