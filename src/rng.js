import crypto from 'crypto';

export default function nodeRNG() {
  return crypto.randomBytes(16);
}
