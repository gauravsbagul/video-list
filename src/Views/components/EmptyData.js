// @ts-nocheck
import { Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default EmptyData = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Looks like no data available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#123',
  },
});
