# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [11.0.0](https://github.com/uuidjs/uuid/compare/v11.0.0...v11.0.0) (2024-10-27)


### ⚠ BREAKING CHANGES

* refactor v1 internal state and options logic ([#780](https://github.com/uuidjs/uuid/issues/780))
* refactor v7 internal state and options logic, fixes #764 ([#779](https://github.com/uuidjs/uuid/issues/779))
* Port to TypeScript, closes  #762 ([#763](https://github.com/uuidjs/uuid/issues/763))
* update node support matrix (only support node 16-20) ([#750](https://github.com/uuidjs/uuid/issues/750))
* This library always aims at supporting one EOLed LTS release which by this time now is 12.x which has reached EOL 30 Apr 2022.
* Remove the minified UMD build from the package.
* Drop support for browsers that don't correctly implement const/let and default arguments, and no longer transpile the browser build to ES2015.
* Although in practice this is currently a noop since the resulting build does not change, the build will no longer transpiles future changes for Node.js 8.x targets, so semantically this is still a breaking change.
* Deep requiring specific algorithms of this library like require('uuid/v4'), which has been deprecated in uuid@7, is no longer supported.
* The default export, which used to be the v4() method but which was already discouraged in v3.x of this library, has been removed.
* Explicitly note that deep imports of the different uuid version functions are deprecated and no longer encouraged and that ECMAScript module named imports should be used instead. Emit a deprecation warning for people who deep-require the different algorithm variants.
* Remove builtin support for insecure random number generators in the browser. Users who want that will have to supply their own random number generator function.
* Remove support for generating v3 and v5 UUIDs in Node.js<4.x
* Convert code base to ECMAScript Modules (ESM) and release CommonJS build for node and ESM build for browser bundlers.

### Features

* add parse/stringify/validate/version/NIL APIs ([#479](https://github.com/uuidjs/uuid/issues/479)) ([0e6c10b](https://github.com/uuidjs/uuid/commit/0e6c10ba1bf9517796ff23c052fc0468eedfd5f4))
* add support for MAX uuid (new in RFC9562) ([#714](https://github.com/uuidjs/uuid/issues/714)) ([0385cd3](https://github.com/uuidjs/uuid/commit/0385cd3f18ae9920678b2849932fa7a9d9aee7d0))
* add UMD build to npm package ([#357](https://github.com/uuidjs/uuid/issues/357)) ([4e75adf](https://github.com/uuidjs/uuid/commit/4e75adf435196f28e3fbbe0185d654b5ded7ca2c))
* add various es module and CommonJS examples ([b238510](https://github.com/uuidjs/uuid/commit/b238510bf352463521f74bab175a3af9b7a42555))
* enforce Conventional Commit style commit messages ([#282](https://github.com/uuidjs/uuid/issues/282)) ([0705cd5](https://github.com/uuidjs/uuid/commit/0705cd5bae3ab07415294e5544901ffcf0ad4e23))
* ensure that docs are up-to-date in CI ([ee5e77d](https://github.com/uuidjs/uuid/commit/ee5e77db547474f5a8f23d6c857a6d399209986b))
* hybrid CommonJS & ECMAScript modules build ([a3f078f](https://github.com/uuidjs/uuid/commit/a3f078faa0baff69ab41aed08e041f8f9c8993d0))
* improve performance of v1 string representation ([#453](https://github.com/uuidjs/uuid/issues/453)) ([0ee0b67](https://github.com/uuidjs/uuid/commit/0ee0b67c37846529c66089880414d29f3ae132d5))
* improve v4 performance by reusing random number array ([#435](https://github.com/uuidjs/uuid/issues/435)) ([bf4af0d](https://github.com/uuidjs/uuid/commit/bf4af0d711b4d2ed03d1f74fd12ad0baa87dc79d))
* optimize uuid.v1 by 1.3x uuid.v4 by 4.3x (430%) ([#597](https://github.com/uuidjs/uuid/issues/597)) ([3a033f6](https://github.com/uuidjs/uuid/commit/3a033f6bab6bb3780ece6d645b902548043280bc))
* optimize V8 performance of bytesToUuid ([#434](https://github.com/uuidjs/uuid/issues/434)) ([e156415](https://github.com/uuidjs/uuid/commit/e156415448ec1af2351fa0b6660cfb22581971f2))
* Port to TypeScript, closes  [#762](https://github.com/uuidjs/uuid/issues/762) ([#763](https://github.com/uuidjs/uuid/issues/763)) ([1e0f987](https://github.com/uuidjs/uuid/commit/1e0f9870db864ca93f7a69db0d468b5e1b7605e7))
* remove deep requires ([#426](https://github.com/uuidjs/uuid/issues/426)) ([daf72b8](https://github.com/uuidjs/uuid/commit/daf72b84ceb20272a81bb5fbddb05dd95922cbba))
* remove deprecated v4 string parameter ([#454](https://github.com/uuidjs/uuid/issues/454)) ([88ce3ca](https://github.com/uuidjs/uuid/commit/88ce3ca0ba046f60856de62c7ce03f7ba98ba46c))
* remove insecure fallback random number generator ([3a5842b](https://github.com/uuidjs/uuid/commit/3a5842b141a6e5de0ae338f391661e6b84b167c9))
* remove support for pre Node.js v4 Buffer API ([#356](https://github.com/uuidjs/uuid/issues/356)) ([b59b5c5](https://github.com/uuidjs/uuid/commit/b59b5c5ecad271c5453f1a156f011671f6d35627))
* remove UMD build ([#645](https://github.com/uuidjs/uuid/issues/645)) ([e948a0f](https://github.com/uuidjs/uuid/commit/e948a0f22bf22f4619b27bd913885e478e20fe6f)), closes [#620](https://github.com/uuidjs/uuid/issues/620)
* rename repository to github:uuidjs/uuid ([#351](https://github.com/uuidjs/uuid/issues/351)) ([c37a518](https://github.com/uuidjs/uuid/commit/c37a518e367ac4b6d0aa62dba1bc6ce9e85020f7)), closes [#338](https://github.com/uuidjs/uuid/issues/338)
* rename repository to github:uuidjs/uuid ([#351](https://github.com/uuidjs/uuid/issues/351)) ([e2d7314](https://github.com/uuidjs/uuid/commit/e2d731463b680c5b816d144f66feef902586410e)), closes [#338](https://github.com/uuidjs/uuid/issues/338)
* support v6 uuids ([#754](https://github.com/uuidjs/uuid/issues/754)) ([c4ed13e](https://github.com/uuidjs/uuid/commit/c4ed13e7159d87c9e42a349bdd9dc955f1af46b6))
* update node support matrix (only support node 16-20) ([#750](https://github.com/uuidjs/uuid/issues/750)) ([883b163](https://github.com/uuidjs/uuid/commit/883b163b9ab9d6655bfbd8a35e61a3c71674dfe1))
* use native crypto.randomUUID when available ([#600](https://github.com/uuidjs/uuid/issues/600)) ([c9e076c](https://github.com/uuidjs/uuid/commit/c9e076c852edad7e9a06baaa1d148cf4eda6c6c4))
* v8 support ([#759](https://github.com/uuidjs/uuid/issues/759)) ([35a5342](https://github.com/uuidjs/uuid/commit/35a53428202657e402e6b4aa68f56c08194541bf))


### Bug Fixes

* 248 ([#251](https://github.com/uuidjs/uuid/issues/251)) ([67d697c](https://github.com/uuidjs/uuid/commit/67d697cd83580a5be090eb18c935da2e402c5657))
* 30, _rb not defined for lesser node.js versions ([8a6c03f](https://github.com/uuidjs/uuid/commit/8a6c03f969b3332846159312dc583d1746609eea))
* add CommonJS syntax example to README quickstart section ([#417](https://github.com/uuidjs/uuid/issues/417)) ([e0ec840](https://github.com/uuidjs/uuid/commit/e0ec8402c7ad44b7ef0453036c612f5db513fda0))
* add deep-require proxies for local testing and adjust tests ([#365](https://github.com/uuidjs/uuid/issues/365)) ([7fedc79](https://github.com/uuidjs/uuid/commit/7fedc79ac8fda4bfd1c566c7f05ef4ac13b2db48))
* add Jest/jsdom compatibility ([#642](https://github.com/uuidjs/uuid/issues/642)) ([16f9c46](https://github.com/uuidjs/uuid/commit/16f9c469edf46f0786164cdf4dc980743984a6fd))
* add missing exports and tests for new APIs ([#495](https://github.com/uuidjs/uuid/issues/495)) ([681e1da](https://github.com/uuidjs/uuid/commit/681e1dabfb21314e6b11a564ed6d3d1fa558dcd7))
* assignment to readonly property to allow running in strict mode ([#270](https://github.com/uuidjs/uuid/issues/270)) ([d062fdc](https://github.com/uuidjs/uuid/commit/d062fdc14aae6980cbd6c8350c4af70c1db30b0f))
* change default export to named function ([#545](https://github.com/uuidjs/uuid/issues/545)) ([c57bc5a](https://github.com/uuidjs/uuid/commit/c57bc5a9a0653273aa639cda9177ce52efabe42a))
* clean up esm builds for node and browser ([#383](https://github.com/uuidjs/uuid/issues/383)) ([59e6a49](https://github.com/uuidjs/uuid/commit/59e6a49e7ce7b3e8fb0f3ee52b9daae72af467dc))
* export package.json required by react-native and bundlers ([#449](https://github.com/uuidjs/uuid/issues/449)) ([be1c8fe](https://github.com/uuidjs/uuid/commit/be1c8fe9a3206c358e0059b52fafd7213aa48a52)), closes [#444](https://github.com/uuidjs/uuid/issues/444)
* fix [#229](https://github.com/uuidjs/uuid/issues/229) ([d9033cf](https://github.com/uuidjs/uuid/commit/d9033cf35881c867aa028b851d1da80bb47ddfb1))
* fix [#284](https://github.com/uuidjs/uuid/issues/284) by setting function name in try-catch ([f2a60f2](https://github.com/uuidjs/uuid/commit/f2a60f2fcdd7957cc7ae201165377af698e5b0ef))
* Get correct version of IE11 crypto ([#274](https://github.com/uuidjs/uuid/issues/274)) ([205e0ed](https://github.com/uuidjs/uuid/commit/205e0ed1f710199e4afbc3480da58e042d899b11))
* handle error when parameter is not set in v3 and v5 ([#622](https://github.com/uuidjs/uuid/issues/622)) ([fcd7388](https://github.com/uuidjs/uuid/commit/fcd73881692d9fabb63872576ba28e30ff852091))
* lazy load getRandomValues ([#537](https://github.com/uuidjs/uuid/issues/537)) ([16c8f6d](https://github.com/uuidjs/uuid/commit/16c8f6df2f6b09b4d6235602d6a591188320a82e)), closes [#536](https://github.com/uuidjs/uuid/issues/536)
* make access to msCrypto consistent ([#393](https://github.com/uuidjs/uuid/issues/393)) ([8bf2a20](https://github.com/uuidjs/uuid/commit/8bf2a20f3565df743da7215eebdbada9d2df118c))
* make deep require deprecation warning work in browsers ([#409](https://github.com/uuidjs/uuid/issues/409)) ([4b71107](https://github.com/uuidjs/uuid/commit/4b71107d8c0d2ef56861ede6403fc9dc35a1e6bf))
* mem issue when generating uuid ([#267](https://github.com/uuidjs/uuid/issues/267)) ([c47702c](https://github.com/uuidjs/uuid/commit/c47702c29172e70a5da5650ba905c067d37f3658))
* missing v7 expectations in browser spec ([#751](https://github.com/uuidjs/uuid/issues/751)) ([f54a866](https://github.com/uuidjs/uuid/commit/f54a866cedb2b3b96581157c1f4ac935a0b11411))
* prepare package exports for webpack 5 ([#468](https://github.com/uuidjs/uuid/issues/468)) ([8d6e6a5](https://github.com/uuidjs/uuid/commit/8d6e6a5f8965ca9575eb4d92e99a43435f4a58a8))
* provide browser versions independent from module system ([#380](https://github.com/uuidjs/uuid/issues/380)) ([4344a22](https://github.com/uuidjs/uuid/commit/4344a22e7aed33be8627eeaaf05360f256a21753))
* refactor v1 internal state and options logic ([#780](https://github.com/uuidjs/uuid/issues/780)) ([031b3d3](https://github.com/uuidjs/uuid/commit/031b3d3d738bc6694501ac0a37152b95ed500989))
* refactor v7 internal state and options logic, fixes [#764](https://github.com/uuidjs/uuid/issues/764) ([#779](https://github.com/uuidjs/uuid/issues/779)) ([9dbd1cd](https://github.com/uuidjs/uuid/commit/9dbd1cd4177c43fcaac961a3b16fb2d044c9940a))
* remove v4 options default assignment preventing native.randomUUID from being used ([#786](https://github.com/uuidjs/uuid/issues/786)) ([afe6232](https://github.com/uuidjs/uuid/commit/afe62323c4408a824755a39d7b971a8ae06f7199))
* revert "perf: remove superfluous call to toLowerCase ([#677](https://github.com/uuidjs/uuid/issues/677))" ([#738](https://github.com/uuidjs/uuid/issues/738)) ([e267b90](https://github.com/uuidjs/uuid/commit/e267b9073df1d0ce119ee53c0487fe76acb2be37))
* run npm audit fix ([#644](https://github.com/uuidjs/uuid/issues/644)) ([04686f5](https://github.com/uuidjs/uuid/commit/04686f54c5fed2cfffc1b619f4970c4bb8532353))
* seq_hi shift for byte 6 ([#775](https://github.com/uuidjs/uuid/issues/775)) ([1d532ca](https://github.com/uuidjs/uuid/commit/1d532ca374f181932a24a83fa98f71a5bd4f3e96))
* simplify link in deprecation warning ([#391](https://github.com/uuidjs/uuid/issues/391)) ([bb2c8e4](https://github.com/uuidjs/uuid/commit/bb2c8e4e9f4c5f9c1eaaf3ea59710c633cd90cb7))
* support expo&gt;=39.0.0 ([#515](https://github.com/uuidjs/uuid/issues/515)) ([c65a0f3](https://github.com/uuidjs/uuid/commit/c65a0f3fa73b901959d638d1e3591dfacdbed867)), closes [#375](https://github.com/uuidjs/uuid/issues/375)
* tsconfig module type ([#778](https://github.com/uuidjs/uuid/issues/778)) ([7eff835](https://github.com/uuidjs/uuid/commit/7eff835cba334ad418f57768c00d15b918a9b419))
* typo ([305d877](https://github.com/uuidjs/uuid/commit/305d87779000d9b0e40ab4d481eb3b79c5965607))
* update links to match content in readme ([#386](https://github.com/uuidjs/uuid/issues/386)) ([44f2f86](https://github.com/uuidjs/uuid/commit/44f2f86e9d2bbf14ee5f0f00f72a3db1292666d4))
* upgrading from uuid3 broken link ([#568](https://github.com/uuidjs/uuid/issues/568)) ([1c849da](https://github.com/uuidjs/uuid/commit/1c849da6e164259e72e18636726345b13a7eddd6))
* use msCrypto if available. Fixes [#241](https://github.com/uuidjs/uuid/issues/241) ([#247](https://github.com/uuidjs/uuid/issues/247)) ([1fef18b](https://github.com/uuidjs/uuid/commit/1fef18baf249867ad12bc35f5a239e5339073758))


### Performance Improvements

* **nodejs:** introduce pool into default rng ([#513](https://github.com/uuidjs/uuid/issues/513)) ([7f1af04](https://github.com/uuidjs/uuid/commit/7f1af044be4a21c5cc41e410b3bb86048be14093))
* remove superfluous call to toLowerCase ([#677](https://github.com/uuidjs/uuid/issues/677)) ([e53793f](https://github.com/uuidjs/uuid/commit/e53793f5be93413cad68b05b3a339ca23e993342))


### Documentation

* add note about removal of default export ([#372](https://github.com/uuidjs/uuid/issues/372)) ([12749b7](https://github.com/uuidjs/uuid/commit/12749b700eb49db8a9759fd306d8be05dbfbd58c)), closes [#370](https://github.com/uuidjs/uuid/issues/370)
* deprecated deep requiring of the different algorithm versions ([#361](https://github.com/uuidjs/uuid/issues/361)) ([c0bdf15](https://github.com/uuidjs/uuid/commit/c0bdf15e417639b1aeb0b247b2fb11f7a0a26b23))


### Miscellaneous Chores

* drop node 10.x to upgrade dev dependencies ([#653](https://github.com/uuidjs/uuid/issues/653)) ([28a5712](https://github.com/uuidjs/uuid/commit/28a571283f8abda6b9d85e689f95b7d3ee9e282e))
* release 11.0.0 ([#805](https://github.com/uuidjs/uuid/issues/805)) ([b003cde](https://github.com/uuidjs/uuid/commit/b003cdeda4c6a7ab525f79b9a3d87d1395a1fb4e))


### Build System

* drop Node.js 8.x from babel transpile target ([#603](https://github.com/uuidjs/uuid/issues/603)) ([aa11485](https://github.com/uuidjs/uuid/commit/aa114858260402107ec8a1e1a825dea0a259bcb5))
* drop support for legacy browsers (IE11, Safari 10) ([#604](https://github.com/uuidjs/uuid/issues/604)) ([0f433e5](https://github.com/uuidjs/uuid/commit/0f433e5ec444edacd53016de67db021102f36148))

## [11.0.0](https://github.com/uuidjs/uuid/compare/v9.0.0...v11.0.0) (2024-10-27)


### ⚠ BREAKING CHANGES

* refactor v1 internal state and options logic ([#780](https://github.com/uuidjs/uuid/issues/780))
* refactor v7 internal state and options logic, fixes #764 ([#779](https://github.com/uuidjs/uuid/issues/779))
* Port to TypeScript, closes  #762 ([#763](https://github.com/uuidjs/uuid/issues/763))
* update node support matrix (only support node 16-20) ([#750](https://github.com/uuidjs/uuid/issues/750))

### Features

* add support for MAX uuid (new in RFC9562) ([#714](https://github.com/uuidjs/uuid/issues/714)) ([0385cd3](https://github.com/uuidjs/uuid/commit/0385cd3f18ae9920678b2849932fa7a9d9aee7d0))
* Port to TypeScript, closes  [#762](https://github.com/uuidjs/uuid/issues/762) ([#763](https://github.com/uuidjs/uuid/issues/763)) ([1e0f987](https://github.com/uuidjs/uuid/commit/1e0f9870db864ca93f7a69db0d468b5e1b7605e7))
* support v6 uuids ([#754](https://github.com/uuidjs/uuid/issues/754)) ([c4ed13e](https://github.com/uuidjs/uuid/commit/c4ed13e7159d87c9e42a349bdd9dc955f1af46b6))
* update node support matrix (only support node 16-20) ([#750](https://github.com/uuidjs/uuid/issues/750)) ([883b163](https://github.com/uuidjs/uuid/commit/883b163b9ab9d6655bfbd8a35e61a3c71674dfe1))
* v8 support ([#759](https://github.com/uuidjs/uuid/issues/759)) ([35a5342](https://github.com/uuidjs/uuid/commit/35a53428202657e402e6b4aa68f56c08194541bf))


### Bug Fixes

* missing v7 expectations in browser spec ([#751](https://github.com/uuidjs/uuid/issues/751)) ([f54a866](https://github.com/uuidjs/uuid/commit/f54a866cedb2b3b96581157c1f4ac935a0b11411))
* refactor v1 internal state and options logic ([#780](https://github.com/uuidjs/uuid/issues/780)) ([031b3d3](https://github.com/uuidjs/uuid/commit/031b3d3d738bc6694501ac0a37152b95ed500989))
* refactor v7 internal state and options logic, fixes [#764](https://github.com/uuidjs/uuid/issues/764) ([#779](https://github.com/uuidjs/uuid/issues/779)) ([9dbd1cd](https://github.com/uuidjs/uuid/commit/9dbd1cd4177c43fcaac961a3b16fb2d044c9940a))
* remove v4 options default assignment preventing native.randomUUID from being used ([#786](https://github.com/uuidjs/uuid/issues/786)) ([afe6232](https://github.com/uuidjs/uuid/commit/afe62323c4408a824755a39d7b971a8ae06f7199))
* revert "perf: remove superfluous call to toLowerCase ([#677](https://github.com/uuidjs/uuid/issues/677))" ([#738](https://github.com/uuidjs/uuid/issues/738)) ([e267b90](https://github.com/uuidjs/uuid/commit/e267b9073df1d0ce119ee53c0487fe76acb2be37))
* seq_hi shift for byte 6 ([#775](https://github.com/uuidjs/uuid/issues/775)) ([1d532ca](https://github.com/uuidjs/uuid/commit/1d532ca374f181932a24a83fa98f71a5bd4f3e96))
* tsconfig module type ([#778](https://github.com/uuidjs/uuid/issues/778)) ([7eff835](https://github.com/uuidjs/uuid/commit/7eff835cba334ad418f57768c00d15b918a9b419))


### Performance Improvements

* remove superfluous call to toLowerCase ([#677](https://github.com/uuidjs/uuid/issues/677)) ([e53793f](https://github.com/uuidjs/uuid/commit/e53793f5be93413cad68b05b3a339ca23e993342))


### Miscellaneous Chores

* release 11.0.0 ([#805](https://github.com/uuidjs/uuid/issues/805)) ([b003cde](https://github.com/uuidjs/uuid/commit/b003cdeda4c6a7ab525f79b9a3d87d1395a1fb4e))

## [11.0.0-0](https://github.com/uuidjs/uuid/compare/v9.0.0...v11.0.0-0) (2024-09-05)

### ⚠ BREAKING CHANGES

- refactor v1 internal state and options logic (#780)
- refactor v7 internal state and options logic, fixes #764 (#779)
- Port to TypeScript, closes #762 (#763)
- update node support matrix (only support node 16-20) (#750)

### Features

- Port to TypeScript, closes [#762](https://github.com/uuidjs/uuid/issues/762) ([#763](https://github.com/uuidjs/uuid/issues/763)) ([1e0f987](https://github.com/uuidjs/uuid/commit/1e0f9870db864ca93f7a69db0d468b5e1b7605e7))
- update node support matrix (only support node 16-20) ([#750](https://github.com/uuidjs/uuid/issues/750)) ([883b163](https://github.com/uuidjs/uuid/commit/883b163b9ab9d6655bfbd8a35e61a3c71674dfe1))

### Bug Fixes

- missing v7 expectations in browser spec ([#751](https://github.com/uuidjs/uuid/issues/751)) ([f54a866](https://github.com/uuidjs/uuid/commit/f54a866cedb2b3b96581157c1f4ac935a0b11411))
- refactor v1 internal state and options logic ([#780](https://github.com/uuidjs/uuid/issues/780)) ([031b3d3](https://github.com/uuidjs/uuid/commit/031b3d3d738bc6694501ac0a37152b95ed500989))
- refactor v7 internal state and options logic, fixes [#764](https://github.com/uuidjs/uuid/issues/764) ([#779](https://github.com/uuidjs/uuid/issues/779)) ([9dbd1cd](https://github.com/uuidjs/uuid/commit/9dbd1cd4177c43fcaac961a3b16fb2d044c9940a))
- remove v4 options default assignment preventing native.randomUUID from being used ([#786](https://github.com/uuidjs/uuid/issues/786)) ([afe6232](https://github.com/uuidjs/uuid/commit/afe62323c4408a824755a39d7b971a8ae06f7199)), closes [#763](https://github.com/uuidjs/uuid/issues/763)
- seq_hi shift for byte 6 ([#775](https://github.com/uuidjs/uuid/issues/775)) ([1d532ca](https://github.com/uuidjs/uuid/commit/1d532ca374f181932a24a83fa98f71a5bd4f3e96))
- tsconfig module type ([#778](https://github.com/uuidjs/uuid/issues/778)) ([7eff835](https://github.com/uuidjs/uuid/commit/7eff835cba334ad418f57768c00d15b918a9b419))

## [10.0.0](https://github.com/uuidjs/uuid/compare/v9.0.0...v10.0.0) (2024-06-07)

### ⚠ BREAKING CHANGES

- update node support (drop node@12, node@14, add node@20) (#750)

### Features

- support support rfc9562 MAX uuid (new in RFC9562) ([#714](https://github.com/uuidjs/uuid/issues/714)) ([0385cd3](https://github.com/uuidjs/uuid/commit/0385cd3f18ae9920678b2849932fa7a9d9aee7d0))
- support rfc9562 v6 uuids ([#754](https://github.com/uuidjs/uuid/issues/754)) ([c4ed13e](https://github.com/uuidjs/uuid/commit/c4ed13e7159d87c9e42a349bdd9dc955f1af46b6))
- support rfc9562 v7 uuids ([#681](https://github.com/uuidjs/uuid/issues/681)) ([db76a12](https://github.com/uuidjs/uuid/commit/db76a1284760c441438f50a57924b322dae08891))
- update node support matrix (only support node 16-20) ([#750](https://github.com/uuidjs/uuid/issues/750)) ([883b163](https://github.com/uuidjs/uuid/commit/883b163b9ab9d6655bfbd8a35e61a3c71674dfe1))
- support rfc9562 v8 uuids ([#759](https://github.com/uuidjs/uuid/issues/759)) ([35a5342](https://github.com/uuidjs/uuid/commit/35a53428202657e402e6b4aa68f56c08194541bf))

### Bug Fixes

- revert "perf: remove superfluous call to toLowerCase ([#677](https://github.com/uuidjs/uuid/issues/677))" ([#738](https://github.com/uuidjs/uuid/issues/738)) ([e267b90](https://github.com/uuidjs/uuid/commit/e267b9073df1d0ce119ee53c0487fe76acb2be37))

## [9.0.1](https://github.com/uuidjs/uuid/compare/v9.0.0...v9.0.1) (2023-09-12)

### build

- Fix CI to work with Node.js 20.x

## [9.0.0](https://github.com/uuidjs/uuid/compare/v8.3.2...v9.0.0) (2022-09-05)

### ⚠ BREAKING CHANGES

- Drop Node.js 10.x support. This library always aims at supporting one EOLed LTS release which by this time now is 12.x which has reached EOL 30 Apr 2022.

- Remove the minified UMD build from the package.

  Minified code is hard to audit and since this is a widely used library it seems more appropriate nowadays to optimize for auditability than to ship a legacy module format that, at best, serves educational purposes nowadays.

  For production browser use cases, users should be using a bundler. For educational purposes, today's online sandboxes like replit.com offer convenient ways to load npm modules, so the use case for UMD through repos like UNPKG or jsDelivr has largely vanished.

- Drop IE 11 and Safari 10 support. Drop support for browsers that don't correctly implement const/let and default arguments, and no longer transpile the browser build to ES2015.

  This also removes the fallback on msCrypto instead of the crypto API.

  Browser tests are run in the first supported version of each supported browser and in the latest (as of this commit) version available on Browserstack.

### Features

- optimize uuid.v1 by 1.3x uuid.v4 by 4.3x (430%) ([#597](https://github.com/uuidjs/uuid/issues/597)) ([3a033f6](https://github.com/uuidjs/uuid/commit/3a033f6bab6bb3780ece6d645b902548043280bc))
- remove UMD build ([#645](https://github.com/uuidjs/uuid/issues/645)) ([e948a0f](https://github.com/uuidjs/uuid/commit/e948a0f22bf22f4619b27bd913885e478e20fe6f)), closes [#620](https://github.com/uuidjs/uuid/issues/620)
- use native crypto.randomUUID when available ([#600](https://github.com/uuidjs/uuid/issues/600)) ([c9e076c](https://github.com/uuidjs/uuid/commit/c9e076c852edad7e9a06baaa1d148cf4eda6c6c4))

### Bug Fixes

- add Jest/jsdom compatibility ([#642](https://github.com/uuidjs/uuid/issues/642)) ([16f9c46](https://github.com/uuidjs/uuid/commit/16f9c469edf46f0786164cdf4dc980743984a6fd))
- change default export to named function ([#545](https://github.com/uuidjs/uuid/issues/545)) ([c57bc5a](https://github.com/uuidjs/uuid/commit/c57bc5a9a0653273aa639cda9177ce52efabe42a))
- handle error when parameter is not set in v3 and v5 ([#622](https://github.com/uuidjs/uuid/issues/622)) ([fcd7388](https://github.com/uuidjs/uuid/commit/fcd73881692d9fabb63872576ba28e30ff852091))
- run npm audit fix ([#644](https://github.com/uuidjs/uuid/issues/644)) ([04686f5](https://github.com/uuidjs/uuid/commit/04686f54c5fed2cfffc1b619f4970c4bb8532353))
- upgrading from uuid3 broken link ([#568](https://github.com/uuidjs/uuid/issues/568)) ([1c849da](https://github.com/uuidjs/uuid/commit/1c849da6e164259e72e18636726345b13a7eddd6))

### build

- drop Node.js 8.x from babel transpile target ([#603](https://github.com/uuidjs/uuid/issues/603)) ([aa11485](https://github.com/uuidjs/uuid/commit/aa114858260402107ec8a1e1a825dea0a259bcb5))
- drop support for legacy browsers (IE11, Safari 10) ([#604](https://github.com/uuidjs/uuid/issues/604)) ([0f433e5](https://github.com/uuidjs/uuid/commit/0f433e5ec444edacd53016de67db021102f36148))

- drop node 10.x to upgrade dev dependencies ([#653](https://github.com/uuidjs/uuid/issues/653)) ([28a5712](https://github.com/uuidjs/uuid/commit/28a571283f8abda6b9d85e689f95b7d3ee9e282e)), closes [#643](https://github.com/uuidjs/uuid/issues/643)

### [8.3.2](https://github.com/uuidjs/uuid/compare/v8.3.1...v8.3.2) (2020-12-08)

### Bug Fixes

- lazy load getRandomValues ([#537](https://github.com/uuidjs/uuid/issues/537)) ([16c8f6d](https://github.com/uuidjs/uuid/commit/16c8f6df2f6b09b4d6235602d6a591188320a82e)), closes [#536](https://github.com/uuidjs/uuid/issues/536)

### [8.3.1](https://github.com/uuidjs/uuid/compare/v8.3.0...v8.3.1) (2020-10-04)

### Bug Fixes

- support expo>=39.0.0 ([#515](https://github.com/uuidjs/uuid/issues/515)) ([c65a0f3](https://github.com/uuidjs/uuid/commit/c65a0f3fa73b901959d638d1e3591dfacdbed867)), closes [#375](https://github.com/uuidjs/uuid/issues/375)

## [8.3.0](https://github.com/uuidjs/uuid/compare/v8.2.0...v8.3.0) (2020-07-27)

### Features

- add parse/stringify/validate/version/NIL APIs ([#479](https://github.com/uuidjs/uuid/issues/479)) ([0e6c10b](https://github.com/uuidjs/uuid/commit/0e6c10ba1bf9517796ff23c052fc0468eedfd5f4)), closes [#475](https://github.com/uuidjs/uuid/issues/475) [#478](https://github.com/uuidjs/uuid/issues/478) [#480](https://github.com/uuidjs/uuid/issues/480) [#481](https://github.com/uuidjs/uuid/issues/481) [#180](https://github.com/uuidjs/uuid/issues/180)

## [8.2.0](https://github.com/uuidjs/uuid/compare/v8.1.0...v8.2.0) (2020-06-23)

### Features

- improve performance of v1 string representation ([#453](https://github.com/uuidjs/uuid/issues/453)) ([0ee0b67](https://github.com/uuidjs/uuid/commit/0ee0b67c37846529c66089880414d29f3ae132d5))
- remove deprecated v4 string parameter ([#454](https://github.com/uuidjs/uuid/issues/454)) ([88ce3ca](https://github.com/uuidjs/uuid/commit/88ce3ca0ba046f60856de62c7ce03f7ba98ba46c)), closes [#437](https://github.com/uuidjs/uuid/issues/437)
- support jspm ([#473](https://github.com/uuidjs/uuid/issues/473)) ([e9f2587](https://github.com/uuidjs/uuid/commit/e9f2587a92575cac31bc1d4ae944e17c09756659))

### Bug Fixes

- prepare package exports for webpack 5 ([#468](https://github.com/uuidjs/uuid/issues/468)) ([8d6e6a5](https://github.com/uuidjs/uuid/commit/8d6e6a5f8965ca9575eb4d92e99a43435f4a58a8))

## [8.1.0](https://github.com/uuidjs/uuid/compare/v8.0.0...v8.1.0) (2020-05-20)

### Features

- improve v4 performance by reusing random number array ([#435](https://github.com/uuidjs/uuid/issues/435)) ([bf4af0d](https://github.com/uuidjs/uuid/commit/bf4af0d711b4d2ed03d1f74fd12ad0baa87dc79d))
- optimize V8 performance of bytesToUuid ([#434](https://github.com/uuidjs/uuid/issues/434)) ([e156415](https://github.com/uuidjs/uuid/commit/e156415448ec1af2351fa0b6660cfb22581971f2))

### Bug Fixes

- export package.json required by react-native and bundlers ([#449](https://github.com/uuidjs/uuid/issues/449)) ([be1c8fe](https://github.com/uuidjs/uuid/commit/be1c8fe9a3206c358e0059b52fafd7213aa48a52)), closes [ai/nanoevents#44](https://github.com/ai/nanoevents/issues/44#issuecomment-602010343) [#444](https://github.com/uuidjs/uuid/issues/444)

## [8.0.0](https://github.com/uuidjs/uuid/compare/v7.0.3...v8.0.0) (2020-04-29)

### ⚠ BREAKING CHANGES

- For native ECMAScript Module (ESM) usage in Node.js only named exports are exposed, there is no more default export.

  ```diff
  -import uuid from 'uuid';
  -console.log(uuid.v4()); // -> 'cd6c3b08-0adc-4f4b-a6ef-36087a1c9869'
  +import { v4 as uuidv4 } from 'uuid';
  +uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  ```

- Deep requiring specific algorithms of this library like `require('uuid/v4')`, which has been deprecated in `uuid@7`, is no longer supported.

  Instead use the named exports that this module exports.

  For ECMAScript Modules (ESM):

  ```diff
  -import uuidv4 from 'uuid/v4';
  +import { v4 as uuidv4 } from 'uuid';
  uuidv4();
  ```

  For CommonJS:

  ```diff
  -const uuidv4 = require('uuid/v4');
  +const { v4: uuidv4 } = require('uuid');
  uuidv4();
  ```

### Features

- native Node.js ES Modules (wrapper approach) ([#423](https://github.com/uuidjs/uuid/issues/423)) ([2d9f590](https://github.com/uuidjs/uuid/commit/2d9f590ad9701d692625c07ed62f0a0f91227991)), closes [#245](https://github.com/uuidjs/uuid/issues/245) [#419](https://github.com/uuidjs/uuid/issues/419) [#342](https://github.com/uuidjs/uuid/issues/342)
- remove deep requires ([#426](https://github.com/uuidjs/uuid/issues/426)) ([daf72b8](https://github.com/uuidjs/uuid/commit/daf72b84ceb20272a81bb5fbddb05dd95922cbba))

### Bug Fixes

- add CommonJS syntax example to README quickstart section ([#417](https://github.com/uuidjs/uuid/issues/417)) ([e0ec840](https://github.com/uuidjs/uuid/commit/e0ec8402c7ad44b7ef0453036c612f5db513fda0))

### [7.0.3](https://github.com/uuidjs/uuid/compare/v7.0.2...v7.0.3) (2020-03-31)

### Bug Fixes

- make deep require deprecation warning work in browsers ([#409](https://github.com/uuidjs/uuid/issues/409)) ([4b71107](https://github.com/uuidjs/uuid/commit/4b71107d8c0d2ef56861ede6403fc9dc35a1e6bf)), closes [#408](https://github.com/uuidjs/uuid/issues/408)

### [7.0.2](https://github.com/uuidjs/uuid/compare/v7.0.1...v7.0.2) (2020-03-04)

### Bug Fixes

- make access to msCrypto consistent ([#393](https://github.com/uuidjs/uuid/issues/393)) ([8bf2a20](https://github.com/uuidjs/uuid/commit/8bf2a20f3565df743da7215eebdbada9d2df118c))
- simplify link in deprecation warning ([#391](https://github.com/uuidjs/uuid/issues/391)) ([bb2c8e4](https://github.com/uuidjs/uuid/commit/bb2c8e4e9f4c5f9c1eaaf3ea59710c633cd90cb7))
- update links to match content in readme ([#386](https://github.com/uuidjs/uuid/issues/386)) ([44f2f86](https://github.com/uuidjs/uuid/commit/44f2f86e9d2bbf14ee5f0f00f72a3db1292666d4))

### [7.0.1](https://github.com/uuidjs/uuid/compare/v7.0.0...v7.0.1) (2020-02-25)

### Bug Fixes

- clean up esm builds for node and browser ([#383](https://github.com/uuidjs/uuid/issues/383)) ([59e6a49](https://github.com/uuidjs/uuid/commit/59e6a49e7ce7b3e8fb0f3ee52b9daae72af467dc))
- provide browser versions independent from module system ([#380](https://github.com/uuidjs/uuid/issues/380)) ([4344a22](https://github.com/uuidjs/uuid/commit/4344a22e7aed33be8627eeaaf05360f256a21753)), closes [#378](https://github.com/uuidjs/uuid/issues/378)

## [7.0.0](https://github.com/uuidjs/uuid/compare/v3.4.0...v7.0.0) (2020-02-24)

### ⚠ BREAKING CHANGES

- The default export, which used to be the v4() method but which was already discouraged in v3.x of this library, has been removed.
- Explicitly note that deep imports of the different uuid version functions are deprecated and no longer encouraged and that ECMAScript module named imports should be used instead. Emit a deprecation warning for people who deep-require the different algorithm variants.
- Remove builtin support for insecure random number generators in the browser. Users who want that will have to supply their own random number generator function.
- Remove support for generating v3 and v5 UUIDs in Node.js<4.x
- Convert code base to ECMAScript Modules (ESM) and release CommonJS build for node and ESM build for browser bundlers.

### Features

- add UMD build to npm package ([#357](https://github.com/uuidjs/uuid/issues/357)) ([4e75adf](https://github.com/uuidjs/uuid/commit/4e75adf435196f28e3fbbe0185d654b5ded7ca2c)), closes [#345](https://github.com/uuidjs/uuid/issues/345)
- add various es module and CommonJS examples ([b238510](https://github.com/uuidjs/uuid/commit/b238510bf352463521f74bab175a3af9b7a42555))
- ensure that docs are up-to-date in CI ([ee5e77d](https://github.com/uuidjs/uuid/commit/ee5e77db547474f5a8f23d6c857a6d399209986b))
- hybrid CommonJS & ECMAScript modules build ([a3f078f](https://github.com/uuidjs/uuid/commit/a3f078faa0baff69ab41aed08e041f8f9c8993d0))
- remove insecure fallback random number generator ([3a5842b](https://github.com/uuidjs/uuid/commit/3a5842b141a6e5de0ae338f391661e6b84b167c9)), closes [#173](https://github.com/uuidjs/uuid/issues/173)
- remove support for pre Node.js v4 Buffer API ([#356](https://github.com/uuidjs/uuid/issues/356)) ([b59b5c5](https://github.com/uuidjs/uuid/commit/b59b5c5ecad271c5453f1a156f011671f6d35627))
- rename repository to github:uuidjs/uuid ([#351](https://github.com/uuidjs/uuid/issues/351)) ([c37a518](https://github.com/uuidjs/uuid/commit/c37a518e367ac4b6d0aa62dba1bc6ce9e85020f7)), closes [#338](https://github.com/uuidjs/uuid/issues/338)

### Bug Fixes

- add deep-require proxies for local testing and adjust tests ([#365](https://github.com/uuidjs/uuid/issues/365)) ([7fedc79](https://github.com/uuidjs/uuid/commit/7fedc79ac8fda4bfd1c566c7f05ef4ac13b2db48))
- add note about removal of default export ([#372](https://github.com/uuidjs/uuid/issues/372)) ([12749b7](https://github.com/uuidjs/uuid/commit/12749b700eb49db8a9759fd306d8be05dbfbd58c)), closes [#370](https://github.com/uuidjs/uuid/issues/370)
- deprecated deep requiring of the different algorithm versions ([#361](https://github.com/uuidjs/uuid/issues/361)) ([c0bdf15](https://github.com/uuidjs/uuid/commit/c0bdf15e417639b1aeb0b247b2fb11f7a0a26b23))

## [3.4.0](https://github.com/uuidjs/uuid/compare/v3.3.3...v3.4.0) (2020-01-16)

### Features

- rename repository to github:uuidjs/uuid ([#351](https://github.com/uuidjs/uuid/issues/351)) ([e2d7314](https://github.com/uuidjs/uuid/commit/e2d7314)), closes [#338](https://github.com/uuidjs/uuid/issues/338)

## [3.3.3](https://github.com/uuidjs/uuid/compare/v3.3.2...v3.3.3) (2019-08-19)

### Bug Fixes

- no longer run ci tests on node v4
- upgrade dependencies

## [3.3.2](https://github.com/uuidjs/uuid/compare/v3.3.1...v3.3.2) (2018-06-28)

### Bug Fixes

- typo ([305d877](https://github.com/uuidjs/uuid/commit/305d877))

## [3.3.1](https://github.com/uuidjs/uuid/compare/v3.3.0...v3.3.1) (2018-06-28)

### Bug Fixes

- fix [#284](https://github.com/uuidjs/uuid/issues/284) by setting function name in try-catch ([f2a60f2](https://github.com/uuidjs/uuid/commit/f2a60f2))

# [3.3.0](https://github.com/uuidjs/uuid/compare/v3.2.1...v3.3.0) (2018-06-22)

### Bug Fixes

- assignment to readonly property to allow running in strict mode ([#270](https://github.com/uuidjs/uuid/issues/270)) ([d062fdc](https://github.com/uuidjs/uuid/commit/d062fdc))
- fix [#229](https://github.com/uuidjs/uuid/issues/229) ([c9684d4](https://github.com/uuidjs/uuid/commit/c9684d4))
- Get correct version of IE11 crypto ([#274](https://github.com/uuidjs/uuid/issues/274)) ([153d331](https://github.com/uuidjs/uuid/commit/153d331))
- mem issue when generating uuid ([#267](https://github.com/uuidjs/uuid/issues/267)) ([c47702c](https://github.com/uuidjs/uuid/commit/c47702c))

### Features

- enforce Conventional Commit style commit messages ([#282](https://github.com/uuidjs/uuid/issues/282)) ([cc9a182](https://github.com/uuidjs/uuid/commit/cc9a182))

## [3.2.1](https://github.com/uuidjs/uuid/compare/v3.2.0...v3.2.1) (2018-01-16)

### Bug Fixes

- use msCrypto if available. Fixes [#241](https://github.com/uuidjs/uuid/issues/241) ([#247](https://github.com/uuidjs/uuid/issues/247)) ([1fef18b](https://github.com/uuidjs/uuid/commit/1fef18b))

# [3.2.0](https://github.com/uuidjs/uuid/compare/v3.1.0...v3.2.0) (2018-01-16)

### Bug Fixes

- remove mistakenly added typescript dependency, rollback version (standard-version will auto-increment) ([09fa824](https://github.com/uuidjs/uuid/commit/09fa824))
- use msCrypto if available. Fixes [#241](https://github.com/uuidjs/uuid/issues/241) ([#247](https://github.com/uuidjs/uuid/issues/247)) ([1fef18b](https://github.com/uuidjs/uuid/commit/1fef18b))

### Features

- Add v3 Support ([#217](https://github.com/uuidjs/uuid/issues/217)) ([d94f726](https://github.com/uuidjs/uuid/commit/d94f726))

# [3.1.0](https://github.com/uuidjs/uuid/compare/v3.1.0...v3.0.1) (2017-06-17)

### Bug Fixes

- (fix) Add .npmignore file to exclude test/ and other non-essential files from packing. (#183)
- Fix typo (#178)
- Simple typo fix (#165)

### Features

- v5 support in CLI (#197)
- V5 support (#188)

# 3.0.1 (2016-11-28)

- split uuid versions into separate files

# 3.0.0 (2016-11-17)

- remove .parse and .unparse

# 2.0.0

- Removed uuid.BufferClass

# 1.4.0

- Improved module context detection
- Removed public RNG functions

# 1.3.2

- Improve tests and handling of v1() options (Issue #24)
- Expose RNG option to allow for perf testing with different generators

# 1.3.0

- Support for version 1 ids, thanks to [@ctavan](https://github.com/ctavan)!
- Support for node.js crypto API
- De-emphasizing performance in favor of a) cryptographic quality PRNGs where available and b) more manageable code
