import { UUIDTypes, Version4Options } from './types.js';
import native from './native.js';
import rng from './rng.js';
import { unsafeStringify } from './stringify.js';

function v4(options?: Version4Options, buf?: undefined, offset?: number): string;
function v4(options: Version4Options | undefined, buf: Uint8Array, offset?: number): Uint8Array;
function v4(options?: Version4Options, buf?: Uint8Array, offset?: number): UUIDTypes {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }

  options = options || {};

  let rnds = options.random || (options.rng || rng)();
  if (rnds.length < 16) {
    const newRnds = new Uint8Array(16);
    for (let i = 0; i < 16; i++) {
      newRnds[i] = rnds[i] ?? Math.floor(Math.random() * 256);
    }
    rnds = newRnds;
  }

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    if (buf.length < 16) {
      throw new Error('The buffer length must not be less than 16');
    }
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

export default v4;
