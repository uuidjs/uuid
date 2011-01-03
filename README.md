# node-uuid

Generate standards-compliant UUID strings.

This module is a distillation of the UUID work detailed at
[broofa.com](http://www.broofa.com/2008/09/javascript-uuid-function/).  It
provides a fast, pure-JS, method for generating RFC4122(v4) UUIDS and will
work on any JS platform.

Before installing this, you should probably also look at Nikhil Marathe's [uuid module](https://bitbucket.org/nikhilm/uuidjs).  It's uses the native libuuid API to support generation of both string and binary forms of UUIDs, and is slightly faster. (But it's *only* slightly faster - on my 2.66GHz Macbook Pro using the test/benchmark.js script node-uuid clocked in at 452K uuids/sec, compared to uuidjs at 535K uuids/sec.)

So why this module?  There are platforms where the libuuid API may not be available, and having a fast, light-weight alternative is always nice.

## Installation

    npm install node-uuid

## Usage

### In node.js

    var uuid = require('node-uuid');
    var id = uuid(); // -> '92329D39-6F5C-4520-ABFC-AAB64544E172'

### In browser

    <script src="uuid.js"></script>
    <script>
      var id = uuid(); // -> '92329D39-6F5C-4520-ABFC-AAB64544E172'
    <script>

## Testing

The provided test verifies the syntax of 100K generated uuids to make sure they conform to the RFC412(v4) spec.  The test also provides data on how often each digit appears and the % variation from the expected ideal for a perfect random # generator, as a way of verifying (ad hoc) randomness.

### In node.js

    > node test/test.js

### In browser

    Open test/test.html
