// In App.js in a new project

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      <Pressable>
        <Text>SplashScreen...</Text>
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

export default Splash;
