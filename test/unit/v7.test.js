import assert from 'assert';
import v7 from '../../src/v7.js';
import stringify from '../../src/stringify.js';

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
    const buffer = [];
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
    const buffer = [];
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
    assert.deepEqual(buffer, expectedBytes.concat(expectedBytes));
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

      if (i > 0) {
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

    assert.strictEqual(uuid.substr(0, 25), '017f22e2-79b0-7dff-bfff-f');
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

  test('flipping bits changes the result', () => {
    const asBigInt = (buf) => buf.reduce((l, r) => (BigInt(l) << 8n) | BigInt(r));
    const flip = (data, n) => data ^ (1n << (127n - n));
    const optionsFrom = (data) => {
      const ms = data >> (128n - 48n);
      const hi = (data >> (43n + 19n + 2n)) & 0xfffn;
      const lo = (data >> 43n) & 0x7ffffn;
      const r = data & 0x7ff_ffff_ffffn;
      return {
        msecs: Number(ms),
        seq: Number((hi << 19n) | lo),
        random: [
          ...Array(10).fill(0),
          ...Array(6)
            .fill(0)
            .map((_, i) => Number((r >> (BigInt(i) * 8n)) & 0xffn))
            .reverse(),
        ],
      };
    };
    const buf = new Uint8Array(16);
    const data = asBigInt(v7({}, buf));
    const id = stringify(buf);
    for (let i = 0; i < 128; ++i) {
      if ([48, 49, 50, 51, 64, 65].includes(i)) {
        continue;
      }
      const flipped = flip(data, BigInt(i));
      assert(asBigInt(v7(optionsFrom(flipped), buf)) === flipped);
      assert(stringify(buf) !== id);
    }
  });
});
