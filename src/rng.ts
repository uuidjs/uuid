// Unique ID creation requires a high quality random # generator. (I.e.
// Math.random() is not sufficient!)  To that end, we require
// crypto.getRandomValues() be present. -
// https://www.rfc-editor.org/rfc/rfc9562#section-6.9
// https://www.w3.org/TR/webcrypto-2/#Crypto-method-getRandomValues

let getRandomValues: typeof crypto.getRandomValues | undefined | false;

const rnds8 = new Uint8Array(16);

export default function rng() {
  // Lazy load so that environments that need to polyfill have a chance to do so
  if (getRandomValues === undefined) {
    getRandomValues =
      typeof crypto !== 'undefined' && crypto.getRandomValues?.bind(crypto);
  }

  if (getRandomValues === false) {
    throw new Error(
      'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported',
    );
  }

  return getRandomValues(rnds8);
}
