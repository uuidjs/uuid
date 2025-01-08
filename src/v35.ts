import { UUIDTypes } from './types.js';
import parse from './parse.js';
import { unsafeStringify } from './stringify.js';

/**
 * Converts a string to a Uint8Array.
 *
 * @param str - The string to convert.
 * @returns A Uint8Array representing the binary form of the string.
 */
export function stringToBytes(str: string): Uint8Array {
  // TODO: Use TextEncoder (see https://stackoverflow.com/a/48762658/109538)
  str = unescape(encodeURIComponent(str));

  const bytes = new Uint8Array(str.length);

  for (let i = 0; i < str.length; ++i) {
    bytes[i] = str.charCodeAt(i);
  }

  return bytes;
}

export const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
export const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';

type HashFunction = (bytes: Uint8Array) => Uint8Array;

/**
 * Generates a version 3 or 5 UUID based on the provided parameters.
 *
 * @param version - The UUID version (0x30 for v3, 0x50 for v5).
 * @param hash - The hash function to use.
 * @param value - The value to hash.
 * @param namespace - The namespace UUID.
 * @param buf - Optional buffer to write the UUID into.
 * @param offset - Optional offset in the buffer.
 * @returns A string representation of the UUID or a Uint8Array if a buffer is provided.
 */
export default function v35(
  version: 0x30 | 0x50,
  hash: HashFunction,
  value: string | Uint8Array,
  namespace: UUIDTypes,
  buf?: Uint8Array,
  offset?: number
): string | Uint8Array {
  const valueBytes: Uint8Array = typeof value === 'string' ? stringToBytes(value) : value;
  const namespaceBytes: Uint8Array = typeof namespace === 'string' ? parse(namespace) : namespace;

  if (typeof namespace === 'string') {
    namespace = parse(namespace);
  }

  if (namespace?.length !== 16) {
    throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
  }

  // Compute hash of namespace and value, Per 4.3
  // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
  // hashfunc([...namespace, ... value])`
  let bytes = new Uint8Array(16 + valueBytes.length);
  bytes.set(namespaceBytes);
  bytes.set(valueBytes, namespaceBytes.length);
  bytes = hash(bytes);

  bytes[6] = (bytes[6] & 0x0f) | version;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = bytes[i];
    }

    return buf;
  }

  return unsafeStringify(bytes);
}
