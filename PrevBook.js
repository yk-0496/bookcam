import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput,event, Button, Modal, ShadowPropTypesIOS } from "react-native"
import PropTypes from "prop-types";
//import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";
//import styles from "./styles";
//import styles from "../../bookcam/styles";

import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import { Camera } from "expo-camera";
import CameraPage from "./camera.page";

const { width, height} = Dimensions.get("window")

export default class PrevBook extends React.Component{
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: null,
            headerTransparent: true,
        }};
  /*      static propTypes = {
            prevBooks : PropTypes.array.isRequired
        };*/

        render(){
            const {navigation} = this.props.navigation;
           // const {isEditing, bookValue, isTakingPic } = this.state;
            //const { prevBooks } = this.props;
            const prevBooks = navigation.getParam("passed_prevBooks")
            console.log(prevBooks)
            return(
                <View>
                    <View style={styles.container}>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Gallery', { passed_captures : this.props.prevBook.captures })}>
                        <Text> {this.props.prevBook.text} </Text>
                        </TouchableOpacity>
                        </View>
                        </View>

                </View>
    
            )
}}