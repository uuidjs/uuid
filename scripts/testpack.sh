#!/bin/bash -eu

# cd to the root dir
ROOT="$(pwd)/$(dirname "$0")/.."
cd "$ROOT" || exit 1

npm pack

mkdir -p ../test-pack

cp examples/node-commonjs/example.js ../test-pack/commonjs.js
cp examples/node-esmodules/example.mjs ../test-pack/esmodules.mjs

cd ../test-pack

npm init -y

npm install ../uuid/uuid-*.tgz

node commonjs.js
node esmodules.mjs
