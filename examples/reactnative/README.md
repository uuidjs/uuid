# uuid example React Native

```
npm install

// For iOS:
npm run ios

// Or for Android:
npm run android
```

This example was created with the following steps:

1. Create new React Native App:

    ```
    npx react-native init reactnative
    cd reactnative
    rm -rf yarn.lock node_modules # prefer npm for consistency with uuid repo
    npm install
    ```

1. Install uuid and `crypto.getRandomValues()` Polyfill:

    ```
    npm install --save uuid react-native-get-random-values
    cd ios && pod install && cd .. # see https://github.com/react-native-community/cli/blob/master/docs/autolinking.md#autolinking
    ```

1. Add the polyfill as [first import in index.js](./index.js#L5):

    ```js
    import 'react-native-get-random-values';
    ```

1. Make use of [`uuid` in App.js](./App.js).
