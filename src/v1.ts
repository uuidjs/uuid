import { UUIDTypes, Version1Options } from './_types.js';
import rng from './rng.js';
import { unsafeStringify } from './stringify.js';

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

type V1State = {
  node?: Uint8Array; // node id (47-bit random)
  clockseq?: number; // sequence number (14-bit)

  // v1 & v6 timestamps count 100-nanosecond intervals since the Gregorian
  // epoch, (1582-10-15 00:00). JS Numbers aren't precise enough for this, so we
  // represent them internally using 'msecs' (integer milliseconds, unix epoch)
  // and 'nsecs' (100-nanoseconds offset from `msecs`).

  msecs: number; // timestamp (milliseconds, unix epoch)
  nsecs: number; // timestamp (100-nanoseconds offset from 'msecs')
};

const _state: V1State = {
  msecs: -Infinity,
  nsecs: 0,
};

function v1(options?: Version1Options, buf?: undefined, offset?: number): string;
function v1(options?: Version1Options, buf?: Uint8Array, offset?: number): Uint8Array;
function v1(options?: Version1Options, buf?: Uint8Array, offset?: number): UUIDTypes {
  let bytes: Uint8Array;

  // Extract _v6 flag from options, clearing options if appropriate
  const isV6 = options?._v6 ?? false;
  if (options) {
    const optionsKeys = Object.keys(options);
    if (optionsKeys.length === 1 && optionsKeys[0] === '_v6') {
      options = undefined;
    }
  }

  if (options) {
    // With options: Make UUID independent of internal state
    bytes = v1Bytes(
      options.random ?? options.rng?.() ?? rng(),
      options.msecs,
      options.nsecs,
      options.clockseq,
      options.node,
      buf,
      offset
    );
  } else {
    // Without options: Make UUID from internal state
    const now = Date.now();
    const rnds = rng();

    updateV1State(_state, now, rnds);

    // Geenerate UUID.  Note that v6 uses random values for `clockseq` and
    // `node`.
    //
    // https://www.rfc-editor.org/rfc/rfc9562.html#section-5.6-4
    bytes = v1Bytes(
      rnds,
      _state.msecs,
      _state.nsecs,
      isV6 ? undefined : _state.clockseq,
      isV6 ? undefined : _state.node,
      buf,
      offset
    );
  }

  return buf ? bytes : unsafeStringify(bytes);
}

export function updateV1State(state: V1State, now: number, rnds: Uint8Array) {
  // Update timestamp
  if (now === state.msecs) {
    // Same msec-interval = simulate higher clock resolution by bumping `nsecs`
    // https://www.rfc-editor.org/rfc/rfc9562.html#section-6.1-2.6
    state.nsecs++;

    // Check for `nsecs` overflow (nsecs is capped at 10K intervals / msec)
    if (state.nsecs >= 10000) {
      // Prior to uuid@11 this would throw an error, however the RFCs allow for
      // selecting a new node in this case.  This slightly breaks monotonicity
      // at msec granularity, but that's not a significant concern.
      // https://www.rfc-editor.org/rfc/rfc9562.html#section-6.1-2.16
      state.node = undefined;
      state.nsecs = 0;
    }
  } else if (now > state.msecs) {
    // Reset nsec counter when clock advances to a new msec interval
    state.nsecs = 0;
  }
  state.msecs = now;

  // Init node (do this after timestamp update which may reset the node)
  if (!state.node) {
    state.node = rnds.slice(10, 16);

    // Set multicast bit
    // https://www.rfc-editor.org/rfc/rfc9562.html#section-6.10-3
    state.node[0] |= 0x01; // Set multicast bit

    // Clock sequence must be randomized
    // https://www.rfc-editor.org/rfc/rfc9562.html#section-5.1-8
    state.clockseq = undefined;
  }

  // Init clock sequence to random value (do this after node initialization,
  // which may reset the clock sequence)
  // https://www.rfc-editor.org/rfc/rfc9562.html#section-5.1-7
  if (state.clockseq === undefined) {
    state.clockseq = ((rnds[6] << 8) | rnds[7]) & 0x3fff;
  } else if (now < state.msecs) {
    // Bump clockseq on clock regression
    // https://www.rfc-editor.org/rfc/rfc9562.html#section-5.1-7
    state.clockseq = (state.clockseq + 1) & 0x3fff;
  }

  return state;
}

function v1Bytes(
  rnds: Uint8Array,
  msecs?: number,
  nsecs?: number,
  clockseq?: number,
  node?: Uint8Array,
  buf?: Uint8Array,
  offset = 0
) {
  // Defaults
  if (!buf) {
    buf = new Uint8Array(16);
    offset = 0;
  }
  msecs ??= Date.now();
  nsecs ??= 0;
  clockseq ??= ((rnds[6] << 8) | rnds[7]) & 0x3fff;
  node ??= rnds.slice(0, 6);

  // Offset to Gregorian epoch
  // https://www.rfc-editor.org/rfc/rfc9562.html#section-5.1-1
  msecs += 12219292800000;

  // `time_low`
  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  buf[offset++] = (tl >>> 24) & 0xff;
  buf[offset++] = (tl >>> 16) & 0xff;
  buf[offset++] = (tl >>> 8) & 0xff;
  buf[offset++] = tl & 0xff;

  // `time_mid`
  const tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
  buf[offset++] = (tmh >>> 8) & 0xff;
  buf[offset++] = tmh & 0xff;

  // `time_high_and_version`
  buf[offset++] = ((tmh >>> 24) & 0xf) | 0x10; // include version
  buf[offset++] = (tmh >>> 16) & 0xff;

  // `clock_seq_hi_and_reserved` | variant
  buf[offset++] = (clockseq >>> 8) | 0x80;

  // `clock_seq_low`
  buf[offset++] = clockseq & 0xff;

  // `node`
  for (let n = 0; n < 6; ++n) {
    buf[offset++] = node[n];
  }

  return buf;
}

export default v1;
