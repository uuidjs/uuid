import crypto from 'crypto'

export default function md5(bytes) {
  if (typeof Buffer.from === 'function') {
    // Modern Buffer API
    if (Array.isArray(bytes)) {
      bytes = Buffer.from(bytes);
    } else if (typeof bytes === 'string') {
      bytes = Buffer.from(bytes, 'utf8');
    }
  } else {
    // Pre-v4 Buffer API
    if (Array.isArray(bytes)) {
      bytes = new Buffer(bytes);
    } else if (typeof bytes === 'string') {
      bytes = new Buffer(bytes, 'utf8');
    }
  }

  return crypto.createHash('md5').update(bytes).digest();
}
