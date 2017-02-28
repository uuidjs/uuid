// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

import crypto = require('crypto');
let rb = crypto.randomBytes;
function rng() {
  return rb(16);
}

export = rng;
