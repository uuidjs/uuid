export type UUIDTypes<TBuf extends Uint8Array = Uint8Array> = string | TBuf;

export type Version1Options = {
  node?: Uint8Array;
  clockseq?: number;
  random?: Uint8Array;
  rng?: () => Uint8Array;
  msecs?: number;
  nsecs?: number;
  _v6?: boolean; // Internal use only!
};

export type Version4Options = {
  random?: Uint8Array;
  rng?: () => Uint8Array;
};

export type Version6Options = Version1Options;

export type Version7Options = {
  random?: Uint8Array;
  msecs?: number;
  seq?: number;
  rng?: () => Uint8Array;
};


type UUIDVersion = StringToUnion<'12345678'>;

export type UUID_V1<S extends string> = UUID<S, '1'>;
export type UUID_V2<S extends string> = UUID<S, '2'>;
export type UUID_V3<S extends string> = UUID<S, '3'>;

/**
 * Type representing a UUID of version 4.
 * This type ensures that the string conforms to the UUID v4 format.
 * @example
 * function uuidValidateV4<T extends string>(
 *   uuid: UUID_V4<T>
 * ): uuid is UUID_V4<T> {
 *   return uuidValidate(uuid) && uuidVersion(uuid) === 4;
 * }
 */
export type UUID_V4<S extends string> = UUID<S, '4'>;
export type UUID_V5<S extends string> = UUID<S, '5'>;
export type UUID_V6<S extends string> = UUID<S, '6'>;
export type UUID_V7<S extends string> = UUID<S, '7'>;
export type UUID_V8<S extends string> = UUID<S, '8'>;

type UUID<
  S extends string,
  Ver extends UUIDVersion
> = S extends `${infer G1}-${infer G2}-${infer V}${infer G3}-${
  | '8'
  | '9'
  | 'a'
  | 'b'}${infer G4}-${infer G5}`
  ? V extends Ver
    ? Is8HexChars<G1> extends true
      ? Is4HexChars<G2> extends true
        ? Is3HexChars<G3> extends true
          ? Is3HexChars<G4> extends true
            ? Is12HexChars<G5> extends true
              ? S
              : never
            : never
          : never
        : never
      : never
    : never
  : never;

// utility types
type Is8HexChars<S extends string> = IsHexCharsOfLength<S, 8>;
type Is4HexChars<S extends string> = IsHexCharsOfLength<S, 4>;
type Is3HexChars<S extends string> = IsHexCharsOfLength<S, 3>;
type Is12HexChars<S extends string> = IsHexCharsOfLength<S, 12>;

type IsHexCharsOfLength<
  S extends string,
  Len extends number
> = AllHex<S> extends true
  ? IsStringOfLength<S, Len> extends true
    ? true
    : false
  : false;

type AllHex<T extends string> = All<T, Hex>;

type Hex = StringToUnion<'abcdef1234567890'>;

type All<
  T extends string,
  Chars extends unknown
> = T extends `${infer First}${infer Rest}`
  ? First extends Chars
    ? Rest extends ''
      // Exit condition: the remaining part is an empty string, indicating that the traversal has reached the end.  
      ? true
      // Recursive case: continue checking the rest of the string.
      : All<Rest, Chars>
    : false
  : false;

type StringToUnion<T extends string> = T extends `${infer First}${infer Rest}`
  ? First | StringToUnion<Rest>
  : never;

type IsStringOfLength<
  S extends string,
  Length extends number
> = LengthOfString<S> extends Length ? true : false;

type LengthOfString<S extends string> = StringToTuple<S>['length'];

type StringToTuple<T extends string> = T extends `${infer First}${infer Rest}`
  ? [First, ...StringToTuple<Rest>]
  : [];
