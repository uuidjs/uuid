import parse from './parse.js';
import rng from './rng.js';
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
export default function v1tov6(uuid, randomize = false) {
  if (version(uuid) !== 1) {
    throw new Error('id is not a valid v1 UUID');
  }

  const v1Bytes = parse(uuid);

  if (randomize) {
    const rnds = rng();
    v1Bytes[8] = (rnds[0] & 0x3f) | 0x80;
    v1Bytes[9] = rnds[1];
    v1Bytes[10] = rnds[2];
    v1Bytes[11] = rnds[3];
    v1Bytes[12] = rnds[4];
    v1Bytes[13] = rnds[5];
    v1Bytes[14] = rnds[6];
    v1Bytes[15] = rnds[7];
  }

  const v6Bytes = Uint8Array.from([
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
    v1Bytes[15],
  ]);

  return stringify(v6Bytes);
}
