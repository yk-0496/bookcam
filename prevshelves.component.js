import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput,event} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import Shelves from './shelves.component';
import Current from "./Current"

import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


const { width, height} = Dimensions.get("window")

export default class PrevBookList extends Component{

    state = {
        prevShelveOn : true,
        cameraOn : false
    }
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: null,
            headerTransparent: true
            
        }
    }
    render() {
        const { prevShelveOn } = this.state;
        return (
            <View>
            { prevShelveOn ? (
                <View style={styles.shelveContainer}>
                    <View> 
                        <Text> title </Text>
                    </View>
                    <TouchableOpacity onPress={() => {this._back}}>
                        <Text style={styles.toPrevShelves}>
                            읽은 책장으로 가기
                        </Text>
                    </TouchableOpacity>
                </View>
            ):(<Shelves /> )}
            </View>
        )
    }

    _back = () => {
        this.setState({
            prevShelveOn : false
        });
    };
}