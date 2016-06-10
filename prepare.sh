#!/bin/sh
set -e

git submodule update --recursive --init

# Official Microsoft/vscode clone
cd ./vscode

git clean -xfd
git fetch origin
git reset --hard origin/master

# Do pre build modifications
node ../extensions/preBuild.js

# Install everything
npm install

#
# Build monaco
#

# Build VSCode once to get a new `out` folder
./node_modules/.bin/gulp compile

# This generates a new `src/vs/monaco.d.ts`
node ./build/monaco/api

# This generates the `out-monaco-editor-core` folder which is for npm publishing
./node_modules/.bin/gulp editor-distro

# Copy it out to our `build` folder
cp ./out-monaco-editor-core ../build

# TODO: do some stuff

# Again reset sub repo
git reset --hard origin/master
