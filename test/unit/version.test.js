import assert from 'assert';
import version from '../../src/version.js';
import NIL from '../../src/nil.js';

describe('version', () => {
  test('check uuid version', () => {
    assert.strictEqual(version(NIL), 0);

    assert.strictEqual(version('d9428888-122b-11e1-b85c-61cd3cbb3210'), 1);

    assert.strictEqual(version('109156be-c4fb-41ea-b1b4-efe1671c5836'), 4);

    assert.strictEqual(version('a981a0c2-68b1-35dc-bcfc-296e52ab01ec'), 3);

    assert.strictEqual(version('90123e1c-7512-523e-bb28-76fab9f2f73d'), 5);

    assert.strictEqual(version('017f22e2-79b0-7cc3-98c4-dc0c0c07398f'), 7);

    assert.throws(() => version());

    assert.throws(() => version(''));

    assert.throws(() => version('invalid uuid string'));

    assert.throws(() => {
      version('00000000000000000000000000000000');
    });

    assert.throws(() => {
      version(
        '=Y00a-f*v00b*-00c-00d#-p00f\b-00g-00h-####00i^^^-00j*1*2*3&-L00k-\n00l-/00m-----00n-fg000-00p-00r+'
      );
    });
  });
});
