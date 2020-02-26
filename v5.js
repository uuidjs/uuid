const util = require('util');

const v5 = require('./dist/v5.js');

module.exports = util.deprecate(
  v5,
  "Deep requiring like `const uuidv5 = require('uuid/v5');` is deprecated as of uuid@7.x. Please require the top-level module when using the Node.js CommonJS module or use ECMAScript Modules when bundling for the browser. See https://github.com/uuidjs/uuid/blob/master/README.md#upgrading-from-uuid3 for more information.",
);
