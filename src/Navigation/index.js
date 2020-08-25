import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import ColorStrip from '../Views/ColorStrip';
import MyFeed from '../Views/MyFeed';
import Splash from '../Views/Auth/Splash';
import Login from '../Views/Auth/Login';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
};

const TabNav = (props) => {
  return (
    <Tab.Navigator
    // tabBarOptions
    >
      <Tab.Screen name="MyFeed" component={MyFeed} />
      <Tab.Screen name="ColorStrip" component={ColorStrip} />
    </Tab.Navigator>
  );
};

const AuthStack = createStackNavigator();

const StackNav = (props) => {
  const isLoggedIn = props.authentication?.userLoggedOut;

  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{
          ...screenOptions,
        }}>
        <AuthStack.Screen name="Splash" component={Splash} />
        {isLoggedIn ? (
          <AuthStack.Screen name="Login" component={Login} />
        ) : (
          <AuthStack.Screen name="TabNav" component={TabNav} />
        )}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
const mapStateToProps = ({ authentication }) => {
  return { authentication };
};

export default connect(mapStateToProps)(StackNav);
