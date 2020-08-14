# WebdriverIO Wrapper

`uuid` uses [WebdriverIO](https://webdriver.io/) to run browser tests. However WebdriverIO cannot be installed on [platforms like z/OS](https://github.com/uuidjs/uuid/pull/509).

In order to allow Node.js "Canary in the Goldmine" (https://github.com/nodejs/citgm) tests to be run on such platforms we need to install WebdriverIO as optional `devDependencies`.

Unfortunately `npm` doesn't support this out-of-the-box, so we have to wrap the affected dependencies in a local wrapper package.
