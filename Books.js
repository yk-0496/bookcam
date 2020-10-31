import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput,event, Button, Modal, ShadowPropTypesIOS } from "react-native"
import PropTypes from "prop-types";
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

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


        return(
            <View>
                {!isTakingPic ? (
                <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Gallery', { id : this.props.id , passed_captures : this.props.book.captures , 'deleteCapture' : this.props.deleteCapture.bind(this) , title : this.props.title})}>
                    <Image
                    style={{ width: 100, height: 150 }}
                    source={{ uri: this.props.thumbnail}}
                    />
                    </TouchableOpacity>
                    <View>
                    <Text style={{marginLeft:20}}> {text} </Text>
                    <View style={styles.iconcolumn}>
                    <TouchableOpacity onPressOut ={(event)=> {
                        event.stopPropagation;
                        deleteBook(id)}}>
                            <Feather name="trash-2" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isTakingPic : true })} >
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.completeReading(id)} >
                        <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                    </TouchableOpacity>
                    </View>
                    </View>
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
        marginLeft: 40,
        flexDirection:"row",
        alignItems:"center",
        width: width /2,
        height: 180,
    },
    iconcolumn: {
        marginLeft: 50,
        flexDirection:"row",
        alignItems:"center",
        width: width /3,
        height: 50,
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


