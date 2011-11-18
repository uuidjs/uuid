/*
 * Generate RFC4122 (v1 and v4) UUIDs
 *
 * Documentation at https://github.com/broofa/node-uuid
 */
(function() {
  // WHATWG crypto api support.
  // http://wiki.whatwg.org/wiki/Crypto
  //
  // (Create a static _rnds array here as well, which lets us avoid per-uuid
  // array creation)
  var crypto, _rnds;
  if (crypto && crypto.getRandomValues) {
    _rnds = new Uint32Array(4);
  } else {
    _rnds = new Array(4);
    // Math.random does not have the cryptographic-quality guarantee for
    // randomness that crypto.getRandomValues has, but it's the best we have.
    crypto = {
      getRandomValues: function(arr) {
        for (var i = 0, l = arr.length; i < l; i++) {
          _rnds[i] = Math.random() * 0x100000000;
        }
      }
    }
  }

  // Use node.js Buffer class if available, otherwise use the Array class
  var BufferClass = typeof(Buffer) == 'function' ? Buffer : Array;

  // Maps for number <-> hex string conversion
  var _octetToHex = [];
  var _hexToOctet = {};
  for (var i = 0; i < 256; i++) {
    _octetToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToOctet[_octetToHex[i]] = i;
  }

  /**
   * Parse a uuid string into it's component octets.
   *
   * This is a loose parser.  It parses the first 16 octet pairs it as hex
   * values.  If fewer than 16 are found, any remaining entries in the array
   * are set to zero.
   */
  function parse(s, buf, offset) {
    var buf = buf || new BufferClass(16), i = offset || 0, ii = 0;
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(octet) {
      if (ii < 16) { // Don't overflow!
        buf[i + ii++] = _hexToOctet[octet];
      }
    });

    // Zero out remaining octets if string was short
    while (ii < 16) {
      buf[i+ii] = 0;
    }

    return buf;
  }

  /**
   * Generate a uuid string from octet array
   */
  function unparse(buf, offset) {
    var oth = _octetToHex, b = buf, i = offset || 0;
    return  oth[b[i + 0]] + oth[b[i + 1]] +
            oth[b[i + 2]] + oth[b[i + 3]] + '-' +
            oth[b[i + 4]] + oth[b[i + 5]] + '-' +
            oth[b[i + 6]] + oth[b[i + 7]] + '-' +
            oth[b[i + 8]] + oth[b[i + 9]] + '-' +
            oth[b[i + 10]] + oth[b[i + 11]] +
            oth[b[i + 12]] + oth[b[i + 13]] +
            oth[b[i + 14]] + oth[b[i + 15]];
  }

  /**
   * Create and return a 47-bit random node id
   */
  function _randomNodeId() {
    crypto.getRandomValues(_rnds);

    return [
      _rnds[0] & 0xff | 0x01, // Set multicast bit, per 4.1.6 and 4.5
      _rnds[0] >>> 8 & 0xff,
      _rnds[0] >>> 16 & 0xff,
      _rnds[0] >>> 24 & 0xff,
      _rnds[1] & 0xff,
      _rnds[1] >>> 8 & 0xff
    ];
  }

  // Pre-allocate arrays to avoid per-uuid array creation
  var _buf = new BufferClass(16);

  //
  // v1 UUID support
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html
  //

  // Per 4.1.4 - Offset (in msecs) from JS time to UUID (gregorian) time
  var EPOCH_OFFSET = 12219292800000;

  // Per 4.1.4 - UUID time has 100ns resolution
  // Per 4.2.1.2 - Count of uuids may be used low resolution clocks
  var UUIDS_PER_TICK = 10000;

  // Per 4.5, use a random node id
  var nodeId = _randomNodeId();

  // Per 4.2.2, use 14 bit random unsigned integer to initialize clock_seq
  var cs = _rnds[2] & 0x3fff;

  // Time of previous uuid creation
  var last = 0;

  // # of UUIDs that have been created during current time tick
  var count = 0;

  // Documentation at https://github.com/broofa/node-uuid
  function v1(fmt, buf, offset) {
    var b = fmt != 'binary' ? _buf : (buf ? buf : new BufferClass(16));
    var i = buf && offset || 0;

    // Get current time (uuid epoch)
    // Per 4.2.1.2, use uuid count to simulate higher resolution clock
    // Get current time and simulate higher clock resolution
    var now = (new Date().getTime()) + EPOCH_OFFSET;
    count = (now === last) ? count + 1 : 0;

    // Per 4.2.1.2 If generator overruns, throw an error
    // (*Highly* unlikely - requires generating > 10M uuids/sec)
    if (count > UUIDS_PER_TICK) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    // Per 4.2.1.2, if time regresses bump the clock sequence.
    if (now < last) {
      cs++;
      count = 0;
    }

    last = now;

    // Per 4.1.4, timestamp composition
    var tl = ((now & 0xfffffff) * 10000 + count) % 0x100000000;
    var tmh = (((now + count/10000) / 0x100000000) * 10000) & 0xfffffff;
    var tm = tmh & 0xffff, th = tmh >> 16;
    var thav = (th & 0xfff) | 0x1000; // Set version, per 4.1.3

    // time_low
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // time_mid
    b[i++] = tm >>> 8 & 0xff;
    b[i++] = tm & 0xff;

    // time_high_and_version
    b[i++] = thav >>> 8 & 0xff;
    b[i++] = thav & 0xff;

    // clock_seq_hi_and_reserved (include variant, per 4.2.2)
    b[i++] = (cs >>> 8) | 0x80;

    // clock_seq_low
    b[i++] = cs & 0xff;

    var n = 0;
    b[i++] = nodeId[n++];
    b[i++] = nodeId[n++];
    b[i++] = nodeId[n++];
    b[i++] = nodeId[n++];
    b[i++] = nodeId[n++];
    b[i++] = nodeId[n++];

    return fmt === undefined ? unparse(b) : b;
  }

  //
  // v4 UUID support
  //

  function v4(fmt, buf, offset) {
    var b = fmt != 'binary' ? _buf : (buf ? buf : new BufferClass(16));
    var i = buf && offset || 0;

    crypto.getRandomValues(_rnds);

    // v4 ideas are all random bits
    for (var c = 0 ; c < 16; c++) {
      var ri = c >> 2, rb = (c & 0x03) * 8;
      b[i + c] = _rnds[ri] >>> rb & 0xff;
    }

    // ... except for this
    b[i + 6] = (b[i + 6] & 0x0f) | 0x40; // Per RFC4122 sect. 4.1.3
    b[i + 8] = (b[i + 8] & 0x3f) | 0x80; // Per RFC4122 sect. 4.4

    return fmt === undefined ? unparse(b) : b;
  }

  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;

  return this.module ? this.module = uuid : this.uuid = uuid;
}());
