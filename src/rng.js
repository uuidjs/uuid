import crypto from 'crypto';

const poolSize = 16;
const rnds8Pool = new Uint8Array(16 * poolSize);
let poolPtr = rnds8Pool.length;

export default function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, (poolPtr += 16));
}
