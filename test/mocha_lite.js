/**
 * Haven't figured out how to get mocha to work with ES6 modules yet, so we have
 * this little shim for it here for now.
 */
const suites = [];
let inProgress = 0;

export async function describe(name, suiteFunction) {
  const suite = {name, tests: [], awaits: []};
  suites.push(suite);
  suiteFunction();
}

export async function it(name, testFunction) {
  const suite = suites[suites.length-1];
  const test = {name};
  suite.tests.push(test);

  try {
    inProgress++;
    await testFunction();
    test.passed = true;
  } catch (err) {
    test.error = err;
  } finally {
    inProgress--;
    process.nextTick(reportAndExit);
  }
}

function reportAndExit() {
  if (inProgress > 0) return;

  let nTests = 0;
  let nPassed = 0;
  for (const suite of suites) {
    console.log(`\n\x1b[1m${suite.name}\x1b[0m`);

    for (const test of suite.tests) {
      nTests++;
      if (test.passed) {
        nPassed++;
        console.log(`\u2705 ${test.name}`);
      } else {
        console.log(`\u274c ${test.name}`);
        console.error(test.error);
      }
    }
  }

  process.exit(nPassed == nTests ? 0 : 1);
}
