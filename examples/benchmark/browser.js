import * as uuid from './node_modules/uuid/dist/esm-browser/index.js';
import './node_modules/lodash/lodash.js';
import './node_modules/benchmark/benchmark.js';

import benchmark from './benchmark.js';

benchmark(uuid, window.Benchmark);
