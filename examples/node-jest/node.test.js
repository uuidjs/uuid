const uuid = require('uuid');

test('uuidv4()', () => {
  const val = uuid.v4();
  expect(uuid.version(val)).toBe(4);
});

test('uuidv7()', () => {
  const val = uuid.v7();
  expect(uuid.version(val)).toBe(7);
});
