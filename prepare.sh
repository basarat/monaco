#!/bin/sh
set -e

git submodule update --recursive --init

# Official Microsoft/vscode clone
cd ./vscode

git clean -xfd
git fetch origin
git reset --hard origin/master

# Do pre build modifications
../node_modules/.bin/tsc -p ../extensions/tsconfig.json
node ../extensions/preBuild.js

#
# Build monaco
#

# Install everything
npm install

# Build VSCode once to get a new `out` folder
./node_modules/.bin/gulp compile

# This generates a new `src/vs/monaco.d.ts`
node ./build/monaco/api

# This generates the `out-monaco-editor-core` folder which is for npm publishing
./node_modules/.bin/gulp editor-distro

# Copy it out to our `build` folder
rm -rf ../build
mkdir -p ../build
cp -r ./out-monaco-editor-core/dev ../build
cp ./out-monaco-editor-core/monaco.d.ts ../build

# Do post build modifications
node ../extensions/postBuild.js

# Again reset sub repo
git reset --hard origin/master
