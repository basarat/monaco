# Monaco

The plan is to provide daily automated builds on microsoft monaco.

## Some notes on monaco dirs
* src : the source code
* out : the built assets
* build : scripts for building various stuff

## How original monaco is built

Please see `build/monaco/README.md`

## Our Build

All done using `prepare.sh` (with the help of `extensions/preBuild.ts`).


## Installation

Due to limited testing and automated release we recommend hard version installs:

```
npm install nmonaco --save --save-exact
```

you can put this your package.json (and now you can `npm run unmonaco`):

```
    "unmonaco": "npm install nmonaco@latest --save --save-exact && npm run tsc",
```
