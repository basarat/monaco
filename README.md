# Monaco

The plan is to provide daily automated builds on microsoft monaco.

## Some notes on monaco dirs
* src : the source code
* out : the built assets
* build : scripts for building various stuff

## How original monaco is built

* npm install
* `gulp compile` (with declarations setting set to true)
* And then `node build/lib/api`

## Our Build

All done using `prepare.sh` (with the help of `extensions/preBuild.ts`).
