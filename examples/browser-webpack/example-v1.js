import { v1 as uuidv1 } from 'uuid';

import testpage from '../utils/testpage';

testpage(function (addTest, done) {
  addTest('uuidv1()', uuidv1());

  done();
});
