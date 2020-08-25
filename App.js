/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { StyleProvider } from 'native-base';
import React from 'react';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import Root from './src/Navigation';

const App = () => {
  return (
    <>
      <StyleProvider style={getTheme(material)}>
        <Root />
      </StyleProvider>
    </>
  );
};

export default App;
