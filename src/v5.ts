import { UUIDString, UUIDTypes } from './_types.js';
import sha1 from './sha1.js';
import v35 from './v35.js';

export { DNS, URL } from './v35.js';

function v5(
  value: string | Uint8Array,
  namespace: UUIDTypes,
  buf?: undefined,
  offset?: number
): UUIDString;
function v5(
  value: string | Uint8Array,
  namespace: UUIDTypes,
  buf?: Uint8Array,
  offset?: number
): UUIDString;
function v5(value: string | Uint8Array, namespace: UUIDTypes, buf?: Uint8Array, offset?: number) {
  return v35(0x50, sha1, value, namespace, buf, offset);
}

export default v5;
