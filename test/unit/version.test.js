import assert from 'assert';
import version from '../../src/version.js';
import { TESTS } from './test_constants.js';

describe('version() tests', () => {
  test('TESTS cases', () => {
    for (const { value, expectedValidate, expectedVersion } of TESTS) {
      try {
        const actualVersion = version(value);
        assert(expectedValidate, `version(${value}) should throw`);
        assert.strictEqual(actualVersion, expectedVersion);
      } catch (err) {
        assert(!expectedValidate, `version(${value}) threw unexpectedly`);
      }
    }
  });
});
