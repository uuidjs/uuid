import * as assert from 'assert';
import { describe } from 'node:test';
import v7 from '../v7.js';

/**
 * fixture bit layout:
 * ref: https://www.rfc-editor.org/rfc/rfc9562.html#name-example-of-a-uuidv7-value
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
  const seqFixture = 0x661b189b;

  const randomBytesFixture = Uint8Array.of(
    0x10,
    0x91,
    0x56,
    0xbe,
    0xc4,
    0xfb,
    0x0c,
    0xc3,
    0x18,
    0xc4,
    0xdc,
    0x0c,
    0x0c,
    0x07,
    0x39,
    0x8f
  );

  const expectedBytes = Uint8Array.of(
    1,
    127,
    34,
    226,
    121,
    176,
    124,
    195,
    152,
    196,
    220,
    12,
    12,
    7,
    57,
    143
  );

  test('subsequent UUIDs are different', () => {
    const id1 = v7();
    const id2 = v7();
    assert(id1 !== id2);
  });

  test('explicit options.random and options.msecs produces expected result', () => {
    const id = v7({
      random: randomBytesFixture,
      msecs: msecsFixture,
      seq: seqFixture,
    });
    assert.strictEqual(id, '017f22e2-79b0-7cc3-98c4-dc0c0c07398f');
  });

  test('explicit options.rng produces expected result', () => {
    const id = v7({
      rng: () => randomBytesFixture,
      msecs: msecsFixture,
      seq: seqFixture,
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
    const buffer = new Uint8Array(16);
    const result = v7(
      {
        random: randomBytesFixture,
        msecs: msecsFixture,
        seq: seqFixture,
      },
      buffer
    );
    assert.deepEqual(buffer, expectedBytes);
    assert.strictEqual(buffer, result);
  });

  test('fills two UUIDs into a buffer as expected', () => {
    const buffer = new Uint8Array(16);
    v7(
      {
        random: randomBytesFixture,
        msecs: msecsFixture,
        seq: seqFixture,
      },
      buffer,
      0
    );
    v7(
      {
        random: randomBytesFixture,
        msecs: msecsFixture,
        seq: seqFixture,
      },
      buffer,
      16
    );
    const expected = new Uint8Array(32);
    expected.set(expectedBytes);
    expected.set(expectedBytes, 16);
    assert.deepEqual(buffer, expected);
  });

  //
  // monotonic and lexicographical sorting tests
  //

  test('lexicographical sorting is preserved', () => {
    let id;
    let prior;
    let msecs = msecsFixture;
    for (let i = 0; i < 20000; ++i) {
      if (i % 1500 === 0) {
        // every 1500 runs increment msecs so seq is
        // reinitialized, simulating passage of time
        msecs += 1;
      }

      id = v7({ msecs });

      if (prior !== undefined) {
        assert(prior < id, `${prior} < ${id}`);
      }

      prior = id;
    }
  });

  test('handles seq rollover', () => {
    const msecs = msecsFixture;
    const a = v7({
      msecs,
      seq: 0x7fffffff,
    });

    v7({ msecs });

    const c = v7({ msecs });

    assert(a < c, `${a} < ${c}`);
  });

  test('can supply seq', () => {
    let seq = 0x12345;
    let uuid = v7({
      msecs: msecsFixture,
      seq,
    });

    assert.strictEqual(uuid.substr(0, 25), '017f22e2-79b0-7000-891a-2');

    seq = 0x6fffffff;
    uuid = v7({
      msecs: msecsFixture,
      seq,
    });

    assert.strictEqual(uuid.substr(0, 25), '017f22e2-79b0-7fff-bfff-f');
  });

  test('internal seq is reset upon timestamp change', () => {
    v7({
      msecs: msecsFixture,
      seq: 0x6fffffff,
    });

    const uuid = v7({
      msecs: msecsFixture + 1,
    });

    assert(uuid.indexOf('fff') !== 15);
  });
});
