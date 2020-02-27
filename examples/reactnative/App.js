/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';

import { v1 as uuidv1, v4 as uuidv4, v3 as uuidv3, v5 as uuidv5 } from 'uuid';

const App: () => React$Node = () => {
  const MY_NAMESPACE = '55238d15-c926-4598-b49d-cf4e913ba13c';

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>uuidv1()</Text>
              <Text style={styles.sectionDescription}>{uuidv1()}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>uuidv4()</Text>
              <Text style={styles.sectionDescription}>{uuidv4()}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>uuidv3() DNS</Text>
              <Text style={styles.sectionDescription}>
                ... using predefined DNS namespace (for domain names)
              </Text>
              <Text style={styles.sectionDescription}>
                {uuidv3('hello.example.com', uuidv3.DNS)}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>uuidv3() URL</Text>
              <Text style={styles.sectionDescription}>
                ... using predefined URL namespace (for, well, URLs)
              </Text>
              <Text style={styles.sectionDescription}>
                {uuidv3('http://example.com/hello', uuidv3.URL)}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>uuidv3() URL</Text>
              <Text style={styles.sectionDescription}>
                {uuidv3('http://example.com/hello', uuidv3.URL)}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>uuidv3() MY_NAMESPACE</Text>
              <Text style={styles.sectionDescription}>... using a custom namespace</Text>
              <Text style={styles.sectionDescription}>
                Note: Custom namespaces should be a UUID string specific to your application! E.g.
                the one here was generated using this modules `uuid` CLI.
              </Text>
              <Text style={styles.sectionDescription}>{uuidv3('Hello, World!', MY_NAMESPACE)}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>uuidv5() DNS</Text>
              <Text style={styles.sectionDescription}>
                ... using predefined DNS namespace (for domain names)
              </Text>
              <Text style={styles.sectionDescription}>
                {uuidv5('hello.example.com', uuidv5.DNS)}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>uuidv5() URL</Text>
              <Text style={styles.sectionDescription}>
                ... using predefined URL namespace (for, well, URLs)
              </Text>
              <Text style={styles.sectionDescription}>
                {uuidv5('http://example.com/hello', uuidv5.URL)}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>uuidv5() MY_NAMESPACE</Text>
              <Text style={styles.sectionDescription}>... using a custom namespace</Text>
              <Text style={styles.sectionDescription}>
                Note: Custom namespaces should be a UUID string specific to your application! E.g.
                the one here was generated using this modules `uuid` CLI.
              </Text>
              <Text style={styles.sectionDescription}>{uuidv5('Hello, World!', MY_NAMESPACE)}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  body: {
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
});

export default App;
