import bytesToUuid from './lib/bytesToUuid.js';

const UUID_RE = /^[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;
const NIL_UUID = '00000000-0000-0000-0000-000000000000';
const EPOCH = 12219292800000n; // Gregorian epoch offset (in JS Date units)

function assertV1(uuid, v) {
  if (uuid.version !== 1) throw Error(`Not a v${uuid.version} uuid`);
}

class UUID {
  /**
   * Create UUID instance from RFC4122 UUID string
   *
   * @param {String} str  An RFC4122-compliant UUID string
   * @throws {Error} If string fails to parse, or is not RFC-compliant
   */
  static fromString(str) {
    if (str !== NIL_UUID && !UUID_RE.test(str)) throw new TypeError('Invalid UUID string');
    return new UUID(str.match(/[\da-f]{2}/g).map(v => parseInt(v, 16)));
  }

  /**
   * Create UUID instance from array of 16 bytes.
   *
   * @param {Array[16]|TypedArray[16]} bytes
   * @param {Number} [version] If provided, sets the variant and version
   * fields (and skips verification)
   * @throws If `bytes` are not a valid RFC4122
   */
  constructor(bytes, version) {
    this.bytes = bytes ? Uint8Array.from(bytes) : new Uint8Array(16).fill(0);

    // UUIDs must be exactly 16 bytes
    if (this.bytes.length !== 16) throw new TypeError('bytes.length !== 16');

    // Skip verification
    if (version) {
      this.variant = 4;
      this.version = version;
    } else {
      if (this.variant !== 0 && this.bytes.some(v => v !== 0)) {
        // RFC Sec 4.1.7 allows for a Nil (all zeroes) UUID
        throw TypeError('Variant may not be 0 for non-Nil UUIDs');
      } else if ((this.variant & 0x06) !== 4) {
        throw TypeError('Variant must be 4 or 5');
      }

      // Validate RFC version
      if (this.version < 1 || this.version > 5) throw TypeError('Version must be 1-5');
    }
  }

  /**
   * @returns {Number}
   */
  get variant() {
    // Per sec. 4.1.1: The variant field is 3 bits, which we return here.
    // Readers should be aware that for the RFC4122 variant (1 0 X) the low bit
    // is part of the clockseq, so may result in either 4 or 5 being returned
    // here.
    return this.bytes[8] >> 5;
  }

  set variant(v) {
    if (v !== 4 && v !== 5) throw new TypeError('Non-RFC4122 variant is not supported');
    this.bytes[8] = (this.bytes[8] & 0x3f) | (0x04 << 5);
  }

  /**
   * @returns {Number}
   */
  get version() {
    return this.bytes[6] >> 4;
  }

  /**
   * @param {Number} v
   */
  set version(v) {
    this.bytes[6] = (this.bytes[6] & 0x0f) | (v << 4);
  }

  /**
   * @returns {UInt8Array[6]}
   */
  get node() {
    assertV1(this);

    // Return byte array here because it's likely to be more useful than a
    // Number.  Even though JS Numbers can hold 48-bit integers, working with
    // such a value is problematic because boolean operations coerce values to
    // 32-bit ints.
    return Uint8Array.from(this.bytes.slice(10));
  }

  /**
   * @param {Uint8Array[6]} v
   */
  set node(bytes) {
    assertV1(this);

    this.bytes.set(bytes, 10);
  }

  /**
   * @returns {Number}
   */
  get clockseq() {
    assertV1(this);

    return (this.bytes[8] & 0x3f) << 8 | this.bytes[9];
  }

  /**
   * @param {Number} v
   */
  set clockseq(v) {
    assertV1(this);

    this.bytes[8] = (0xc0 & this.bytes[8]) | (v >> 8 & 0xff);
    this.bytes[8] = v & 0xff;
  }

  /**
   * @returns {BigInt} 100-nsec intervals start of gregorian epoch
   */
  get timestamp() {
    assertV1(this);

    return BigInt(this.bytes[6] & 0x0f) << 56n +
      BigInt(this.bytes[7]) << 48n +
      BigInt(this.bytes[4]) << 40n +
      BigInt(this.bytes[5]) << 32n +
      BigInt(this.bytes[0]) << 24n +
      BigInt(this.bytes[1]) << 16n +
      BigInt(this.bytes[2]) << 8n +
      BigInt(this.bytes[3]);
  }

  /**
   * @param {BigInt} v
   */
  set timestamp(v) {
    assertV1(this);
    const s = v.toString(16).padStart(16, '0').match(/../g).map(v => parseInt(v, 16));
    this.bytes[6] = this.bytes[6] & 0xf0 | s[0] & 0x0f;
    this.bytes[7] = s[1];
    this.bytes[4] = s[2];
    this.bytes[5] = s[3];
    this.bytes[0] = s[4];
    this.bytes[1] = s[5];
    this.bytes[2] = s[6];
    this.bytes[3] = s[7];
  }

  /**
   * Get timestamp as JS Date.  NOTE: This loses the 100-nanosecond resolution
   * that is implicit in UUID timestamps.
   *
   * @returns {Date}
   */
  get date() {
    assertV1(this);
    return new Date(Number(this.timestamp / 10000n - EPOCH));
  }

  /**
   * Set timestamp as a JS Date
   * @param {Date} v
   */
  set date(v) {
    assertV1(this);
    this.timestamp = (BigInt(v) + EPOCH) * 10000n;
  }

  /**
   * @return {String}
   */
  toString() {
    return bytesToUuid(this.bytes);
  }
}

export default UUID;
