# node-uuid

Simple, fast generation of [RFC4122](http://www.ietf.org/rfc/rfc4122.txt) UUIDS.

Features:

* Version 1 (time-based) and version 4 (random) UUID generation
* Very good performance (~1M+ UUIDs/second on "modern" hardware)
* Pure JS runs in both node.js and all browsers.
* Uses cryptographically strong random # generation (where available)

## Getting Started

Install it in your browser:

```html
<script src="uuid.js"></script>
```

Or in node.js:

```
npm install node-uuid
```

```javascript
var uuid = require('node-uuid');
```

Then create some ids ...

```javascript
// Generate a v1 (time-based) id
uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

// Generate a v4 (random) id
uuid.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
```

## API

### uuid.v1([`options` [, `buffer` [, `offset`]]])

Generate and return a RFC4122 v1 (timestamp-based) UUID.

* **`options`** - (Object) Object with one or more of the following properties (note 1):

  * **`node`** (Number[6]) Array of 6 bytes to use for the node field (per 4.1.6). Default: An internally generated node ID is used (note 2).
  * **`clockseq`** - (Number between 0 - 0x3fff) RFC clock sequence.  Default: An internally maintained clockseq is used.
  * **`msecs`** - (Number | Date) Time in milliseconds since unix Epoch.  Default: The current time is used (note 3)
  * **`nsecs`** - (Number between 0-9999) additional time, in 100-nanosecond. Ignored if `msecs` is unspecified. Default: internal uuid counter is used, as per 4.2.1.2.

* **`buffer`** - (Array | Buffer) Array or buffer where UUID bytes are to be written.
* **`offset`** - (Number) Starting index in `buffer` at which to begin writing.

_Returns_ `buffer`, if specified, otherwise the string form of the UUID

Notes:

1. For backward compatibility with v1.2, `options` may be a string, "binary", to indicate the UUID should be returned as an Array or Buffer of bytes.  As this option is largely redundant with the `buffer` argument, this feature has been deprecated and will be removed in future versions.)
1. Currently the internally generated node id is guaranteed to remain constant only for the lifetime of the current JS runtime. Currentl  Future versions of this module may guarantee
1. Providing the `msecs` option disables the internal logic for ensuring id uniqueness!  It may make sense to also provide `clockseq` and `nsecs` options as well in this case.

Example: Generate string UUID with fully-specified options

```javascript
uuid.v1({
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date('2011-11-01'),
  nsecs: 5678
});
// -> "710b962e-041c-11e1-9234-0123456789ab"
```

Example: Generate two binary IDs in a single buffer

```javascript
var buffer = new Array(32); // (or 'new Buffer' in node.js)
uuid.v1(null, buffer, 0);
uuid.v1(null, buffer, 16);
```

### uuid.v4([`options` [, `buffer` [, `offset`]]])

Generate and return a RFC4122 v1 (timestamp-based) UUID.

* **`options`** - (Object) Object with one or more of the following properties (note 1):

  * **`random`** - (Number[16]) Array of 16 random 8-bit values.  Default: values generated randomly.

* **`buffer`** - (Array | Buffer) Array or buffer where UUID bytes are to be written.
* **`offset`** - (Number) Starting index in `buffer` at which to begin writing.

_Returns_ `buffer`, if specified, otherwise the string form of the UUID

Notes:

1. For backward compatibility with v1.2, `options` may be a string, "binary", to indicate the UUID should be returned as an Array or Buffer of bytes.  As this option is largely redundant with the `buffer` argument, this feature has been deprecated and will be removed in future versions.)

Example: Generate string UUID with fully-specified options

```javascript
uuid.v4({
  random: [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea,
    0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36
  ]
});
// -> "109156be-c4fb-41ea-b1b4-efe1671c5836"
```

Example: Generate two binary IDs in a single buffer

```javascript
var buffer = new Array(32); // (or 'new Buffer' in node.js)
uuid.v1(null, buffer, 0);
uuid.v1(null, buffer, 16);
```

### uuid.parse(id[, buffer[, offset]])
### uuid.unparse(buffer[, offset])

Parse and unparse UUIDs

  * **`id`** - (String) UUID(-like) string
  * **`buffer`** - (Array | Buffer) Array or buffer where UUID bytes are to be written. Default: A new Array or Buffer is used
  * **`offset`** - (Number) Starting index in `buffer` at which to begin writing. Default: 0

Example parsing and unparsing a UUID string
```javascript
var binary = uuid.parse('797ff043-11eb-11e1-80d6-510998755d10');
// -> <Buffer 79 7f f0 43 11 eb 11 e1 80 d6 51 09 98 75 5d 10>
var string = uuid.unparse(binary);
// -> '797ff043-11eb-11e1-80d6-510998755d10'
```

### uuid.noConflict()

(Browsers only) Set `uuid` property back to it's previous value.

_Returns_ the node-uuid object.

Example:
```javascript
var myUuid = uuid.noConflict();
myUuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
```

### uuid.BufferClass (deprecated)
The class of container for storing byte representations of UUIDs.  Available as part of v1.2, deprecated in v1.3, this property will likely be removed in future versions.

## Testing

In node.js

```
> cd test
> node uuid.js
> node options.js
```

In Browser

```
open test/test.html
```

### Performance

Requires node.js

```
npm install uuid uuid-js
node test/benchmark.js
```

For browser performance [checkout the JSPerf tests](http://jsperf.com/node-uuid-performance).
