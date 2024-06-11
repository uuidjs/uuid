#!/bin/bash -eu

# cd to the root dir
ROOT="$(pwd)/$(dirname "$0")/.."
cd "$ROOT" || exit 1

DIR="$ROOT/dist"

# Clean up output dir
rm -rf "$DIR"
mkdir -p "$DIR"

# Build CKS version
tsc -p tsconfig.cjs.json

# Build ESM version
tsc -p tsconfig.esm.json

# Copy CLI files
cp -pr "$DIR/../src/bin" "$DIR/esm"
