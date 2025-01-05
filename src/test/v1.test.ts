import * as assert from 'assert';
import test, { describe } from 'node:test';
import parse from '../parse.js';
import v1, { updateV1State } from '../v1.js';

// Verify ordering of v1 ids created with explicit times
const TIME = 1321644961388; // 2011-11-18 11:36:01.388-08:00

// Fixture values for testing with the rfc v1 UUID example:
// https://www.rfc-editor.org/rfc/rfc9562.html#name-example-of-a-uuidv1-value
const RFC_V1 = 'c232ab00-9414-11ec-b3c8-9f68deced846';
const RFC_V1_BYTES = parse(RFC_V1);

// `options` for producing the above RFC UUID
const RFC_OPTIONS = {
  msecs: 0x17f22e279b0,
  nsecs: 0,
  clockseq: 0x33c8,
  node: Uint8Array.of(0x9f, 0x68, 0xde, 0xce, 0xd8, 0x46),
};

// random bytes for producing the above RFC UUID
const RFC_RANDOM = Uint8Array.of(
  // unused
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,

  // clock seq
  RFC_OPTIONS.clockseq >> 8,
  RFC_OPTIONS.clockseq & 0xff,

  // node
  ...RFC_OPTIONS.node
);

// Compare v1 timestamp fields chronologically
function compareV1TimeField(a: string, b: string) {
  a = a.split('-').slice(0, 3).reverse().join('');
  b = b.split('-').slice(0, 3).reverse().join('');
  return a < b ? -1 : a > b ? 1 : 0;
}

describe('v1', () => {
  test('v1 sort order (default)', () => {
    const ids = [v1(), v1(), v1(), v1(), v1()];

    const sorted = [...ids].sort(compareV1TimeField);
    assert.deepEqual(ids, sorted);
  });

  // Verify ordering of v1 ids created with explicit times
  test('v1 sort order (time option)', () => {
    const ids = [
      v1({ msecs: TIME - 10 * 3600 * 1000 }),
      v1({ msecs: TIME - 1 }),
      v1({ msecs: TIME }),
      v1({ msecs: TIME + 1 }),
      v1({ msecs: TIME + 28 * 24 * 3600 * 1000 }),
    ];

    const sorted = [...ids].sort(compareV1TimeField);
    assert.deepEqual(ids, sorted);
  });

  test('v1(options)', () => {
    assert.equal(v1({ msecs: RFC_OPTIONS.msecs, random: RFC_RANDOM }), RFC_V1, 'minimal options');
    assert.equal(v1(RFC_OPTIONS), RFC_V1, 'full options');
  });

  test('v1(options) equality', () => {
    assert.notEqual(v1({ msecs: TIME }), v1({ msecs: TIME }), 'UUIDs with minimal options differ');
    assert.equal(v1(RFC_OPTIONS), v1(RFC_OPTIONS), 'UUIDs with full options are identical');
  });

  test('fills one UUID into a buffer as expected', () => {
    const buffer = new Uint8Array(16);
    const result = v1(RFC_OPTIONS, buffer);
    assert.deepEqual(buffer, RFC_V1_BYTES);
    assert.strictEqual(buffer, result);
  });

  test('fills two UUIDs into a buffer as expected', () => {
    const buffer = new Uint8Array(32);
    v1(RFC_OPTIONS, buffer, 0);
    v1(RFC_OPTIONS, buffer, 16);

    const expectedBuf = new Uint8Array(32);
    expectedBuf.set(RFC_V1_BYTES);
    expectedBuf.set(RFC_V1_BYTES, 16);

    assert.deepEqual(buffer, expectedBuf);
  });

  test('v1() state transitions', () => {
    // Test fixture for internal state passed into updateV1State function
    const PRE_STATE = {
      msecs: 10,
      nsecs: 20,
      clockseq: 0x1234,
      node: Uint8Array.of(0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc),
    };

    // Note: The test code, below, passes RFC_RANDOM as the `rnds` argument for
    // convenience.  This allows us to test that fields have been initialized from
    // the rnds argument by testing for RFC_OPTIONS values in the output state.

    const tests = [
      {
        title: 'initial state',
        state: {},
        now: 10,
        expected: {
          msecs: 10, // -> now
          nsecs: 0, // -> init
          clockseq: RFC_OPTIONS.clockseq, // -> random
          node: RFC_OPTIONS.node, // -> random
        },
      },
      {
        title: 'same time interval',
        state: { ...PRE_STATE },
        now: PRE_STATE.msecs,
        expected: {
          ...PRE_STATE,
          nsecs: 21, // -> +1
        },
      },
      {
        title: 'new time interval',
        state: { ...PRE_STATE },
        now: PRE_STATE.msecs + 1,
        expected: {
          ...PRE_STATE,
          msecs: PRE_STATE.msecs + 1, // -> +1
          nsecs: 0, // -> init
        },
      },
      {
        title: 'same time interval (nsecs overflow)',
        state: { ...PRE_STATE, nsecs: 9999 },
        now: PRE_STATE.msecs,
        expected: {
          ...PRE_STATE,
          nsecs: 0, // -> init
          clockseq: RFC_OPTIONS.clockseq, // -> init
          node: RFC_OPTIONS.node, // -> init
        },
      },
      {
        title: 'time regression',
        state: { ...PRE_STATE },
        now: PRE_STATE.msecs - 1,
        expected: {
          ...PRE_STATE,
          msecs: PRE_STATE.msecs - 1, // -> now
          clockseq: RFC_OPTIONS.clockseq, // -> init
          node: RFC_OPTIONS.node, // -> init
        },
      },
    ];
    for (const { title, state, now, expected } of tests) {
      assert.deepStrictEqual(updateV1State(state, now, RFC_RANDOM), expected, `Failed: ${title}`);
    }
  });

  test('throws when option.random is too short', () => {
    const random = Uint8Array.of(16);
    const buffer = new Uint8Array(16).fill(0);
    assert.throws(() => {
      v1({ random }, buffer);
    });
  });

  test('throws when options.rng() is too short', () => {
    const buffer = new Uint8Array(16);
    const rng = () => Uint8Array.of(0); // length = 1
    assert.throws(() => {
      v1({ rng }, buffer);
    });
  });

  test('throws RangeError for out-of-range indexes', () => {
    const buf15 = new Uint8Array(15);
    const buf30 = new Uint8Array(30);
    assert.throws(() => v1({}, buf15));
    assert.throws(() => v1({}, buf30, -1));
    assert.throws(() => v1({}, buf30, 15));
  });
});
