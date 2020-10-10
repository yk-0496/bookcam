import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AppRegistry } from 'react-native';
import { Camera } from 'expo-camera';

export default class cameraTutorial extends React.Component {
  compoenetDidMout() {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      this.setHasPermission(status === 'granted');
    })();
  }
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row'
      }}>
        <Camera
        //type={this.state.type}
          ref={ref => {
          this.camera = ref;
          }}
          style={{ width: 300, height: 400}}
          //aspect={Camera.Constants.Type.front}
        >
          <Text style ={StyleSheet.capture} onPress={this.takePicture.bind(this)}>
            [CAPTURE_IMAGE]
          </Text>
        </Camera>
      </View>
    );
  }
  
  takePicture() {
    const options = {}
    this.camera.capture({metadata: options}).then((data) => {
      console.log(data)
    }).catch((error) => {
      console.log(error)
    })
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  view: {
    flex:1,
    justifyContent: 'flex-end',
    //alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'steelblue',
    borderRadius: 10,
    color: 'red',
    padding: 15,
    margin: 45
  }

});

AppRegistry.registerComponent('cameraTutrial', () => cameraTutorial);
