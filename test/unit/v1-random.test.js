import assert from 'assert';
import v1 from '../../src/v1.js';

// Since the clockseq is cached in the module this test must run in a separate file in order to
// initialize the v1 clockseq with controlled random data.
describe('v1', () => {
  const randomBytesFixture = [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
  ];

  test('explicit options.random produces expected id', () => {
    const id = v1({
      msecs: 1321651533573,
      nsecs: 5432,
      random: randomBytesFixture,
    });
    assert.strictEqual(id, 'd9428888-122b-11e1-81ea-119156bec4fb');
  });
});
