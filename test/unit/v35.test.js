import assert from 'assert';
import md5 from '../../src/md5.js';
import md5Browser from '../../src/md5-browser.js';
import sha1 from '../../src/sha1.js';
import sha1Browser from '../../src/sha1-browser.js';
import v3 from '../../src/v3.js';
import v5 from '../../src/v5.js';

describe('v35', () => {
  const HASH_SAMPLES = [
    {
      input: '',
      sha1: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
      md5: 'd41d8cd98f00b204e9800998ecf8427e',
    },

    // Extended ascii chars
    {
      input:
        '\t\b\f  !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u00A1\u00A2\u00A3\u00A4\u00A5\u00A6\u00A7\u00A8\u00A9\u00AA\u00AB\u00AC\u00AE\u00AF\u00B0\u00B1\u00B2\u00B3\u00B4\u00B5\u00B6\u00B7\u00B8\u00B9\u00BA\u00BB\u00BC\u00BD\u00BE\u00BF\u00C0\u00C1\u00C2\u00C3\u00C4\u00C5\u00C6\u00C7\u00C8\u00C9\u00CA\u00CB\u00CC\u00CD\u00CE\u00CF\u00D0\u00D1\u00D2\u00D3\u00D4\u00D5\u00D6\u00D7\u00D8\u00D9\u00DA\u00DB\u00DC\u00DD\u00DE\u00DF\u00E0\u00E1\u00E2\u00E3\u00E4\u00E5\u00E6\u00E7\u00E8\u00E9\u00EA\u00EB\u00EC\u00ED\u00EE\u00EF\u00F0\u00F1\u00F2\u00F3\u00F4\u00F5\u00F6\u00F7\u00F8\u00F9\u00FA\u00FB\u00FC\u00FD\u00FE\u00FF',
      sha1: 'ca4a426a3d536f14cfd79011e79e10d64de950a0',
      md5: 'e8098ec21950f841731d28749129d3ee',
    },

    // A sampling from the Unicode BMP
    {
      input:
        '\u00A5\u0104\u018F\u0256\u02B1o\u0315\u038E\u0409\u0500\u0531\u05E1\u05B6\u0920\u0903\u09A4\u0983\u0A20\u0A02\u0AA0\u0A83\u0B06\u0C05\u0C03\u1401\u16A0',
      sha1: 'f2753ebc390e5f637e333c2a4179644a93ae9f65',
      md5: '231b309e277b6be8bb3d6c688b7f098b',
    },
  ];

  function hashToHex(hash) {
    if (hash instanceof Buffer) {
      hash = Array.from(hash);
    }

    return hash
      .map(function (b) {
        return b.toString(16).padStart(2, '0');
      })
      .join('');
  }

  test('sha1 node', () => {
    HASH_SAMPLES.forEach(function (sample) {
      assert.equal(hashToHex(sha1(sample.input)), sample.sha1);
    });
  });

  test('sha1 browser', () => {
    HASH_SAMPLES.forEach(function (sample) {
      assert.equal(hashToHex(sha1Browser(sample.input)), sample.sha1);
    });
  });

  test('md5 node', () => {
    HASH_SAMPLES.forEach(function (sample) {
      assert.equal(hashToHex(md5(sample.input)), sample.md5);
    });
  });

  test('md5 browser', () => {
    HASH_SAMPLES.forEach(function (sample) {
      assert.equal(hashToHex(md5Browser(sample.input)), sample.md5);
    });
  });

  test('v3', () => {
    // Expect to get the same results as http://tools.adjet.org/uuid-v3
    assert.strictEqual(v3('hello.example.com', v3.DNS), '9125a8dc-52ee-365b-a5aa-81b0b3681cf6');

    assert.strictEqual(
      v3('http://example.com/hello', v3.URL),
      'c6235813-3ba4-3801-ae84-e0a6ebb7d138'
    );

    assert.strictEqual(
      v3('hello', '0f5abcd1-c194-47f3-905b-2df7263a084b'),
      'a981a0c2-68b1-35dc-bcfc-296e52ab01ec'
    );
  });

  test('v3 namespace.toUpperCase', () => {
    assert.strictEqual(
      v3('hello.example.com', v3.DNS.toUpperCase()),
      '9125a8dc-52ee-365b-a5aa-81b0b3681cf6'
    );

    assert.strictEqual(
      v3('http://example.com/hello', v3.URL.toUpperCase()),
      'c6235813-3ba4-3801-ae84-e0a6ebb7d138'
    );

    assert.strictEqual(
      v3('hello', '0f5abcd1-c194-47f3-905b-2df7263a084b'.toUpperCase()),
      'a981a0c2-68b1-35dc-bcfc-296e52ab01ec'
    );
  });

  test('v3 namespace string validation', () => {
    assert.throws(() => {
      v3('hello.example.com', 'zyxwvuts-rqpo-nmlk-jihg-fedcba000000');
    });

    assert.throws(() => {
      v3('hello.example.com', 'invalid uuid value');
    });

    assert.ok(v3('hello.example.com', '00000000-0000-0000-0000-000000000000'));
  });

  test('v3 namespace buffer validation', () => {
    assert.throws(() => {
      v3('hello.example.com', new Array(15));
    });

    assert.throws(() => {
      v3('hello.example.com', new Array(17));
    });

    assert.ok(v3('hello.example.com', new Array(16).fill(0)));
  });

  test('v3 fill buffer', () => {
    let buf = new Array(16);

    const testBuf = [
      0x91, 0x25, 0xa8, 0xdc, 0x52, 0xee, 0x36, 0x5b, 0xa5, 0xaa, 0x81, 0xb0, 0xb3, 0x68, 0x1c,
      0xf6,
    ];

    const result = v3('hello.example.com', v3.DNS, buf);

    assert.deepEqual(buf, testBuf);
    assert.strictEqual(result, buf);

    // test offsets as well
    buf = new Array(19);

    for (let i = 0; i < 3; ++i) {
      buf[i] = 'landmaster';
    }

    v3('hello.example.com', v3.DNS, buf, 3);

    assert.deepEqual(buf, ['landmaster', 'landmaster', 'landmaster'].concat(testBuf));
  });

  test('v3 undefined/null', () => {
    assert.throws(() => {
      v3();
    });

    assert.throws(() => {
      v3('hello');
    });

    assert.throws(() => {
      v3('hello.example.com', undefined);
    });

    assert.throws(() => {
      v3('hello.example.com', null, new Array(16));
    });
  });

  test('v5', () => {
    // Expect to get the same results as http://tools.adjet.org/uuid-v5
    assert.strictEqual(v5('hello.example.com', v5.DNS), 'fdda765f-fc57-5604-a269-52a7df8164ec');

    assert.strictEqual(
      v5('http://example.com/hello', v5.URL),
      '3bbcee75-cecc-5b56-8031-b6641c1ed1f1'
    );

    assert.strictEqual(
      v5('hello', '0f5abcd1-c194-47f3-905b-2df7263a084b'),
      '90123e1c-7512-523e-bb28-76fab9f2f73d'
    );
  });

  test('v5 namespace.toUpperCase', () => {
    // Expect to get the same results as http://tools.adjet.org/uuid-v5
    assert.strictEqual(
      v5('hello.example.com', v5.DNS.toUpperCase()),
      'fdda765f-fc57-5604-a269-52a7df8164ec'
    );

    assert.strictEqual(
      v5('http://example.com/hello', v5.URL.toUpperCase()),
      '3bbcee75-cecc-5b56-8031-b6641c1ed1f1'
    );

    assert.strictEqual(
      v5('hello', '0f5abcd1-c194-47f3-905b-2df7263a084b'.toUpperCase()),
      '90123e1c-7512-523e-bb28-76fab9f2f73d'
    );
  });

  test('v5 namespace string validation', () => {
    assert.throws(() => {
      v5('hello.example.com', 'zyxwvuts-rqpo-nmlk-jihg-fedcba000000');
    });

    assert.throws(() => {
      v5('hello.example.com', 'invalid uuid value');
    });

    assert.ok(v5('hello.example.com', '00000000-0000-0000-0000-000000000000'));
  });

  test('v5 namespace buffer validation', () => {
    assert.throws(() => {
      v5('hello.example.com', new Array(15));
    });

    assert.throws(() => {
      v5('hello.example.com', new Array(17));
    });

    assert.ok(v5('hello.example.com', new Array(16).fill(0)));
  });

  test('v5 fill buffer', () => {
    let buf = new Array(16);

    const testBuf = [
      0xfd, 0xda, 0x76, 0x5f, 0xfc, 0x57, 0x56, 0x04, 0xa2, 0x69, 0x52, 0xa7, 0xdf, 0x81, 0x64,
      0xec,
    ];

    const result = v5('hello.example.com', v5.DNS, buf);
    assert.deepEqual(buf, testBuf);
    assert.strictEqual(result, buf);

    // test offsets as well
    buf = new Array(19);

    for (let i = 0; i < 3; ++i) {
      buf[i] = 'landmaster';
    }

    v5('hello.example.com', v5.DNS, buf, 3);

    assert.deepEqual(buf, ['landmaster', 'landmaster', 'landmaster'].concat(testBuf));
  });

  test('v5 undefined/null', () => {
    assert.throws(() => {
      v5();
    });

    assert.throws(() => {
      v5('hello');
    });

    assert.throws(() => {
      v5('hello.example.com', undefined);
    });

    assert.throws(() => {
      v5('hello.example.com', null, new Array(16));
    });
  });

  test('v3/v5 constants', () => {
    assert.strictEqual(v3.DNS, '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    assert.strictEqual(v3.URL, '6ba7b811-9dad-11d1-80b4-00c04fd430c8');
    assert.strictEqual(v5.DNS, '6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    assert.strictEqual(v5.URL, '6ba7b811-9dad-11d1-80b4-00c04fd430c8');
  });
});
