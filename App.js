import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/navigator'
import { Provider } from 'react-redux';
import { store } from './src/redux/store';


const App = () => {
  return (
    <Provider store={store}>
    <SafeAreaProvider>     
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </SafeAreaProvider>
    </Provider>
  )
}

export default App