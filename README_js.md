```javascript --hide
runmd.onRequire = path => {
  if (path == 'rng') return fun
  return path.replace(/^uuid/, './dist/');
}

// Shim Date and crypto so generated ids are consistent across doc revisions
runmd.Date.prototype.getTime = () => 1551914748172;

let seed = 0xDEFACED;
require('crypto').randomBytes = function() {
  const a = [];
  for (let i = 0; i < 16; i++) a.push((seed = seed * 0x41a7 & 0x7fffffff) & 0xff);
  return a;
}
```

# uuid [![Build Status](https://secure.travis-ci.org/kelektiv/node-uuid.svg?branch=master)](http://travis-ci.org/kelektiv/node-uuid) #

Simple, fast generation of [RFC4122](http://www.ietf.org/rfc/rfc4122.txt) UUIDS.

Features:

* Support for version 1, 3, 4 and 5 UUIDs
* Cross-platform: CommonJS build for Node.js and [ECMAScript Modules](#ecmascript-modules) for the
  browser.
* Uses cryptographically-strong random number APIs (when available)
* Zero-dependency, small footprint (... but not [this small](https://gist.github.com/982883))

## Quickstart - Node.js/CommonJS

```shell
npm install uuid
```

Then generate a random UUID (v4 algorithm), which is almost always what you want ...

Version 4 (random):

```javascript --run v4
const uuid = require('uuid');
uuid.v4(); // RESULT
```

Or generate UUIDs with other algorithms of your choice ...

Version 1 (timestamp):

```javascript --run v1
const uuid = require('uuid');
uuid.v1(); // RESULT
```

Version 3 (namespace):

```javascript --run v3
const uuid = require('uuid');

// ... using predefined DNS namespace (for domain names)
uuid.v3('hello.example.com', uuid.v3.DNS); // RESULT

// ... using predefined URL namespace (for, well, URLs)
uuid.v3('http://example.com/hello', uuid.v3.URL); // RESULT

// ... using a custom namespace
//
// Note: Custom namespaces should be a UUID string specific to your application!
// E.g. the one here was generated using this modules `uuid` CLI.
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
uuid.v3('Hello, World!', MY_NAMESPACE); // RESULT
```

Version 5 (namespace):

```javascript --run v5
const uuid = require('uuid');

// ... using predefined DNS namespace (for domain names)
uuid.v5('hello.example.com', uuid.v5.DNS); // RESULT

// ... using predefined URL namespace (for, well, URLs)
uuid.v5('http://example.com/hello', uuid.v5.URL); // RESULT

// ... using a custom namespace
//
// Note: Custom namespaces should be a UUID string specific to your application!
// E.g. the one here was generated using this modules `uuid` CLI.
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
uuid.v5('Hello, World!', MY_NAMESPACE); // RESULT
```

## ECMAScript Modules / ESM

For usage in the browser `uuid` provides support for [ECMAScript
Modules](https://www.ecma-international.org/ecma-262/6.0/#sec-modules) (ESM) that enable
tree-shaking for bundlers, like [rollup.js](https://rollupjs.org/guide/en/#tree-shaking)
([example](./examples/browser-rollup/)) and [webpack](https://webpack.js.org/guides/tree-shaking/)
([example](./examples/browser-webpack/)).

```javascript
import {v4 as uuid} from 'uuid';
uuid(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
```

There is experimental native ESM support for [the browser](./examples/browser-esmodules/) but it
should not be considered ready for production use and may change or disappear in future releases.

## API

### Version 1 (Timestamp + Node)

```javascript
const uuid = require('uuid');

// Incantations
uuid.v1();
uuid.v1(options);
uuid.v1(options, buffer, offset);
```

Generate and return a RFC4122 v1 (timestamp-based) UUID.

* `options` - (Object) Optional uuid state to apply. Properties may include:

  * `node` - (Array) Node id as Array of 6 bytes (per 4.1.6). Default: Randomly generated ID.  See note 1.
  * `clockseq` - (Number between 0 - 0x3fff) RFC clock sequence.  Default: An internally maintained clockseq is used.
  * `msecs` - (Number) Time in milliseconds since unix Epoch.  Default: The current time is used.
  * `nsecs` - (Number between 0-9999) additional time, in 100-nanosecond units. Ignored if `msecs` is unspecified. Default: internal uuid counter is used, as per 4.2.1.2.

* `buffer` - (Array | Buffer) Array or buffer where UUID bytes are to be written.
* `offset` - (Number) Starting index in `buffer` at which to begin writing.

Returns `buffer`, if specified, otherwise the string form of the UUID

Note: The default [node id](https://tools.ietf.org/html/rfc4122#section-4.1.6) (the last 12 digits in the UUID) is generated once, randomly, on process startup, and then remains unchanged for the duration of the process.

Example: Generate string UUID with fully-specified options

```javascript --run v1
const v1options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date('2011-11-01').getTime(),
  nsecs: 5678
};
uuid.v1(v1options); // RESULT
```

Example: In-place generation of two binary IDs

```javascript --run v1
// Generate two ids in an array
const arr = new Array();
uuid.v1(null, arr, 0);  // RESULT
uuid.v1(null, arr, 16); // RESULT
```

### Version 3 (Namespace)

```javascript
const uuid = require('uuid');

// Incantations
uuid.v3(name, namespace);
uuid.v3(name, namespace, buffer);
uuid.v3(name, namespace, buffer, offset);
```

Generate and return a RFC4122 v3 UUID.

* `name` - (String | Array[]) "name" to create UUID with
* `namespace` - (String | Array[]) "namespace" UUID either as a String or Array[16] of byte values
* `buffer` - (Array | Buffer) Array or buffer where UUID bytes are to be written.
* `offset` - (Number) Starting index in `buffer` at which to begin writing. Default = 0

Returns `buffer`, if specified, otherwise the string form of the UUID

Example:

```javascript --run v3
uuid.v3('hello world', MY_NAMESPACE);  // RESULT
```

### Version 4 (Random)

```javascript
const uuid = require('uuid');

// Incantations
uuid.v4();
uuid.v4(options);
uuid.v4(options, buffer, offset);
```

Generate and return a RFC4122 v4 UUID.

* `options` - (Object) Optional uuid state to apply. Properties may include:
  * `random` - (Number[16]) Array of 16 numbers (0-255) to use in place of randomly generated values
  * `rng` - (Function) Random # generator function that returns an Array[16] of byte values (0-255)
* `buffer` - (Array | Buffer) Array or buffer where UUID bytes are to be written.
* `offset` - (Number) Starting index in `buffer` at which to begin writing.

Returns `buffer`, if specified, otherwise the string form of the UUID

Example: Generate string UUID with predefined `random` values

```javascript --run v4
const v4options = {
  random: [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea,
    0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36
  ]
};
uuid.v4(v4options); // RESULT
```

Example: Generate two IDs in a single buffer

```javascript --run v4
const buffer = new Array();
uuid.v4(null, buffer, 0);  // RESULT
uuid.v4(null, buffer, 16); // RESULT
```

### Version 5 (Namespace)

```javascript
const uuid = require('uuid');

// Incantations
uuid.v5(name, namespace);
uuid.v5(name, namespace, buffer);
uuid.v5(name, namespace, buffer, offset);
```

Generate and return a RFC4122 v5 UUID.

* `name` - (String | Array[]) "name" to create UUID with
* `namespace` - (String | Array[]) "namespace" UUID either as a String or Array[16] of byte values
* `buffer` - (Array | Buffer) Array or buffer where UUID bytes are to be written.
* `offset` - (Number) Starting index in `buffer` at which to begin writing. Default = 0

Returns `buffer`, if specified, otherwise the string form of the UUID

Example:

```javascript --run v5
uuid.v5('hello world', MY_NAMESPACE);  // RESULT
```

## Command Line

UUIDs can be generated from the command line with the `uuid` command.

```shell
$ uuid
ddeb27fb-d9a0-4624-be4d-4615062daed4

$ uuid v1
02d37060-d446-11e7-a9fa-7bdae751ebe1
```

Type `uuid --help` for usage details

## Testing

```shell
npm test
```
