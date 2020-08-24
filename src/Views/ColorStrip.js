// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
const ColorStrip = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('LoginScreen')}>
        <Text>ColorStripScreen</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ColorStrip;
