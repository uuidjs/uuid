# node-uuid

Generate standards-compliant UUID strings.

This module provides a fast (possibly the fastest?) solution for generating string and binary [RFC4122(v4)](http://www.ietf.org/rfc/rfc4122.txt) UUIDS.  It runs in node.js and all major browsers.

## Installation

    npm install node-uuid

### In browser

    <script src="uuid.js"></script>

### In node.js

    var uuid = require('node-uuid');

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

test/test.js generates performance data (similar to test/benchmark.js). It also verifies the syntax of 100K string UUIDs, and logs the distribution of hex digits found therein.

(BTW, if someone wants to do the calculation to determine what a statistically significant deviation would be, I'll gladly add that to the the test.)

### In browser

    Open test/test.html

### In node.js

    > node test/test.js

node.js users can also run the node-uuid .vs. uuid.js benchmark:

    > node test/benchmark.js

## Performance

### In node.js

node-uuid is designed to be fast.  That said, the target platform is node.js, where it is screaming fast.  Here's what I get on my 2.66GHz Macbook Pro for the test/benchmark.js script:

    nodeuuid(): 1126126 uuids/second
    nodeuuid('binary'): 782472 uuids/second
    nodeuuid('binary', buffer): 2688172 uuids/second
    uuidjs(): 620347 uuids/second
    uuidjs('binary'): 1275510 uuids/second

The uuidjs() entries are for Nikhil Marathe's [uuidjs module](https://bitbucket.org/nikhilm/uuidjs), and are provided for comparison.  uuidjs is a wrapper around the native libuuid library.

### In node.js

node-uuid performance varies dramatically across browsers.  For comprehensive test results, please [checkout the JSPerf tests](http://jsperf.com/node-uuid-performance).
