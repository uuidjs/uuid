#!/bin/bash -eu

# This script generates the following builds:
# - dist: ESM build for Node.js
# - dist-browser: ESM build for the Browser

set -e # exit on error

# Change to project root
ROOT=$(builtin cd $(pwd)/$(dirname "$0")/..; pwd)

# Prep TS output dir
NODE_DIST_DIR="$ROOT/dist"
BROWSER_DIST_DIR="$ROOT/dist-browser"
echo "Building in $NODE_DIST_DIR and $BROWSER_DIST_DIR"

cd "$ROOT" || exit 1

rm -rf "$NODE_DIST_DIR" "$BROWSER_DIST_DIR"
mkdir -p "$NODE_DIST_DIR"

# Build each module type
echo "Compiling TypeScript files to $NODE_DIST_DIR"

tsc -p tsconfig.json

# Clone files for browser builds
cp -pr "$NODE_DIST_DIR" "$BROWSER_DIST_DIR"

# Remove browser files from non-browser builds
for FILE in ${NODE_DIST_DIR}/*-browser*; do
  rm -f $FILE
done

# Move browser files into place for browser builds
(
  # Temporarily cd into BROWSER_DIST_DIR to avoid having to deal with
  # "-browser" appearing in both the dir name and file name of FILE's full
  # path
  cd "$BROWSER_DIST_DIR"

  for FILE in *-browser*;do
    mv "$FILE" "${FILE/-browser/}"
  done

  # Remove type definitions
  find . -name '*.d.ts' -exec rm -f {} \;
)

# Copy bin files to dist
cp -pr "$NODE_DIST_DIR/../src/bin" "$NODE_DIST_DIR"

if [ "${1-}" != "--no-pack" ]; then
  # Prep tarball dir
  BUILD_DIR="$ROOT/.build"
  rm -rf "$BUILD_DIR"
  mkdir -p "$BUILD_DIR"

  # Create tarball for local installation (in tests and examples)
  echo "Packing tarball"
  npm pack --pack-destination "$BUILD_DIR" > /dev/null 2>&1
  mv $BUILD_DIR/uuid-*.tgz $BUILD_DIR/uuid.tgz
fi

echo "-- fin --"