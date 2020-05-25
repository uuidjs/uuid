/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function bytesToUuid(buf, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (
    byteToHex[buf[offset + 0]] +
    byteToHex[buf[offset + 1]] +
    byteToHex[buf[offset + 2]] +
    byteToHex[buf[offset + 3]] +
    '-' +
    byteToHex[buf[offset + 4]] +
    byteToHex[buf[offset + 5]] +
    '-' +
    byteToHex[buf[offset + 6]] +
    byteToHex[buf[offset + 7]] +
    '-' +
    byteToHex[buf[offset + 8]] +
    byteToHex[buf[offset + 9]] +
    '-' +
    byteToHex[buf[offset + 10]] +
    byteToHex[buf[offset + 11]] +
    byteToHex[buf[offset + 12]] +
    byteToHex[buf[offset + 13]] +
    byteToHex[buf[offset + 14]] +
    byteToHex[buf[offset + 15]]
  ).toLowerCase();
}

export default bytesToUuid;
