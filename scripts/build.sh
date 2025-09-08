#!/bin/bash -eu

# This script generates 4 builds, as follows:
# - dist: ESM build for the Browser
# - dist-node: ESM build for Node.js
#
# Note: that the "preferred" build for testing (local and CI) is the ESM build,
# except where we specifically test the other builds

set -e # exit on error

# Change to project root
ROOT=$(builtin cd $(pwd)/$(dirname "$0")/..; pwd)

# Prep TS output dir
DIST_DIR="$ROOT/dist"
NODE_DIST_DIR="$ROOT/dist-node"
echo "Building in $DIST_DIR and $NODE_DIST_DIR"

cd "$ROOT" || exit 1

# Remove old builds
rm -rf $DIST_DIR*

# Make default dist dir
mkdir -p "$DIST_DIR"

# Compile typescript
echo "Compiling TypeScript files to $NODE_DIST_DIR"
tsc -p tsconfig.json

# Clone files for node builds
cp -pr "$DIST_DIR" "$NODE_DIST_DIR"

# Remove browser files in node build
for FILE in ${NODE_DIST_DIR}/*-browser*; do
  rm -f $FILE
done

# Move browser files into place for default build
(
  cd "$DIST_DIR"

  for FILE in *-browser*;do
    mv "$FILE" "${FILE/-browser/}"
  done
)

# Remove type definition files where they're not needed
(
  cd "$NODE_DIST_DIR"
  find . -name '*.d.ts' -exec rm -f {} \;
)

# Copy bin files into place
cp -pr "$ROOT/src/bin" "$NODE_DIST_DIR"

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