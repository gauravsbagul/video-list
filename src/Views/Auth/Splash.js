// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { isLoggedIn } from '../../Redux/actions/auth';
import { connect } from 'react-redux';

const Splash = (props) => {
  const { navigation } = props;

  useEffect(() => {
    setTimeout(() => {
      props.isLoggedIn();
    }, 2000);
  }, []);

  useEffect(() => {
    if (!props.authentication?.userLoggedOut) {
      navigation.replace('TabNav');
    } else {
      navigation.navigate('Login');
    }
  }, [props.authentication]);

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

const mapStateToProps = ({ authentication }) => {
  return { authentication };
};
const mapDispatchToProps = {
  isLoggedIn,
};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
