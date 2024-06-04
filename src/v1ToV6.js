import parse from './parse.js';
import rng from './rng.js';
import { unsafeStringify } from './stringify.js';

/**
 * Convert a v1 UUID to a v6 UUID
 *
 * Note: Per https://www.rfc-editor.org/rfc/rfc9562.html#section-5.6-4, the
 * clock_seq and node fields SHOULD be set to random values for each new v6 UUID
 * to aid in collision resistance and security.  This function does not do this
 * by default, however, for two reasons:
 *
 * 1. Doing so makes the conversion non-reversible.  I.e. `v6ToV1(v1ToV6(uuid))
 *    !== uuid`.
 * 2. Doing so makes the conversion non-deterministic.  I.e. `v1ToV6(uuid) !==
 *    v1ToV6(uuid)`
 *
 * Callers needing the RFC-recommended randomization can enable this by passing
 * `true` for the `randomize` argument.
 *
 * @param {string|Uint8Array} uuid - The v1 UUID to convert to v6
 * @param {boolean} [randomize=false] - Whether to randomize the clock_seq and
 * node fields
 * @returns {string|Uint8Array} The v6 UUID as a string or Uint8Array
 */
export default function v1ToV6(uuid, randomize = false) {
  // Non-string UUIDs are documented as being Uint8Arrays, but we don't enforce
  // that.  They just need to be "array-like".  And some day when we port this
  // to TypeScript we'll have to take an actual stance on this.
  const v1Bytes = typeof uuid === 'string' ? parse(uuid) : uuid;

  const v6Bytes = _v1ToV6(v1Bytes);

  if (randomize) {
    const rnds = rng();
    v6Bytes[8] = (rnds[0] & 0x3f) | 0x80;
    v6Bytes[9] = rnds[1];
    v6Bytes[10] = rnds[2];
    v6Bytes[11] = rnds[3];
    v6Bytes[12] = rnds[4];
    v6Bytes[13] = rnds[5];
    v6Bytes[14] = rnds[6];
    v6Bytes[15] = rnds[7];
  }
  return typeof uuid === 'string' ? unsafeStringify(v6Bytes) : v6Bytes;
}

// Do the field transformation needed for v1 -> v6
function _v1ToV6(v1Bytes, randomize = false) {
  return Uint8Array.of(
    ((v1Bytes[6] & 0x0f) << 4) | ((v1Bytes[7] >> 4) & 0x0f),
    ((v1Bytes[7] & 0x0f) << 4) | ((v1Bytes[4] & 0xf0) >> 4),
    ((v1Bytes[4] & 0x0f) << 4) | ((v1Bytes[5] & 0xf0) >> 4),
    ((v1Bytes[5] & 0x0f) << 4) | ((v1Bytes[0] & 0xf0) >> 4),

    ((v1Bytes[0] & 0x0f) << 4) | ((v1Bytes[1] & 0xf0) >> 4),
    ((v1Bytes[1] & 0x0f) << 4) | ((v1Bytes[2] & 0xf0) >> 4),

    0x60 | (v1Bytes[2] & 0x0f),
    v1Bytes[3],

    v1Bytes[8],
    v1Bytes[9],
    v1Bytes[10],
    v1Bytes[11],
    v1Bytes[12],
    v1Bytes[13],
    v1Bytes[14],
    v1Bytes[15]
  );
}
