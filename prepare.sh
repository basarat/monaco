#!/bin/sh
set -e

git submodule update --recursive --init

# Official Microsoft/vscode clone
cd ./vscode

git clean -xfd
git fetch origin
git reset --hard origin/master

# Install everything
npm install

# Do pre build modifications
node ../extensions/preBuild.js

# Build once to get a new LKG
./node_modules/.bin/gulp compile

# TODO: do some stuff

# Again reset sub repo
git reset --hard origin/master
