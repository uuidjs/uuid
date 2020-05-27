import assert from 'assert';
import version from '../../src/version.js';

describe('version', () => {
  test('check uuid version', () => {
    assert.strictEqual(version('00000000-0000-0000-0000-000000000000'), 0);

    assert.strictEqual(version('d9428888-122b-11e1-b85c-61cd3cbb3210'), 1);

    assert.strictEqual(version('109156be-c4fb-41ea-b1b4-efe1671c5836'), 4);

    assert.strictEqual(version('a981a0c2-68b1-35dc-bcfc-296e52ab01ec'), 3);

    assert.strictEqual(version('90123e1c-7512-523e-bb28-76fab9f2f73d'), 5);

    assert.strictEqual(version('invalid uuid string'), -1);
  });
});
