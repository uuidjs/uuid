import v1 = require('./v1');
import v4 = require('./v4');

var uuid:any = v4;
uuid.v1 = v1;
uuid.v4 = v4;

export = uuid;
