import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput,event} from "react-native"

import PropTypes from "prop-types";
import styles from "./styles";
import PrevBookList from "./prevshelves.component"
import Current from "./Current"

import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


const { width, height} = Dimensions.get("window")

export default class Shelves extends Component{
    state = {
        prevShelveOn : false
    }
    render() {
        const { prevShelveOn } = this.state;
        return(
            <View style={styles.shelveContainer}>
                { prevShelveOn ? ( <PrevBookList /> 
                    ) : (<CurrentBookList />
                )}
            </View>
               
        )}
}
 