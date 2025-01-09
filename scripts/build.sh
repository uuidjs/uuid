#!/bin/bash -eu

# This script generates 4 builds, as follows:
# - dist/esm: ESM build for Node.js
# - dist/esm-browser: ESM build for the Browser
# - dist/cjs: CommonJS build for Node.js
# - dist/cjs-browser: CommonJS build for the Browser
#
# Note: that the "preferred" build for testing (local and CI) is the ESM build,
# except where we specifically test the other builds

set -e # exit on error

# Change to project root
ROOT="$(pwd)/$(dirname "$0")/.."
cd "$ROOT" || exit 1

# Prep TS output dir
DIST_DIR="$ROOT/dist"
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

# Build each module type
for MODULE_TYPE in esm cjs; do
  echo "Building ${MODULE_TYPE}"

  NODE_DIST_DIR="$DIST_DIR/${MODULE_TYPE}"
  BROWSER_DIST_DIR="$DIST_DIR/${MODULE_TYPE}-browser"

  tsc -p tsconfig.${MODULE_TYPE}.json

  # Clone files for browser builds
  cp -pr ${NODE_DIST_DIR} ${BROWSER_DIST_DIR}

  # Remove browser files from non-browser builds
  for FILE in ${NODE_DIST_DIR}/*-browser*;do
    rm -f $FILE
  done

  # Move browser files into place for browser builds
  (
    # Temporarily cd into BROWSER_DIST_DIR to avoid having to deal with
    # "-browser" appearing in both the dir name and file name of FILE's full
    # path
    cd ${BROWSER_DIST_DIR}

    for FILE in *-browser*;do
      mv $FILE ${FILE/-browser/}
    done
  )

  # esm/cjs-specific logic
  if [ "$MODULE_TYPE" = "esm" ]; then
    # ESM: copy bin files to dist
    cp -pr "$DIST_DIR/../src/bin" "$NODE_DIST_DIR"
  else
    # CJS: Add package.json that specifies type: commonjs
    echo "{\"type\":\"commonjs\"}" > "$NODE_DIST_DIR/package.json"
    echo "{\"type\":\"commonjs\"}" > "$BROWSER_DIST_DIR/package.json"
  fi
done

if [ "${1-}" != "--no-pack" ]; then
  # Prep tarball dir
  BUILD_DIR="$ROOT/.build"
  mkdir -p "$BUILD_DIR"
  rm -rf "$BUILD_DIR/uuid-*.tgz"

  # Create tarball for local installation (in tests and examples)
  echo "Packing tarball"
  npm pack --pack-destination "$BUILD_DIR" > /dev/null 2>&1
  mv $BUILD_DIR/uuid-*.tgz $BUILD_DIR/uuid.tgz
fi

echo "-- fin --"