import * as uuid from 'uuid';
import {
  MAX as MAX_UUID,
  NIL as NIL_UUID,
  parse as uuidParse,
  stringify as uuidStringify,
  validate as uuidValidate,
  version as uuidVersion,
  v1 as uuidv1,
  v1ToV6 as uuidv1ToV6,
  v3 as uuidv3,
  v4 as uuidv4,
  v5 as uuidv5,
  v6 as uuidv6,
  v6ToV1 as uuidv6ToV1,
  v7 as uuidv7,
} from 'uuid';
import pkg from 'uuid/package.json';

console.log('uuidv1()', uuidv1());

console.log('uuidv4()', uuidv4());

console.log('uuidv7()', uuidv7());

// ... using predefined DNS namespace (for domain names)
console.log('uuidv3() DNS', uuidv3('hello.example.com', uuidv3.DNS));

// ... using predefined URL namespace (for, well, URLs)
console.log('uuidv3() URL', uuidv3('http://example.com/hello', uuidv3.URL));

// ... using a custom namespace
//
// Note: Custom namespaces should be a UUID string specific to your application!
// E.g. the one here was generated using this modules `uuid` CLI.
const MY_NAMESPACE = '55238d15-c926-4598-b49d-cf4e913ba13c';
console.log('uuidv3() MY_NAMESPACE', uuidv3('Hello, World!', MY_NAMESPACE));

// ... using predefined DNS namespace (for domain names)
console.log('uuidv5() DNS', uuidv5('hello.example.com', uuidv5.DNS));

// ... using predefined URL namespace (for, well, URLs)
console.log('uuidv5() URL', uuidv5('http://example.com/hello', uuidv5.URL));

// ... using a custom namespace
//
// Note: Custom namespaces should be a UUID string specific to your application!
// E.g. the one here was generated using this modules `uuid` CLI.
// const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
console.log('uuidv5() MY_NAMESPACE', uuidv5('Hello, World!', MY_NAMESPACE));

console.log('uuidv6()', uuidv6());

// v6 <-> v1 conversion
const V1_ID = 'f1207660-21d2-11ef-8c4f-419efbd44d48';
const V6_ID = '1ef21d2f-1207-6660-8c4f-419efbd44d48';
console.log('uuidv1ToV6()', uuidv1ToV6(V1_ID));
console.log('uuidv6ToV1()', uuidv6ToV1(V6_ID));

// Utility functions
console.log('NIL_UUID', NIL_UUID);
console.log('MAX_UUID', MAX_UUID);
console.log('uuidParse()', uuidParse(MY_NAMESPACE));
console.log('uuidStringify()', uuidStringify(uuidParse(MY_NAMESPACE)));
console.log('uuidValidate()', uuidValidate(MY_NAMESPACE));
console.log('uuidVersion()', uuidVersion(MY_NAMESPACE));

console.log('Same with default export');

console.log('uuid.v1()', uuid.v1());
console.log('uuid.v4()', uuid.v4());
console.log('uuid.v7()', uuid.v7());
console.log('uuid.v3() DNS', uuid.v3('hello.example.com', uuid.v3.DNS));
console.log('uuid.v3() URL', uuid.v3('http://example.com/hello', uuid.v3.URL));
console.log('uuid.v3() MY_NAMESPACE', uuid.v3('Hello, World!', MY_NAMESPACE));
console.log('uuid.v5() DNS', uuid.v5('hello.example.com', uuid.v5.DNS));
console.log('uuid.v5() URL', uuid.v5('http://example.com/hello', uuid.v5.URL));
console.log('uuid.v5() MY_NAMESPACE', uuid.v5('Hello, World!', MY_NAMESPACE));
console.log('uuid.v6()', uuid.v6());

console.log('uuid.v1ToV6()', uuid.v1ToV6(V1_ID));
console.log('uuid.v6ToV1()', uuid.v6ToV1(V6_ID));

console.log('uuid.NIL', uuid.NIL);
console.log('uuid.MAX', uuid.MAX);
console.log('uuid.parse()', uuid.parse(MY_NAMESPACE));
console.log('uuid.stringify()', uuid.stringify(uuid.parse(MY_NAMESPACE)));
console.log('uuid.validate()', uuid.validate(MY_NAMESPACE));
console.log('uuid.version()', uuid.version(MY_NAMESPACE));

// Some tools like react-native need to introspect the package.json file
console.log('pkg.name', pkg.name);
