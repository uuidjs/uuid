#!/bin/bash -eu

# cd to the root dir
ROOT="$(pwd)/$(dirname "$0")/.."
cd "$ROOT" || exit 1

DIR="$ROOT/dist"

# Clean up output dir
rm -rf "$DIR"
mkdir -p "$DIR"

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
  for FILE in ${BROWSER_DIR}/*-browser*;do
    mv $FILE ${FILE/-browser/}
  done

  # If MODULE_TYPE is esm, copy bin files to dist
  if [ "$MODULE_TYPE" = "esm" ]; then
    cp -pr "$DIR/../src/bin" "$DIST_DIR"
  fi
done

echo "-- fin --"