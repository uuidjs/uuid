# node-uuid

Simple, fast generation of [RFC4122 (v1 and v4)](http://www.ietf.org/rfc/rfc4122.txt) UUIDS.  It runs in node.js and all major browsers.

## Installation

    npm install node-uuid

### In browser

    <script src="uuid.js"></script>

Enables:

    uuid.v1(); // -> v1 uuid
    uuid.v4(); // -> v4 uuid

### In node.js

    var uuid = require('node-uuid').v1;
    uuid(); // -> v1 uuid

    // ... or ...
    var uuid = require('node-uuid').v4;
    uuid(); // -> v4 uuid

    // ... or ...
    var uuid = require('node-uuid');
    uuid(); // -> v4 uuid (deprecated, use one of the methods below)
    uuid.v1(); // -> v1 uuid
    uuid.v4(); // -> v4 uuid

## Usage

### Generate a String UUID

    var id = uuid(); // -> '92329D39-6F5C-4520-ABFC-AAB64544E172'

### Generate a Binary UUID

    // Simple form - allocates a Buffer/Array for you
    var buf = uuid('binary');
    // node.js -> <Buffer 08 50 05 c8 9c b2 4c 07 ac 07 d1 4f b9 f5 04 51>
    // browser -> [8, 80, 5, 200, 156, 178, 76, 7, 172, 7, 209, 79, 185, 245, 4, 81]

    // Provide your own Buffer or Array
    var buf = new Array(16);
    uuid('binary', buf); // -> [8, 80, 5, 200, 156, 178, 76, 7, 172, 7, 209, 79, 185, 245, 4, 81]
    var buf = new Buffer(16);
    uuid('binary', buf); // -> <Buffer 08 50 05 c8 9c b2 4c 07 ac 07 d1 4f b9 f5 04 51>

    // Provide your own Buffer/Array, plus specify offset
    // (e.g. here we fill an array with 3 uuids)
    var buf = new Buffer(16 \* 3);
    uuid('binary', id, 0);
    uuid('binary', id, 16);
    uuid('binary', id, 32);

## Testing

test/test.js generates performance data (similar to test/benchmark.js). It also verifies the syntax of 100K string UUIDs, and logs the distribution of hex digits found therein.  For example:

    - - - Performance Data - - -
    uuid.v4(): 1470588 uuids/second
    uuid.v4('binary'): 1041666 uuids/second
    uuid.v4('binary', buffer): 3125000 uuids/second
    uuid.v1(): 869565 uuids/second
    uuid.v1('binary'): 625000 uuids/second
    uuid.v1('binary', buffer): 1123595 uuids/second

    - - - Distribution of Hex Digits (% deviation from ideal) - - -
    0 |================================| 187378 (-0.07%)
    1 |================================| 186972 (-0.28%)
    2 |================================| 187274 (-0.12%)
    3 |================================| 187392 (-0.06%)
    4 |==================================================| 286998 (-0.17%)
    5 |================================| 187525 (0.01%)
    6 |================================| 188019 (0.28%)
    7 |================================| 187541 (0.02%)
    8 |=====================================| 212941 (0.21%)
    9 |====================================| 212308 (-0.09%)
    a |====================================| 211923 (-0.27%)
    b |=====================================| 212605 (0.05%)
    c |================================| 187608 (0.06%)
    d |================================| 188473 (0.52%)
    e |================================| 187547 (0.03%)
    f |================================| 187496 (0%)

Note that the increased values for 4 and 8-B are expected as part of the RFC4122 syntax (and are accounted for in the deviation calculation). BTW, if someone wants to do the calculation to determine what a statistically significant deviation would be, I'll gladly add that to the test.

### In browser

    Open test/test.html

### In node.js

    > node test/test.js

node.js users can also run the node-uuid .vs. uuid.js benchmark:

    > node test/benchmark.js

## Performance

### In node.js

node-uuid is designed to be fast.  That said, the target platform is node.js, where it is screaming fast.  Here's what I get on an Intel Core i7 950 @ 3.07GHz for the test/benchmark.js script:

    # v4
    nodeuuid.v4(): 1577287 uuids/second
    nodeuuid.v4('binary'): 1033057 uuids/second
    nodeuuid.v4('binary', buffer): 3012048 uuids/second
    uuid(): 266808 uuids/second
    uuid('binary'): 302480 uuids/second
    uuidjs.create(4): 360750 uuids/second
    # v1
    nodeuuid.v1(): 905797 uuids/second
    nodeuuid.v1('binary'): 557413 uuids/second
    nodeuuid.v1('binary', buffer): 1240694 uuids/second
    uuidjs.create(1): 201369 uuids/second

The uuid() entries are for Nikhil Marathe's [uuid module](https://bitbucket.org/nikhilm/uuidjs), the uuidjs() entries are for Patrick Negri's [uuid-js module](https://github.com/pnegri/uuid-js), and they are provided for comparison. uuid is a wrapper around the native libuuid library, uuid-js is a pure javascript implementation based on [UUID.js](https://github.com/LiosK/UUID.js) by LiosK.

### In browser

node-uuid performance varies dramatically across browsers.  For comprehensive test results, please [checkout the JSPerf tests](http://jsperf.com/node-uuid-performance).
