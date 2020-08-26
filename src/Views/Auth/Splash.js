/* eslint-disable react-hooks/exhaustive-deps */
// In App.js in a new project

import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { isLoggedIn } from '../../Redux/actions/auth';
import { connect } from 'react-redux';

const Splash = (props) => {
  const { navigation } = props;

  useEffect(() => {
    setTimeout(() => {
      props.isLoggedIn();
    }, 3000);
  }, []);

  useEffect(() => {
    if (navigation.isFocused()) {
      if (props.authentication.hasOwnProperty('isLogin')) {
        if (
          !props.authentication.isLogin?.error &&
          props.authentication.isLogin?.response === 'Logged Out'
        ) {
          navigation.navigate('Login');
        } else {
          navigation.replace('TabNav');
        }
      }
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
