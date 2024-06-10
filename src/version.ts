import { UUIDString } from './_types.js';
import validate from './validate.js';

function version(uuid: UUIDString) {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.slice(14, 15), 16);
}

export default version;
