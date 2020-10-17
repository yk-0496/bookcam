import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput,event} from "react-native"
import PropTypes from "prop-types";
import styles from "./styles";
import Shelves from './shelves.component';

const { width, height} = Dimensions.get("window")

export default class PrevBookList extends Component{

    state = {
        prevShelveOn : true
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
                    <TouchableOpacity onPress={() => {this.setState({ prevShelveOn : false })}}>
                        <Text style={styles.toPrevShelves}>
                            읽은 책장으로 가기
                        </Text>
                    </TouchableOpacity>
                </View>
            ):(<Shelves /> )}
            </View>
        )
    }
}