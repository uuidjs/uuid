import * as assert from 'assert';
import test, { describe, mock } from 'node:test';
import v4 from '../v4.js';
import native from '../native.js';

const randomBytesFixture = Uint8Array.of(
  0x10,
  0x91,
  0x56,
  0xbe,
  0xc4,
  0xfb,
  0xc1,
  0xea,
  0x71,
  0xb4,
  0xef,
  0xe1,
  0x67,
  0x1c,
  0x58,
  0x36
);

const expectedBytes = Uint8Array.of(
  16,
  145,
  86,
  190,
  196,
  251,
  65,
  234,
  177,
  180,
  239,
  225,
  103,
  28,
  88,
  54
);

describe('v4', () => {
  test('subsequent UUIDs are different', () => {
    const id1 = v4();
    const id2 = v4();

    assert.ok(id1 !== id2);
  });

  test('should uses native randomUUID() if no option is passed', () => {
    mock.method(native, 'randomUUID');

    assert.equal((native.randomUUID as any).mock.callCount(), 0);
    v4();
    assert.equal((native.randomUUID as any).mock.callCount(), 1);

    mock.restoreAll();
  });

  test('should not use native randomUUID() if an option is passed', () => {
    mock.method(native, 'randomUUID');

    assert.equal((native.randomUUID as any).mock.callCount(), 0);
    v4({});
    assert.equal((native.randomUUID as any).mock.callCount(), 0);

    mock.restoreAll();
  });

  test('explicit options.random produces expected result', () => {
    const id = v4({ random: randomBytesFixture });
    assert.strictEqual(id, '109156be-c4fb-41ea-b1b4-efe1671c5836');
  });

  test('explicit options.rng produces expected result', () => {
    const id = v4({ rng: () => randomBytesFixture });
    assert.strictEqual(id, '109156be-c4fb-41ea-b1b4-efe1671c5836');
  });

  test('fills one UUID into a buffer as expected', () => {
    const buffer = new Uint8Array(16);
    const result = v4({ random: randomBytesFixture }, buffer);

    assert.deepEqual(buffer, expectedBytes);
    assert.strictEqual(buffer, result);
  });

  test('fills two UUIDs into a buffer as expected', () => {
    const buffer = new Uint8Array(32);
    v4({ random: randomBytesFixture }, buffer, 0);
    v4({ random: randomBytesFixture }, buffer, 16);

    const expectedBuf = new Uint8Array(32);
    expectedBuf.set(expectedBytes);
    expectedBuf.set(expectedBytes, 16);

    assert.deepEqual(buffer, expectedBuf);
  });
});
