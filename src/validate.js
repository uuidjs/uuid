import REGEX from './regex.js';
import version from './version.js';

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

export default validate;

function validateByVersion(uuid, uuidVersion) {
  return validate(uuid) && version(uuid) === uuidVersion;
}

export function isV1(uuid) {
  return validateByVersion(uuid, 1);
}

export function isV3(uuid) {
  return validateByVersion(uuid, 3);
}

export function isV4(uuid) {
  return validateByVersion(uuid, 4);
}

export function isV5(uuid) {
  return validateByVersion(uuid, 5);
}
