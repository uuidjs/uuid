
# uuid [![Build Status](https://secure.travis-ci.org/kelektiv/node-uuid.svg?branch=master)](http://travis-ci.org/kelektiv/node-uuid) #

Simple, fast generation of [RFC4122](http://www.ietf.org/rfc/rfc4122.txt) UUIDS.

Features:

* Support for version 1, 4 and 5 UUIDs
* Cross-platform
* Uses cryptographically-strong random number APIs (when available)
* Zero-dependency, small footprint (... but not [this small](https://gist.github.com/982883))

## Quickstart - CommonJS (Recommended)

```shell
npm install uuid
```

Then generate your uuid version of choice ...

Version 1 (timestamp):

```javascript
var uuidv1 = require('uuid/v1');
uuidv1(); // ⇨ '72164140-5b4d-11e7-9234-f94a466131fa'

```

Version 4 (random):

```javascript
var uuidv4 = require('uuid/v4');
uuidv4(); // ⇨ 'ae6c0c32-5035-43fb-b869-0a758ce1ca5e'

```

Version 5 (namespace):

```javascript
var uuidv5 = require('uuid/v5');

// ... using predefined DNS namespace (for domain names)
uuidv5('hello.example.com', uuidv5.DNS); // ⇨ 'fdda765f-fc57-5604-a269-52a7df8164ec'

// ... using predefined URL namespace (for, well, URLs)
uuidv5('http://example.com/hello', uuidv5.URL); // ⇨ '3bbcee75-cecc-5b56-8031-b6641c1ed1f1'

// ... using a custom namespace
//
// Note: Custom namespaces should be a UUID string specific to your application!
// E.g. the one here was generated using this modules `uuid` CLI.
var MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
uuidv5('Hello, World!', MY_NAMESPACE); // ⇨ '630eb68f-e0fa-5ecc-887a-7c7a62614681'

```

## Quickstart - Browser-ready Versions

Browser-ready versions of this module are available via [wzrd.in](https://github.com/jfhbrook/wzrd.in).

For version 1 uuids:

```html
<script src="http://wzrd.in/standalone/uuid%2Fv1@latest"></script>
<script>
uuidv1(); // -> v1 UUID
</script>
```

For version 4 uuids:

```html
<script src="http://wzrd.in/standalone/uuid%2Fv4@latest"></script>
<script>
uuidv4(); // -> v4 UUID
</script>
```

For version 5 uuids:

```html
<script src="http://wzrd.in/standalone/uuid%2Fv5@latest"></script>
<script>
uuidv5('http://example.com/hello', uuidv5.URL); // -> v5 UUID
</script>
```

## API

### Version 1

```javascript
var uuidv1 = require('uuid/v1');

// Incantations
uuidv1();
uuidv1(options);
uuidv1(options, buffer, offset);
```

Generate and return a RFC4122 v1 (timestamp-based) UUID.

* `options` - (Object) Optional uuid state to apply. Properties may include:

  * `node` - (Array) Node id as Array of 6 bytes (per 4.1.6). Default: Randomly generated ID.  See note 1.
  * `clockseq` - (Number between 0 - 0x3fff) RFC clock sequence.  Default: An internally maintained clockseq is used.
  * `msecs` - (Number | Date) Time in milliseconds since unix Epoch.  Default: The current time is used.
  * `nsecs` - (Number between 0-9999) additional time, in 100-nanosecond units. Ignored if `msecs` is unspecified. Default: internal uuid counter is used, as per 4.2.1.2.

* `buffer` - (Array | Buffer) Array or buffer where UUID bytes are to be written.
* `offset` - (Number) Starting index in `buffer` at which to begin writing.

Returns `buffer`, if specified, otherwise the string form of the UUID

Note: The <node> id is generated guaranteed to stay constant for the lifetime of the current JS runtime. (Future versions of this module may use persistent storage mechanisms to extend this guarantee.)

Example: Generate string UUID with fully-specified options

```javascript
var options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date('2011-11-01').getTime(),
  nsecs: 5678
};
uuidv1(options); // ⇨ '710b962e-041c-11e1-9234-0123456789ab'

```

Example: In-place generation of two binary IDs

```javascript
// Generate two ids in an array
var arr = new Array();
uuidv1(null, arr, 0);  // ⇨ [ 114, 22, 182, 112, 91, 77, 17, 231, 146, 52, 249, 74, 70, 97, 49, 250 ]
uuidv1(null, arr, 16); // ⇨ [ 114, 22, 182, 112, 91, 77, 17, 231, 146, 52, 249, 74, 70, 97, 49, 250, 114, 22, 182, 113, 91, 77, 17, 231, 146, 52, 249, 74, 70, 97, 49, 250 ]

```

### Version 4

```javascript
var uuidv4 = require('uuid/v4')

// Incantations
uuidv4();
uuidv4(options);
uuidv4(options, buffer, offset);
```

Generate and return a RFC4122 v4 UUID.

* `options` - (Object) Optional uuid state to apply. Properties may include:
  * `random` - (Number[16]) Array of 16 numbers (0-255) to use in place of randomly generated values
  * `rng` - (Function) Random # generator function that returns an Array[16] of byte values (0-255)
* `buffer` - (Array | Buffer) Array or buffer where UUID bytes are to be written.
* `offset` - (Number) Starting index in `buffer` at which to begin writing.

Returns `buffer`, if specified, otherwise the string form of the UUID

Example: Generate string UUID with predefined `random` values

```javascript
var options = {
  random: [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea,
    0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36
  ]
};
uuidv4(options); // ⇨ '109156be-c4fb-41ea-b1b4-efe1671c5836'

```

Example: Generate two IDs in a single buffer

```javascript
var buffer = new Array();
uuidv4(null, buffer, 0);  // ⇨ [ 0, 80, 12, 81, 66, 195, 73, 102, 183, 155, 166, 7, 156, 8, 2, 48 ]
uuidv4(null, buffer, 16); // ⇨ [ 0, 80, 12, 81, 66, 195, 73, 102, 183, 155, 166, 7, 156, 8, 2, 48, 232, 224, 39, 13, 154, 18, 68, 157, 166, 88, 93, 106, 73, 171, 223, 89 ]

```

### Version 5

```javascript
var uuidv5 = require('uuid/v5');

// Incantations
uuidv5(name, namespace);
uuidv5(name, namespace, buffer);
uuidv5(name, namespace, buffer, offset);
```

Generate and return a RFC4122 v5 UUID.

* `name` - (String | Array[]) "name" to create UUID with
* `namespace` - (String | Array[]) "namespace" UUID either as a String or Array[16] of byte values
* `buffer` - (Array | Buffer) Array or buffer where UUID bytes are to be written.
* `offset` - (Number) Starting index in `buffer` at which to begin writing. Default = 0

Returns `buffer`, if specified, otherwise the string form of the UUID

Example:

```javascript
// Generate a unique namespace (typically you would do this once, outside of
// your project, then bake this value into your code)
var uuidv4 = require('uuid/v4');
var uuidv5 = require('uuid/v5');
var MY_NAMESPACE = uuidv4();    // ⇨ '50050e0a-b282-47d0-a1b6-d3d7875c8202'

// Generate a couple namespace uuids
uuidv5('hello', MY_NAMESPACE);  // ⇨ 'cd8eea2d-fcb3-5ff7-acc6-8a68ac9625d1'
uuidv5('world', MY_NAMESPACE);  // ⇨ 'a0224e2a-273d-5bb5-8f5b-722638d10595'

```

## Command Line

UUIDs can be generated from the command line with the `uuid` command.

```shell
$ uuid
ddeb27fb-d9a0-4624-be4d-4615062daed4
```

Type `uuid --help` for usage details

## Testing

```shell
npm test
```

## Deprecated API

The API below is available for legacy purposes and is not expected to be available post-3.X

```javascript
var uuid = require('uuid');

uuid.v1(...); // alias of uuid/v1
uuid.v4(...); // alias of uuid/v4
uuid(...);    // alias of uuid/v4

// uuid.v5() is not supported in this API
```

## Legacy node-uuid package

The code for the legacy node-uuid package is available in the `node-uuid` branch.

----
Markdown generated from [README_js.md](README_js.md) by [![RunMD Logo](http://i.imgur.com/h0FVyzU.png)](https://github.com/broofa/runmd)