import * as assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { v1, v3, v4, v5, v6, v7 } from '../index.js';

const generators = {
  v1: (buffer: Uint8Array, offset: number) => v1({}, buffer, offset),
  v3: (buffer: Uint8Array, offset: number) =>
    v3('test', v3.DNS, buffer, offset),
  v4: (buffer: Uint8Array, offset: number) => v4({}, buffer, offset),
  v5: (buffer: Uint8Array, offset: number) =>
    v5('test', v5.DNS, buffer, offset),
  v6: (buffer: Uint8Array, offset: number) => v6({}, buffer, offset),
  v7: (buffer: Uint8Array, offset: number) => v7({}, buffer, offset),
};

describe('output buffer offsets', () => {
  for (const [name, generate] of Object.entries(generators)) {
    for (const offset of [0.5, 1.5, NaN]) {
      test(`${name} rejects offset ${offset} without writing to the buffer`, () => {
        const buffer = new Uint8Array(32).fill(0xff);
        assert.throws(() => generate(buffer, offset), RangeError);
        assert.deepEqual(buffer, new Uint8Array(32).fill(0xff));
      });
    }
  }
});
