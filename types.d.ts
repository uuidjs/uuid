/**
 * The nil UUID string (all zeros)
 *
 * @example
 * ```javascript
 * import { NIL as NIL_UUID } from 'uuid';
 *
 * NIL_UUID; // ⇨ '00000000-0000-0000-0000-000000000000'
 * ```
 */
export const NIL: '00000000-0000-0000-0000-000000000000'

/**
 * Convert UUID string to array of bytes
 *
 * @param {string} str - A valid UUID string
 * @throws {TypeError} If `str` is not a valid UUID
 *
 * @note Ordering of values in the byte arrays used by `parse()` and `stringify()` follows the left ↠ right order of hex-pairs in UUID strings. As shown in the example below.
 *
 * @example
 * ```javascript
 * import { parse as uuidParse } from 'uuid';
 *
 * // Parse a UUID
 * const bytes = uuidParse('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b');
 *
 * // Convert to hex strings to show byte order (for documentation purposes)
 * [...bytes].map((v) => v.toString(16).padStart(2, '0')); // ⇨
 *   // [
 *   //   '6e', 'c0', 'bd', '7f',
 *   //   '11', 'c0', '43', 'da',
 *   //   '97', '5e', '2a', '8a',
 *   //   'd9', 'eb', 'ae', '0b'
 *   // ]
 * ```
 */
export function parse(str: string): Uint8Array

/**
 *
 * @param arr Collection of 16 values (starting from `offset`) between 0-255
 * @param offset Starting index in the Array
 * @throws {TypeError} If a valid UUID string cannot be generated
 *
 * @note Ordering of values in the byte arrays used by `parse()` and `stringify()` follows the left ↠ right order of hex-pairs in UUID strings. As shown in the example below.
 *
 * @example
 * ```javascript
 * import { stringify as uuidStringify } from 'uuid';
 *
 * const uuidBytes = [
 *   0x6e, 0xc0, 0xbd, 0x7f, 0x11, 0xc0, 0x43, 0xda, 0x97, 0x5e, 0x2a, 0x8a, 0xd9, 0xeb, 0xae, 0x0b,
 * ];
 *
 * uuidStringify(uuidBytes); // ⇨ '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'
 * ```
 */
export function stringify(arr: ArrayLike<number>, offset?: number): string

interface V1Options {
  node?: ArrayLike<number>
  clockseq?: number
  msecs?: number
  nsecs?: number
  random?: ArrayLike<number>
  rng?: () => ArrayLike<number>
}

/**
 * Create an RFC version 1 (timestamp) UUID
 *
 * @param options `Object` with one or more of the following properties:
 * @param options.node RFC "node" field as an Array[6] of byte values (per 4.1.6)
 * @param options.clockseq RFC "clock sequence" as a `Number` between 0 - 0x3fff
 * @param options.msecs RFC "timestamp" field (`Number` of milliseconds, unix epoch)
 * @param options.nsecs RFC "timestamp" field (`Number` of nanseconds to add to `msecs`, should be 0-10,000)
 * @param options.random `Array` of 16 random bytes (0-255)
 * @param options.rng Alternative to `options.random`, a `Function` that returns an `Array` of 16 random bytes (0-255)
 * @param buffer If specified, uuid will be written here in byte-form, starting at `offset`
 * @param offset Index to start writing UUID bytes in `buffer`
 * @returns UUID `String` if no `buffer` is specified, otherwise returns `buffer`
 * @throws {Error} If more than 10M UUIDs/sec are requested
 *
 * @note The default [node id](https://tools.ietf.org/html/rfc4122#section-4.1.6) (the last 12 digits in the UUID) is generated once, randomly, on process startup, and then remains unchanged for the duration of the process
 * @note `options.random` and `options.rng` are only meaningful on the very first call to `v1()`, where they may be passed to initialize the internal `node` and `clockseq` fields
 *
 * @example
 * ```javascript
 * import { v1 as uuidv1 } from 'uuid';
 *
 * uuidv1(); // ⇨ '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d'
 * ```
 *
 * @example
 * ```javascript
 * import { v1 as uuidv1 } from 'uuid';
 *
 * const v1options = {
 *   node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
 *   clockseq: 0x1234,
 *   msecs: new Date('2011-11-01').getTime(),
 *   nsecs: 5678,
 * };
 * uuidv1(v1options); // ⇨ '710b962e-041c-11e1-9234-0123456789ab'
 * ```
 */
export function v1(options?: V1Options | null): string
export function v1<T extends ArrayLike<number>>(options: V1Options | null | undefined, buffer: T, offset?: number): T

/**
 * Create an RFC version 3 (namespace w/ MD5) UUID
 *
 * API is identical to `v5()`, but uses "v3" instead.
 *
 * @note &#x26a0;&#xfe0f; Per the RFC, "_If backward compatibility is not an issue, SHA-1 [Version 5] is preferred_."
 */
