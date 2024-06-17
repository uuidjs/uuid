import * as assert from 'assert';
import test, { describe } from 'node:test';
import stringify, { unsafeStringify } from '../stringify.js';

const BYTES = Uint8Array.of(
  0x0f,
  0x5a,
  0xbc,
  0xd1,
  0xc1,
  0x94,
  0x47,
  0xf3,
  0x90,
  0x5b,
  0x2d,
  0xf7,
  0x26,
  0x3a,
  0x08,
  0x4b
);

describe('unsafeStringify', () => {
  describe('default', () => {
    test('Stringify Array', () => {
      assert.equal(unsafeStringify(BYTES), '0f5abcd1-c194-47f3-905b-2df7263a084b');
    });

    test('Stringify w/ offset', () => {
      const bytes = new Uint8Array(19).fill(0);
      bytes.set(BYTES, 3);
      assert.equal(unsafeStringify(bytes, 3), '0f5abcd1-c194-47f3-905b-2df7263a084b');
    });
  });

  describe('safe', () => {
    test('Stringify Array', () => {
      assert.equal(stringify(BYTES), '0f5abcd1-c194-47f3-905b-2df7263a084b');
    });

    test('Throws on not enough values', () => {
      const bytes = BYTES.slice(0, 15);
      assert.throws(() => stringify(bytes));
    });
  });
});
