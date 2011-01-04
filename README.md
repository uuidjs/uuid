# node-uuid

Generate standards-compliant UUID strings.

This module provides a fast (possibly *the* fastest?), pure-JS, method for generating [RFC4122(v4)](http://www.ietf.org/rfc/rfc4122.txt) UUIDS.  It is designed to work in both node.js and all major browsers.

You might also consider Nikhil Marathe's [uuid module](https://bitbucket.org/nikhilm/uuidjs).  It uses the native libuuid API to support generation of both string and binary forms of UUIDs, and is slightly faster. (But it's *only* slightly faster - on my 2.66GHz Macbook Pro, using test/benchmark.js, node-uuid clocked in at ~590K uuids/sec. Contrast to uuidjs, at ~620K uuids/sec.)

So why node-uuid?  Generating UUIDs should be a fast, should conform to the RFC spec, and should work in any JS environment.  It is surprisingly easy to write a UUID generator that fails to meet one or more of these goals.  This was a fun challenge and the result leverages some interesting nuances (such as minimizing calls to random() and caching function-local references to the various arrays).  I hope you find the result useful.

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

## Implementation notes

This is a continuation of the UUID work detailed at [broofa.com](http://www.broofa.com/2008/09/javascript-uuid-function/).

The code has gone through quite a few iterations, with the most recent coming from Cory Ondrejka's suggestion to unroll the for-loop I'd been using previously.  At first glance this may appear to bloat the code a bit, the end result is code that is 30% faster and, when gzip'ed, 30% *smaller* than featured previously.  Go figure.
