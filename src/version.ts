import validate from './validate.js';

function version(uuid: unknown) {
  if (typeof uuid !== 'string' || !validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.slice(14, 15), 16);
}

export default version;
