# Monaco

The plan is to provide daily automated builds on microsoft monaco.

## PLAN 

We need to set env `VSCODE_BUILD_DECLARATION_FILES=1`
Then run `gulp compile` 
And then `node build/lib/api`