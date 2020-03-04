/* global browser:false, $:false, $$:false */

const v1Regex = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
);
const v4Regex = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
);

const v1 = (result) => expect(result).toMatch(v1Regex);
const v4 = (result) => expect(result).toMatch(v4Regex);
const v3dns = (result) => expect(result).toBe('9125a8dc-52ee-365b-a5aa-81b0b3681cf6');
const v3url = (result) => expect(result).toBe('c6235813-3ba4-3801-ae84-e0a6ebb7d138');
const v3custom = (result) => expect(result).toBe('f5a52d34-dcd7-30f7-b581-0112fab43d0c');
const v5dns = (result) => expect(result).toBe('fdda765f-fc57-5604-a269-52a7df8164ec');
const v5url = (result) => expect(result).toBe('3bbcee75-cecc-5b56-8031-b6641c1ed1f1');
const v5custom = (result) => expect(result).toBe('c49c5142-4d9a-5940-a926-612ede0ec632');
const ignore = (result) => true;

const expectations = {
  'uuidv1()': v1,
  'uuidv4()': v4,
  'uuidv3() DNS': v3dns,
  'uuidv3() URL': v3url,
  'uuidv3() MY_NAMESPACE': v3custom,
  'uuidv5() DNS': v5dns,
  'uuidv5() URL': v5url,
  'uuidv5() MY_NAMESPACE': v5custom,
  'Same with default export': ignore,
  'uuid.v1()': v1,
  'uuid.v4()': v4,
  'uuid.v3() DNS': v3dns,
  'uuid.v3() URL': v3url,
  'uuid.v3() MY_NAMESPACE': v3custom,
  'uuid.v5() DNS': v5dns,
  'uuid.v5() URL': v5url,
  'uuid.v5() MY_NAMESPACE': v5custom,
};
const expectationTitles = Object.keys(expectations);

const PORT = 9000;

describe('BrowserStack Local Testing', () => {
  async function testExpectations(path, titleFilter) {
    const url = `http://127.0.0.1:${PORT}/${path}`;
    await browser.url(url);

    await browser.waitUntil(async () => $('#done').isExisting(), 30000);

    const elements = await $$('li');

    // Unfortunately the WebDriver API is not thread safe and we cannot use Promise.all() to
    // query it in parallel:
    // https://github.com/SeleniumHQ/selenium/issues/422#issuecomment-90629726
    const titles = [];
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const h2 = await element.$('h2');
      const title = await h2.getText();
      const p = await element.$('p');
      const result = await p.getText();
      expectations[title](result);
      titles.push(title);
    }

    expect(titles).toEqual(expectationTitles.filter(titleFilter));
  }

  describe('webpack', () => {
    it('it renders all', async () =>
      testExpectations('browser-webpack/example-all.html', () => true));

    it('it renders v1 only', async () =>
      testExpectations('browser-webpack/example-v1.html', (title) => title.includes('uuidv1')));

    it('it renders v4 only', async () =>
      testExpectations('browser-webpack/example-v4.html', (title) => title.includes('uuidv4')));
  });

  describe('rollup', () => {
    it('it renders all', async () =>
      testExpectations('browser-rollup/example-all.html', () => true));

    it('it renders v1 only', async () =>
      testExpectations('browser-rollup/example-v1.html', (title) => title.includes('uuidv1')));

    it('it renders v4 only', async () =>
      testExpectations('browser-rollup/example-v4.html', (title) => title.includes('uuidv4')));
  });
});
