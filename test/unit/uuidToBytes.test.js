import assert from 'assert';
import uuidv4 from '../../src/v4.js';
import uuidToBytes from '../../src/uuidToBytes.js';
import bytesToUuid from '../../src/bytesToUuid.js';
import gen from 'random-seed';

// Use deterministic PRNG for reproducable tests
const rand = gen.create('He who wonders discovers that this in itself is wonder.');
function rng(bytes = []) {
  for (let i = 0; i < 16; i++) {
    bytes[i] = rand(256);
  }
  return bytes;
}

describe('uuidToBytes', () => {
  test('string->bytes->string symmetry', () => {
    // Verify string->bytes->string symmetry for a selection of uuids
    for (let i = 0; i < 1000; i++) {
      const uuid = uuidv4({ rng });
      assert.equal(bytesToUuid(uuidToBytes(uuid)), uuid);
    }
  });

  test('Ignore case', () => {
    // Verify upper/lower case neutrality
    assert.deepStrictEqual(
      uuidToBytes('0f5abcd1-c194-47f3-905b-2df7263a084b'),
      uuidToBytes('0f5abcd1-c194-47f3-905b-2df7263a084b'.toUpperCase()),
    );
  });

  test('Null UUID', () => {
    // Verify null Uuid
    assert.deepStrictEqual(
      uuidToBytes('00000000-0000-0000-0000-000000000000'),
      new Array(16).fill(0),
    );
  });

  test('Validates', () => {
    assert.throws(() => uuidToBytes());
    assert.throws(() => uuidToBytes('invalid uuid'));
    assert.throws(() => uuidToBytes('zyxwvuts-rqpo-nmlk-jihg-fedcba000000'));
  });
});
