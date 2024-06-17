import * as assert from 'assert';
import test, { describe } from 'node:test';
import validate from '../validate.js';
import { TESTS } from './test_constants.js';

describe('validate()', () => {
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
