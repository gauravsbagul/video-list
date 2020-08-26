/* eslint-disable react-hooks/exhaustive-deps */
// In App.js in a new project

import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { isLoggedIn } from '../../Redux/actions/auth';
import { connect } from 'react-redux';

const Splash = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.isLoggedIn();
    }, 2000);
  }, []);

  useEffect(() => {
    if (props.navigation.isFocused()) {
      if (props.authentication.hasOwnProperty('isLogin')) {
        if (
          props.authentication.isLogin?.error &&
          props.authentication.isLogin?.response === 'Logged Out'
        ) {
          props.navigation.navigate('Login');
        } else {
          props.navigation.replace('TabNav');
        }
      }
    }
  }, [props]);

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
