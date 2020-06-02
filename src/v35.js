import bytesToUuid from './bytesToUuid.js';
import validate from './validate.js';

function uuidToBytes(uuid) {
  if (!validate(uuid)) {
    return [];
  }

  let v;
  return [
    // Parse ########-....-....-....-............
    (v = parseInt(uuid.slice(0, 8), 16)) >> 24,
    (v >> 16) & 0xff,
    (v >> 8) & 0xff,
    v & 0xff,

    // Parse ........-####-....-....-............
    (v = parseInt(uuid.slice(9, 13), 16)) >> 8,
    v & 0xff,

    // Parse ........-....-####-....-............
    (v = parseInt(uuid.slice(14, 18), 16)) >> 8,
    v & 0xff,

    // Parse ........-....-....-####-............
    (v = parseInt(uuid.slice(19, 23), 16)) >> 8,
    v & 0xff,

    // Parse ........-....-....-....-############
    // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
    ((v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000) & 0xff,
    (v / 0x100000000) & 0xff,
    (v >> 24) & 0xff,
    (v >> 16) & 0xff,
    (v >> 8) & 0xff,
    v & 0xff,
  ];
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

export const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
export const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';

export default function (name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = uuidToBytes(namespace);
    }

    if (!Array.isArray(value)) {
      throw TypeError('value must be an array of bytes');
    }

    if (!Array.isArray(namespace) || namespace.length !== 16) {
      throw TypeError('namespace must be uuid string or an Array of 16 byte values');
    }

    // Per 4.3
    const bytes = hashfunc(namespace.concat(value));
    bytes[6] = (bytes[6] & 0x0f) | version;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return bytesToUuid(bytes);
  }

  // Function#name is not settable on some platforms (#270)
  try {
    generateUUID.name = name;
    // eslint-disable-next-line no-empty
  } catch (err) {}

  // For CommonJS default export support
  generateUUID.DNS = DNS;
  generateUUID.URL = URL;

  return generateUUID;
}
