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
cp -r ./src/vs/languages ../src/vs
mkdir -p ../src/vs/workbench/services/quickopen
cp -r ./src/vs/workbench/services/quickopen/common ../src/vs/workbench/services/quickopen
#
# copy some prebuilt assets (to src (if not done already) and always to build)
#
# loader
cp ./src/vs/loader.js ../src/vs/loader.js
cp ./src/vs/loader.js ../build/vs/loader.js
cp ./src/vs/css.js ../src/vs/css.js
cp ./src/vs/css.js ../build/vs/css.js
# vscode
cp ./src/vs/vscode.d.ts ../src/vs/vscode.d.ts
cp ./src/vs/vscode.d.ts ../build/vs/vscode.d.ts
# nls
cp ./src/vs/nls.d.ts ../src/vs/nls.d.ts
cp ./src/vs/nls.d.ts ../build/vs/nls.d.ts
cp ./src/vs/nls.js ../build/vs/nls.js
# winjs
cp ./src/vs/base/common/winjs.base.d.ts ../build/vs/base/common/winjs.base.d.ts
cp ./src/vs/base/common/winjs.base.js ../build/vs/base/common/winjs.base.js
cp ./src/vs/base/common/winjs.base.raw.js ../build/vs/base/common/winjs.base.raw.js
# marked
cp -r ./src/vs/base/common/marked ../build/vs/base/common

# Do pre build modifications
../node_modules/.bin/tsc -p ../extensions/tsconfig.json
node ../extensions/preBuild.js

# Build using tsc
../node_modules/.bin/tsc -p ../src/tsconfig.json

# Do post build modifications
node ../extensions/postBuild.js

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
