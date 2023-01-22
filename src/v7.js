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

  // rnds is Uint8Array(16) filled with random bytes
  const rnds = options.random || (options.rng || rng)();

  // initialize buffer and pointer
  let i = (buf && offset) || 0;
  const b = buf || new Uint8Array(16);

  // [bytes 0-5] 48 bits of timestamp
  b[i++] = (msecs / 0x10000000000) & 0xff;
  b[i++] = (msecs / 0x100000000) & 0xff;
  b[i++] = (msecs / 0x1000000) & 0xff;
  b[i++] = (msecs / 0x10000) & 0xff;
  b[i++] = (msecs / 0x100) & 0xff;
  b[i++] = msecs & 0xff;

  // [byte 6] - set 4 bits of version (7)
  b[i++] = (rnds[6] & 0x0f) | 0x70;

  // [byte 7] - set 8 bits of random
  b[i++] = rnds[7];

  // [byte 8] - Per RFC4122 4.1.1, set the variant (2 bits)
  b[i++] = (rnds[8] & 0x3f) | 0x80;

  // [bytes 9-16] populate with random bytes
  for (let n = 0; n < 7; ++n) {
    b[i + n] = rnds[n + 9];
  }

  return buf || unsafeStringify(b);
}

export default v7;
