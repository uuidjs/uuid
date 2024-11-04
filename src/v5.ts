import { UUIDTypes } from './_types.js';
import sha1 from './sha1.js';
import v35, { DNS, URL } from './v35.js';

export { DNS, URL } from './v35.js';

function v5(
  value: string | Uint8Array,
  namespace: UUIDTypes,
  buf?: undefined,
  offset?: number
): string;
function v5(
  value: string | Uint8Array,
  namespace: UUIDTypes,
  buf: Uint8Array,
  offset?: number
): Uint8Array;
function v5(value: string | Uint8Array, namespace: UUIDTypes, buf?: Uint8Array, offset?: number) {
  return v35(0x50, sha1, value, namespace, buf, offset);
}

v5.DNS = DNS;
v5.URL = URL;

export default v5;
