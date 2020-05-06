import bytesToUuid from './bytesToUuid.js';

function hexSymToDecNum(n) {
  // ------ 0 -------- 9
  if (n >= 48 && n <= 57) {
    return n - 48;
  }
  // ----------- A -------- F
  else if (n >= 65 && n <= 70) {
    return n - 55;
  }
  // ----------- a -------- f
  else if (n >= 97 && n <= 102) {
    return n - 87;
  }

  return -1;
}

/**
 * Validate and parse UUID to bytes array
 */
function uuidToBytes(uuid) {
  const bytes = [];

  if (uuid.length === 36) {
    for (let i = 0; i < uuid.length; ++i) {
      let h = uuid.charCodeAt(i);

      if (i === 8 || i === 13 || i === 18 || i === 23) {
        // ----- '-'
        if (h === 45) {
          continue;
        } else {
          return [];
        }
      }

      const l = hexSymToDecNum(uuid.charCodeAt(i + 1));
      h = hexSymToDecNum(h);

      if (l === -1 || h === -1) {
        return [];
      }

      bytes.push(h * 16 + l);

      ++i;
    }
  }

  return bytes;
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
      const start = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[start + i] = bytes[i];
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
