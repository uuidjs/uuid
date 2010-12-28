function bench(f, msg, n) {
  var start = Date.now();
  for (var i = 0; i < n; i++) {
    f();
  }
  var t = Date.now() - start;
  console.log(msg + ': ' + (n / (t / 1000) | 0) + ' times per second');
}

bench(require('../uuid'), 'node-uuid', 1e6);
bench(require('uuid'.generate), 'uuid.js', 1e6);
