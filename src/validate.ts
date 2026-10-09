import REGEX from './regex.js';

function validate(uuid: unknown): uuid is string {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

export default validate;
