import validateByVersion from './validate-by-version.js';

function isV5(uuid) {
  return validateByVersion(uuid, 5);
}

export default isV5;
