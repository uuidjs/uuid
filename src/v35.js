import bytesToUuid from './bytesToUuid.js';

function fillBytesFromStr(buf, start, strBytes) {
  for (let i = 0; i < strBytes.length; i += 2) {
    buf[(i >> 1) + start] = parseInt(strBytes.slice(i, i + 2), 16);
  }
}

function uuidToBytes(uuid) {
  // Note: We assume we're being passed a valid uuid string
  const bytes = new Uint8Array(16);

  const parts = uuid.split('-');

  if (parts.length === 5) {
    const [chunk1, chunk2, chunk3, chunk4, chunk5] = parts;

    if (
      chunk1.length === 8 &&
      chunk2.length === 4 &&
      chunk3.length === 4 &&
      chunk4.length === 4 &&
      chunk5.length === 12
    ) {
      fillBytesFromStr(bytes, 0, chunk1);
      fillBytesFromStr(bytes, 4, chunk2);
      fillBytesFromStr(bytes, 6, chunk3);
      fillBytesFromStr(bytes, 8, chunk4);
      fillBytesFromStr(bytes, 10, chunk5);

      return bytes;
    }
  }

  throw TypeError('namespace must be valid uuid string');
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = new Uint8Array(str.length);

  for (let i = 0; i < str.length; ++i) {
    bytes[i] = str.charCodeAt(i);
  }

  return bytes;
}

// Uint8Array.from for ie11
function arrayToUint8(source) {
  if (typeof Uint8Array.from === 'function') {
    return Uint8Array.from(source);
  }

  const arr = new Uint8Array(source.length);

  for (let i = 0; i < source.length; ++i) {
    arr[i] = source[i];
  }

  return arr;
}

export const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
export const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';

export default function (name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    const start = (buf && offset) || 0;

    if (typeof value === 'string') {
      value = stringToBytes(value);
    } else if (Array.isArray(value)) {
      value = arrayToUint8(value);
    }

    if (typeof namespace === 'string') {
      namespace = uuidToBytes(namespace);
    } else if (Array.isArray(namespace)) {
      namespace = arrayToUint8(namespace);
    }

    if (!(value instanceof Uint8Array)) {
      throw TypeError('value must be an array of bytes');
    }

    if (!(namespace instanceof Uint8Array) || namespace.length !== 16) {
      throw TypeError('namespace must be uuid string or an Array of 16 byte values');
    }

    const val = new Uint8Array(namespace.length + value.length);
    val.set(namespace);
    val.set(value, namespace.length);

    // Per 4.3
    const bytes = hashfunc(val);
    bytes[6] = (bytes[6] & 0x0f) | version;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    if (buf) {
      for (let idx = 0; idx < 16; ++idx) {
        buf[start + idx] = bytes[idx];
      }
    }

    return buf || bytesToUuid(bytes);
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
