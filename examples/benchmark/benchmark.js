// eslint-disable-next-line no-unused-vars
/* global Benchmark:false, uuidv1:false, uuidv3:false, uuidv4:false, uuidv5:false */
const Benchmark = (typeof window !== 'undefined' && window.Benchmark) || require('benchmark');
const uuidv1 = (typeof window !== 'undefined' && window.uuidv1) || require('uuid').v1;
const uuidv4 = (typeof window !== 'undefined' && window.uuidv4) || require('uuid').v4;
const uuidv3 = (typeof window !== 'undefined' && window.uuidv3) || require('uuid').v3;
const uuidv5 = (typeof window !== 'undefined' && window.uuidv5) || require('uuid').v5;
const uuidParse = (typeof window !== 'undefined' && window.uuidParse) || require('uuid').parse;

console.log('Starting. Tests take ~1 minute to run ...');

function testUuidToBytes() {
  const suite = new Benchmark.Suite({
    onError(event) {
      console.error(event.target.error);
    },
  });

  suite
    .add('uuidParse()', function () {
      uuidParse('0f5abcd1-c194-47f3-905b-2df7263a084b');
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
    .add('uuidv1()', function () {
      uuidv1();
    })
    .add('uuidv1() fill existing array', function () {
      try {
        uuidv1(null, array, 0);
      } catch (err) {
        // The spec (https://tools.ietf.org/html/rfc4122#section-4.2.1.2) defines that only 10M/s v1
        // UUIDs can be generated on a single node. This library throws an error if we hit that limit
        // (which can happen on modern hardware and modern Node.js versions).
      }
    })
    .add('uuidv4()', function () {
      uuidv4();
    })
    .add('uuidv4() fill existing array', function () {
      uuidv4(null, array, 0);
    })
    .add('uuidv3()', function () {
      uuidv3('hello.example.com', uuidv3.DNS);
    })
    .add('uuidv5()', function () {
      uuidv5('hello.example.com', uuidv5.DNS);
    })
    .on('cycle', function (event) {
      console.log(event.target.toString());
    })
    .on('complete', function () {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run();
}

testUuidToBytes();
testGeneration();
