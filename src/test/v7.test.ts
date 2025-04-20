import * as assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import parse from '../parse.js';
import stringify from '../stringify.js';
import { Version7Options } from '../types.js';
import v7, { updateV7State } from '../v7.js';

// Fixture values for testing with the rfc v7 UUID example:
// https://www.rfc-editor.org/rfc/rfc9562.html#name-example-of-a-uuidv7-value
const RFC_V7 = '017f22e2-79b0-7cc3-98c4-dc0c0c07398f';
const RFC_V7_BYTES = parse('017f22e2-79b0-7cc3-98c4-dc0c0c07398f');
const RFC_MSECS = 0x17f22e279b0;

// `option.seq` for the above RFC uuid
const RFC_SEQ = (0x0cc3 << 20) | (0x98c4dc >> 2);

// `option,random` for the above RFC uuid
const RFC_RANDOM = Uint8Array.of(
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
  0x6c,
  0x0c,
  0x0c,
  0x07,
  0x39,
  0x8f
);

describe('v7', () => {
  test('subsequent UUIDs are different', () => {
    const id1 = v7();
    const id2 = v7();
    assert.ok(id1 !== id2);
  });

  test('explicit options.random and options.msecs produces expected result', () => {
    const id = v7({
      random: RFC_RANDOM,
      msecs: RFC_MSECS,
      seq: RFC_SEQ,
    });
    assert.strictEqual(id, RFC_V7);
  });

  test('explicit options.rng produces expected result', () => {
    const id = v7({
      rng: () => RFC_RANDOM,
      msecs: RFC_MSECS,
      seq: RFC_SEQ,
    });
    assert.strictEqual(id, RFC_V7);
  });

  test('explicit options.msecs produces expected result', () => {
    const id = v7({
      msecs: RFC_MSECS,
    });
    assert.strictEqual(id.indexOf('017f22e2'), 0);
  });

  test('fills one UUID into a buffer as expected', () => {
    const buffer = new Uint8Array(16);
    const result = v7(
      {
        random: RFC_RANDOM,
        msecs: RFC_MSECS,
        seq: RFC_SEQ,
      },
      buffer
    );
    stringify(buffer);

    assert.deepEqual(buffer, RFC_V7_BYTES);
    assert.strictEqual(buffer, result);
  });

  test('fills two UUIDs into a buffer as expected', () => {
    const buffer = new Uint8Array(32);

    v7(
      {
        random: RFC_RANDOM,
        msecs: RFC_MSECS,
        seq: RFC_SEQ,
      },
      buffer,
      0
    );
    v7(
      {
        random: RFC_RANDOM,
        msecs: RFC_MSECS,
        seq: RFC_SEQ,
      },
      buffer,
      16
    );
    const expected = new Uint8Array(32);
    expected.set(RFC_V7_BYTES);
    expected.set(RFC_V7_BYTES, 16);
    assert.deepEqual(buffer, expected);
  });

  //
  // monotonic and lexicographical sorting tests
  //

  test('lexicographical sorting is preserved', () => {
    let id;
    let prior;
    let msecs = RFC_MSECS;
    for (let i = 0; i < 20000; ++i) {
      if (i % 1500 === 0) {
        // every 1500 runs increment msecs so seq is
        // reinitialized, simulating passage of time
        msecs += 1;
      }

      id = v7({ msecs, seq: i });

      if (prior !== undefined) {
        assert.ok(prior < id, `${prior} < ${id}`);
      }

      prior = id;
    }
  });

  test('can supply seq', () => {
    let seq = 0x12345;
    let uuid = v7({
      msecs: RFC_MSECS,
      seq,
    });

    assert.strictEqual(uuid.substr(0, 25), '017f22e2-79b0-7000-848d-1');

    seq = 0x6fffffff;
    uuid = v7({
      msecs: RFC_MSECS,
      seq,
    });

    assert.strictEqual(uuid.substring(0, 25), '017f22e2-79b0-76ff-bfff-f');
  });

  test('internal seq is reset upon timestamp change', () => {
    v7({
      msecs: RFC_MSECS,
      seq: 0x6fffffff,
    });

    const uuid = v7({
      msecs: RFC_MSECS + 1,
    });

    assert.ok(uuid.indexOf('fff') !== 15);
  });

  test('v7() state transitions', () => {
    const tests = [
      {
        title: 'new time interval',
        state: { msecs: 1, seq: 123 },
        now: 2,
        expected: {
          msecs: 2, // time interval should update
          seq: 0x6c318c4, // sequence should be randomized
        },
      },
      {
        title: 'same time interval',
        state: { msecs: 1, seq: 123 },
        now: 1,
        expected: {
          msecs: 1, // timestamp unchanged
          seq: 124, // sequence increments
        },
      },
      {
        title: 'same time interval (sequence rollover)',
        state: { msecs: 1, seq: 0xffffffff },
        now: 1,
        expected: {
          msecs: 2, // timestamp increments
          seq: 0, // sequence rolls over
        },
      },
      {
        title: 'time regression',
        state: { msecs: 2, seq: 123 },
        now: 1,
        expected: {
          msecs: 2, // timestamp unchanged
          seq: 124, // sequence increments
        },
      },
      {
        title: 'time regression (sequence rollover)',
        state: { msecs: 2, seq: 0xffffffff },
        now: 1,
        expected: {
          // timestamp increments (crazy, right? The system clock goes backwards
          // but the UUID timestamp moves forward?  Weird, but it's what's
          // required to maintain monotonicity... and this is why we have unit
          // tests!)
          msecs: 3,
          seq: 0, // sequence rolls over
        },
      },
    ];
    for (const { title, state, now, expected } of tests) {
      assert.deepStrictEqual(updateV7State(state, now, RFC_RANDOM), expected, `Failed: ${title}`);
    }
  });

  test('flipping bits changes the result', () => {
    // convert uint8array to BigInt (BE)
    const asBigInt = (buf: Uint8Array) => buf.reduce((acc, v) => (acc << 8n) | BigInt(v), 0n);

    // convert the given number of bits (LE) to number
    const asNumber = (bits: number, data: bigint) => Number(BigInt.asUintN(bits, data));

    // flip the nth bit (BE) in a BigInt
    const flip = (data: bigint, n: number) => data ^ (1n << BigInt(127 - n));

    // Extract v7 `options` from a (BigInt) UUID
    const optionsFrom = (data: bigint): Version7Options => {
      const ms = asNumber(48, data >> 80n);
      const hi = asNumber(12, data >> 64n);
      const lo = asNumber(20, data >> 42n);
      const r = BigInt.asUintN(42, data);
      return {
        msecs: ms,
        seq: (hi << 20) | lo,
        random: Uint8Array.from([
          ...Array(10).fill(0),
          ...Array(6)
            .fill(0)
            .map((_, i) => asNumber(8, r >> (BigInt(i) * 8n)))
            .reverse(),
        ]),
      };
    };
    const buf = new Uint8Array(16);
    const data = asBigInt(v7({}, buf));
    const id = stringify(buf);
    const reserved = [48, 49, 50, 51, 64, 65];
    for (let i = 0; i < 128; ++i) {
      if (reserved.includes(i)) {
        continue; // skip bits used for version and variant
      }
      const flipped = flip(data, i);
      assert.strictEqual(
        asBigInt(v7(optionsFrom(flipped), buf)).toString(16),
        flipped.toString(16),
        `Unequal uuids at bit ${i}`
      );
      assert.notStrictEqual(stringify(buf), id);
    }
  });

  test('throws when option.random is too short', () => {
    const random = Uint8Array.of(16);
    const buffer = new Uint8Array(16).fill(0);
    assert.throws(() => {
      v7({ random }, buffer);
    });
  });

  test('throws when options.rng() is too short', () => {
    const buffer = new Uint8Array(16);
    const rng = () => Uint8Array.of(0); // length = 1
    assert.throws(() => {
      v7({ rng }, buffer);
    });
  });

  test('throws RangeError for out-of-range indexes', () => {
    const buf15 = new Uint8Array(15);
    const buf30 = new Uint8Array(30);
    assert.throws(() => v7({}, buf15));
    assert.throws(() => v7({}, buf30, -1));
    assert.throws(() => v7({}, buf30, 15));
  });
});
