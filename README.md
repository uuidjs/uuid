# node-uuid

Generate RFC4122(v4) UUID strings.

This module is a distillation of the UUID work detailed at
(broofa.com)[http://www.broofa.com/2008/09/javascript-uuid-function/].  It
provides a fast, pure-JS, UUID method that will work on most JS platforms.

Before installing this, you should probably also look atNikhil Marathe's
(uuid)[https://bitbucket.org/nikhilm/uuidjs] module.  It's uses the native
libuuid API to support generation of both string and binary forms of UUIDs, and
is ~1.5X faster. (But it's *only* 1.5X faster :-) ).

But if working in browsers is important to you, this may be the code for you.

## Usage

    var uuid = require('node-uuid');
    var id = uuid(); // -> '92329D39-6F5C-4520-ABFC-AAB64544E172'
