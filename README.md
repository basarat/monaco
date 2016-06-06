# Monaco

The plan is to provide daily automated builds on microsoft monaco.

## Some notes on monaco dirs
* src : the source code
* out : the built assets
* build : scripts for building various stuff

## PLAN

We need to set env `VSCODE_BUILD_DECLARATION_FILES=1`
Then run `gulp compile`
And then `node build/lib/api`
