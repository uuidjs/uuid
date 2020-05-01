/* global Benchmark:false, uuidv1:false, uuidv3:false, uuidv4:false, uuidv5:false */
const Benchmark = (typeof window !== 'undefined' && window.Benchmark) || require('benchmark');
const uuidv1 = (typeof window !== 'undefined' && window.uuidv1) || require('uuid').v1;
const uuidv4 = (typeof window !== 'undefined' && window.uuidv4) || require('uuid').v4;
const uuidv3 = (typeof window !== 'undefined' && window.uuidv3) || require('uuid').v3;
const uuidv5 = (typeof window !== 'undefined' && window.uuidv5) || require('uuid').v5;


const suite = new Benchmark.Suite();
suite
  .add('uuidv1()', function () {
    uuidv1();
  })
  .add('uuidv1() fill existing array', function () {
    const array = new Array();
    uuidv1(null, array, 0);
  })
  .add('uuidv4()', function () {
    uuidv4();
  })
  .add('uuidv4() fill existing array', function () {
    const array = new Array();
    uuidv4(null, array, 0);
  })
  .add('uuidv3() DNS', function () {
    uuidv3('hello.example.com', uuidv3.DNS);
  })
  .add('uuidv5() DNS', function () {
    // ... using predefined DNS namespace (for domain names)
    uuidv5('hello.example.com', uuidv5.DNS);
  })
  .add('uuidv5() URL', function () {
    // ... using predefined URL namespace (for, well, URLs)
    uuidv5('http://example.com/hello', uuidv5.URL);
  })
  .add('uuidv5() MY_NAMESPACE', function () {
    // ... using a custom namespace
    //
    // Note: Custom namespaces should be a UUID string specific to your application!
    // E.g. the one here was generated using this modules `uuid` CLI.
    // const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
    uuidv5('Hello, World!', MY_NAMESPACE);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
