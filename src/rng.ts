// `crypto` import here is required for node@18. Once v18 support is dropped we
// can switch to `globalThis.crypto` and combine `rng.ts` and `rng-browser.ts`.
import { webcrypto } from 'node:crypto';

const getRandomValues = webcrypto.getRandomValues.bind(webcrypto);
const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
let poolPtr = rnds8Pool.length;

export default function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    getRandomValues(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, (poolPtr += 16));
}
