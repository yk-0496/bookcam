import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput,event} from "react-native"
import PropTypes from "prop-types";
import styles from "./styles";
import PrevBookList from "./prevshelves.component"
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
                    ) : (
                        <View>
                            <Text style={styles.shelveTitle}> Shelves </Text>
                            <View style={styles.shelves}>
                            <Text> 1 </Text>
                            <Text> 2 </Text>
                            <Text> 3 </Text>
                            </View>
                            <TouchableOpacity onPress={() => {this.setState({ prevShelveOn : true })}}>
                                <Text style={styles.toPrevShelves}>
                                    읽은 책장으로 가기
                                </Text>
                            </TouchableOpacity>
                        </View>
                        )}
            </View>
               
        )}
}
 