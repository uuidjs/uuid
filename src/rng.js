// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

import crypto from 'crypto';

export default function nodeRNG() {
  return crypto.randomBytes(16);
};
