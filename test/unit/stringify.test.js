import assert from 'assert';
import stringify, { unsafeStringify } from '../../src/stringify.js';

const BYTES = [
  0x0f, 0x5a, 0xbc, 0xd1, 0xc1, 0x94, 0x47, 0xf3, 0x90, 0x5b, 0x2d, 0xf7, 0x26, 0x3a, 0x08, 0x4b,
];

describe('unsafeStringify', () => {
  describe('default', () => {
    test('Stringify Array', () => {
      assert.equal(unsafeStringify(BYTES), '0f5abcd1-c194-47f3-905b-2df7263a084b');
    });

    test('Stringify TypedArray', () => {
      assert.equal(unsafeStringify(Uint8Array.from(BYTES)), '0f5abcd1-c194-47f3-905b-2df7263a084b');
      assert.equal(unsafeStringify(Int32Array.from(BYTES)), '0f5abcd1-c194-47f3-905b-2df7263a084b');
    });

    test('Stringify w/ offset', () => {
      assert.equal(unsafeStringify([0, 0, 0, ...BYTES], 3), '0f5abcd1-c194-47f3-905b-2df7263a084b');
    });
  });

  describe('safe', () => {
    test('Stringify Array', () => {
      assert.equal(stringify(BYTES), '0f5abcd1-c194-47f3-905b-2df7263a084b');
    });

    test('Throws on not enough values', () => {
      const bytes = [...BYTES];
      bytes.length = 15;
      assert.throws(() => stringify(bytes));
    });

    test('Throws on undefined value', () => {
      const bytes = [...BYTES];
      delete bytes[3];
      bytes.length = 15;
      assert.throws(() => stringify(bytes));
    });

    test('Throws on invalid value', () => {
      const bytes = [...BYTES];
      bytes[3] = 256;
      assert.throws(() => stringify(bytes));
    });
  });
});
