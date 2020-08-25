// In App.js in a new project

import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" animating />
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

export default Splash;
