import assert from 'assert';
import rng from '../../src/rng.js';
import rngBrowser from '../../src/rng-browser.js';

describe('rng', () => {
  test('Node.js RNG', () => {
    const bytes = rng();
    assert.equal(bytes.length, 16);

    for (let i = 0; i < bytes.length; ++i) {
      assert.equal(typeof bytes[i], 'number');
    }
  });

  test('Browser without crypto.getRandomValues()', () => {
    assert.throws(() => {
      rngBrowser();
    });
  });

  // Test of whatwgRNG missing for now since with esmodules we can no longer manipulate the
  // require.cache.
});
