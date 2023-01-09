import validate from './validate.js';

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

export function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  let uuid = '';
  uuid += byteToHex[arr[offset + 0]];
  uuid += byteToHex[arr[offset + 1]];
  uuid += byteToHex[arr[offset + 2]];
  uuid += byteToHex[arr[offset + 3]];
  uuid += '-';
  uuid += byteToHex[arr[offset + 4]];
  uuid += byteToHex[arr[offset + 5]];
  uuid += '-';
  uuid += byteToHex[arr[offset + 6]];
  uuid += byteToHex[arr[offset + 7]];
  uuid += '-';
  uuid += byteToHex[arr[offset + 8]];
  uuid += byteToHex[arr[offset + 9]];
  uuid += '-';
  uuid += byteToHex[arr[offset + 10]];
  uuid += byteToHex[arr[offset + 11]];
  uuid += byteToHex[arr[offset + 12]];
  uuid += byteToHex[arr[offset + 13]];
  uuid += byteToHex[arr[offset + 14]];
  uuid += byteToHex[arr[offset + 15]];
  return uuid.toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset);
  // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields
  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

export default stringify;
