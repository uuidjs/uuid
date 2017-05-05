var v1 = require('./v1');
var v4 = require('./v4');

var formatter = require( './lib/formatter' );

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.formatter = formatter;

module.exports = uuid;
