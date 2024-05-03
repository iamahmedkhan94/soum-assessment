/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { BrowseProductsMockData, BrowseProductsScreen } from '~/screens';


function App(): React.JSX.Element {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <BrowseProductsScreen data={BrowseProductsMockData} />
    </SafeAreaView>
  );
}

export default App;
