import React from 'react';
import { View , Text, Modal, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import PropTypes from "prop-types";

import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component'
import Shelves from './shelves.component';

import PrevBookList from "./prevshelves.component";
import Current from "./Current";
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Book from './Books';


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
        //playsounds: Camera.Constants.playSoundOnCapture
    };
    
    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };
    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
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
        const { hasCameraPermission , flashMode, cameraType, capturing, captures, showShelvesPopup } = this.state;
        const { Books } = this.props;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false ) {
            return <Text> Access to camera has been denied</Text>;

        }

        return (
            <React.Fragment>
                <View>
                    <Camera 
                        type={cameraType}
                        flashMode={flashMode}
                        style = {styles.preview}
                        ref ={camera => {this.camera = camera}}
                    /> 


                </View>

                {captures.length > 0 && <Gallery captures={captures}/>} 
                
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

                
            </React.Fragment>
        );
    };

};



