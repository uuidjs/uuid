import { v1 as uuidv1, v4 as uuidv4, v3 as uuidv3, v5 as uuidv5 } from 'uuid';
import * as uuid from 'uuid';

import testpage from '../utils/testpage';

testpage(function(addTest, done) {
  addTest('uuidv1()', uuidv1());

  addTest('uuidv4()', uuidv4());

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

  addTest('Same with default export');

  addTest('uuid.v1()', uuid.v1());
  addTest('uuid.v4()', uuid.v4());
  addTest('uuid.v3() DNS', uuid.v3('hello.example.com', uuid.v3.DNS));
  addTest('uuid.v3() URL', uuid.v3('http://example.com/hello', uuid.v3.URL));
  addTest('uuid.v3() MY_NAMESPACE', uuid.v3('Hello, World!', MY_NAMESPACE));
  addTest('uuid.v5() DNS', uuid.v5('hello.example.com', uuid.v5.DNS));
  addTest('uuid.v5() URL', uuid.v5('http://example.com/hello', uuid.v5.URL));
  addTest('uuid.v5() MY_NAMESPACE', uuid.v5('Hello, World!', MY_NAMESPACE));

  done();
});
