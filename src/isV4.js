import validateByVersion from './validate-by-version.js';

function isV4(uuid) {
  return validateByVersion(uuid, 4);
}

export default isV4;
