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
export default function v6(options, buf, offset = 0) {
  // v6 is just a v1 UUID with different field layout.
  let bytes = v1(options, new Uint8Array(16));

  // Reorder the fields to v6 layout.  Per RFC9562, we randomize the clock_seq
  // and node fields for each UUID.  Randomize node and clock_seq here to get
  // the RFC-recommended behavior (we restore these below if they're provided in
  // options.)
  bytes = v1ToV6(bytes, true);

  // Apply options.clockseq?
  const clockseq = options?.clockseq;
  if (clockseq !== undefined) {
    bytes[8] = ((clockseq >> 8) & 0x3f) | 0x80;
    bytes[9] = clockseq & 0xff;
  }

  // Apply options.node?
  const node = options?.node;
  if (node !== undefined) {
    for (let i = 0; i < 6; i++) {
      bytes[10 + i] = node[i];
    }
  }

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
