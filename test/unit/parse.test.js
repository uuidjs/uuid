import assert from 'assert';
import uuidv4 from '../../src/v4.js';
import parse from '../../src/parse.js';
import stringify from '../../src/stringify.js';
import gen from 'random-seed';

// Use deterministic PRNG for reproducable tests
const rand = gen.create('He who wonders discovers that this in itself is wonder.');
function rng(bytes = []) {
  for (let i = 0; i < 16; i++) {
    bytes[i] = rand(256);
  }
  return bytes;
}

describe('parse', () => {
  test('String -> bytes parsing', () => {
    assert.deepStrictEqual(
      parse('0f5abcd1-c194-47f3-905b-2df7263a084b'),
      Uint8Array.from([
        0x0f, 0x5a, 0xbc, 0xd1, 0xc1, 0x94, 0x47, 0xf3, 0x90, 0x5b, 0x2d, 0xf7, 0x26, 0x3a, 0x08,
        0x4b,
      ])
    );
  });

  test('String -> bytes -> string symmetry for assorted uuids', () => {
    for (let i = 0; i < 1000; i++) {
      const uuid = uuidv4({ rng });
      assert.equal(stringify(parse(uuid)), uuid);
    }
  });

  test('Case neutrality', () => {
    // Verify upper/lower case neutrality
    assert.deepStrictEqual(
      parse('0f5abcd1-c194-47f3-905b-2df7263a084b'),
      parse('0f5abcd1-c194-47f3-905b-2df7263a084b'.toUpperCase())
    );
  });

  test('Null UUID case', () => {
    assert.deepStrictEqual(
      parse('00000000-0000-0000-0000-000000000000'),
      Uint8Array.from(new Array(16).fill(0))
    );
  });

  test('UUID validation', () => {
    assert.throws(() => parse());
    assert.throws(() => parse('invalid uuid'));
    assert.throws(() => parse('zyxwvuts-rqpo-nmlk-jihg-fedcba000000'));
  });
});
