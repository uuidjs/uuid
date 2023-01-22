import rng from './rng.js';
import { unsafeStringify } from './stringify.js';

/**
 * UUID V7 - Unix Epoch time-based UUID
 *
 * The IETF has introduced a draft to update RFC4122, introducing 3 new
 * UUID versions (6,7,8). This implementation of V7 is based on the accepted,
 * though not yet approved, revisions.
 *
 * RFC 4122: https://www.ietf.org/rfc/rfc4122.html
 * [DRAFT] Updated RFC 4122: https://github.com/ietf-wg-uuidrev/rfc4122bis
 *
 * Sample V7 value: https://ietf-wg-uuidrev.github.io/rfc4122bis/draft-00/draft-ietf-uuidrev-rfc4122bis.html#name-example-of-a-uuidv7-value
 */

function v7(options, buf, offset) {
  options = options || {};

  // milliseconds since unix epoch, 1970-01-01 00:00
  const msecs = options.msecs !== undefined ? options.msecs : Date.now();

  // rands is Uint8Array(16) filled with random bytes
  const rnds = options.random || (options.rng || rng)();

  // 48 bits of timestamp
  rnds[0] = (msecs / 0x10000000000) & 0xff;
  rnds[1] = (msecs / 0x100000000) & 0xff;
  rnds[2] = (msecs / 0x1000000) & 0xff;
  rnds[3] = (msecs / 0x10000) & 0xff;
  rnds[4] = (msecs / 0x100) & 0xff;
  rnds[5] = msecs & 0xff;

  // set version (7)
  rnds[6] = (rnds[6] & 0x0f) | 0x70;

  // Per RFC4122 4.1.1, set the variant
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

export default v7;
