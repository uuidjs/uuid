export { default as v1 } from './v1.js';
export { default as v3 } from './v3.js';
export { default as v4 } from './v4.js';
export { default as v5 } from './v5.js';

export default function deprecated () {
  throw new Error(`
The uuid@7 module no longer supports \`require('uuid')\`
To fix this, require the v4 implementation directly, like:

const uuid = require('uuid').v4
  `)
}
