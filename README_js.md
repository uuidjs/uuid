```javascript --hide
runmd.onRequire = (path) => {
  if (path == 'rng') return fun;
  return path.replace(/^uuid/, './dist/');
};

// Shim Date and crypto so generated ids are consistent across doc revisions
runmd.Date.prototype.getTime = () => 1551914748172;

let seed = 0xdefaced;
require('crypto').randomBytes = function() {
  const a = [];
  for (let i = 0; i < 16; i++) a.push((seed = (seed * 0x41a7) & 0x7fffffff) & 0xff);
  return a;
};
```

# uuid [![Build Status](https://github.com/uuidjs/uuid/workflows/CI/badge.svg)](https://github.com/uuidjs/uuid/actions)

Simple, fast generation of [RFC4122](http://www.ietf.org/rfc/rfc4122.txt) UUIDs.

Features:

- Support for version 1, 3, 4 and 5 UUIDs
- Cross-platform: CommonJS build for Node.js and [ECMAScript Modules](#ecmascript-modules) for the
  browser.
- Uses cryptographically-strong random number APIs
- Zero-dependency, small footprint

⚠️⚠️⚠️ This is the README of the upcoming major version of this library. You can still [access the README
of the current stable version](https://github.com/uuidjs/uuid/blob/v3.4.0/README.md). ⚠️⚠️⚠️

## Upgrading from v3.x of this Library

The latest major version of this library is v7.x and the previous major version was v3.x. We
decided to jump v4.x, v5.x and v6.x in order to avoid any confusion with [version
4](#version-4-random) and [version 5](#version-5-namespace) UUIDs and the [version 6 UUID
proposal](http://gh.peabody.io/uuidv6/).

In v3.x of this library we were promoting the use of deep requires to reduce bundlesize for browser
builds:

```javascript
const uuidv4 = require('uuid/v4');
uuidv4();
```

As of v7.x this library has been converted to ECMAScript Modules and deep requires are now
deprecated and may be removed in a future major version of this library.

Since all modern bundlers like rollup or Webpack support tree-shaking for ECMAScript Modules out of
the box we now encourage you to use modern `import` syntax instead, see [ECMAScript Modules /
ESM](#ecmascript-modules--esm):

```javascript
import { v4 as uuidv4 } from 'uuid';
uuidv4();
```

For use as CommonJS module with Node.js you can use:

```javascript
const { v4: uuidv4 } = require('uuid');
uuidv4();
```

## Quickstart - Node.js/CommonJS

```shell
npm install uuid
```

Then generate a random UUID (v4 algorithm), which is almost always what you want ...

Version 4 (random):

```javascript --run v4
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // RESULT
```

Or generate UUIDs with other algorithms of your choice ...

Version 1 (timestamp):

```javascript --run v1
import { v1 as uuidv1 } from 'uuid';
uuidv1(); // RESULT
```

Version 3 (namespace):

```javascript --run v3
import { v3 as uuidv3 } from 'uuid';

// ... using predefined DNS namespace (for domain names)
uuidv3('hello.example.com', uuidv3.DNS); // RESULT

// ... using predefined URL namespace (for, well, URLs)
uuidv3('http://example.com/hello', uuidv3.URL); // RESULT

// ... using a custom namespace
//
// Note: Custom namespaces should be a UUID string specific to your application!
// E.g. the one here was generated using this modules `uuid` CLI.
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
uuidv3('Hello, World!', MY_NAMESPACE); // RESULT
```

Version 5 (namespace):

```javascript --run v5
import { v5 as uuidv5 } from 'uuid';

// ... using predefined DNS namespace (for domain names)
uuidv5('hello.example.com', uuidv5.DNS); // RESULT

// ... using predefined URL namespace (for, well, URLs)
uuidv5('http://example.com/hello', uuidv5.URL); // RESULT

// ... using a custom namespace
//
// Note: Custom namespaces should be a UUID string specific to your application!
// E.g. the one here was generated using this modules `uuid` CLI.
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
uuidv5('Hello, World!', MY_NAMESPACE); // RESULT
```

## Supported Platforms

- Node.js: All LTS, i.e. 8.x, 10.x, 12.x
- Browsers (with bundlers like webpack/rollup):
  - Chrome: >= 49
  - Safari: >= 10
  - Firefox: >= 44
  - Edge: >= 15
  - IE: 11

## ECMAScript Modules / ESM

For usage in the browser `uuid` provides support for [ECMAScript
Modules](https://www.ecma-international.org/ecma-262/6.0/#sec-modules) (ESM) that enable
tree-shaking for bundlers, like [rollup.js](https://rollupjs.org/guide/en/#tree-shaking)
([example](./examples/browser-rollup/)) and [webpack](https://webpack.js.org/guides/tree-shaking/)
([example](./examples/browser-webpack/)).

```javascript
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
```

There is experimental native ESM support for [the browser](./examples/browser-esmodules/) but it
should not be considered ready for production use and may change or disappear in future releases.

To run the examples you must first create a dist build of this library in the module root:

```
npm run build
```

## API

### Version 4 (Random)

```javascript
import { v4 as uuidv4 } from 'uuid';

// Incantations
uuidv4();
uuidv4(options);
uuidv4(options, buffer, offset);
```

Generate and return a RFC4122 v4 UUID.

- `options` - (Object) Optional uuid state to apply. Properties may include:
  - `random` - (Number[16]) Array of 16 numbers (0-255) to use in place of randomly generated values. Takes precedence over `options.rng`.
  - `rng` - (Function) Random # generator function that returns an Array[16] of byte values (0-255). Alternative to `options.random`.
- `buffer` - (Array | Buffer) Array or buffer where UUID bytes are to be written.
- `offset` - (Number) Starting index in `buffer` at which to begin writing.

Returns `buffer`, if specified, otherwise the string form of the UUID

Example: Generate string UUID with predefined `random` values

```javascript --run v4
const v4options = {
  random: [
    0x10,
    0x91,
    0x56,
    0xbe,
    0xc4,
    0xfb,
    0xc1,
    0xea,
    0x71,
    0xb4,
    0xef,
    0xe1,
    0x67,
    0x1c,
    0x58,
    0x36,
  ],
};
uuidv4(v4options); // RESULT
```

Example: Generate two IDs in a single buffer

```javascript --run v4
const buffer = new Array();
uuidv4(null, buffer, 0); // RESULT
uuidv4(null, buffer, 16); // RESULT
```

### Version 1 (Timestamp + Node)

⚠️⚠️⚠️ **Please make sure to check whether you really need the timestamp properties of Version 1 UUIDs
before using them. In many cases, Version 4 random UUIDs are the better choice. [This
FAQ](https://github.com/tc39/proposal-uuid#faq) covers more details.** ⚠️⚠️⚠️

```javascript
import { v1 as uuidv1 } from 'uuid';

// Incantations
uuidv1();
uuidv1(options);
uuidv1(options, buffer, offset);
```

Generate and return a RFC4122 v1 (timestamp-based) UUID.

- `options` - (Object) Optional uuid state to apply. Properties may include:
  - `node` - (Array) Node id as Array of 6 bytes (per 4.1.6). Default: Randomly generated ID. See note 1.
  - `clockseq` - (Number between 0 - 0x3fff) RFC clock sequence. Default: An internally maintained clockseq is used.
  - `msecs` - (Number) Time in milliseconds since unix Epoch. Default: The current time is used.
  - `nsecs` - (Number between 0-9999) additional time, in 100-nanosecond units. Ignored if `msecs` is unspecified. Default: internal uuid counter is used, as per 4.2.1.2.
  - `random` - (Number[16]) Array of 16 numbers (0-255) to use for initialization of `node` and `clockseq` as described above. Takes precedence over `options.rng`.
  - `rng` - (Function) Random # generator function that returns an Array[16] of byte values (0-255). Alternative to `options.random`.
- `buffer` - (Array | Buffer) Array or buffer where UUID bytes are to be written.
- `offset` - (Number) Starting index in `buffer` at which to begin writing.

Returns `buffer`, if specified, otherwise the string form of the UUID

Note: The default [node id](https://tools.ietf.org/html/rfc4122#section-4.1.6) (the last 12 digits in the UUID) is generated once, randomly, on process startup, and then remains unchanged for the duration of the process.

Example: Generate string UUID with fully-specified options

```javascript --run v1
const v1options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date('2011-11-01').getTime(),
  nsecs: 5678,
};
uuidv1(v1options); // RESULT
```

Example: In-place generation of two binary IDs

```javascript --run v1
// Generate two ids in an array
const arr = new Array();
uuidv1(null, arr, 0); // RESULT
uuidv1(null, arr, 16); // RESULT
```

### Version 3 (Namespace)

```javascript
import { v3 as uuidv3 } from 'uuid';

// Incantations
uuidv3(name, namespace);
uuidv3(name, namespace, buffer);
uuidv3(name, namespace, buffer, offset);
```

Generate and return a RFC4122 v3 UUID.

- `name` - (String | Array[]) "name" to create UUID with
- `namespace` - (String | Array[]) "namespace" UUID either as a String or Array[16] of byte values
- `buffer` - (Array | Buffer) Array or buffer where UUID bytes are to be written.
- `offset` - (Number) Starting index in `buffer` at which to begin writing. Default = 0

Returns `buffer`, if specified, otherwise the string form of the UUID

Example:

```javascript --run v3
uuidv3('hello world', MY_NAMESPACE); // RESULT
```

### Version 5 (Namespace)

```javascript
import { v5 as uuidv5 } from 'uuid';

// Incantations
uuidv5(name, namespace);
uuidv5(name, namespace, buffer);
uuidv5(name, namespace, buffer, offset);
```

Generate and return a RFC4122 v5 UUID.

- `name` - (String | Array[]) "name" to create UUID with
- `namespace` - (String | Array[]) "namespace" UUID either as a String or Array[16] of byte values
- `buffer` - (Array | Buffer) Array or buffer where UUID bytes are to be written.
- `offset` - (Number) Starting index in `buffer` at which to begin writing. Default = 0

Returns `buffer`, if specified, otherwise the string form of the UUID

Example:

```javascript --run v5
uuidv5('hello world', MY_NAMESPACE); // RESULT
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

## UMD Build

If you want to load a minified UMD build directly in the browser you can use one of the popular npm
CDNs:

```html
<script src="https://unpkg.com/uuid@latest/dist/umd/uuidv4.min.js"></script>
<script>
  alert(uuidv4());
</script>
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/uuid@latest/dist/umd/uuidv4.min.js"></script>
<script>
  alert(uuidv4());
</script>
```

Available bundles:

- https://unpkg.com/uuid@latest/dist/umd/
- https://cdn.jsdelivr.net/npm/uuid@latest/dist/umd/
