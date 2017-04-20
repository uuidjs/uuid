'use strict';

var crypto = require('crypto');

function sha1(bytes) {
  if (Array.isArray(bytes)) bytes = Buffer.from(bytes);
  return crypto.createHash('sha1').update(bytes).digest();
}

module.exports = sha1;
