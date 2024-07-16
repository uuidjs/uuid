import { UUIDTypes, Version7Options } from './_types.js';
import rng from './rng.js';
import { unsafeStringify } from './stringify.js';

type V7State = {
  msecs: number;
  seq: number;
};

const _state: V7State = {
  msecs: -Infinity, // time, milliseconds
  seq: 0, // sequence number (32-bits)
};

function v7(options?: Version7Options, buf?: undefined, offset?: number): string;
function v7(options?: Version7Options, buf?: Uint8Array, offset?: number): Uint8Array;
function v7(options?: Version7Options, buf?: Uint8Array, offset?: number): UUIDTypes {
  let bytes: Uint8Array;

  if (options) {
    // w/ options: Make UUID independent of internal state
    bytes = v7Bytes(
      options.random ?? options.rng?.() ?? rng(),
      options.msecs,
      options.seq,
      buf,
      offset
    );
  } else {
    // No options: Use internal state
    const now = Date.now();
    const rnds = rng();

    updateV7State(_state, now, rnds);

    bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
  }

  return buf ? bytes : unsafeStringify(bytes);
}

// (Private!)  Do not use.  This method is only exported for testing purposes
// and may change without notice.
export function updateV7State(state: V7State, now: number, rnds: Uint8Array) {
  if (now > state.msecs) {
    // Time has moved on! Pick a new random sequence number
    state.seq = (rnds[6] << 23) | (rnds[7] << 16) | (rnds[8] << 8) | rnds[9];
    state.msecs = now;
  } else {
    // Bump sequence counter w/ 32-bit rollover
    state.seq = (state.seq + 1) | 0;

    // Handle rollover case by bumping timestamp to preserve monotonicity. This
    // is allowed by the RFC and will self-correct as the system clock catches
    // up. See https://www.rfc-editor.org/rfc/rfc9562.html#section-6.2-9.4
    if (state.seq === 0) {
      state.msecs++;
    }
  }

  return state;
}

function v7Bytes(
  rnds: Uint8Array,
  msecs: number | undefined,
  seq: number | undefined,
  buf = new Uint8Array(16),
  offset = 0
) {
  // Defaults
  msecs ??= Date.now();
  seq ??= ((rnds[6] * 0x7f) << 24) | (rnds[7] << 16) | (rnds[8] << 8) | rnds[9];

  // [bytes 0-5] 48 bits of local timestamp
  buf[offset++] = (msecs / 0x10000000000) & 0xff;
  buf[offset++] = (msecs / 0x100000000) & 0xff;
  buf[offset++] = (msecs / 0x1000000) & 0xff;
  buf[offset++] = (msecs / 0x10000) & 0xff;
  buf[offset++] = (msecs / 0x100) & 0xff;
  buf[offset++] = msecs & 0xff;

  // [byte 6] - `version` | seq bits 31-28 (4 bits)
  buf[offset++] = 0x70 | ((seq >>> 27) & 0x0f);

  // [byte 7] seq bits 27-20 (8 bits)
  buf[offset++] = (seq >>> 19) & 0xff;

  // [byte 8] - `variant` (2 bits) | seq bits 19-14 (6 bits)
  buf[offset++] = ((seq >>> 13) & 0x3f) | 0x80;

  // [byte 9] seq bits 13-6 (8 bits)
  buf[offset++] = (seq >>> 5) & 0xff;

  // [byte 10] seq bits 5-0 (6 bits) | random (2 bits)
  buf[offset++] = ((seq << 3) & 0xff) | (rnds[10] & 0x07);

  // [bytes 11-15] always random
  buf[offset++] = rnds[11];
  buf[offset++] = rnds[12];
  buf[offset++] = rnds[13];
  buf[offset++] = rnds[14];
  buf[offset++] = rnds[15];

  return buf;
}

export default v7;
