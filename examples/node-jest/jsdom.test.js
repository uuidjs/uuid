/** @jest-environment jsdom */
import { TextEncoder } from 'node:util';
import * as uuid from 'uuid';

globalThis.TextEncoder ??= TextEncoder;

test('uuidv4()', () => {
  const val = uuid.v4();
  expect(uuid.version(val)).toBe(4);
});

test('uuidv7()', () => {
  const val = uuid.v7();
  expect(uuid.version(val)).toBe(7);
});
