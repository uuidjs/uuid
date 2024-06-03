import parse from './parse.js';
import stringify from './stringify.js';
import version from './version.js';

export default function v6tov1(uuid) {
  if (version(uuid) !== 6) {
    throw new Error('id is not a valid v6 UUID');
  }

  const v1Bytes = parse(uuid);

  const v6Bytes = Uint8Array.from([
    ((v1Bytes[3] & 0x0f) << 4) | ((v1Bytes[4] >> 4) & 0x0f),
    ((v1Bytes[4] & 0x0f) << 4) | ((v1Bytes[5] & 0xf0) >> 4),
    ((v1Bytes[5] & 0x0f) << 4) | (v1Bytes[6] & 0x0f),
    v1Bytes[7],

    ((v1Bytes[1] & 0x0f) << 4) | ((v1Bytes[2] & 0xf0) >> 4),
    ((v1Bytes[2] & 0x0f) << 4) | ((v1Bytes[3] & 0xf0) >> 4),

    0x10 | ((v1Bytes[0] & 0xf0) >> 4),
    ((v1Bytes[0] & 0x0f) << 4) | ((v1Bytes[1] & 0xf0) >> 4),

    v1Bytes[8],
    v1Bytes[9],
    v1Bytes[10],
    v1Bytes[11],
    v1Bytes[12],
    v1Bytes[13],
    v1Bytes[14],
    v1Bytes[15],
  ]);

  return stringify(v6Bytes);
}
