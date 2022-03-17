#!/bin/bash -eu

# cd to the root dir
ROOT="$(pwd)/$(dirname "$0")/.."
cd "$ROOT" || exit 1

npm pack

mkdir -p ../test-pack

cp examples/node-commonjs/example.js ../test-pack/commonjs.js
cp examples/node-esmodules/example.mjs ../test-pack/esmodules.mjs
cp examples/node-esmodules/package.mjs ../test-pack/esmodules-package.mjs

cd ../test-pack

npm init -y

npm install ../uuid/uuid-*.tgz

node commonjs.js
node esmodules.mjs

# Support for json esm imports requires import assertions starting in Node.js v16.14.0 which were
# not supported in earlier versions. Therefore we restrict the ESM test to more recent versions of
# Node.js:
( node --version | grep -vq 'v16' ) || ( node --experimental-json-modules esmodules-package.mjs )
