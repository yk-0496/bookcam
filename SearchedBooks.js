import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const { winWidth, winHeight} = Dimensions.get("window")

export default class SearchedBooks extends React.Component{


    static propTypes = {
        title: PropTypes.string.isRequired,
        isSearched : PropTypes.bool.isRequired,
    }
    
    render(){
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@팝업에서!!!")
        
        return(
            <View>
            <TouchableOpacity onPress={() => this.props.addNewBook(this.props.title, this.props.thumbnailuri)}>
                <Image source={{ uri: this.props.thumbnailuri }} style={styles.thumbnailImage} />
            </TouchableOpacity>

            <Text>
                제목: {this.props.title} 
                작가: {this.props.author} 
            </Text>
            

            </View>
        )
    }



}

