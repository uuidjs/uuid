// `crypto` import here is required for node@18. Once v18 support is dropped we
// can switch to `globalThis.crypto` and combine `rng.ts` and `rng-browser.ts`.
import { webcrypto } from 'node:crypto';

let getRandomValues: typeof webcrypto.getRandomValues | undefined;
const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
let poolPtr = rnds8Pool.length;

export default function rng() {
  // lazy-reference getRandomValues in case it's been polyfilled
  if (!getRandomValues) {
    getRandomValues = webcrypto.getRandomValues.bind(webcrypto);
  }

  if (poolPtr > rnds8Pool.length - 16) {
    getRandomValues(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, (poolPtr += 16));
}
