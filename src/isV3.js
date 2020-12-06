import validateByVersion from './validate-by-version.js'

function isV3(uuid) {
    return validateByVersion(uuid, 3);
}

export default isV3;