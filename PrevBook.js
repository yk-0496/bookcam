import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput,event, Button, Modal, ShadowPropTypesIOS } from "react-native"
import PropTypes from "prop-types";

//import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";
import styles from "./styles";
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
        state = {
            isReading : false
        }

        static propTypes = {
            text: PropTypes.string.isRequired,
            id : PropTypes.string.isRequired,
            //turntocurrent : PropTypes.func.isRequired,
            //isCompleted : PropTypes.bool.isRequired,
            //uncompleteBook: PropTypes.func.isRequired,
            //completeBook: PropTypes.func.isRequired,
            deletecompBooks : PropTypes.func.isRequired,
            //updateBook : PropTypes.func.isRequired,
            //gal_captures : PropTypes.array.isRequired,
            //completeReading : PropTypes.func.isRequired,
        }
        render(){
            const { navigation } = this.props.navigation;
           // const {isEditing, bookValue, isTakingPic } = this.state;
            //const { prevBooks } = this.props;
            const { text, id, deletecompBooks } = this.props;
            const { isReading } =this.state;
            console.log(id)
           // console.log(typeof turntocurrent)
            return(
                <View>
                    <View style={styles.container}>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Gallery', { passed_captures : this.props.prevbook.captures })}>
                        <Text style={!isReading ? styles.completedText : styles.readingText}> {text} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {this.props.turntocurrent(id); this.setState({isReading:true})}}>
                        <Text> 읽는중으로 변경 </Text>
                        </TouchableOpacity>
                        

                        </View>
                        </View>

                </View>
    
            )
}}