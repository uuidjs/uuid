var assert = require('assert').ok;
var uuid = require('../uuid');

var UUID_FORMAT = /[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/;
for (var i = 0; i < 100; i++) {
  id = uuid();
  assert(UUID_FORMAT.test(id), 'Proper format');
}
