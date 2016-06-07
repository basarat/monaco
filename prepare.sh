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

# Build VSCode once to get a new LKG
./node_modules/.bin/gulp compile

# Build monaco
# This generates a new `src/vs/monaco.d.ts`
node ./build/monaco/api

# TODO: do some stuff

# Again reset sub repo
git reset --hard origin/master
