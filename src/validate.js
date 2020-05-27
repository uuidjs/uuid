import uuidRegex from './regex.js';

function validate(uuid) {
  return uuidRegex.test(uuid);
}

export default validate;
