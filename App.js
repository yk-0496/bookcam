import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AppRegistry } from 'react-native';
import CameraPage from './camera.page';

export default class Application extends React.Component {
  render() {
    return(
      <CameraPage />
    );
  };
};

//AppRegistry.registerComponent('cameraTutrial', () => cameraTutorial);
