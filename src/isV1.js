import validateByVersion from './validate-by-version.js'

function isV1(uuid) {
    return validateByVersion(uuid, 1);
}

export default isV1;