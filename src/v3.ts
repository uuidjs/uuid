import { UUIDTypes } from './types.js';
import md5 from './md5.js';
import v35, { DNS, URL } from './v35.js';

export { DNS, URL } from './v35.js';

function v3(
  value: string | Uint8Array,
  namespace: UUIDTypes,
  buf?: undefined,
  offset?: number
): string;
function v3<TBuf extends Uint8Array = Uint8Array>(
  value: string | Uint8Array,
  namespace: UUIDTypes,
  buf: TBuf,
  offset?: number
): TBuf;
function v3<TBuf extends Uint8Array = Uint8Array>(
  value: string | Uint8Array,
  namespace: UUIDTypes,
  buf?: TBuf,
  offset?: number
): UUIDTypes<TBuf> {
  return v35(0x30, md5, value, namespace, buf, offset);
}

v3.DNS = DNS;
v3.URL = URL;

export default v3;
