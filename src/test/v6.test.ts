import * as assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import v1ToV6 from '../v1ToV6.js';
import v6 from '../v6.js';
import v6ToV1 from '../v6ToV1.js';

describe('v6', () => {
  const V1_ID = 'f1207660-21d2-11ef-8c4f-419efbd44d48';
  const V6_ID = '1ef21d2f-1207-6660-8c4f-419efbd44d48';

  const fullOptions = {
    msecs: 0x133b891f705,
    nsecs: 0x1538,
    clockseq: 0x385c,
    node: Uint8Array.of(0x61, 0xcd, 0x3c, 0xbb, 0x32, 0x10),
  };

  const EXPECTED_BYTES = Uint8Array.of(
    0x1e,
    0x11,
    0x22,
    0xbd,
    0x94,
    0x28,
    0x68,
    0x88,
    0xb8,
    0x5c,
    0x61,
    0xcd,
    0x3c,
    0xbb,
    0x32,
    0x10
  );

  test('default behavior', () => {
    // Verify explicit options produce expected id
    const id = v6();
    assert.ok(
      /[0-9a-f]{8}-[0-9a-f]{4}-6[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/.test(id),

      'id is valid v6 UUID'
    );
  });

  test('default behavior (binary type)', () => {
    const buffer = new Uint8Array(16);
    const result = v6(fullOptions, buffer);
    assert.deepEqual(buffer, EXPECTED_BYTES);
    assert.strictEqual(buffer, result);
  });

  test('all options', () => {
    // Verify explicit options produce expected id
    const id = v6(fullOptions);
    assert.equal(id, '1e1122bd-9428-6888-b85c-61cd3cbb3210');
  });

  test('sort by creation time', () => {
    // Verify ids sort by creation time
    const ids = [];
    for (let i = 0; i < 5; i++) {
      ids.push(v6({ msecs: i * 1000 }));
    }
    assert.deepEqual(ids, ids.slice().sort());
  });

  test('creating at array offset', () => {
    const buffer = new Uint8Array(32);
    v6(fullOptions, buffer, 0);
    v6(fullOptions, buffer, 16);

    const expectedBuf = new Uint8Array(32);
    expectedBuf.set(EXPECTED_BYTES, 0);
    expectedBuf.set(EXPECTED_BYTES, 16);

    assert.deepEqual(buffer, expectedBuf);
  });

  test('v1 -> v6 conversion', () => {
    const id = v1ToV6(V1_ID);
    assert.equal(id, V6_ID);
  });

  test('v6 -> v1 conversion', () => {
    const id = v6ToV1(V6_ID);
    assert.equal(id, V1_ID);
  });
});
