import * as uuid from 'uuid';

console.log(uuid);

// Per-version validation, as shown in the README. `validate()` must narrow its
// argument to `string` for `version()` to accept it.
export function uuidValidateV4(value: unknown) {
  return uuid.validate(value) && uuid.version(value) === 4;
}
