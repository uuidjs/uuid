import * as assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { describe, test } from 'node:test';
import v4 from '../v4.js';

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
  0x36,
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
  54,
);

describe('v4', () => {
  test('subsequent UUIDs are different', () => {
    const id1 = v4();
    const id2 = v4();

    assert.ok(id1 !== id2);
  });

  test('should use native randomUUID() if no option is passed', async (t) => {
    const mocked = t.mock.method(crypto, 'randomUUID', () => 'mocked-uuid');

    assert.equal(mocked.mock.callCount(), 0);
    v4();
    assert.equal(mocked.mock.callCount(), 1);

    t.mock.reset();
  });

  test('should not use native randomUUID() if an option is passed', async (t) => {
    const mocked = t.mock.method(crypto, 'randomUUID', () => 'mocked-uuid');

    assert.equal(mocked.mock.callCount(), 0);
    v4({});
    assert.equal(mocked.mock.callCount(), 0);

    t.mock.reset();
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

  test('fills overlapping buffers without corrupting random bytes', () => {
    const factories = [
      (length: number) => new Uint8Array(length),
      (length: number) => Buffer.alloc(length),
    ];

    for (const createBuffer of factories) {
      for (const randomLength of [16, 20]) {
        for (const offset of [3, 4, 5, 20]) {
          for (const useRng of [false, true]) {
            const backing = createBuffer(64).fill(0xa5);
            const random = backing.subarray(8, 8 + randomLength);
            random.set(randomBytesFixture);
            const buffer = backing.subarray(4, 60);
            const expected = Uint8Array.from(backing);
            expected.set(expectedBytes, 8);
            expected.set(expectedBytes, 4 + offset);
            let calls = 0;
            const options = useRng
              ? {
                  rng: () => {
                    calls++;
                    return random;
                  },
                }
              : { random };

            assert.strictEqual(v4(options, buffer, offset), buffer);
            assert.deepEqual(Uint8Array.from(backing), expected);
            assert.equal(calls, useRng ? 1 : 0);
          }
        }
      }
    }
  });

  test('fills buffers backed by distinct wrappers of shared memory', () => {
    const shared = new SharedArrayBuffer(17);
    const random = new Uint8Array(shared, 0, 16);
    random.set(randomBytesFixture);
    const buffer = new Uint8Array(structuredClone(shared));
    assert.notStrictEqual(random.buffer, buffer.buffer);

    assert.strictEqual(v4({ random }, buffer, 1), buffer);
    assert.deepEqual(buffer.subarray(1), expectedBytes);
    assert.equal(buffer[0], randomBytesFixture[0]);
  });

  test('throws when option.random is too short', () => {
    const random = Uint8Array.of(16);
    const buffer = new Uint8Array(16).fill(0);
    assert.throws(() => {
      v4({ random }, buffer);
    });
  });

  test('throws when options.rng() is too short', () => {
    const buffer = new Uint8Array(16);
    const rng = () => Uint8Array.of(0); // length = 1
    assert.throws(() => {
      v4({ rng }, buffer);
    });
  });

  test('throws RangeError for out-of-range indexes', () => {
    const buf15 = new Uint8Array(15);
    const buf30 = new Uint8Array(30);
    assert.throws(() => v4({}, buf15), RangeError);
    assert.throws(() => v4({}, buf30, -1), RangeError);
    assert.throws(() => v4({}, buf30, 15), RangeError);
  });
});
