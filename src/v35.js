import bytesToUuid from './bytesToUuid.js';

/**
 * Validate RFC4122 UUID
 */
function validateUuidBytes(bytes) {
  if (!Array.isArray(bytes) || bytes.length !== 16) {
    return false;
  }

  const version = bytes[6] >> 4;

  if (version < 1 || version > 5) {
    // Check to nil uuid '00000000-0000-0000-0000-000000000000'
    for (let i = 0; i < 16; ++i) {
      if (bytes[i] > 0) {
        throw new TypeError('UUID version must be 1-5');
      }
    }

    return true;
  }

  const variant = bytes[8] >> 5;

  if (variant < 4 || variant > 5) {
    throw new TypeError('UUID variant must be 4 or 5');
  }

  return true;
}

function hexSymToDecNum(n) {
  // ------ 0 -------- 9
  if (n >= 48 && n <= 57) {
    return n - 48;
  }
  // ----------- A -------- F
  if (n >= 65 && n <= 70) {
    return n - 55;
  }
  // ----------- a -------- f
  if (n >= 97 && n <= 102) {
    return n - 87;
  }

  return -1;
}

/**
 * Parse UUID to bytes array
 */
function uuidToBytes(uuid) {
  const bytes = [];

  if (uuid.length !== 36) {
    return bytes;
  }

  for (let i = 0; i < 36; ++i) {
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
      throw TypeError('value must be string or an Array of bytes');
    }

    if (!validateUuidBytes(namespace)) {
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
  } catch (err) {}

  // For CommonJS default export support
  generateUUID.DNS = DNS;
  generateUUID.URL = URL;

  return generateUUID;
}
