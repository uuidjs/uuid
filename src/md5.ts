import { createHash } from 'node:crypto';

function md5(bytes: Uint8Array) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return createHash('md5').update(bytes).digest();
}

export default md5;
