# node-uuid

Generate standards-compliant UUID strings.

This module is a distillation of the UUID work detailed at [broofa.com](http://www.broofa.com/2008/09/javascript-uuid-function/).  It provides a fast, pure-JS, method for generating RFC4122(v4) UUIDS, and will work on most JS platforms.

Before installing this, you should probably also look at Nikhil Marathe's [uuid module](https://bitbucket.org/nikhilm/uuidjs).  It's uses the native libuuid API to support generation of both string and binary forms of UUIDs, and is ~1.5X faster. (But it's *only* 1.5X faster  - node-uuid can generate &gt; 200K strings/second on a modern system).

So why this module?  Because there are platforms where libuuid may not be available, and having a performant solution on those may prove useful.

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
