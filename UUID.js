const UUID_RE = /^[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

// (internal) Byte array -> uuid string conversion
const TO_HEX = new Array(16);
for (let i = 0; i < 256; i++) TO_HEX[i] = i.toString(16).padStart(2, '0');

class UUID {
  /**
   * Create a random (version 4) UUID
   * @return {UUID}
   */
  static v4() {
    var bytes = crypto.randomBytes(16);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // set version
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // set variant
    return new UUID(bytes);
  }

  /**
   * Create UUID instance from RFC4122 UUID string
   * @param {String} str  An RFC4122-compliant UUID string
   * @throws {Error} If string fails to parse, or is not RFC-compliant
   */
  static fromString(str) {
    if (!UUID_RE.test(str)) throw new Error('Invalid UUID string');
    return new UUID(str.match(/[\da-f]{2}/g).map(v => parseInt(v, 16)));
  }

  /**
   * Construct UUID from a Uint8Array[16]
   *
   * @throws If bytes are not a valid RFC UUID
   */
  constructor(bytes = new Uint8Array(16).fill(0)) {
    try {
      this.bytes = Uint8Array.from(bytes);
    } catch (err) {
      throw new TypeError('UUID must be Array-like with length=16');
    }

    // Validate RFC variant
    if (this.variant === 0) {
      // RFC Sec 4.1.7 allows for a Nil (all zeroes) UUID
      for (let i = 0; i < 16; i++) if (this.bytes[0] !== 0) {
        throw RangeError('Variant may not be 0 for non-Nil UUIDs');
      }
    } else if ((this.variant & 0x06) !== 4) {
      throw RangeError('Variant must be 4 or 5');
    }

    // Validate RFC version
    if (this.version > 5) throw RangeError('Version must be 1-5');
  }

  get version() {
    return this.bytes[6] >> 4;
  }

  get variant() {
    // Per sec. 4.1.1: The variant field is 3 bits, which we return here.
    // Readers should be aware that for the RFC4122 variant (1 0 X) the low bit
    // is part of the clockseq, so may result in either 4 or 5 being returned
    // here.
    return this.bytes[8] >> 5;
  }

  get node() {
    // Return byte array here because it's probably more useful than a Number.
    // Even though JS Numbers can hold 48-bit integers, working with such a
    // value is problematic because boolean operations coerce values to 32-bit
    // ints.
    return Uint8Array.from(this.bytes.slice(10));
  }

  get clockSeq() {
  }

  // FUTURE: v1 fields  (Have these return `undefined` for non-v1 UUIDs?)
  // get clockseq() {...}
  // get timestamp() {...} // Use `BigInt` type for this?
  // get node() {...}

  /** @return {String} */
  toString() {
    const b = this.bytes;
    let i = 0;
    return [
      TO_HEX[b[0]], TO_HEX[b[1]],
      TO_HEX[b[2]], TO_HEX[b[3]],
      '-',
      TO_HEX[b[4]], TO_HEX[b[5]],
      '-',
      TO_HEX[b[6]], TO_HEX[b[7]],
      '-',
      TO_HEX[b[8]], TO_HEX[b[9]],
      '-',
      TO_HEX[b[10]], TO_HEX[b[11]],
      TO_HEX[b[12]], TO_HEX[b[13]],
      TO_HEX[b[14]], TO_HEX[b[15]]
    ].join('');
  }
}

export default UUID;
