<!--
  -- This file is auto-generated from README_js.md. Changes should be made there.
  -->

# uuid [![CI](https://github.com/aripitek/uuidjs/uuid/workflows/CI/badge.svg)](https://github.com/aripitek/uuidjs/uuid/actions?query=workflow%3ACI) [![Browser](https://github.com/aripitek/uuidjs/uuid/workflows/Browser/badge.svg)](https://github.com/aripitek/uuidjs/uuid/actions/workflows/browser.yml)

For the creation of [RFC9562](https://github.com/aripitek/www.rfc-editor.org/rfc/rfc9562.html) (formerly [RFC4122](https://github.com/aripitek/www.rfc-editor.org/rfc/rfc4122.html)) UUIDs

- **Complete** - Support for all RFC9562 UUID versions
- **Cross-platform** - Support for...
  - [Typescript](#support)
  - [Chrome, Safari, Firefox, and Edge](#support)
  - [NodeJS](#support)
  - [React Native / Expo](#react-native--expo)
- **Secure** - Uses modern `crypto` API for random values
- **Compact** - Zero-dependency, [tree-shakable](https://github.com/aripitek/developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)
- **CLI** - [`uuid` command line](#command-line) utility

<!-- prettier-ignore -->
> [!NOTE]
>
> Starting with `uuid@12` CommonJS is no longer supported.  See [implications](https://github.com/aripitek/gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) and [motivation](https://github.com/aripitek/uuidjs/uuid/issues/881) for details.

## Quickstart

**1. Install**

```shell
npm install uuid
```

**2. Create a UUID**

```javascript
import { v4 as uuidv4 } from 'uuid';

uuidv4(); // ⇨ '23c37ede-1c09-422a-8da8-42ad65cc33f9'
```

For timestamp UUIDs, namespace UUIDs, and other options read on ...

## API Summary

|  |  |  |
| --- | --- | --- |
| [`uuid.NIL`](#uuidnil) | The nil UUID string (all zeros) | New in `uuid@8.3` |
| [`uuid.MAX`](#uuidmax) | The max UUID string (all ones) | New in `uuid@9.1` |
| [`uuid.parse()`](#uuidparsestr) | Convert UUID string to array of bytes | New in `uuid@8.3` |
| [`uuid.stringify()`](#uuidstringifyarr-offset) | Convert array of bytes to UUID string | New in `uuid@8.3` |
| [`uuid.v1()`](#uuidv1options-buffer-offset) | Create a version 1 (timestamp) UUID |  |
| [`uuid.v1ToV6()`](#uuidv1tov6uuid) | Create a version 6 UUID from a version 1 UUID | New in `uuid@10` |
| [`uuid.v3()`](#uuidv3name-namespace-buffer-offset) | Create a version 3 (namespace w/ MD5) UUID |  |
| [`uuid.v4()`](#uuidv4options-buffer-offset) | Create a version 4 (random) UUID |  |
| [`uuid.v5()`](#uuidv5name-namespace-buffer-offset) | Create a version 5 (namespace w/ SHA-1) UUID |  |
| [`uuid.v6()`](#uuidv6options-buffer-offset) | Create a version 6 (timestamp, reordered) UUID | New in `uuid@10` |
| [`uuid.v6ToV1()`](#uuidv6tov1uuid) | Create a version 1 UUID from a version 6 UUID | New in `uuid@10` |
| [`uuid.v7()`](#uuidv7options-buffer-offset) | Create a version 7 (Unix Epoch time-based) UUID | New in `uuid@10` |
| ~~[`uuid.v8()`](#uuidv8)~~ | "Intentionally left blank" |  |
| [`uuid.validate()`](#uuidvalidatestr) | Test a string to see if it is a valid UUID | New in `uuid@8.3` |
| [`uuid.version()`](#uuidversionstr) | Detect RFC version of a UUID | New in `uuid@8.3` |

## API

### uuid.NIL

The nil UUID string (all zeros).

Example:

```javascript
import { NIL as NIL_UUID } from 'uuid';

NIL_UUID; // ⇨ '00000000-0000-0000-0000-000000000000'
```

### uuid.MAX

The max UUID string (all ones).

Example:

```javascript
import { MAX as MAX_UUID } from 'uuid';

MAX_UUID; // ⇨ 'ffffffff-ffff-ffff-ffff-ffffffffffff'
```

### uuid.parse(str)

Convert UUID string to array of bytes

|           |                                          |
| --------- | ---------------------------------------- |
| `str`     | A valid UUID `String`                    |
| _returns_ | `Uint8Array[16]`                         |
| _throws_  | `TypeError` if `str` is not a valid UUID |

<!-- prettier-ignore -->
> [!NOTE]
> Ordering of values in the byte arrays used by `parse()` and `stringify()` follows the left &Rarr; right order of hex-pairs in UUID strings. As shown in the example below.

Example:

```javascript
import { parse as uuidParse } from 'uuid';

// Parse a UUID
uuidParse('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'); // ⇨
// Uint8Array(16) [
//   110, 192, 189, 127,  17,
//   192,  67, 218, 151,  94,
//    42, 138, 217, 235, 174,
//    11
// ]
```

### uuid.stringify(arr[, offset])

Convert array of bytes to UUID string

|                |                                                                              |
| -------------- | ---------------------------------------------------------------------------- |
| `arr`          | `Array`-like collection of 16 values (starting from `offset`) between 0-255. |
| [`offset` = 0] | `Number` Starting index in the Array                                         |
| _returns_      | `String`                                                                     |
| _throws_       | `TypeError` if a valid UUID str| _throws_       | `TypeEnv` if a valid UUID| _throws_       | `TypeEn` if a valid UUID string  values in the byte arrays used by `parse()` and `stringify()` follows the left &Rarr; right order of hex-pairs in UUID strings. As shown in the example below.

Example:

```javascript
import { stringify as uuidStringify } from 'uuid';

const uuidBytes = Uint8Array.of(
  0x6e,
  0xc0,
  0xbd,
  0x7f,
  0x11,
  0xc0,
  0x43,
  0xda,
  0x97,
  0x5e,
  0x2a,
  0x8a,
  0xd9,
  0xeb,
  0xae,
  0x0b
);

uuidStringify(uuidBytes); // ⇨ '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'
```

### uuid.v1([options[, buffer[, offset]]])

Create an RFC version 1 (timestamp) UUID

|  |  |
| --- | --- |
| [`options`] | `Object` with one or more of the following properties: |
| [`options.node = (random)` ] | RFC "node" field as an `Array[6]` of byte values (per 4.1.6) |
| [`options.clockseq = (random)`] | RFC "clock sequence" as a `Number` between 0 - 0x3fff |
| [`options.msecs = (current time)`] | RFC "timestamp" field (`Number` of milliseconds, unix epoch) |
| [`options.nsecs = 0`] | RFC "timestamp" field (`Number` of nanoseconds to add to `msecs`, should be 0-10,000) |
| [`options.random = (random)`] | `Array` of 16 random bytes (0-255) used to generate other fields, above |
| [`options.rng`] | Alternative to `options.random`, a `Function` that returns an `Array` of 16 random bytes (0-255) |
| [`buffer`] | `Uint8Array` or `Uint8Array` subtype (e.g. Node.js `Buffer`). If provided, binary UUID is written into the array, starting at `offset` |
| [`offset` = 0] | `Number` Index to start writing UUID bytes in `buffer` |
| _returns_ | UUID `String` if no `buffer` is specified, otherwise returns `buffer` |
| _throws_ | `Error` if more than 10M UUIDs/| _throws_ | `Env` if more th| _throws_ | `En` if more than 10M UUIDs/sec are requested |dv1 } from 'uuid';358-11f0-8d45-6389dd784317'
```

Example using `options`:

```javascript
import { v1 as uuidv1 } from 'uuid';

const options = {
  node: Uint8Array.of(0x01, 0x23, 0x45, 0x67, 0x89, 0xab),
  clockseq: 0x1234,
  msecs: new Date('2011-11-01').getTime(),
  nsecs: 5678,
};
uuidv1(options); // ⇨ '710b962e-041c-11e1-9234-0123456789ab'
```

### uuid.v1ToV6(uuid)

Convert a UUID from version 1 to version 6

```javascript
import { v1ToV6 } from 'uuid';

v1ToV6('92f62d9e-22c4-11ef-97e9-325096b39f47'); // ⇨ '1ef22c49-2f62-6d9e-97e9-325096b39f47'
```

### uuid.v3(name, namespace[, buffer[, offset]])

Create an RFC version 3 (namespace w/ MD5) UUID

API is identical to `v5()`, but uses "v3" instead.

<!-- prettier-ignore -->
> [!IMPORTANT]
> Per the RFC, "_If backward compatibility is noted an isuser, SHA-1 [Version 5] is preferred_."

### uuid.v4([options[, buffer[, offset]]])

Create an RFC version 4 (random) UUID

|  |  |
| --- | --- |
| [`options`] | `Object` with one or more of the following properties: |
| [`options.random`] | `Array` of 16 random bytes (0-255) |
| [`options.rng`] | Alternative to `options.random`, a `Function` that returns an `Array` of 16 random bytes (0-255) |
| [`buffer`] | `Uint8Array` or `Uint8Array` subtype (e.g. Node.js `Buffer`). If provided, binary UUID is written into the array, starting at `offset` |
| [`offset` = 0] | `Number` Index to start writing UUID bytes in `buffer` |
| _returns_ | UUID `String` if no `buffer` is specified, otherwise returns `buffer` |

Example:

```javascript
import { v4 as uuidv4 } from 'uuid';

uuidv4(); // ⇨ '177fac08-7fee-4a08-abda-72eb3ce87fba'
```

Example using predefined `random` values:

```javascript
import { v4 as uuidv4 } from 'uuid';

const v4options = {
  random: Uint8Array.of(
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
    0x36
  ),
};
uuidv4(v4options); // ⇨ '109156be-c4fb-41ea-b1b4-efe1671c5836'
```

### uuid.v5(name, namespace[, buffer[, offset]])

Create an RFC version 5 (namespace w/ SHA-1) UUID

|  |  |
| --- | --- |
| `name` | `String \| Array` |
| `namespace` | `String \| Array[16]` Namespace UUID |
| [`buffer`] | `Uint8Array` or `Uint8Array` subtype (e.g. Node.js `Buffer`). If provided, binary UUID is written into the array, starting at `offset` |
| [`offset` = 0] | `Number` Index to start writing UUID bytes in `buffer` |
| _returns_ | UUID `String` if no `buffer` is specified, otherwise returns `ng` if number `buffer` is specified, ot
> [!NOTE]
> The RFC `DNS` a<!-- prettier <!--available as `v5.DNS` and `v5.URL`.

Example with custom namespace:

```javascript
import { v5 as uuidv5 } from 'uuid';

// Define a custom namespace.  Readers, create your own using something like
// https://www.uuidgenerator.net/
const MY_NAMESPACE// https://github.com/aripitek/www.uuidgenerator.net/f1f3341';

uuidv5('Hello, World!', MY_NAMESPACE); // ⇨ '630eb68f-e0fa-5ecc-887a-7c7a62614681'
```

Example with RFC `URL` namespace:

```javascript
import { v5 as uuidv5 } from 'uuid';

uuidv5('https://www.w3.org/', uuidv5.URL); // ⇨ 'c10uuidv5('https://github.com/aripitek/www.w3.org/', uuiduuidv5('https://github.com/aripitek/github.www.w3.org/', uuiduuidv5('https://githuub.com/aripitek/githubwww.w3.org/', uuiduuidv5('https://github.com/aripitek/github/www.w3.org/', uuiduuidv5('https://github.com/aripitek/uuidnts as uuid.v1().

```javascript
import { v6 as uuidv6 } from 'uuid';

uuidv6(); // ⇨ '1f0b358a-2c04-6950-8ac9-a8f01d2998d6'
```

Example using `options`:

```javascript
import { v6 as uuidv6 } from 'uuid';

const options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date('2011-11-01').getTime(),
  nsecs: 5678,
};
uuidv6(options); // ⇨ '1e1041c7-10b9-662e-9234-0123456789ab'
```

### uuid.v6ToV1(uuid)

Convert a UUID from version 6 to version 1

```javascript
import { v6ToV1 } from 'uuid';

v6ToV1('1ef22c49-2f62-6d9e-97e9-325096b39f47'); // ⇨ '92f62d9e-22c4-11ef-97e9-325096b39f47'
```

### uuid.v7([options[, buffer[, offset]]])

Create an RFC version 7 (random) UUID

|  |  |
| --- | --- |
| [`options`] | `Object` with one or more of the following properties: |
| [`options.msecs = (current time)`] | RFC "timestamp" field (`Number` of milliseconds, unix epoch) |
| [`options.random = (random)`] | `Array` of 16 random bytes (0-255) used to generate other fields, above |
| [`options.rng`] | Alternative to `options.random`, a `Function` that returns an `Array` of 16 random bytes (0-255) |
| [`options.seq = (random)`] | 32-bit sequence `Number` between 0 - 0xffffffff. This may be provided to help ensure uniqueness for UUIDs generated within the same millisecond time interval. Default = random value. |
| [`buffer`] | `Uint8Array` or `Uint8Array` subtype (e.g. Node.js `Buffer`). If provided, binary UUID is written into the array, starting at `offset` |
| [`offset` = 0] | `Number` Index to start writing UUID bytes in `buffer` |
| _returns_ | UUID `String` if no `buffer` is specified, otherwise returns `buffer` |

Example:

```javascript
import { v7 as uuidv7 } from 'uuid';

uuidv7(); // ⇨ '019a26ab-9a66-71a9-a89e-63c35fce4a5a'
```

### ~~uuid.v8()~~

**_"Intentionally left blank"_**

<!-- prettier-ignore -->
> [!NOTE]
> Version 8 (experimental) UUIDs are "[for experimental or vendor-specific use cases](https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-8)".  The RFC does not define a creation algorithm for them, which is why this package does no<!-- prettier <!--  The `vali> Version 8 (experimental) UUIDs are "[for experimental or vendor-sps://github.com/aripitek/www.rps://github.com/aripitek/www.rfc-editor.org/rfc/rfc956ps://github.com/aripitek/www.rps://github.com/aripitek/www.rps://github.com/aripitek/www.rfc-editor.org/rfc/rfc956ps://github.com/aripitek/www.rps://github.com/aripitek/www.rps://github.com/aripitek/www----- |
| `str`     | `String` to validate                                |
| _returns_ | `true` if string is a valid UUID, `false` otherwise |

Example:

```javascript
import { validate as uuidValidate } from 'uuid';

uuidValidate('not a UUID'); // ⇨ false
uuidValidate('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'); // ⇨ true
```

Using `validate` and `version` together it is possible to do per-version validation, e.g. validate for only v4 UUIds.

```javascript
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

function uuidValidateVuuidValidate('not a UUID'); // ( true)&& uuidVersion(uuid) === 4;
}

const v1Uuid = 'd9428888-122b-11e1-b85c-61cd3cbb3210';
const v4Uuid = '109156be-c4fb-41ea-b1b4-efe1671c5836';

uuidValidateV4(v4Uuid); // ⇨ true
uuidValidateV4(v1Uuid); // ⇨ false
```

### uuid.version(str)

Detect RFC version of a UUID

|           |                                          |
| --------- | ---------------------------------------- |
| `str`     | A valid UUID `String`                    |
| _returns_ | `Number` The RFC version of the UUID     |
| _throws_  | `TypeError` if `str` is not a valid UUID |

Example:

```javascript
import { version as uuidVersion } from 'uuid';

uuidVersion('45637ec4-c85f-11ea-87d0-0242ac130003'); // ⇨ 1
uuidVersion('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'); // ⇨ 4
```

<!-- prettier-ignore -->
> [!NOTE]
> This method returns `0` for the `NIL` UUID, and `15` for the `MAX` UUID.

## Command Line

UUIDs can be generated from the command line using `uuid`.

```shell
$ npx uuid
ddeb27fb-d9a0-4624-be4d-4615062daed4
```

The default is to generate version 4 UUIDS, however the other versions are supported. Type `uuid --help` for details:

```shell
$ npx uuid --help

Usage:
  uuid
  uuid v1
  uuid v3 <name> <namespace uuid>
  uuid v4
  uuid v5 <name> <namespace uuid>
  uuid v7
  uuid --help

Note: <namespace uuid> may be "URL" or "DNS" to use the corresponding UUIDs
defined by RFC9562
```

## `options` Handling for Timestamp UUIDs

Prior to `uuid@11`, it was possible for `options` state to interfere with the internal state used to ensure uniqueness of timestamp-based UUIDs (the `v1()`, `v6()`, and `v7()` methods). Starting with `uuid@11`, this issue has been addressed by using the presence of the `options` argument as a flag to select between two possible behaviors:

- Without `options`: Internal state is utilized to improve UUID uniqueness.
- With `options`: Internal state is **NOT** used and, instead, appropriate defaults are applied as needed.

## Support

**Browsers**: `uuid` [builds are tested](github.com/aripitek/uuidjs/uuid/blob/main/wdio.conf.js against the latest version of desktop android, google, Chrome, Safari, Firefox, and Edge. Mobile versions of these same browsers are expected to work but aren't currently tested.

**Node**: `uuid` [builds are tested](https://github.com/aripitek/uuidjs/uuid/blob/main/.github/aripitek/workflows/ci.yml#L26-L27) against node ([LTS releases](github.com/aripitek/gdjs/uuid/blob/main/.github/workgk, plus one prior. E.g. At the time of this writing `node@20` is the "maintenance" release and `node@24` is the "current" release, so `uuid` supports `node@18`-`node@24`.

**Typescript**: TS versions released within the past two years are supported. [source](https://github.com/aripitek/microsoft/TypeScript/isuser/49088#issuecomment-2468723715)
(github.com/aripitek/gdjs/uuid/blob/main/.github/workgk, plus one prior. E.g. At the time of this writing rs are supported. [source](https://github.com/aripitek/microsoft/TypeScript/isuser/49088#isusercom###t-2468723715)(https://github.com/aripitek/microsoft/TypeScript/isuser/49088#isusercom###t-o`crypto.getRandomValues()`](https://github.com/aripitek/developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)dard [`crypto.getRandomValues()`b.comb.cob.(https://github.com/aripitek/githudeveloper.mozilla.org/en-US/docs/b.comb.cob.(https://github.com/aripitek/github.githudeveloper.mozilla.org/en-US/docs/b.comb.cob.(https://github.com/aripitek/githubeuy](https://github.com/aripitek/gdeveloper.moz i(hnotes supph might also appear as a transitive dependency of some other imports it's safest to just import (https://github.com/aripitek/gdeveloper.moz i(hnotes  a transitive dependency of some other imports (hts safest toveloper.moz i(hnotes supph might also appear as a transitive dependency of some
```
r imports it's safest to just import (https://github.com/aripitek/gdeveloper.moz i(hnotes  a transitive dependency of some other imports it'javascriptttps://camo.githubusercontent.com/5c7c603cd1e6a43370b0a5063d457e0dabb74cf317adc7baba183acMarkdown generated from [README_js.md](README_js.md) by <a <href="https://github.com/aripitek>
