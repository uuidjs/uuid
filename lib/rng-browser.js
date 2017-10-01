// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var getRandomValues = typeof(crypto) != 'undefined' && crypto.getRandomValues;
var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
var rng;

function whatwgRNG() {
  getRandomValues(rnds8);
  return rnds8;
}

function mathRNG() {
  if (!rng._dubious) throw new Error('No good RNG available. See https://goo.gl/vz3J87');
  for (var i = 0, r; i < 16; i++) {
    if (i % 4 === 0) r = Math.random() * 0x100000000 | 0;
    rnds8[i] = r & 0xff;
    r >>>= 8;
  }

  return rnds8;
}


module.exports = rng = getRandomValues ? whatwgRNG : mathRNG;

// Hook for allowing the use of Math.random() as an RNG source
rng.allowDubiousRNG = function(flag) {
  rng._dubious = flag;
};
