# uuid Benchmark

```
npm install
npm test
```

To run the benchmark in the browser open `benchmark.html` and check the console.

Example output (`uuid@8.0.0`, MacBook Pro (Retina, 13-inch, Early 2015), 3.1 GHz Dual-Core Intel Core i7):

```
uuidv1() x 1,329,774 ops/sec ±1.67% (87 runs sampled)
uuidv1() fill existing array x 3,568,608 ops/sec ±1.67% (89 runs sampled)
uuidv4() x 305,160 ops/sec ±1.86% (85 runs sampled)
uuidv4() fill existing array x 352,852 ops/sec ±1.92% (85 runs sampled)
uuidv3() DNS x 115,482 ops/sec ±1.55% (80 runs sampled)
uuidv3() URL x 103,127 ops/sec ±1.49% (81 runs sampled)
uuidv3() MY_NAMESPACE x 107,009 ops/sec ±1.59% (80 runs sampled)
uuidv5() DNS x 113,219 ops/sec ±1.66% (82 runs sampled)
uuidv5() URL x 100,618 ops/sec ±4.13% (81 runs sampled)
uuidv5() MY_NAMESPACE x 95,596 ops/sec ±4.24% (74 runs sampled)
Fastest is uuidv1() fill existing array
```
