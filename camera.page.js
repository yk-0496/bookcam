import React from 'react';
import { View , Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component'
import Shelves from './shelves.component';

export default class CameraPage extends React.Component {
    camera = null;

    state = {
        captures: [],
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
        showShelvesPopup: true,
        cameraOn : true,
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

    render() {
        const { hasCameraPermission , flashMode, cameraType, capturing, captures, cameraOn, showShelvesPopup} = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false ) {
            return <Text> Access to camera has been denied</Text>;

        }

        return (
            <React.Fragment>
                <View>
                    { cameraOn ? (
                    <Camera 
                        type={cameraType}
                        flashMode={flashMode}
                        style = {styles.preview}
                        ref ={camera => {this.camera = camera}}
                    /> ) : ( <Shelves /> ) }

                    <Modal transparent={true} visible={this.state.showShelvesPopup}>
                        <View style={styles.popupContainer}>
                            <Text style={styles.popupTitle}>
                                어떤 책??
                            </Text>
                            <ScrollView /*contentContainerStyles={styles.popupBookList} */>
                                <TouchableOpacity style = {styles.popupBookList} onPress={() => this.setState({ showShelvesPopup: false })}>
                                <Text> list </Text> 
                                </TouchableOpacity> 
                            </ScrollView>
                            <TouchableOpacity onPress={() => {this.setState({ cameraOn : false }) ; this.setState({showShelvesPopup : false });}}>
                                <Text style={styles.toshelves}>
                                    책장으로 가기
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
                {captures.length > 0 && <Gallery captures={captures}/>} 
                
                { cameraOn &&
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
                />}

                
            </React.Fragment>
        );
    };

};
