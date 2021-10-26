import crypto from 'crypto';

<<<<<<< Updated upstream
const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
=======
const rnds8Pool = new Uint8Array(256);
>>>>>>> Stashed changes
let poolPtr = rnds8Pool.length;

export default function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, (poolPtr += 16));
}
