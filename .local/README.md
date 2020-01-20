# Local Fake Module for Testing

This is a local fake module for use in the [examples](../examples) and browser tests (that are
based on the examples) where we reference the `uuid` module with a local `file:` path in the
respective `package.json` files.

We must ensure that the local module does not contain locally installed dev dependencies in a
`node_modules` hence this "fake module" that just consists of symbolic links and imitates the final
contents of the npm tarball.
