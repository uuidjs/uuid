import assert from 'assert';
import v1 from '../../src/v1.js';

// Verify ordering of v1 ids created with explicit times
const TIME = 1321644961388; // 2011-11-18 11:36:01.388-08:00

describe('v1', () => {
  test('v1 sort order (default)', () => {
    const ids = [v1(), v1(), v1(), v1(), v1()];

    const sorted = [...ids].sort((a, b) => {
      a = a.split('-').reverse().join('-');
      b = b.split('-').reverse().join('-');
      return a < b ? -1 : a > b ? 1 : 0;
    });

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

    const sorted = [...ids].sort((a, b) => {
      a = a.split('-').reverse().join('-');
      b = b.split('-').reverse().join('-');
      return a < b ? -1 : a > b ? 1 : 0;
    });

    assert.deepEqual(ids, sorted);
  });

  test('msec', () => {
    // eslint-disable-next-line no-self-compare
    assert(v1({ msecs: TIME }) !== v1({ msecs: TIME }), 'IDs created at same msec are different');
  });

  test('exception thrown when > 10k ids created in 1ms', () => {
    assert.throws(function () {
      v1({ msecs: TIME, nsecs: 10000 });
    }, 'throws when > 10K ids created in 1 ms');
  });

  test('clock regression by msec', () => {
    // Verify clock regression bumps clockseq
    const uidt = v1({ msecs: TIME });
    const uidtb = v1({ msecs: TIME - 1 });
    assert(
      parseInt(uidtb.split('-')[3], 16) - parseInt(uidt.split('-')[3], 16) === 1,
      'Clock regression by msec increments the clockseq'
    );
  });

  test('clock regression by nsec', () => {
    // Verify clock regression bumps clockseq
    const uidtn = v1({ msecs: TIME, nsecs: 10 });
    const uidtnb = v1({ msecs: TIME, nsecs: 9 });
    assert(
      parseInt(uidtnb.split('-')[3], 16) - parseInt(uidtn.split('-')[3], 16) === 1,
      'Clock regression by nsec increments the clockseq'
    );
  });

  const fullOptions = {
    msecs: 1321651533573,
    nsecs: 5432,
    clockseq: 0x385c,
    node: [0x61, 0xcd, 0x3c, 0xbb, 0x32, 0x10],
  };

  test('explicit options product expected id', () => {
    // Verify explicit options produce expected id
    const id = v1(fullOptions);
    assert(id === 'd9428888-122b-11e1-b85c-61cd3cbb3210', 'Explicit options produce expected id');
  });

  test('ids spanning 1ms boundary are 100ns apart', () => {
    // Verify adjacent ids across a msec boundary are 1 time unit apart
    const u0 = v1({ msecs: TIME, nsecs: 9999 });
    const u1 = v1({ msecs: TIME + 1, nsecs: 0 });

    const before = u0.split('-')[0];
    const after = u1.split('-')[0];
    const dt = parseInt(after, 16) - parseInt(before, 16);
    assert(dt === 1, 'Ids spanning 1ms boundary are 100ns apart');
  });

  const expectedBytes = [217, 66, 136, 136, 18, 43, 17, 225, 184, 92, 97, 205, 60, 187, 50, 16];

  test('fills one UUID into a buffer as expected', () => {
    const buffer = [];
    const result = v1(fullOptions, buffer);
    assert.deepEqual(buffer, expectedBytes);
    assert.strictEqual(buffer, result);
  });

  test('fills two UUIDs into a buffer as expected', () => {
    const buffer = [];
    v1(fullOptions, buffer, 0);
    v1(fullOptions, buffer, 16);
    assert.deepEqual(buffer, expectedBytes.concat(expectedBytes));
  });
});
