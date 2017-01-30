var v1 = require('./v1');
var v4 = require('./v4');
var base64 = require('./lib/base64.js');

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.base64 = {};
uuid.base64.v1 = base64(v1);
uuid.base64.v4 = base64(v4);

module.exports = uuid;
