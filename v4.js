import rng from './lib/rng.js';
import UUID from './UUID.js';
import bytesToUuid from './lib/bytesToUuid.js';

function v4() {
  const uuid = new UUID(rng(), 4);
  uuid.variant = 4;
  uuid.version = 4;
  return uuid.toString();
}

export default v4;
