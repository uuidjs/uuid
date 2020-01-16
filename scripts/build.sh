#!/bin/bash -eu

# Mostly taken from:
# https://github.com/date-fns/date-fns/blob/master/scripts/build/package.sh
# and
# https://medium.com/@iamstan/tips-for-writing-es-modules-in-node-js-96ec688615a4

# cd to the root dir
ROOT="$(pwd)/$(dirname "$0")/.."
cd "$ROOT" || exit 1

PATH="$(npm bin):$PATH"
# XXX: $PACKAGE_OUTPUT_PATH must be an absolute path!
DIR=${PACKAGE_OUTPUT_PATH:-"$ROOT/dist"}

# Clean up output dir
rm -rf "$DIR"
mkdir -p "$DIR"

# Transpile CommonJS versions of files
babel --env-name commonjs src --source-root src --out-dir "$DIR" --copy-files --quiet

# Transpile ESM versions of files for the browser
babel --env-name esm src --source-root src --out-dir "$DIR/esm-browser" --copy-files --quiet

# No need to have the CLI files in the esm build
rm -rf "$DIR/esm-browser/bin"
rm -rf "$DIR/esm-browser/uuid-bin.js"

for FILE in "$DIR"/esm-browser/*-browser.js
do
    echo "Replacing node-specific file for esm-browser: $FILE"
    mv "$FILE" "${FILE/-browser.js/.js}"
done

echo "Removing browser-specific files from esm-node"
rm -f "$DIR"/*-browser.js

# Copy basic files
for PATTERN in package.json \
  CHANGELOG.md \
  LICENSE.md \
  README.md
do
  cp -r "$PATTERN" "$DIR"
done
