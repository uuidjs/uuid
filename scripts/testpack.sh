#!/bin/bash -eu

# cd to the root dir
ROOT="$(pwd)/$(dirname "$0")/.."
cd "$ROOT" || exit 1

TEST_DIR=$(mktemp -d)

mkdir -p ${TEST_DIR}

trap 'popd && rm -rf $TEST_DIR' EXIT

# Create package tarball
npm pack --pack-destination=${TEST_DIR}

# Set up a test project in the test directory
pushd ${TEST_DIR}
npm init -y
cp ${ROOT}/examples/node-commonjs/example.js commonjs.js
cp ${ROOT}/examples/node-esmodules/example.mjs esmodules.mjs
cp ${ROOT}/examples/node-esmodules/package.mjs esmodules-package.mjs

# Install the tarball
npm install uuid*.tgz

# Verify scripts that depend on package work
node commonjs.js
node esmodules.mjs

# Support for json esm imports requires import assertions starting in Node.js v16.14.0 which were
# not supported in earlier versions. Therefore we restrict the ESM test to more recent versions of
# Node.js:
( node --version | grep -vq 'v16' ) || ( node --experimental-json-modules esmodules-package.mjs )
