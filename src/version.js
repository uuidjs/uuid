import validate from './validate.js';

function version(uuid) {
  if (validate(uuid)) {
    return parseInt(uuid.substr(14, 1), 16);
  }

  return -1;
}

export default version;
