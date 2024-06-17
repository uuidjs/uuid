import * as assert from 'assert';
import test, { describe } from 'node:test';
import version from '../version.js';
import { TESTS } from './test_constants.js';

describe('version()', () => {
  test('TESTS cases', () => {
    for (const { value, expectedValidate, expectedVersion } of TESTS) {
      try {
        // @ts-expect-error testing invalid input
        const actualVersion = version(value);

        assert.ok(expectedValidate, `version(${value}) should throw`);
        assert.strictEqual(actualVersion, expectedVersion);
      } catch {
        assert.ok(!expectedValidate, `version(${value}) threw unexpectedly`);
      }
    }
  });
});
