#!/bin/bash -eu

# cd to the root dir
ROOT="$(pwd)/$(dirname "$0")/.."
cd "$ROOT" || exit 1

DIR="$ROOT/dist"

# Clean up output dir
rm -rf "$DIR"
mkdir -p "$DIR"

# We ship 4 builds of this library: ESM and CommonJS, each for Node.js and the Browser.
# In ./src, code that uses browser APIs lives in `-browser.js` files, while code for node APIs
# lives in files without suffix.
# For historical reasons, the Node.js CommonJS build lives in the top level ./dist directory while
# the other 3 builds live in their respective ./dist/{commonjs,esm}-{node,browser}/ subdirectories.
#
# The code below produces this layout:
#
#   dist (<-- the commonjs-node build)
#   ├── commonjs-browser
#   ├── esm-node
#   ├── esm-node
#   └── bin (<-- Node.js CLI)

# Transpile CommonJS versions of files for node
npx babel --env-name commonjsNode src --source-root src --out-dir "$DIR" --copy-files --quiet

# Transpile CommonJS versions of files for the browser
npx babel --env-name commonjsBrowser src --source-root src --out-dir "$DIR/commonjs-browser" \
    --copy-files --quiet

# Transpile ESM versions of files for the browser
npx babel --env-name esmBrowser src --source-root src --out-dir "$DIR/esm-browser" --copy-files --quiet

# Transpile ESM versions of files for node
npx babel --env-name esmNode src --source-root src --out-dir "$DIR/esm-node" --copy-files --quiet

# No need to have the CLI files in the esm build
rm -rf "$DIR/commonjs-browser/bin"
rm -rf "$DIR/commonjs-browser/uuid-bin.js"
rm -rf "$DIR/esm-browser/bin"
rm -rf "$DIR/esm-browser/uuid-bin.js"
rm -rf "$DIR/esm-node/bin"
rm -rf "$DIR/esm-node/uuid-bin.js"

for FILE in "$DIR"/commonjs-browser/*-browser.js
do
    echo "Replacing node-specific file for commonjs-browser: $FILE"
    mv "$FILE" "${FILE/-browser.js/.js}"
done

for FILE in "$DIR"/esm-browser/*-browser.js
do
    echo "Replacing node-specific file for esm-browser: $FILE"
    mv "$FILE" "${FILE/-browser.js/.js}"
done

echo "Removing browser-specific files from esm-node"
rm -f "$DIR"/esm-node/*-browser.js
