import assert from 'assert';
import validate from '../../src/validate.js';
import NIL from '../../src/nil.js';

describe('validate', () => {
  test('validate uuid', () => {
    assert.strictEqual(validate(NIL), true);

    assert.strictEqual(validate('d9428888-122b-11e1-b85c-61cd3cbb3210'), true);

    assert.strictEqual(validate('109156be-c4fb-41ea-b1b4-efe1671c5836'), true);

    assert.strictEqual(validate('a981a0c2-68b1-35dc-bcfc-296e52ab01ec'), true);

    assert.strictEqual(validate('90123e1c-7512-523e-bb28-76fab9f2f73d'), true);

    assert.strictEqual(validate(), false);

    assert.strictEqual(validate(''), false);

    assert.strictEqual(validate('invalid uuid string'), false);

    assert.strictEqual(validate('00000000000000000000000000000000'), false);

    // NIL UUIDs that have a bit set (incorrectly) should not validate
    for (let charIndex = 0; charIndex < 36; charIndex++) {
      if (charIndex === 14) continue; // version field

      for (let bit = 0; bit < 4; bit++) {
        const chars = NIL.split('');
        if (chars[charIndex] === '-') continue;

        chars[charIndex] = (1 << bit).toString(16);
        assert.strictEqual(validate(chars.join('')), false);
      }
    }

    assert.strictEqual(
      validate(
        '=Y00a-f*v00b*-00c-00d#-p00f\b-00g-00h-####00i^^^-00j*1*2*3&-L00k-\n00l-/00m-----00n-fg000-00p-00r+'
      ),
      false
    );
  });
});
