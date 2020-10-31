import React, {Component} from 'react';
import { View , Text, Modal, ScrollView, TouchableOpacity, Button,Image } from 'react-native';
import {CameraRoll} from '@react-native-community/cameraroll';
import { Camera } from 'expo-camera';
//import {RNCamera} from 'react-native-camera';
import * as Permissions from 'expo-permissions';
import PropTypes from "prop-types";

import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';
import Shelves from './shelves.component';

import PrevBookList from "./prevshelves.component";
import Current from "./Current";
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Book from './Books';

import { ViewShot  } from "react-native-view-shot"
//import  {usePrevent}

export default class CameraPage extends React.Component {

  camera = null;


  /*  static propTypes = {
        list: PropTypes.string.isRequired
    }*/

    state = {
        captures: [],
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
        showShelvesPopup : true,
        galleryOn : false,
        //playsounds: Camera.Constants.playSoundOnCapture
    };

    static propTypes = {
        id2 : PropTypes.string.isRequired,
        updatePic : PropTypes.func.isRequired,
                //isTakingPic : PropTypes.bool.isRequired,
    }

    
    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };
    handleShortCapture = async () => {
        const { updatePic, id2 } = this.props;
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false /*, captures: [photoData, ...this.state.captures]*/})
        //console.log( "!!!!!!!!!!!!!!photoData ::", photoData.uri)
        updatePic( id2 , photoData );
    };
    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };
    
    
    async componentDidMount() {

        
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status == 'granted');
        
        this.setState({ hasCameraPermission });
        

    };
    
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: null,
            headerTransparent: true,
            headerRight: (
                <Button
                color="#ff5c5c"
                title='책장'
                onPress={() => navigation.navigate("Current")}/>
            )
        }
    }

    render() {
      /*
        return(
            <ViewShot ref="viewShot" options={{ format:"jpg", quality: 0.9}}>
                <Text> ...Somethig to rasterize...</Text>
            </ViewShot>
        );*/
    
        const { hasCameraPermission , flashMode, cameraType, capturing, captures, showShelvesPopup, isTakingPic, galleryOn } = this.state;
       // const { id } = this.props;
        //const { Books } = this.props;
        
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false ) {
            return <Text> Access to camera has been denied</Text>;

        }
       // console.log(id)

        return (

            <React.Fragment>
                <View style={styles.shelveTitle}/>
                <View>
                    <Camera 
                        type={cameraType}
                        flashMode={flashMode}
                        style = {styles.preview}
                        ref ={camera => {this.camera = camera}}
                    /> 
                </View>
                <TouchableOpacity onPress = {() => {this.props.TakingPic()}} >
                <Text style={styles.togallary}> 책장으로 돌아가기 </Text>
                </TouchableOpacity>    
                <View style={styles.shelveBottom}>          
                
                <Toolbar
                capturing={capturing}
                flashMode={flashMode}
                cameraType={cameraType}
                setFlashMode={this.setFlashMode}
                setCameraType={this.setCameraType}
                onCaptureIn={this.handleCaptureIn}
                onCaptureOut={this.handleCaptureOut}
                onLongCapture={this.handleLongCapture}
                onShortCapture={this.handleShortCapture}
                />
                </View>  

            </React.Fragment>
        );
};

};


/*
class ExampleWaitingCapture extends Component {
    onImageLoad = () => {
      this.refs.viewShot.capture().then(uri => {
        console.log("do something with ", uri);
      })
    };
    render() {
      return (
        <ViewShot ref="viewShot">
          <Text>...Something to rasterize...</Text>
          <Image onLoad={this.onImageLoad} />
        </ViewShot>
      );
    }
  }


  class ExampleCaptureScrollViewContent extends Component {
    onCapture = uri => {
      console.log("do something with ", uri);
    }
    render() {
      return (
        <ScrollView>
          <ViewShot onCapture={this.onCapture} captureMode="mount">
            <Text>...The Scroll View Content Goes Here...</Text>
          </ViewShot>
        </ScrollView>
      );
    }
  }*/



