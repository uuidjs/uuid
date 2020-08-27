import crypto from 'crypto';

const poolSize = 4;
const rnds8Pool = new Uint8Array(16 * poolSize);
let poolPtr = -1;

export default function rng() {
  if (poolPtr === -1 || poolPtr === poolSize) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  const pos = 16 * poolPtr++;
  return rnds8Pool.slice(pos, pos + 16);
}
