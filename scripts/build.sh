#!/bin/bash -eu

# cd to the root dir
ROOT="$(pwd)/$(dirname "$0")/.."
cd "$ROOT" || exit 1

PATH="$(npm bin):$PATH"
DIR="$ROOT/dist"

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
