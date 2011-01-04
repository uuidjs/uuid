(function() {
  /*
  * Generate a RFC4122(v4) UUID
  *
  * In Node.js:
  *
  *   var uuid = require('node-uuid');
  *   var id = uuid(); // -> '92329D39-6F5C-4520-ABFC-AAB64544E172'
  *
  * In a browser:
  *
  *   <script src="uuid.js"></script>
  *   <script>
  *     var id = uuid(); // -> '92329D39-6F5C-4520-ABFC-AAB64544E172'
  *   <script>
  */
  var CHARS = '0123456789ABCDEF'.split('');
  var _id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('');
  function uuid() {
    var c = CHARS, id = _id, i = 0, r = Math.random()*0x100000000;

    // i = 0
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4; r = Math.random()*0x100000000;

    i++; // i = 9
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;

    i += 2; // i = 15
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4; r = Math.random()*0x100000000;

    i++; // i = 19
    id[i++] = c[r & 0x3 | 0x8]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;

    i++; // i = 24
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4; r = Math.random()*0x100000000;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;
    id[i++] = c[r & 0xf]; r = r >>> 4;

    return id.join('');
  };

  if (typeof(module) != 'undefined') {
    module.exports = uuid;
  } else {
    // In browser? Set as top-level function
    this.uuid = uuid;
  }
})();
