#!/bin/bash -eu

# This script generates 4 builds, as follows:
# - dist/esm: ESM build for Node.js
# - dist/esm-browser: ESM build for the Browser
# - dist/cjs: CommonJS build for Node.js
# - dist/cjs-browser: CommonJS build for the Browser
#
# Note: that the "preferred" build for testing (local and CI) is the ESM build,
# except where we specifically test the other builds

# Change to project root
ROOT="$(pwd)/$(dirname "$0")/.."
cd "$ROOT" || exit 1

DIR="$ROOT/dist"

# Clean output dir
rm -rf "$DIR"
mkdir -p "$DIR"

# Build each module type
for MODULE_TYPE in esm cjs; do
  echo "Building ${MODULE_TYPE}"

  DIST_DIR="$DIR/${MODULE_TYPE}"
  BROWSER_DIR="$DIR/${MODULE_TYPE}-browser"

  tsc -p tsconfig.${MODULE_TYPE}.json

  # Clone files for browser builds
  cp -pr ${DIST_DIR} ${BROWSER_DIR}

  # Remove browser files from non-browser builds
  for FILE in ${DIST_DIR}/*-browser*;do
    rm -f $FILE
  done

  # Move browser files into place for browser builds
  (
    # Temporarily cd into BROWSER_DIR to avoid having to deal with "-browser"
    # appearing in both the dir name and file name of FILE's full path
    cd ${BROWSER_DIR}

    for FILE in *-browser*;do
      mv $FILE ${FILE/-browser/}
    done
  )

  # esm/cjs-specific logic
  if [ "$MODULE_TYPE" = "esm" ]; then
    # ESM: copy bin files to dist
    cp -pr "$DIR/../src/bin" "$DIST_DIR"
  else
    # CJS: Add package.json that specifies type: commonjs
    echo "{\"type\":\"commonjs\"}" > "$DIST_DIR/package.json"
    echo "{\"type\":\"commonjs\"}" > "$BROWSER_DIR/package.json"
  fi
done

echo "-- fin --"