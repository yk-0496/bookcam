import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput,event} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import Shelves from './shelves.component';
import Current from "./Current"

import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import PrevBook from './PrevBook';

const { width, height} = Dimensions.get("window")

export default class PrevBookList extends Component{




    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: null,
            headerTransparent: true
            
        }
    }
    render() {
        //const {navigation} = this.props.navigation;
        const prevBooks = this.props.navigation.getParam("passed_prevBooks")
        console.log(prevBooks)
        return(
            <View style={styles.shelveContainer}>
                <Text style= {styles.shelveTitle}>
                    완독 !! 
                </Text>
                <View style={styles.shelves}>

                <ScrollView>
                     
                    </ScrollView>

             
                
                </View>
            
            </View>
        )
    }}
