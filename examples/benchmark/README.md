# uuid Benchmark

```
npm install
npm test
```

To run the benchmark in the browser open `benchmark.html` and check the console.

Example output (`uuid@8.0.0`, MacBook Pro (Retina, 13-inch, Early 2015), 3.1 GHz Dual-Core Intel Core i7):

```
Starting. Tests take ~1 minute to run ...
uuidv1() x 1,306,861 ops/sec ±2.62% (85 runs sampled)
uuidv1() fill existing array x 4,750,515 ops/sec ±2.76% (88 runs sampled)
uuidv4() x 302,174 ops/sec ±3.06% (81 runs sampled)
uuidv4() fill existing array x 359,703 ops/sec ±3.67% (82 runs sampled)
uuidv3() x 105,667 ops/sec ±3.84% (79 runs sampled)
uuidv5() x 110,886 ops/sec ±2.55% (81 runs sampled)
Fastest is uuidv1() fill existing array
```
