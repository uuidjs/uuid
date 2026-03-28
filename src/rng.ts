const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
let poolPtr = rnds8Pool.length;

export default function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    const globalCrypto = typeof globalThis !== 'undefined' ? (globalThis as any).crypto : undefined;
    if (!globalCrypto || typeof globalCrypto.getRandomValues !== 'function') {
      throw new Error('getRandomValues() not supported');
    }
    globalCrypto.getRandomValues(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, (poolPtr += 16));
}
