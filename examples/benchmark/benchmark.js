export default function benchmark(uuid, Benchmark) {
  console.log('Starting. Tests take ~1 minute to run ...');

  function testParseAndStringify() {
    const suite = new Benchmark.Suite({
      onError(event) {
        console.error(event.target.error);
      },
    });

    const BYTES = [
      0x0f, 0x5a, 0xbc, 0xd1, 0xc1, 0x94, 0x47, 0xf3, 0x90, 0x5b, 0x2d, 0xf7, 0x26, 0x3a, 0x08,
      0x4b,
    ];

    suite
      .add('uuid.stringify()', function () {
        uuid.stringify(BYTES);
      })
      .add('uuid.parse()', function () {
        uuid.parse('0f5abcd1-c194-47f3-905b-2df7263a084b');
      })
      .on('cycle', function (event) {
        console.log(event.target.toString());
      })
      .on('complete', function () {
        console.log('---\n');
      })
      .run();
  }

  function testGeneration() {
    const array = new Array(16);

    const suite = new Benchmark.Suite({
      onError(event) {
        console.error(event.target.error);
      },
    });

    suite
      .add('uuid.v1()', function () {
        uuid.v1();
      })
      .add('uuid.v1() fill existing array', function () {
        try {
          uuid.v1(null, array, 0);
        } catch {
          // The spec (https://datatracker.ietf.org/doc/html/rfc9562#name-timestamp-considerations) defines that only 10M/s v1
          // UUIDs can be generated on a single node. This library throws an error if we hit that limit
          // (which can happen on modern hardware and modern Node.js versions).
        }
      })
      .add('uuid.v4()', function () {
        uuid.v4();
      })
      .add('uuid.v4() fill existing array', function () {
        uuid.v4(null, array, 0);
      })
      .add('uuid.v4() without native generation', function () {
        uuid.v4({}); // passing an object instead of null bypasses native.randomUUID
      })
      .add('uuid.v3()', function () {
        uuid.v3('hello.example.com', uuid.v3.DNS);
      })
      .add('uuid.v5()', function () {
        uuid.v5('hello.example.com', uuid.v5.DNS);
      })
      .add('uuid.v6()', function () {
        uuid.v6();
      })
      .add('uuid.v7()', function () {
        uuid.v7();
      })
      .add('uuid.v7() fill existing array', function () {
        uuid.v7(null, array, 0);
      })
      .add('uuid.v7() with defined time', function () {
        uuid.v7({
          msecs: 1645557742000,
        });
      })
      .on('cycle', function (event) {
        console.log(event.target.toString());
      })
      .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log('---\n');
      })
      .run();
  }

  function testV6Conversion() {
    const suite = new Benchmark.Suite({
      onError(event) {
        console.error(event.target.error);
      },
    });

    const V1_ID = 'f1207660-21d2-11ef-8c4f-419efbd44d48';
    const V6_ID = '1ef21d2f-1207-6660-8c4f-419efbd44d48';

    suite
      .add('uuid.v1ToV6()', function () {
        uuid.v1ToV6(V1_ID);
      })
      .add('uuid.v6ToV1()', function () {
        uuid.v6ToV1(V6_ID);
      })
      .on('cycle', function (event) {
        console.log(event.target.toString());
      })
      .run();
  }

  testParseAndStringify();
  testGeneration();
  testV6Conversion();
}
