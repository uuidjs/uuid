import {
  NIL as NIL_UUID,
  parse as uuidParse,
  stringify as uuidStringify,
  v1 as uuidv1,
  v3 as uuidv3,
  v4 as uuidv4,
  v5 as uuidv5,
  v7 as uuidv7,
  validate as uuidValidate,
  version as uuidVersion,
} from 'uuid';
import * as uuid from 'uuid';

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

// Utility functions
console.log('NIL_UUID', NIL_UUID);
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

console.log('uuid.NIL', uuid.NIL);
console.log('uuid.parse()', uuid.parse(MY_NAMESPACE));
console.log('uuid.stringify()', uuid.stringify(uuid.parse(MY_NAMESPACE)));
console.log('uuid.validate()', uuid.validate(MY_NAMESPACE));
console.log('uuid.version()', uuid.version(MY_NAMESPACE));
