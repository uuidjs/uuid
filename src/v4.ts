import native from './native.js';
import rng from './rng.js';
import { unsafeStringify } from './stringify.js';
import { UUIDTypes, Version4Options } from './types.js';

function _v4<TBuf extends Uint8Array = Uint8Array>(
  options?: Version4Options,
  buf?: TBuf,
  offset?: number
): UUIDTypes<TBuf> {
  options = options || {};

  const rnds = options.random ?? options.rng?.() ?? rng();
  if (rnds.length < 16) {
    throw new Error('Random bytes length must be >= 16');
  }

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    offset = offset || 0;
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
    }

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

function v4(options?: Version4Options, buf?: undefined, offset?: number): string;
function v4<TBuf extends Uint8Array = Uint8Array>(
  options: Version4Options | undefined,
  buf: TBuf,
  offset?: number
): TBuf;
function v4<TBuf extends Uint8Array = Uint8Array>(
  options?: Version4Options,
  buf?: TBuf,
  offset?: number
): UUIDTypes<TBuf> {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }

  // Putting tail-code here in a separate function (as opposed to inline in this
  // function) allows for compiler optimizations in the common case where
  // we never get this far (i.e. when native.randomUUID() is called, above).
  //
  // REF: https://github.com/uuidjs/uuid/issues/892
  return _v4(options, buf, offset);
}

export default v4;
