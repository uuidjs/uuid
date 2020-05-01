/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function bytesToUuid(buf, offset) {
  const i = offset || 0;

  const bth = byteToHex;

  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return (
    bth[buf[i + 0]] +
    bth[buf[i + 1]] +
    bth[buf[i + 2]] +
    bth[buf[i + 3]] +
    '-' +
    bth[buf[i + 4]] +
    bth[buf[i + 5]] +
    '-' +
    bth[buf[i + 6]] +
    bth[buf[i + 7]] +
    '-' +
    bth[buf[i + 8]] +
    bth[buf[i + 9]] +
    '-' +
    bth[buf[i + 10]] +
    bth[buf[i + 11]] +
    bth[buf[i + 12]] +
    bth[buf[i + 13]] +
    bth[buf[i + 14]] +
    bth[buf[i + 15]]
  ).toLowerCase();
}

export default bytesToUuid;
