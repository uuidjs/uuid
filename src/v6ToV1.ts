import { UUIDTypes } from './types.js';
import parse from './parse.js';
import { unsafeStringify } from './stringify.js';

/**
 * Convert a v6 UUID to a v1 UUID
 *
 * @param {string|Uint8Array} uuid - The v6 UUID to convert to v6
 * @returns {string|Uint8Array} The v1 UUID as the same type as the `uuid` arg
 * (string or Uint8Array)
 */
export default function v6ToV1(uuid: string): string;
export default function v6ToV1(uuid: Uint8Array): Uint8Array;
export default function v6ToV1(uuid: UUIDTypes): UUIDTypes {
  const v6Bytes = typeof uuid === 'string' ? parse(uuid) : uuid;

  const v1Bytes = _v6ToV1(v6Bytes);

  return typeof uuid === 'string' ? unsafeStringify(v1Bytes) : v1Bytes;
}

// Do the field transformation needed for v6 -> v1
function _v6ToV1(v6Bytes: Uint8Array) {
  const result = new Uint8Array(16);

  result[0] = ((v6Bytes[3] & 0x0f) << 4) | ((v6Bytes[4] >> 4) & 0x0f);
  result[1] = ((v6Bytes[4] & 0x0f) << 4) | ((v6Bytes[5] & 0xf0) >> 4);
  result[2] = ((v6Bytes[5] & 0x0f) << 4) | (v6Bytes[6] & 0x0f);
  result[3] = v6Bytes[7];

  result[4] = ((v6Bytes[1] & 0x0f) << 4) | ((v6Bytes[2] & 0xf0) >> 4);
  result[5] = ((v6Bytes[2] & 0x0f) << 4) | ((v6Bytes[3] & 0xf0) >> 4);

  result[6] = 0x10 | ((v6Bytes[0] & 0xf0) >> 4);
  result[7] = ((v6Bytes[0] & 0x0f) << 4) | ((v6Bytes[1] & 0xf0) >> 4);

  result[8] = v6Bytes[8];
  result[9] = v6Bytes[9];
  result[10] = v6Bytes[10];
  result[11] = v6Bytes[11];
  result[12] = v6Bytes[12];
  result[13] = v6Bytes[13];
  result[14] = v6Bytes[14];
  result[15] = v6Bytes[15];

  return result;
}
