// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

var crypto = require('crypto');
var rng = function nodeRNG() {
  return crypto.randomBytes(16);
}

// Shim to keep API consistent across rng and rng-browser
rng.allowDubiousRNG = function() {};

module.exports = rng;
