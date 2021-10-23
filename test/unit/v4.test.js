import assert from 'assert';
import v4 from '../../src/v4.js';

describe('v4', () => {
  const randomBytesFixture = [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
  ];

  const expectedBytes = [16, 145, 86, 190, 196, 251, 65, 234, 177, 180, 239, 225, 103, 28, 88, 54];

  test('subsequent UUIDs are different', () => {
    const id1 = v4();
    const id2 = v4();
    assert(id1 !== id2);
  });

  test('explicit options.random produces expected result', () => {
    const id = v4({
      random: randomBytesFixture,
    });
    assert.strictEqual(id, '109156be-c4fb-41ea-b1b4-efe1671c5836');
  });

  test('explicit options.rng produces expected result', () => {
    const id = v4({
      rng: () => randomBytesFixture,
    });
    assert.strictEqual(id, '109156be-c4fb-41ea-b1b4-efe1671c5836');
  });

  test('fills one UUID into a buffer as expected', () => {
    const buffer = [];
    const result = v4(
      {
        random: randomBytesFixture,
      },
      buffer
    );
    assert.deepEqual(buffer, expectedBytes);
    assert.strictEqual(buffer, result);
  });

  test('fills two UUIDs into a buffer as expected', () => {
    const buffer = [];
    v4(
      {
        random: randomBytesFixture,
      },
      buffer,
      0
    );
    v4(
      {
        random: randomBytesFixture,
      },
      buffer,
      16
    );
    assert.deepEqual(buffer, expectedBytes.concat(expectedBytes));
  });
});
