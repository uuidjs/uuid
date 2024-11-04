import { UUIDTypes, Version6Options } from './types.js';
import { unsafeStringify } from './stringify.js';
import v1 from './v1.js';
import v1ToV6 from './v1ToV6.js';

function v6(options?: Version6Options, buf?: undefined, offset?: number): string;
function v6(options: Version6Options | undefined, buf: Uint8Array, offset?: number): Uint8Array;
function v6(options?: Version6Options, buf?: Uint8Array, offset?: number): UUIDTypes {
  options ??= {};
  offset ??= 0;

  // v6 is v1 with different field layout, so we start with a v1 UUID, albeit
  // with slightly different behavior around how the clock_seq and node fields
  // are randomized, which is why we call v1 with _v6: true.
  let bytes = v1({ ...options, _v6: true }, new Uint8Array(16));

  // Reorder the fields to v6 layout.
  bytes = v1ToV6(bytes);

  // Return as a byte array if requested
  if (buf) {
    for (let i = 0; i < 16; i++) {
      buf[offset + i] = bytes[i];
    }
    return buf;
  }

  return unsafeStringify(bytes);
}

export default v6;
