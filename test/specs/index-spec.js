/* global browser, expect */

describe('uuid()', function() {
  before(function() {
    browser.url('test/specs/index.html');
  });

  it('returns a 36 char string', function() {
    var response = browser.execute('return uuid();');
    var uuid = response.value;
    expect(uuid.length).to.equal(36);
  });
});
