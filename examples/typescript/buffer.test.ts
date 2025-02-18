/* eslint-disable @typescript-eslint/ban-ts-comment */
import { v1 } from 'uuid';

v1(undefined, new Uint8Array(16)) satisfies Uint8Array;
v1(undefined, Buffer.alloc(16)) satisfies Buffer;

// @ts-expect-error
v1(undefined, new Uint8Array(16)) satisfies Buffer;
