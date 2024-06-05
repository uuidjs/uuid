import assert from 'assert';
import validate from '../../src/validate.js';
import { TESTS } from './test_constants.js';

describe('validate() tests', () => {
  test('TESTS cases', () => {
    for (const { value, expectedValidate } of TESTS) {
      assert.strictEqual(
        validate(value),
        expectedValidate,
        `validate(${value}) should be ${expectedValidate}`
      );
    }
  });
});
