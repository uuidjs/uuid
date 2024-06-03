import parse from './parse.js';
import stringify from './stringify.js';
import version from './version.js';

/**
 * Convert a v1 UUID to a v6 UUID.
 *
 * Note: Per https://www.rfc-editor.org/rfc/rfc9562.html#section-5.6-4, the
 * clock_seq and node fields SHOULD be randomized to aid in collision resistance
 * and security.  However. this behavior is not enabled by default for two reasons:
 *
 * 1. Doing so makes the conversion non-reversible.  I.e. `v6tov1(v1tov6(uuid))
 *    !== uuid`.
 * 2. Doing so makes the conversion non-deterministic.  I.e. `v1tov6(uuid) !==
 *    v1tov6(uuid)`
 *
 * Callers wishing to enable the RFC-recommended randomization can do so by
 * passing `true` for the second parameter.
 */
export default function v6tov1(uuid, randomize = false) {
  if (version(uuid) !== 6) {
    throw new Error('id is not a valid v6 UUID');
  }

  const v1Bytes = parse(uuid);

  const v6Bytes = Uint8Array.from([
    ((v1Bytes[3] & 0x0f) << 4) | ((v1Bytes[4] >> 4) & 0x0f),
    ((v1Bytes[4] & 0x0f) << 4) | ((v1Bytes[5] & 0xf0) >> 4),
    ((v1Bytes[5] & 0x0f) << 4) | (v1Bytes[6] & 0x0f),
    v1Bytes[7],

    ((v1Bytes[1] & 0x0f) << 4) | ((v1Bytes[2] & 0xf0) >> 4),
    ((v1Bytes[2] & 0x0f) << 4) | ((v1Bytes[3] & 0xf0) >> 4),

    0x10 | ((v1Bytes[0] & 0xf0) >> 4),
    ((v1Bytes[0] & 0x0f) << 4) | ((v1Bytes[1] & 0xf0) >> 4),

    v1Bytes[8],
    v1Bytes[9],
    v1Bytes[10],
    v1Bytes[11],
    v1Bytes[12],
    v1Bytes[13],
    v1Bytes[14],
    v1Bytes[15],
  ]);

  return stringify(v6Bytes);
}
