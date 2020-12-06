import validate from './validate.js';
import version from './version.js';

export function validateByVersion(uuid, uuidVersion) {
    return validate(uuid) && version(uuid) === uuidVersion;
}

export default validateByVersion;