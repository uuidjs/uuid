import assert from 'assert';
import v1ToV6 from '../../src/v1ToV6.js';
import v6ToV1 from '../../src/v6ToV1.js';

describe('v1 <-> v6 conversion', () => {
  const V1_ID = 'f1207660-21d2-11ef-8c4f-419efbd44d48';
  const V6_ID = '1ef21d2f-1207-6660-8c4f-419efbd44d48';

  test('v1 -> v6 conversion', () => {
    const id = v1ToV6(V1_ID);
    assert.equal(id, V6_ID);
  });

  test('v1 -> v6 conversion (w', () => {
    const id = v1ToV6(V1_ID, true);

    // clock_seq and node fields should differ from original
    assert.notEqual(id, V6_ID);

    // timestamp field should match the original
    assert.equal(id.slice(0, 19), V6_ID.slice(0, 19));
  });

  test('v6 -> v1 conversion', () => {
    const id = v6ToV1(V6_ID);
    assert.equal(id, V1_ID);
  });
});
