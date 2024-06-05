import { unsafeStringify } from './stringify.js';
import v1 from './v1.js';
import v1ToV6 from './v1ToV6.js';

/**
 *
 * @param {object} options
 * @param {Uint8Array=} buf
 * @param {number=} offset
 * @returns
 */
export default function v6(options = {}, buf, offset = 0) {
  // v6 is v1 with different field layout, so we start with a v1 UUID.
  let bytes = v1({ ...options, _v6: true }, new Uint8Array(16));

  // Reorder the fields to v6 layout.  Per RFC9562, we randomize the clock_seq
  // and node fields for each UUID.  Randomize node and clock_seq here to get
  // the RFC-recommended behavior (we restore these below if they're provided in
  // options.)
  bytes = v1ToV6(bytes);

  if (buf) {
    // Copy to buffer
    for (let i = 0; i < 16; i++) {
      buf[offset + i] = bytes[i];
    }
    return buf;
  }

  // Otherwise return UUID as a string
  return unsafeStringify(bytes);
}
