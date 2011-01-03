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
  var CHARS = '0123456789ABCDEF'.split(''), _id=new Array(36);
  function uuid() {
    var chars = CHARS;
    var id = _id, rnd, r, h = 8;

    for (var i = 0, j = 0; i < 36; i++) {
      if (i == h) {
        // Insert hyphens where needed
        id[i] = '-';
        h = h < 23 ? h+5 : -1;
      } else if (i==14) {
        // RFC4122 (sec 4.1.3) requires this
        id[i] = '4';
      } else {            // Set random bits
        // Minimize calls to [the expensive] Math.random() method
        if (j == 0) {
          rnd = Math.random()*0x100000000;
        }
        var r = rnd & 0xf;
        rnd = rnd >>> 4;
        j = (j + 1) & 0x7;

        id[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }

    return id.join('');
  };

  if (typeof(module) != 'undefined') {
    module.exports = uuid;
  } else {
    // In browser? Set as top-level function
    this.uuid = uuid;
  }
})();
