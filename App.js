import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AppRegistry } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import PrevBookList from "./prevshelves.component"
import Shelves from './shelves.component';
import Current from "./Current"
import CameraPage from './camera.page';

class Application extends React.Component {
  render() {
    return(
      <CameraPage />
    );
  };
};

const AppNavigator = createStackNavigator(
  {
  Cam: CameraPage,
  Current: Current,
  Previous: PrevBookList,
  },
  {
  initialRootName: 'Cam',
  },

);

export default createAppContainer(AppNavigator);

//AppRegistry.registerComponent('cameraTutrial', () => cameraTutorial);
