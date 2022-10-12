import regex from './regex.js';

// Create RegExp that strictly matches uuid format from start to end of line.
const uuidRegEx = new RegExp(`^(?:${regex.source})$`, 'i');

function validate(uuid) {
  return typeof uuid === 'string' && uuidRegEx.test(uuid);
}

export default validate;
