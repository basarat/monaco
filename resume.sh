#!/bin/sh
git reset --hard origin/master
git pull --rebase

cd ./vscode
git fetch origin
git reset --hard origin/master
