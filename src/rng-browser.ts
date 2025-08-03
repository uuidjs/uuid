let getRandomValues: typeof crypto.getRandomValues | undefined;

const rnds8 = new Uint8Array(16);

export default function rng() {
  // lazy-reference getRandomValues in case it's been polyfilled
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
