import pkg from 'uuid/package.json' assert { type: 'json' };

// Some tools like react-native need to introspect the package.json file
console.log('pkg.name', pkg.name);
