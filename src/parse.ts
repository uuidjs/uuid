import validate from './validate.js';

function parse(uuid: string) {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  const result = new Uint8Array(16);
  let v;

  // Parse ########-....-....-....-............
  v = parseInt(uuid.slice(0, 8), 16);
  result[0] = v >>> 24;
  result[1] = (v >>> 16) & 0xff;
  result[2] = (v >>> 8) & 0xff;
  result[3] = v & 0xff;

  // Parse ........-####-....-....-............
  v = parseInt(uuid.slice(9, 13), 16);
  result[4] = v >>> 8;
  result[5] = v & 0xff;

  // Parse ........-....-####-....-............
  v = parseInt(uuid.slice(14, 18), 16);
  result[6] = v >>> 8;
  result[7] = v & 0xff;

  // Parse ........-....-....-####-............
  v = parseInt(uuid.slice(19, 23), 16);
  result[8] = v >>> 8;
  result[9] = v & 0xff;

  // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
  v = parseInt(uuid.slice(24, 36), 16);
  result[10] = (v / 0x10000000000) & 0xff;
  result[11] = (v / 0x100000000) & 0xff;
  result[12] = (v >>> 24) & 0xff;
  result[13] = (v >>> 16) & 0xff;
  result[14] = (v >>> 8) & 0xff;
  result[15] = v & 0xff;

  return result;
}

export default parse;
