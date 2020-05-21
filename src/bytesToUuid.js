/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const bth = [];

for (let i = 0; i < 256; ++i) {
  bth.push((i + 0x100).toString(16).substr(1));
}

function bytesToUuid(buf, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (
    bth[buf[offset + 0]] +
    bth[buf[offset + 1]] +
    bth[buf[offset + 2]] +
    bth[buf[offset + 3]] +
    '-' +
    bth[buf[offset + 4]] +
    bth[buf[offset + 5]] +
    '-' +
    bth[buf[offset + 6]] +
    bth[buf[offset + 7]] +
    '-' +
    bth[buf[offset + 8]] +
    bth[buf[offset + 9]] +
    '-' +
    bth[buf[offset + 10]] +
    bth[buf[offset + 11]] +
    bth[buf[offset + 12]] +
    bth[buf[offset + 13]] +
    bth[buf[offset + 14]] +
    bth[buf[offset + 15]]
  ).toLowerCase();
}

export default bytesToUuid;
