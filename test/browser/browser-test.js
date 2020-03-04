/* eslint-disable no-restricted-globals, camelcase */
const { Builder, By, until } = require('selenium-webdriver');
const browserstack = require('browserstack-local');
const httpServer = require('http-server');

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

const PROJECT = process.env.GITHUB_REPOSITORY || 'node-uuid';
const GITHUB_SHA = process.env.GITHUB_SHA || '';
const GITHUB_REF = process.env.GITHUB_REF || '';
const BUILD = GITHUB_SHA || GITHUB_REF ? `${GITHUB_REF} ${GITHUB_SHA}` : 'manual build';

module.exports = function(localIdentifier, PORT, capabilityMatrix) {
  describe(`browser ${localIdentifier}`, () => {
    jest.setTimeout(180000);

    let server;
    beforeAll((done) => {
      server = httpServer.createServer({
        root: `${__dirname}/../../examples`,
      });
      server.listen(PORT, '0.0.0.0', done);
    });

    let bsLocal;
    beforeAll((done) => {
      bsLocal = new browserstack.Local();
      bsLocal.start(
        {
          key: process.env.BROWSERSTACK_ACCESS_KEY,
          onlyAutomate: 'true',
          verbose: 'true',
          localIdentifier,
        },
        done,
      );
    });

    afterAll((done) => {
      bsLocal.stop(done);
    });

    afterAll(() => {
      server.close();
    });

    capabilityMatrix.forEach((additionalCapabilities) => {
      describe(Object.values(additionalCapabilities).join(' '), () => {
        let browser;
        beforeAll(async () => {
          var capabilities = {
            resolution: '1024x768',
            'browserstack.user': process.env.BROWSERSTACK_USER,
            'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
            'browserstack.local': true,
            'browserstack.localIdentifier': localIdentifier,
            project: PROJECT,
            build: BUILD,
            name: 'browser test',
            ...additionalCapabilities,
          };
          browser = await new Builder()
            .usingServer('http://hub-cloud.browserstack.com/wd/hub')
            .withCapabilities(capabilities)
            .build();
        });
        afterAll(async () => {
          try {
            await browser.close();
          } catch (error) {}
          try {
            await browser.quit();
          } catch (error) {}
        });

        async function testExpectations(path, titleFilter) {
          const url = `http://127.0.0.1:${PORT}/${path}`;
          await browser.get(url);
          await browser.wait(until.elementLocated(By.id('done')), 30000);
          const elements = await browser.findElements(By.css('li'));

          // Unfortunately the WebDriver API is not thread safe and we cannot use Promise.all() to
          // query it in parallel:
          // https://github.com/SeleniumHQ/selenium/issues/422#issuecomment-90629726
          const titles = [];
          console.log('START ITERATING over n elements', elements.length); // eslint-disable-line
          for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            console.log('AWAITING h2 from element[i]=', i); // eslint-disable-line
            const h2 = await element.findElement(By.css('h2'));
            console.log('AWAITING title from h2=', h2); // eslint-disable-line
            const title = await h2.getText();
            console.log('AWAITING p after title=', title); // eslint-disable-line
            const p = await element.findElement(By.css('p'));
            console.log('AWAITING result from p=', p); // eslint-disable-line
            const result = await p.getText();
            console.log('ADDING result to expectations title/resultp=', title, result); // eslint-disable-line
            expectations[title](result);
            titles.push(title);
          }
          console.log('DONE ITERATING'); // eslint-disable-line

          expect(titles).toEqual(expectationTitles.filter(titleFilter));
          console.log('DONE WITH EXPECTATIONS'); // eslint-disable-line
        }

        describe('webpack', () => {
          test('it renders all', async () =>
            testExpectations('browser-webpack/example-all.html', () => true));

          test('it renders v1 only', async () =>
            testExpectations('browser-webpack/example-v1.html', (title) =>
              title.includes('uuidv1'),
            ));

          test('it renders v4 only', async () =>
            testExpectations('browser-webpack/example-v4.html', (title) =>
              title.includes('uuidv4'),
            ));
        });

        describe('rollup', () => {
          test('it renders all', async () =>
            testExpectations('browser-rollup/example-all.html', () => true));

          test('it renders v1 only', async () =>
            testExpectations('browser-rollup/example-v1.html', (title) =>
              title.includes('uuidv1'),
            ));

          test('it renders v4 only', async () =>
            testExpectations('browser-rollup/example-v4.html', (title) =>
              title.includes('uuidv4'),
            ));
        });
      });
    });
  });
};
