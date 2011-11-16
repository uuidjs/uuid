if (typeof(uuid) == 'undefined') {
  uuid = require('../uuid');
}

var UUID_FORMAT = {
  4: /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89a-fAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/,
  1: /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-1[0-9a-fA-F]{3}-[89a-fAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/
};
var N = 1e5;

function log(msg) {
  if (typeof(document) != 'undefined') {
    document.write('<div>' + msg + '</div>');
  }
  if (typeof(console) != 'undefined') {
    console.log(msg);
  }
}

function rate(msg, t) {
  log(msg + ': ' + (N / (Date.now() - t) * 1e3 | 0) + ' uuids/second');
}

// Perf tests
log('- - - Performance Data - - -');
for (var i = 0, t = Date.now(); i < N; i++) uuid.v4();
rate('uuid.v4()', t);
for (var i = 0, t = Date.now(); i < N; i++) uuid.v4('binary');
rate('uuid.v4(\'binary\')', t);
var buf = new uuid.BufferClass(16);
for (var i = 0, t = Date.now(); i < N; i++) uuid.v4('binary', buf);
rate('uuid.v4(\'binary\', buffer)', t);
for (var i = 0, t = Date.now(); i < N; i++) uuid.v1();
rate('uuid.v1()', t);
for (var i = 0, t = Date.now(); i < N; i++) uuid.v1('binary');
rate('uuid.v1(\'binary\')', t);
var buf = new uuid.BufferClass(16);
for (var i = 0, t = Date.now(); i < N; i++) uuid.v1('binary', buf);
rate('uuid.v1(\'binary\', buffer)', t);

var generators = {
  4: uuid.v4,
  1: uuid.v1
};
for (var version in generators) {
  var counts = {}, max = 0;

  var b  = new uuid.BufferClass(16);
  for (var i = 0; i < N; i++) {
    id = generators[version]();
    if (!UUID_FORMAT[version].test(id)) {
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

  // Randomness-check doesn't make much sense for uuid's other than v4
  if (version != 4) {
    continue;
  }

  // Get %'age an actual value differs from the ideal value
  function divergence(actual, ideal) {
    return Math.round(100*100*(actual - ideal)/ideal)/100;
  }

  log('<br />- - - Distribution of Hex Digits (% deviation from ideal) - - -');

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
