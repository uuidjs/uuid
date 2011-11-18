var uuid = require('../uuid');

var today = new Date().getTime();
var tenhoursago = new Date(today - 10*3600*1000).getTime();

function compare(ids) {
  console.log(ids);
  for (var i = 0; i < ids.length; i++) {
    var id = ids[i].split('-');
    id = [id[2], id[1], id[0], id[3], id[4]].join('');
    ids[i] = id;
  }
  var sorted = ([].concat(ids)).sort();

  if (sorted.toString() !== ids.toString()) {
    console.log('Warning: sorted !== ids');
  } else {
    console.log('everything in order!');
  }
}

var uuidToday = uuid.v1({
  timestamp: today
});
var uuidTenhoursago = uuid.v1({
  timestamp: tenhoursago
});
var uuidNow = uuid.v1();

var ids = [uuidTenhoursago, uuidToday, uuidNow];

console.log('Test if ids are in order:');
compare(ids);

