import assert from 'assert';
import v7 from '../../src/v7.js';

/**
 * fixture bit layout:
 * ref: https://ietf-wg-uuidrev.github.io/rfc4122bis/draft-00/draft-ietf-uuidrev-rfc4122bis.html#name-example-of-a-uuidv7-value
 *
 * expectedBytes was calculated using this script:
 * https://gist.github.com/d5382ac3a1ce4ba9ba40a90d9da8cbf1
 *
 * -------------------------------
 * field      bits    value
 * -------------------------------
 * unix_ts_ms   48    0x17F22E279B0
 * ver           4    0x7
 * rand_a       12    0xCC3
 * var           2    b10
 * rand_b       62    b01, 0x8C4DC0C0C07398F
 * -------------------------------
 * total       128
 * -------------------------------
 * final: 017f22e2-79b0-7cc3-98c4-dc0c0c07398f
 */

describe('v7', () => {
  const msecsFixture = 1645557742000;
  const randomBytesFixture = [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0x0c, 0xc3, 0x18, 0xc4, 0xdc, 0x0c, 0x0c, 0x07, 0x39, 0x8f,
  ];

  const expectedBytes = [1, 127, 34, 226, 121, 176, 124, 195, 152, 196, 220, 12, 12, 7, 57, 143];

  test('subsequent UUIDs are different', () => {
    const id1 = v7();
    const id2 = v7();
    assert(id1 !== id2);
  });

  test('explicit options.random and options.msecs produces expected result', () => {
    const id = v7({
      random: randomBytesFixture,
      msecs: msecsFixture,
    });
    assert.strictEqual(id, '017f22e2-79b0-7cc3-98c4-dc0c0c07398f');
  });

  test('explicit options.rng produces expected result', () => {
    const id = v7({
      rng: () => randomBytesFixture,
      msecs: msecsFixture,
    });
    assert.strictEqual(id, '017f22e2-79b0-7cc3-98c4-dc0c0c07398f');
  });

  test('explicit options.msecs produces expected result', () => {
    const id = v7({
      msecs: msecsFixture,
    });
    assert.strictEqual(id.indexOf('017f22e2'), 0);
  });

  test('fills one UUID into a buffer as expected', () => {
    const buffer = [];
    const result = v7(
      {
        random: randomBytesFixture,
        msecs: msecsFixture,
      },
      buffer
    );
    assert.deepEqual(buffer, expectedBytes);
    assert.strictEqual(buffer, result);
  });

  test('fills two UUIDs into a buffer as expected', () => {
    const buffer = [];
    v7(
      {
        random: randomBytesFixture,
        msecs: msecsFixture,
      },
      buffer,
      0
    );
    v7(
      {
        random: randomBytesFixture,
        msecs: msecsFixture,
      },
      buffer,
      16
    );
    assert.deepEqual(buffer, expectedBytes.concat(expectedBytes));
  });
});
