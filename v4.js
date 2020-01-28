const util = require('util');

const v4 = require('./dist/v4.js');

module.exports = util.deprecate(
  v4,
  "Deep requiring like `const uuidv4 = require('uuid/v4');` is deprecated as of uuid@7.x. Please require the top-level module when using the Node.js CommonJS module or use ECMAScript Modules when bundling for the browser. See https://github.com/uuidjs/uuid/blob/master/README.md#upgrading-from-v3x-of-this-module for more information.",
);
