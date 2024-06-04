import assert from 'assert';
import v1ToV6 from '../../src/v1ToV6.js';
import v6 from '../../src/v6.js';
import v6ToV1 from '../../src/v6ToV1.js';

describe('v6', () => {
  const V1_ID = 'f1207660-21d2-11ef-8c4f-419efbd44d48';
  const V6_ID = '1ef21d2f-1207-6660-8c4f-419efbd44d48';

  const fullOptions = {
    msecs: 1321651533573,
    nsecs: 5432,
    clockseq: 0x385c,
    node: [0x61, 0xcd, 0x3c, 0xbb, 0x32, 0x10],
  };

  test('v6 (full options)', () => {
    // Verify explicit options produce expected id
    const id = v6(fullOptions);
    assert.equal(id, '1e1122bd-9428-6888-b85c-61cd3cbb3210');
  });

  const expectedBytes = [30, 17, 34, 189, 148, 40, 104, 136, 184, 92, 97, 205, 60, 187, 50, 16];

  test('v6 (binary)', () => {
    const buffer = [];
    const result = v6(fullOptions, buffer);
    assert.deepEqual(buffer, expectedBytes);
    assert.strictEqual(buffer, result);
  });

  test('v6 (binary w/ buffer offset)', () => {
    const buffer = [];
    v6(fullOptions, buffer, 0);
    v6(fullOptions, buffer, 16);
    assert.deepEqual(buffer, expectedBytes.concat(expectedBytes));
  });

  test('v1 -> v6 conversion', () => {
    const id = v1ToV6(V1_ID);
    assert.equal(id, V6_ID);
  });

  test('v1 -> v6 conversion (randomized0', () => {
    const id = v1ToV6(V1_ID, true);

    // clock_seq and node fields should be randomized
    assert.notEqual(id, V6_ID);

    // timestamp field should not change
    assert.equal(id.slice(0, 19), V6_ID.slice(0, 19));
  });

  test('v6 -> v1 conversion', () => {
    const id = v6ToV1(V6_ID);
    assert.equal(id, V1_ID);
  });
});