export function v3(name: string | ArrayLike<number>, namespace: string | ArrayLike<number>): string
export function v3<T extends ArrayLike<number>>(name: string | ArrayLike<number>, namespace: string | ArrayLike<number>, buffer: T, offset?: number): T

interface V4Options {
  random?: ArrayLike<number>
  rng?: () => ArrayLike<number>
}

/**
 * Create an RFC version 4 (random) UUID
 *
 * @param options `Object` with one or more of the following properties:
 * @param options.random `Array` of 16 random bytes (0-255)
 * @param options.rng Alternative to `options.random`, a `Function` that returns an `Array` of 16 random bytes (0-255)
 * @param buffer If specified, uuid will be written here in byte-form, starting at `offset`
 * @param offset Index to start writing UUID bytes in `buffer`
 * @returns UUID `String` if no `buffer` is specified, otherwise returns `buffer`
 *
 * @example
 * ```javascript
 * import { v4 as uuidv4 } from 'uuid';
 *
 * uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
 * ```
 *
 * @example
 *
 * ```javascript
 * import { v4 as uuidv4 } from 'uuid';
 *
 * const v4options = {
 *   random: [
 *     0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
 *   ],
 * };
 * uuidv4(v4options); // ⇨ '109156be-c4fb-41ea-b1b4-efe1671c5836'
 * ```
 */
export function v4(options?: V4Options | null): string
export function v4<T extends ArrayLike<number>>(options: V4Options | null | undefined, buffer: T, offset?: number): T

/**
 * Create an RFC version 5 (namespace w/ SHA-1) UUID
 *
 * @param name
 * @param namespace  Namespace UUID
 * @param buffer If specified, uuid will be written here in byte-form, starting at `offset`
 * @param offset Index to start writing UUID bytes in `buffer`
 * @returns UUID `String` if no `buffer` is specified, otherwise returns `buffer`
 *
 * @note The RFC `DNS` and `URL` namespaces are available as `v5.DNS` and `v5.URL`
 *
 * @example
 * ```javascript
 * import { v5 as uuidv5 } from 'uuid';
 *
 * // Define a custom namespace.  Readers, create your own using something like
 * // https://www.uuidgenerator.net/
 * const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
 *
 * uuidv5('Hello, World!', MY_NAMESPACE); // ⇨ '630eb68f-e0fa-5ecc-887a-7c7a62614681'
 * ```
 *
 * @example
 * ```javascript
 * import { v5 as uuidv5 } from 'uuid';
 *
 * uuidv5('https://www.w3.org/', uuidv5.URL); // ⇨ 'c106a26a-21bb-5538-8bf2-57095d1976c1'
 * ```
 */
export function v5(name: string | ArrayLike<number>, namespace: string | ArrayLike<number>): string
export function v5<T extends ArrayLike<number>>(name: string | ArrayLike<number>, namespace: string | ArrayLike<number>, buffer: T, offset?: number): T
export namespace v5 { export const DNS: string; export const URL: string; }

/**
 * Test a string to see if it is a valid UUID
 *
 * @param str `String` to validate
 * @returns `true` if string is a valid UUID, `false` otherwise
 *
 * @example
 * ```javascript
 * import { validate as uuidValidate } from 'uuid';
 *
 * uuidValidate('not a UUID'); // ⇨ false
 * uuidValidate('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'); // ⇨ true
 * ```
 *
 * @example
 * Using `validate` and `version` together it is possible to do per-version validation, e.g. validate for only v4 UUIds.
 *
 * ```javascript
 * import { version as uuidVersion } from 'uuid';
 * import { validate as uuidValidate } from 'uuid';
 *
 * function uuidValidateV4(uuid) {
 *   return uuidValidate(uuid) && uuidVersion(uuid) === 4;
 * }
 *
 * const v1Uuid = 'd9428888-122b-11e1-b85c-61cd3cbb3210';
 * const v4Uuid = '109156be-c4fb-41ea-b1b4-efe1671c5836';
 *
 * uuidValidateV4(v4Uuid); // ⇨ true
 * uuidValidateV4(v1Uuid); // ⇨ false
 * ```
 */
export function validate(str: string): boolean

/**
 * Detect RFC version of a UUID
 *
 * @param str A valid UUID `String`
 * @returns The RFC version of the UUID
 * @throws {TypeError} If `str` is not a valid UUID
 *
 * @example
 * ```javascript
 * import { version as uuidVersion } from 'uuid';
 *
 * uuidVersion('45637ec4-c85f-11ea-87d0-0242ac130003'); // ⇨ 1
 * uuidVersion('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'); // ⇨ 4
 * ```
 */
export function version(str: string): 0 | 1 | 2 | 3 | 4 | 5
