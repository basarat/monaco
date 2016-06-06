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

# TODO: do some stuff

# Again reset sub repo
git reset --hard origin/master
