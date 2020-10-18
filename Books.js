import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput,event} from "react-native"
import PropTypes from "prop-types";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";
//import styles from "./styles";
//import styles from "../../bookcam/styles";

const { width, height} = Dimensions.get("window")

export default class Book extends Component{
    constructor(props) {
        super(props);
        this.state = { isEditing: false, bookValue: props.text};
    }
    static propTypes = {
        text: PropTypes.string.isRequired,
        id : PropTypes.string.isRequired,
        isCompleted : PropTypes.bool.isRequired,
        uncompleteBook: PropTypes.func.isRequired,
        completeBook: PropTypes.func.isRequired,
        deleteBook : PropTypes.func.isRequired,
        updateBook : PropTypes.func.isRequired
    }
    

    render() {
        const {isEditing, bookValue} = this.state;
        const { text, id ,deleteBook,isCompleted} = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.column}>
                    <Text> {text} </Text>
                    <TouchableOpacity onPressOut ={(event)=> {
                        event.stopPropagation;
                        deleteBook(id)}}>
                        <View>
                            <Text> XXXX </Text>
                        </View>
                    
                    </TouchableOpacity>
                        
                    
                </View>
            </View>
        )
     }
     _togglecompleted = (event) => {
        event.stopPropagation()
    
        const { isCompleted, uncompleteBook, completeBook, id} = this.props;
        if(isCompleted){
            uncompleteBook(id);
        } else {
            completeBook(id)
        }
    };
    _controllInput =(text) => {
        this.setState({
            bookValue : text
        });
    };
    _finishEditing =(event) => {
        const {bookValue} = this.state;
        const {id, updateBook} =this.props;
        updateBook(id,bookValue);
        this.setState({
            isEditing : false
        });
    }
}


const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor:"#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection : "row",
        alignItems:"center",
        justifyContent : "space-between"
    },
    column: {
        flexDirection:"row",
        alignItems:"center",
        width: width /2,
    },
    circle: {
        width:30,
        height:30,
        borderRadius:25,
        borderWidth: 3,
        marginRight:20,
    },
    completedCircle:{
        borderColor:"#bbb",
    },
    uncompletedCircle:{
        borderColor:"#F23657"
    }, 
})
