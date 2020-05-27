import uuidRegex from './regex.js';

function validate(uuid) {
  return typeof(uuid) === 'string' && uuidRegex.test(uuid);
}

export default validate;
