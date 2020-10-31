import React, {Component} from 'react';
import { View, Image, Text, ScrollView,TouchableOpacity } from 'react-native';
import PropTypes from "prop-types";
import styles from './styles';

import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default class Gallery extends Component{
    
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: null,
            headerTransparent: true,
            

    }}

    render(){
    const { navigation } = this.props;
    const captures = navigation.getParam("passed_captures")
    const booktitle = navigation.getParam("title")
    const id = navigation.getParam("id")
    const { params } = this.props.navigation.state; 
    console.log("@@@전@@@",captures)
    captures.sort((a,b) => a.index - b.index )
    console.log(booktitle)
    return(
        <ScrollView
        horizontal={true}
        style={ styles.galleryContainer}
        >
            {captures
            .map(capture => (
                <View style={styles.galleryImageContainer} key={capture.uri} >
                    <View style={styles.galleryTitle}>
                        <Text> {booktitle} </Text>
                        <TouchableOpacity onPress={() => params.deleteCapture(id,capture.index)}>
                        <Text> 삭제 </Text>
                    </TouchableOpacity> 
                    </View>

                    <Image source={{uri: capture.uri }} style={styles.galleryImage} />
                    <View style={styles.bottomGallery}/>
                    
                    
                   
                </View>
            ))}
        </ScrollView>
    )


}



};