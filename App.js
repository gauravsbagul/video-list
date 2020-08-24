/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const App = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Video List</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: '#008000',
    fontWeight: '700',
    fontSize: 30,
  },
});

export default App;
