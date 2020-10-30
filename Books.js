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

export default class Book extends React.Component{
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: null,
            headerTransparent: true,
        }};

    constructor(props) {
        super(props);
        this.state = { isEditing: false, bookValue: props.text};
    }
    state = {
        isTakingPic : false
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        id : PropTypes.string.isRequired,
        //isCompleted : PropTypes.bool.isRequired,
        //uncompleteBook: PropTypes.func.isRequired,
        //completeBook: PropTypes.func.isRequired,
        deleteBook : PropTypes.func.isRequired,
        updateBook : PropTypes.func.isRequired,
       // gal_captures : PropTypes.array.isRequired,
        completeReading : PropTypes.func.isRequired,
    }
    
    
    _TakingPic =() => {
        this.setState({isTakingPic:false})
        //console.log(this.props.key)
        //console.log(id)
    };

    render(){
        const {navigation} = this.props.navigation;
        const {isEditing, bookValue, isTakingPic } = this.state;
        const { text, id ,deleteBook, deleteCapture} = this.props;
        console.log(this.props.book)
        return(
            <View>
                {!isTakingPic ? (
                <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Gallery', { id : this.props.id , passed_captures : this.props.book.captures , 'deleteCapture' : this.props.deleteCapture.bind(this) , title : this.props.title})}>
                    <Text> {text} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPressOut ={(event)=> {
                        event.stopPropagation;
                        deleteBook(id)}}>
                        <View>
                            <Text> XXXX </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isTakingPic : true })} >
                        <Text> Camera </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.completeReading(id)} >
                        <Text> 다읽음 </Text>
                    </TouchableOpacity>
                    </View>
                    </View>
                    ): (
                    <Modal>
                        <CameraPage 
                        TakingPic = {this._TakingPic} 
                        isTakingPic={this.state.isTakingPic} 
                        updatePic={this.props.updatePic}
                        id2={this.props.id} />
                        </Modal>)}

   
            </View>

        )
     
    /* _togglecompleted = (event) => {
        event.stopPropagation()
    
        const { isCompleted, uncompleteBook, completeBook, id} = this.props;
        if(isCompleted){
            uncompleteBook(id);
        } else {
            completeBook(id)
        }
    };*/
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
}}


const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor:"#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection : "row",
        alignItems:"center",
        justifyContent : "space-between",
        fontSize:20
        
    },
    column: {
        flexDirection:"row",
        alignItems:"center",
        width: width /2,
        height:40,
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
});


