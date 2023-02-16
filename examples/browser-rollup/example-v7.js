import { v7 as uuidv7 } from 'uuid';

import testpage from '../utils/testpage';

testpage(function (addTest, done) {
  addTest('uuidv7()', uuidv7());
  done();
});
