var v1 = require('./v1');
var v4 = require('./v4');
var v5 = require('./v5');

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.v5 = v5;

module.exports = uuid;
