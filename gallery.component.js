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
            headerTransparent: true
        }
    }
    render(){
    const { navigation } = this.props;
    const captures = navigation.getParam("passed_captures")
    const id = navigation.getParam("id")
    const { params } = this.props.navigation.state; 
    console.log(id)
    return(
        <ScrollView
        horizontal={true}
        style={ styles.galleryContainer}
        >
            {captures
            .reverse()
            .map(({ uri }, index ) => (
                <View style={styles.galleryImageContainer} key={uri}>
                    <TouchableOpacity onPress={() => params.deleteCapture(id,index)}>
                        <Text style={styles.shelveTitle}> {index}
                        </Text>
                    </TouchableOpacity>
                    <Image source={{ uri }} style={styles.galleryImage} />

                    
                   
                </View>
            ))}
        </ScrollView>
    )


}



};