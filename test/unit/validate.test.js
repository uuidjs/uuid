import assert from 'assert';
import validate, { isV1, isV3, isV4, isV5 } from '../../src/validate.js';
import NIL from '../../src/nil.js';

const validUuids = {
  v1: 'd9428888-122b-11e1-b85c-61cd3cbb3210',
  v3: 'a981a0c2-68b1-35dc-bcfc-296e52ab01ec',
  v4: '109156be-c4fb-41ea-b1b4-efe1671c5836',
  v5: '90123e1c-7512-523e-bb28-76fab9f2f73d',
};

describe('validate', () => {
  test('validate uuid', () => {
    assert.strictEqual(validate(NIL), true);

    assert.strictEqual(validate(validUuids.v1), true);

    assert.strictEqual(validate(validUuids.v3), true);

    assert.strictEqual(validate(validUuids.v4), true);

    assert.strictEqual(validate(validUuids.v5), true);

    assert.strictEqual(validate(), false);

    assert.strictEqual(validate(''), false);

    assert.strictEqual(validate('invalid uuid string'), false);

    assert.strictEqual(validate('00000000000000000000000000000000'), false);

    assert.strictEqual(
      validate(
        '=Y00a-f*v00b*-00c-00d#-p00f\b-00g-00h-####00i^^^-00j*1*2*3&-L00k-\n00l-/00m-----00n-fg000-00p-00r+'
      ),
      false
    );
  });

  test('validate v1 uuid', () => {
    assert.strictEqual(isV1(validUuids.v1), true);
    assert.strictEqual(isV1(validUuids.v3), false);
    assert.strictEqual(isV1(validUuids.v4), false);
    assert.strictEqual(isV1(validUuids.v5), false);
  });

  test('validate v3 uuid', () => {
    assert.strictEqual(isV3(validUuids.v1), false);
    assert.strictEqual(isV3(validUuids.v3), true);
    assert.strictEqual(isV3(validUuids.v4), false);
    assert.strictEqual(isV3(validUuids.v5), false);
  });

  test('validate v4 uuid', () => {
    assert.strictEqual(isV4(validUuids.v1), false);
    assert.strictEqual(isV4(validUuids.v3), false);
    assert.strictEqual(isV4(validUuids.v4), true);
    assert.strictEqual(isV4(validUuids.v5), false);
  });

  test('validate v5 uuid', () => {
    assert.strictEqual(isV5(validUuids.v1), false);
    assert.strictEqual(isV5(validUuids.v3), false);
    assert.strictEqual(isV5(validUuids.v4), false);
    assert.strictEqual(isV5(validUuids.v5), true);
  });
});
