const assert = require('assert');

describe('deprecate deep require', () => {
  function assertDeprecation(doRequire) {
    return () => {
      const uuid = doRequire();
      try {
        uuid();
        assert(false); // ensure this line is never reached
      } catch (error) {
        assert.strictEqual(error.name, 'DeprecationWarning');
      }
    };
  }

  test(
    'v1',
    assertDeprecation(() => require('../../v1')),
  );

  test(
    'v3',
    assertDeprecation(() => require('../../v3')),
  );

  test(
    'v4',
    assertDeprecation(() => require('../../v4')),
  );

  test(
    'v5',
    assertDeprecation(() => require('../../v5')),
  );
});
