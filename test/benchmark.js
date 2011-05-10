var nodeuuid = new (require('../uuid'))(),
    uuidjs = new (require('uuid').generate)(),
    N = 5e5;

function rate(msg, t) {
  console.log(msg + ': ' +
    (N / (Date.now() - t) * 1e3 | 0) +
    ' uuids/second');
}

// node-uuid - string form
for (var i = 0, t = Date.now(); i < N; i++) nodeuuid.generate();
rate('nodeuuid()', t);

for (var i = 0, t = Date.now(); i < N; i++) nodeuuid.generate('binary');
rate('nodeuuid(\'binary\')', t);

var buffer = new nodeuuid.BufferClass(16);
for (var i = 0, t = Date.now(); i < N; i++) nodeuuid.generate('binary', buffer);
rate('nodeuuid(\'binary\', buffer)', t);

// node-uuid - string form
for (var i = 0, t = Date.now(); i < N; i++) uuidjs.generate();
rate('uuidjs()', t);

for (var i = 0, t = Date.now(); i < N; i++) uuidjs.generate('binary');
rate('uuidjs(\'binary\')', t);
