import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import ColorStrip from '../Views/ColorStrip';
import Home from '../Views/Home';
import Splash from '../Views/Auth/Splash';
import Login from '../Views/Auth/Login';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
};

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        ...screenOptions,
      }}>
      <Tab.Screen name="ColorStrip" component={ColorStrip} />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

const AuthStack = createStackNavigator();

function StackNav() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{
          ...screenOptions,
        }}>
        <AuthStack.Screen name="Splash" component={Splash} />
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="TabNav" component={TabNav} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;
