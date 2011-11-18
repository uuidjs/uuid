if (!this.uuid) {
  uuid = require('../uuid');
}

var N = 1e5;

function log(msg) {
  if (typeof(document) != 'undefined') {
    document.write('<div>' + msg.replace(/\n/g, '<br />') + '</div>');
  }
  if (typeof(console) != 'undefined') {
    console.log(msg);
  }
}

// Get %'age an actual value differs from the ideal value
function divergence(actual, ideal) {
  return Math.round(100*100*(actual - ideal)/ideal)/100;
}

function rate(msg, t) {
  log(msg + ': ' + (N / (Date.now() - t) * 1e3 | 0) + ' uuids/second');
}

var generators = {
  v1: uuid.v1,
  v4: uuid.v4
};

var UUID_FORMAT = {
  v1: /[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i,
  v4: /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i
};

// Test time order of v1 uuids
var ids = [];
while (ids.length < 1e4) ids.push(uuid.v1());
var sorted = ([].concat(ids)).sort();
if (sorted.toString() !== ids.toString()) {
  log('Sort order of 10000 v1 uuids was incorrect!');
}

// Perf tests
log('- - - Performance Data - - -');
for (var version in generators) {
  log('\n' + version + ' UUIDs');
  var generator = generators[version];
  var buf = new uuid.BufferClass(16);

  for (var i = 0, t = Date.now(); i < N; i++) generator();
  rate('uuid.' + version + '()', t);

  for (var i = 0, t = Date.now(); i < N; i++) generator('binary');
  rate('uuid.' + version + '(\'binary\')', t);

  for (var i = 0, t = Date.now(); i < N; i++) generator('binary', buf);
  rate('uuid.' + version + '(\'binary\', buffer)', t);
}

for (var version in generators) {
  var counts = {}, max = 0;
  var generator = generators[version];
  var format = UUID_FORMAT[version];

  log('- - - Checking ' + N + ' ' + version + ' uuids - - -');
  for (var i = 0; i < N; i++) {
    id = generator();
    if (!format.test(id)) {
      throw Error(id + ' is not a valid UUID string');
    }

    if (id != uuid.unparse(uuid.parse(id))) {
      throw Error(id + ' does not parse/unparse');
    }

    // Count digits for our randomness check
    var digits = id.replace(/-/g, '').split('');
    for (var j = digits.length-1; j >= 0; j--) {
      var c = digits[j];
      max = Math.max(max, counts[c] = (counts[c] || 0) + 1);
    }
  }

  // Only check randomness for v4 UUIDs
  if (version == 'v4') {
    log('\nv4 PRNG quality check: Distribution of Hex Digits (% deviation from ideal) - - -');

    // Check randomness
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

      log(c + ' |' + bar + '| ' + counts[c] + ' (' + d + '%)');
    }
  }
}
