#!/bin/sh
set -e

git submodule update --recursive --init

# Official Microsoft/vscode clone
cd ./vscode

git clean -xfd
git fetch origin
git reset --hard origin/master

#
# copy monaco
#
cp -r ./src/vs/editor ../src/vs
cp -r ./src/vs/base ../src/vs
cp -r ./src/vs/platform ../src/vs
# copy some prebuilt assets
cp ./src/vs/nls.d.ts ../src/vs/nls.d.ts
cp ./src/vs/nls.d.ts ../build/vs/nls.d.ts
cp ./src/vs/nls.js ../build/vs/nls.js

# Do pre build modifications
node ../extensions/preBuild.js

# Build using tsc
../node_modules/.bin/tsc -p ../src/tsconfig.json

#
# Build monaco
#

# Build VSCode once to get a new `out` folder
#./node_modules/.bin/gulp compile

# This generates a new `src/vs/monaco.d.ts`
#node ./build/monaco/api

# This generates the `out-monaco-editor-core` folder which is for npm publishing
#./node_modules/.bin/gulp editor-distro

# Copy it out to our `build` folder
#cp ./out-monaco-editor-core ../build

# TODO: do some stuff

# Again reset sub repo
git reset --hard origin/master
