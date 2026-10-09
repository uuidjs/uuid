import { v1, v6ToV1 } from 'uuid';

v1(undefined, new Uint8Array(16)) satisfies Uint8Array;
v1(undefined, Buffer.alloc(16)) satisfies Buffer;

// @ts-expect-error
v1(undefined, new Uint8Array(16)) satisfies Buffer;

v6ToV1(new Uint8Array(16)) satisfies ReturnType<typeof Uint8Array.of>;
v6ToV1(new Uint8Array(new SharedArrayBuffer(16))) satisfies ReturnType<
  typeof Uint8Array.of
>;
