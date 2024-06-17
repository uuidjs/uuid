import * as assert from 'assert';
import test, { describe } from 'node:test';
import version from '../version.js';
import { TESTS } from './test_constants.js';

describe('version() tests', () => {
  test('TESTS cases', () => {
    for (const { value, expectedValidate, expectedVersion } of TESTS) {
      try {
        // @ts-expect-error
        const actualVersion = version(value);

        assert.ok(expectedValidate, `version(${value}) should throw`);
        assert.strictEqual(actualVersion, expectedVersion);
      } catch (err) {
        assert.ok(!expectedValidate, `version(${value}) threw unexpectedly`);
      }
    }
  });
});
