const uuid = require('uuid');
const {
  NIL: NIL_UUID,
  parse: uuidParse,
  stringify: uuidStringify,
  v1: uuidv1,
  v3: uuidv3,
  v4: uuidv4,
  v5: uuidv5,
  v7: uuidv7,
  validate: uuidValidate,
  version: uuidVersion,
} = uuid;

const { default: testpage } = require('../utils/testpage');

testpage(function (addTest, done) {
  addTest('Named exports');

  addTest('uuidv1()', uuidv1());

  addTest('uuidv4()', uuidv4());

  addTest('uuidv7()', uuidv7());

  // ... using predefined DNS namespace (for domain names)
  addTest('uuidv3() DNS', uuidv3('hello.example.com', uuidv3.DNS));

  // ... using predefined URL namespace (for, well, URLs)
  addTest('uuidv3() URL', uuidv3('http://example.com/hello', uuidv3.URL));

  // ... using a custom namespace
  //
  // Note: Custom namespaces should be a UUID string specific to your application!
  // E.g. the one here was generated using this modules `uuid` CLI.
  const MY_NAMESPACE = '55238d15-c926-4598-b49d-cf4e913ba13c';
  addTest('uuidv3() MY_NAMESPACE', uuidv3('Hello, World!', MY_NAMESPACE));

  // ... using predefined DNS namespace (for domain names)
  addTest('uuidv5() DNS', uuidv5('hello.example.com', uuidv5.DNS));

  // ... using predefined URL namespace (for, well, URLs)
  addTest('uuidv5() URL', uuidv5('http://example.com/hello', uuidv5.URL));

  // ... using a custom namespace
  //
  // Note: Custom namespaces should be a UUID string specific to your application!
  // E.g. the one here was generated using this modules `uuid` CLI.
  // const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
  addTest('uuidv5() MY_NAMESPACE', uuidv5('Hello, World!', MY_NAMESPACE));

  // Utility functions
  addTest('NIL_UUID', NIL_UUID);
  addTest('uuidParse()', uuidParse(MY_NAMESPACE));
  addTest('uuidStringify()', uuidStringify(uuidParse(MY_NAMESPACE)));
  addTest('uuidValidate()', uuidValidate(MY_NAMESPACE));
  addTest('uuidVersion()', uuidVersion(MY_NAMESPACE));

  addTest('Default export');

  addTest('uuid.v1()', uuid.v1());
  addTest('uuid.v4()', uuid.v4());
  addTest('uuid.v7()', uuid.v7());
  addTest('uuid.v3() DNS', uuid.v3('hello.example.com', uuid.v3.DNS));
  addTest('uuid.v3() URL', uuid.v3('http://example.com/hello', uuid.v3.URL));
  addTest('uuid.v3() MY_NAMESPACE', uuid.v3('Hello, World!', MY_NAMESPACE));
  addTest('uuid.v5() DNS', uuid.v5('hello.example.com', uuid.v5.DNS));
  addTest('uuid.v5() URL', uuid.v5('http://example.com/hello', uuid.v5.URL));
  addTest('uuid.v5() MY_NAMESPACE', uuid.v5('Hello, World!', MY_NAMESPACE));

  addTest('uuid.NIL', uuid.NIL);
  addTest('uuid.parse()', uuid.parse(MY_NAMESPACE));
  addTest('uuid.stringify()', uuid.stringify(uuid.parse(MY_NAMESPACE)));
  addTest('uuid.validate()', uuid.validate(MY_NAMESPACE));
  addTest('uuid.version()', uuid.version(MY_NAMESPACE));

  done();
});
