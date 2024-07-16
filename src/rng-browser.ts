// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).

let getRandomValues: typeof crypto.getRandomValues | undefined;

const rnds8 = new Uint8Array(16);

export default function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
      throw new Error(
        'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
      );
    }

    getRandomValues = crypto.getRandomValues.bind(crypto);
  }

  return getRandomValues(rnds8);
}
