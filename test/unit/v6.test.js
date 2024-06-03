import assert from 'assert';
import v1tov6 from '../../src/v1tov6.js';
import v6tov1 from '../../src/v6tov1.js';

describe('v1 <-> v6 conversion', () => {
  const v1Fixture = 'f1207660-21d2-11ef-8c4f-419efbd44d48';
  const v6Fixture = '1ef21d2f-1207-6660-8c4f-419efbd44d48';

  test('v1 -> v6 conversion', () => {
    const id = v1tov6(v1Fixture);
    assert.equal(id, v6Fixture);
  });

  test('v1 -> v6 conversion (w', () => {
    const id = v1tov6(v1Fixture, true);

    // clock_seq and node fields should differ from original
    assert.notEqual(id, v6Fixture);

    // timestamp field should match the original
    assert.equal(id.slice(0, 19), v6Fixture.slice(0, 19));
  });

  test('v6 -> v1 conversion', () => {
    const id = v6tov1(v6Fixture);
    assert.equal(id, v1Fixture);
  });
});
