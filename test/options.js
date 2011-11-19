var uuid = require('../uuid'),
    assert = require('assert');

function compare(name, ids) {
  ids = ids.map(function(id) {
    return id.split('-').reverse().join('-');
  }).sort();
  var sorted = ([].concat(ids)).sort();

  console.log('Verify ' + name + ' have expected order.');
  assert.equal(sorted.toString(), ids.toString(), '... failed!');
  console.log('... verified');
}

// Verify ordering of ids created using default behavior
compare('uuids with current time', [
  uuid.v1(),
  uuid.v1(),
  uuid.v1(),
  uuid.v1(),
  uuid.v1()
]);

// Verify ordering of ids created with explicit times
var t = 1321644961388; // "Fri Nov 18 2011 11:36:01.388 GMT-0800 (PST)"
compare('uuids with time option', [
  uuid.v1({msecs: t - 10*3600*1000}),
  uuid.v1({msecs: t - 1}),
  uuid.v1({msecs: t}),
  uuid.v1({msecs: t + 1}),
  uuid.v1({msecs: t + 28*24*3600*1000}),
]);

console.log('Verify explicit options produce expected id');
var id = uuid.v1({
  msecs: 1321651533573,
  nsecs: 5432,
  clockseq: 0x385c,
  node: [ 0x61, 0xcd, 0x3c, 0xbb, 0x32, 0x10 ]
});
assert.equal(id, 'd9428888-122b-11e1-b85c-61cd3cbb3210', '... failed!');
console.log('... verified');

// Check that there is exactly 1 tick between lastUUID and firstUUID of the
// next millisecond interval (this test is sloppy since it fails if time_mid
// or time_hi change when we changed the time by one ms. If we want to include
// that case, we cannot use parseInt() since our integers become
// > 32bit):
console.log('Verify 1ns separation between adjacent uuids');
var u0 = uuid.v1({msecs: t, nsecs: 9999});
var u1 = uuid.v1({msecs: t + 1});

var before = u0.split('-')[0], after = u1.split('-')[0];
var dt = parseInt(after, 16) - parseInt(before, 16);
assert.strictEqual(dt, 1, 'Not exactly one tick between last and nextFirst');
console.log('... verified');

console.log('\nTests complete');
