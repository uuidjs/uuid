// Use web crypto to generate random values
const _bytes = new Uint8Array(16); // eslint-disable-line no-undef
function cryptoRNG() {
  crypto.getRandomValues(_bytes);
  return _bytes;
}

let _rng;

if (typeof(crypto) != 'undefined' && crypto.getRandomValues) _rng = cryptoRNG;

// Hook for supplying a custom RNG.  Probably useful for testing, but mainly
// intended for cases where there's no crypto API
export function setRNG(rng) {
  _rng = rng;
}

export default function rng() {
  // TODO: Include link to a page that explains why we don't use Math.random()
  // and how to work around it
  if (!rng) throw Error('Cryptographic RNG not available');
  return _rng();
}
