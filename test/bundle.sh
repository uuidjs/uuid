#!/bin/bash

set -eu

projectdir=$(dirname "$0")/..
cd "$projectdir"
browserify=$(npm bin)/browserify;

# duplicates the functionality of https://wzrd.in
set -x
"$browserify" --standalone uuid index.js > test/specs/index.bundle.js
