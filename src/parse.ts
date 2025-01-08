import validate from './validate.js';

/**
 * Parses a UUID string into a Uint8Array.
 *
 * @param uuid - The UUID string to parse.
 * @returns A Uint8Array representing the binary form of the UUID.
 * @throws TypeError if the UUID is invalid.
 */
function parse(uuid: string): Uint8Array {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v: number;
  return Uint8Array.of(
    (v = parseInt(uuid.slice(0, 8), 16)) >>> 24,
    (v >>> 16) & 0xff,
    (v >>> 8) & 0xff,
    v & 0xff,

    // Parse ........-####-....-....-............
    (v = parseInt(uuid.slice(9, 13), 16)) >>> 8,
    v & 0xff,

    // Parse ........-....-####-....-............
    (v = parseInt(uuid.slice(14, 18), 16)) >>> 8,
    v & 0xff,

    // Parse ........-....-....-####-............
    (v = parseInt(uuid.slice(19, 23), 16)) >>> 8,
    v & 0xff,

    // Parse ........-....-....-....-############
    // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
    ((v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000) & 0xff,
    (v / 0x100000000) & 0xff,
    (v >>> 24) & 0xff,
    (v >>> 16) & 0xff,
    (v >>> 8) & 0xff,
    v & 0xff
  );
}

export default parse;
