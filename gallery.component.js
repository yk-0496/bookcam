import React, {Component} from 'react';
import { View, Image, ScrollView } from 'react-native';
import PropTypes from "prop-types";
import styles from './styles';

import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default class Gallery extends Component{
    render(){
    const { navigation } = this.props;
    const captures = navigation.getParam("passed_captures")
    console.log(captures)
    return(
    <ScrollView
        horizontal={true}
        style={ styles.galleryContainer}
        >
            {captures.map(({ uri }) => (
                <View style={styles.galleryImageContainer} key={uri}>
                    <Image source={{ uri }} style={styles.galleryImage} />
                </View>
            ))}
        </ScrollView>
    )
}};