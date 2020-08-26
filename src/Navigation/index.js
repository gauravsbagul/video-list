import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import ColorStrip from '../Views/ColorStrip';
import MyFeed from '../Views/MyFeed';
import Splash from '../Views/Auth/Splash';
import Login from '../Views/Auth/Login';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
};

const TabNav = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'MyFeed') {
            iconName = focused ? 'heart' : 'heart-o';
            return <FontAwesome name={iconName} size={size} color={'red'} />;
          } else if (route.name === 'ColorStrip') {
            iconName = focused ? 'star' : 'star-o';
            return <FontAwesome name={iconName} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="MyFeed" component={MyFeed} />
      <Tab.Screen name="ColorStrip" component={ColorStrip} />
    </Tab.Navigator>
  );
};

const AuthStack = createStackNavigator();

const StackNav = () => {
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
};
const mapStateToProps = ({ authentication }) => {
  return { authentication };
};

export default connect(mapStateToProps)(StackNav);
