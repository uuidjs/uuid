import { UUIDString, UUIDTypes } from './_types.js';
import md5 from './md5.js';
import v35 from './v35.js';

export { DNS, URL } from './v35.js';

function v3(
  value: string | Uint8Array,
  namespace: UUIDTypes,
  buf?: undefined,
  offset?: number
): UUIDString;
function v3(
  value: string | Uint8Array,
  namespace: UUIDTypes,
  buf?: Uint8Array,
  offset?: number
): UUIDString;
function v3(value: string | Uint8Array, namespace: UUIDTypes, buf?: Uint8Array, offset?: number) {
  return v35(0x30, md5, value, namespace, buf, offset);
}

export default v3;
