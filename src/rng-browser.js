// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).

// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues =
  (typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
  (typeof msCrypto != 'undefined' &&
    typeof window.msCrypto.getRandomValues == 'function' &&
    msCrypto.getRandomValues.bind(msCrypto));

var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
export default function rng() {
  if (!getRandomValues) {
    throw new Error(
      'uuid: This environment does not seem to support crypto.getRandomValues(). Install a polyfill or provide a custom random number generator through options.rng. For React Native, see https://github.com/uuidjs/uuid#react-native',
    );
  }
  return getRandomValues(rnds8);
}
