= node-uuid

Generate RFC4122(v4) compliant UUID strings.

== Usage

    var uuid = require('node-uuid');
    var id = uuid(); /// -> '92329D39-6F5C-4520-ABFC-AAB64544E172'

== Other UUID modules

    There area couple other node uuid-related modules out there, but the only
    one I've found that's of much interest is Nikhil Marathe's `uuidjs` module.
    Being built on the native libuuid library, it is both fast and powerful (it
    can generate binary UUIDs, something I haven't tackled here.)

    So why have node-uuid?

    The main reason is that an all-JS implementation provides consistent UUID
    generation on both client and server. (node-uuid works in browsers).



