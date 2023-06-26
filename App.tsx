/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FooterNav from './components/FootbarNav';

import CameraView from './pages/CameraView';
import FeedView from './pages/FeedView';
import ProfileView from './pages/ProfileView';
import HomeView from './pages/HomeView';
import AddOutfitView from './pages/AddOutfitView';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Feed"
          component={FeedView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddOutfit"
          component={AddOutfitView}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <FooterNav />
    </NavigationContainer>
  );
}

export default App;
