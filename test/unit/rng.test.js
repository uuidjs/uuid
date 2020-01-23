import assert from 'assert';
import rng from '../../src/rng.js';
import rngBrowser from '../../src/rng-browser.js';

describe('rng', () => {
  test('nodeRNG', () => {
    assert.equal(rng.name, 'nodeRNG');

    var bytes = rng();
    assert.equal(bytes.length, 16);

    for (var i = 0; i < bytes.length; i++) {
      assert.equal(typeof bytes[i], 'number');
    }
  });

  test('mathRNG', () => {
    assert.equal(rngBrowser.name, 'mathRNG');

    var bytes = rng();
    assert.equal(bytes.length, 16);

    for (var i = 0; i < bytes.length; i++) {
      assert.equal(typeof bytes[i], 'number');
    }
  });

  // Test of whatwgRNG missing for now since with esmodules we can no longer manipulate the
  // require.cache.
});
