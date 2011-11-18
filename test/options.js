var uuid = require('../uuid'),
    assert = require('assert');

function compare(ids) {
  console.log(ids);
  ids = ids.map(function(id) {
    return id.split('-').reverse().join('-');
  }).sort();
  var sorted = ([].concat(ids)).sort();

  assert.equal(sorted.toString(), ids.toString(), 'Warning: sorted !== ids');
  console.log('everything in order!');
}

var today = new Date().getTime();
var tenhoursago = new Date(today - 10*3600*1000).getTime();
var twentyeightdayslater =  new Date(today + 28*24*3600*1000).getTime();

var uuidToday = uuid.v1({
  time: today
});
var uuidTenhoursago = uuid.v1({
  time: tenhoursago
});
var uuidTwentyeightdayslater = uuid.v1({
  time: twentyeightdayslater
});
var uuidNow = uuid.v1();

var ids = [uuidTenhoursago, uuidToday, uuidNow, uuidTwentyeightdayslater];

console.log('Test if ids are in order:');
compare(ids);

// Get first possible v1 uuid for the current millisecond
var t = 1321644961388; // "Fri Nov 18 2011 11:36:01 GMT-0800 (PST)"

var nodeId1 = [0, 0, 0, 0, 0, 0];
var nodeId2 = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab];

console.log();

var uuidFirst = uuid.v1({
  time: t,
  clockseq: 0,
  node: nodeId1
});
console.log('uuidFirst = ', uuidFirst);

var uuidLast = uuid.v1({
  time: t,
  count: 9999,
  clockseq: 0x3fff,
  node: nodeId2
});
console.log('uuidLast  = ', uuidLast);

console.log();

var uuidFirstLater = uuid.v1({
  time: t + 1,
  clockseq: 0,
  node: nodeId1
});
console.log('uuidFirstLater = ', uuidFirstLater);

var uuidLastLater = uuid.v1({
  time: t + 1,
  time2: 9999,
  clockseq: 0x3fff,
  node: nodeId2
});
console.log('uuidLastLater  = ', uuidLastLater);

// Check that there is exactly 1 tick between lastUUID and firstUUID of the
// next millisecond interval (this test is sloppy since it fails if time_mid
// or time_hi change when we changed the time by one ms. If we want to include
// that case, we cannot use parseInt() since our integers become
// > 32bit):
var before = uuidLast.split('-');
before = before[0];
var after = uuidFirstLater.split('-');
after = after[0];
console.log(before, after);

var diff = parseInt(after, 16) - parseInt(before, 16);
console.log();
console.log('Test if theres exactly one 100ns interval between the last uuid ');
console.log('of the current 100ms interval and the first uuid of the next: %d', diff);
assert.strictEqual(diff, 1, 'Not exactly one tick between last and nextFirst');
