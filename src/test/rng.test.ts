import * as assert from 'assert';
import test, { describe } from 'node:test';
import rng from '../rng.js';

describe('rng', () => {
  test('Node.js RNG', () => {
    const bytes = rng();
    assert.equal(bytes.length, 16);

    for (let i = 0; i < bytes.length; ++i) {
      assert.equal(typeof bytes[i], 'number');
    }
  });

  // Test of whatwgRNG missing for now since with esmodules we can no longer manipulate the
  // require.cache.
});
