import crypto from 'crypto';

const poolSize = 256; // # of random values to pre-allocate
const poolResetLimit = poolSize - 16; // At what point should the pool get reset
const rnds8Pool = new Uint8Array(poolSize);
let poolPtr = rnds8Pool.length;

// Helper function to fill the pool with random bytes
let resetPool;
if (crypto.randomFillSync) {
  resetPool = function () {
    crypto.randomFillSync(rnds8Pool);
  };
} else if (Buffer.from) {
  // Node versions before 6 do not support randomFillSync, so fall back to `randomBytes` + `copy`.
  resetPool = function () {
    crypto.randomBytes(poolSize).copy(rnds8Pool, 0, 0, poolSize);
  };
} else {
  // Node versions before 4 do not support copying from buffers into typed arrays, so it must be done in a for loop
  resetPool = function () {
    const randomData = crypto.randomBytes(poolSize);
    for (let i = 0; i < poolSize; i++) {
      rnds8Pool[i] = randomData[i];
    }
  };
}

export default function rng() {
  if (poolPtr > poolResetLimit) {
    resetPool();
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, (poolPtr += 16));
}
