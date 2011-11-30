if (!this.uuid) {
  // node.js
  uuid = require('../uuid');
}

//
// x-platform log/assert shims
//

function _log(msg, type) {
  type = type || 'log';

  if (typeof(document) != 'undefined') {
    document.write('<div class="' + type + '">' + msg.replace(/\n/g, '<br />') + '</div>');
  }
  if (typeof(console) != 'undefined') {
    console[type](msg);
  }
}

function log(msg) {_log(msg, 'log');}
function warn(msg) {_log(msg, 'warn');}
function error(msg) {_log(msg, 'error');}

function assert(res, msg) {
  if (!res) {
    error('Fail: ' + msg);
  } else {
    log('Pass: ' + msg);
  }
}

//
// Unit tests
//

function compare(name, ids) {
  ids = ids.map(function(id) {
    return id.split('-').reverse().join('-');
  }).sort();
  var sorted = ([].concat(ids)).sort();

  assert(sorted.toString() == ids.toString(), name + ' have expected order');
}

// Verify ordering of v1 ids created using default behavior
compare('uuids with current time', [
  uuid.v1(),
  uuid.v1(),
  uuid.v1(),
  uuid.v1(),
  uuid.v1()
]);

// Verify ordering of v1 ids created with explicit times
var t = 1321644961388; // "Fri Nov 18 2011 11:36:01.388 GMT-0800 (PST)"
compare('uuids with time option', [
  uuid.v1({msecs: t - 10*3600*1000}),
  uuid.v1({msecs: t - 1}),
  uuid.v1({msecs: t}),
  uuid.v1({msecs: t + 1}),
  uuid.v1({msecs: t + 28*24*3600*1000}),
]);

var id = uuid.v1({
  msecs: 1321651533573,
  nsecs: 5432,
  clockseq: 0x385c,
  node: [ 0x61, 0xcd, 0x3c, 0xbb, 0x32, 0x10 ]
});
assert(id == 'd9428888-122b-11e1-b85c-61cd3cbb3210', 'Explicit options produce expected id');

// Check that there is exactly 1 tick between lastUUID and firstUUID of the
// next millisecond interval (this test is sloppy since it fails if time_mid
// or time_hi change when we changed the time by one ms. If we want to include
// that case, we cannot use parseInt() since our integers become
// > 32bit):
var u0 = uuid.v1({msecs: t, nsecs: 9999});
var u1 = uuid.v1({msecs: t + 1});

var before = u0.split('-')[0], after = u1.split('-')[0];
var dt = parseInt(after, 16) - parseInt(before, 16);
assert(dt === 1, '1ns separation between adjacent uuids');

//
// Test parse/unparse
//

id = '00112233445566778899aabbccddeeff';
assert(uuid.unparse(uuid.parse(id.substr(0,10))) ==
  '00112233-4400-0000-0000-000000000000', 'Short parse');
assert(uuid.unparse(uuid.parse('(this is the uuid -> ' + id + id)) ==
  '00112233-4455-6677-8899-aabbccddeeff', 'Dirty parse');

//
// Perf tests
//

var generators = {
  v1: uuid.v1,
  v4: uuid.v4
};

var UUID_FORMAT = {
  v1: /[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i,
  v4: /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i
};

var N = 1e4;

// Get %'age an actual value differs from the ideal value
function divergence(actual, ideal) {
  return Math.round(100*100*(actual - ideal)/ideal)/100;
}

function rate(msg, t) {
  log(msg + ': ' + (N / (Date.now() - t) * 1e3 | 0) + ' uuids\/second');
}

for (var version in generators) {
  var counts = {}, max = 0;
  var generator = generators[version];
  var format = UUID_FORMAT[version];

  log('\nSanity check ' + N + ' ' + version + ' uuids');
  for (var i = 0, ok = 0; i < N; i++) {
    id = generator();
    if (!format.test(id)) {
      throw Error(id + ' is not a valid UUID string');
    }

    if (id != uuid.unparse(uuid.parse(id))) {
      assert(fail, id + ' is not a valid id');
    }

    // Count digits for our randomness check
    if (version == 'v4') {
      var digits = id.replace(/-/g, '').split('');
      for (var j = digits.length-1; j >= 0; j--) {
        var c = digits[j];
        max = Math.max(max, counts[c] = (counts[c] || 0) + 1);
      }
    }
  }

  // Check randomness for v4 UUIDs
  if (version == 'v4') {
    // Pick (empirically chosen) limit that we get worried about randomness.
    var limit = 2*100*Math.sqrt(1/N); // (Purely empirical choice, this!)
    log('\nChecking v4 randomness.  Distribution of Hex Digits (% deviation from ideal)');

    for (var i = 0; i < 16; i++) {
      var c = i.toString(16);
      var bar = '', n = counts[c], p = Math.round(n/max*100|0);

      // 1-3,5-8, and D-F: 1:16 odds over 30 digits
      var ideal = N*30/16;
      if (i == 4) {
        // 4: 1:1 odds on 1 digit, plus 1:16 odds on 30 digits
        ideal = N*(1 + 30/16);
      } else if (i >= 8 && i <= 11) {
        // 8-B: 1:4 odds on 1 digit, plus 1:16 odds on 30 digits
        ideal = N*(1/4 + 30/16);
      } else {
        // Otherwise: 1:16 odds on 30 digits
        ideal = N*30/16;
      }
      var d = divergence(n, ideal);

      // Draw bar using UTF squares (just for grins)
      var s = n/max*50 | 0;
      while (s--) bar += '=';

      assert(Math.abs(d) < limit, c + ' |' + bar + '| ' + counts[c] + ' (' + d + '% < ' + limit + '%)');
    }
  }
}

// Perf tests
for (var version in generators) {
  log('\nPerformance testing ' + version + ' UUIDs');
  var generator = generators[version];
  var buf = new uuid.BufferClass(16);

  for (var i = 0, t = Date.now(); i < N; i++) generator();
  rate('uuid.' + version + '()', t);

  for (var i = 0, t = Date.now(); i < N; i++) generator('binary');
  rate('uuid.' + version + '(\'binary\')', t);

  for (var i = 0, t = Date.now(); i < N; i++) generator('binary', buf);
  rate('uuid.' + version + '(\'binary\', buffer)', t);
}

