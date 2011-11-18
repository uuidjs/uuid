var uuid = require('../uuid'),
    assert = require('assert');

function compare(ids) {
  console.log(ids);
  for (var i = 0; i < ids.length; i++) {
    var id = ids[i].split('-');
    id = [id[2], id[1], id[0]].join('');
    ids[i] = id;
  }
  var sorted = ([].concat(ids)).sort();

  assert.equal(sorted.toString(), ids.toString(), 'Warning: sorted !== ids');
  console.log('everything in order!');
}

var today = new Date().getTime();
var tenhoursago = new Date(today - 10*3600*1000).getTime();
var twentyeightdayslater =  new Date(today + 28*24*3600*1000).getTime();

var uuidToday = uuid.v1({
  timestamp: today
});
var uuidTenhoursago = uuid.v1({
  timestamp: tenhoursago
});
var uuidTwentyeightdayslater = uuid.v1({
  timestamp: twentyeightdayslater
});
var uuidNow = uuid.v1();

var ids = [uuidTenhoursago, uuidToday, uuidNow, uuidTwentyeightdayslater];

console.log('Test if ids are in order:');
compare(ids);

// Betwenn uuidToday and uuidTenhoursago the clock is set backwards, so we
// expect the clock_seq to increase by one
assert.ok(uuidToday.slice(19, 23) < uuidTenhoursago.slice(19, 23), 'clock_seq was not increased');
// Same for uuidNow since we set the clock to a future value inbetween
assert.ok(uuidTwentyeightdayslater.slice(19, 23) < uuidNow.slice(19, 23), 'clock_seq was not increased');


// Get first possible v1 uuid for the current millisecond
var now = new Date().getTime();
var onemsafter = new Date(now + 1).getTime();

var uuidFirst = uuid.v1({
  timestamp: now,
  clockseq: 0,
  node: [0, 0, 0, 0, 0, 0]
});
var uuidLast = uuid.v1({
  timestamp: now,
  count: 9999,
  clockseq: 0x3fff,
  node: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
});

console.log('');
console.log('First uuid of timestamp: %d', now);
console.log(uuidFirst);
console.log('Last uuid of timestamp: %d', now);
console.log(uuidLast);

var uuidFirstLater = uuid.v1({
  timestamp: onemsafter,
  clockseq: 0,
  node: [0, 0, 0, 0, 0, 0]
});
var uuidLastLater = uuid.v1({
  timestamp: onemsafter,
  count: 9999,
  clockseq: 0x3fff,
  node: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
});

console.log('');
console.log('First uuid of timestamp: %d', now);
console.log(uuidFirstLater);
console.log('Last uuid of timestamp: %d', now);
console.log(uuidLastLater);

// Check that there is exactly 1 tick between lastUUI and firstUUID of the
// next millisecond interval (this test is sloppy since it fails if time_mid
// or time_hi change when we changed the timestamp by one ms. If we want to
// include that case, we cannot use parseInt() since our integers become
// > 32bit):
var before = uuidLast.split('-');
before = before[0];
var after = uuidFirstLater.split('-');
after = after[0];

var diff = parseInt(after, 16) - parseInt(before, 16);
console.log('');
console.log('Test if theres exactly one 100ns interval between the last uuid ');
console.log('of the current 100ms interval and the first uuid of the next: %d', diff);
assert.strictEqual(diff, 1, 'Not exactly one tick between last and nextFirst');
