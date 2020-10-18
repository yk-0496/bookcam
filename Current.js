import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Dimensions, Modal, TextInput,event, Button, AsyncStorage, createdAt} from "react-native";

import PropTypes from "prop-types";
import styles from "./styles";
import PrevBookList from "./prevshelves.component"
import CameraPage from './camera.page';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import uuid from 'react-native-uuid';
//import { v1 as uuidv1 } from 'uuid';

const { width, height} = Dimensions.get("window")

export default class Current extends React.Component{     
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: null,
            headerTransparent: true,
        }
    }

    state = { 
        newBook: "",
        Books: {}
     };
     

    constructor(props) {
        super(props);
        this.state = { isEditing: false, newBookValue: props.text };
    }

    /*static propTypes = {
        text: PropTypes.string.isRequired,
      }*/

        render() {
            const { newBook, Books, isEditing } = this.state;
            //const {text} = this.props
            //const { isEditing } = this.props;
            //console.log(text)
            return(

                <View style={styles.shelveContainer}>
                    <Text style={styles.shelveTitle}>
                        책장 이름
                    </Text>
                    <View style={styles.shelves}>
                    <TouchableOpacity onPress={() => this.setState({isEditing: true})} >
                        <Text style={styles.addBook}>책 추가하기</Text>
                    </TouchableOpacity>
                    { isEditing && <Modal transparent={true} visible ={true}>
                        <View style={styles.listEditing}>
                        <TextInput
                        //style={styles.inputList}
                        placeholder={"추가할 책 이름을 입력해주세요"}
                        value = {newBook}
                        onChangeText = {this._controlNewBook}
                        returnKeyType={"done"}
                        placeholderTextColor= {"#999"}
                        autoCorrect={false}
                        onSubmitEditing={this._addNewBook}/>
                        </View>
                        </Modal> }
                    <ScrollView>
                        <Text> 1 </Text>
                        <Text> 2 </Text>
                        <Text> 3 </Text>
                    </ScrollView>
                    </View>
                    <Button 
                    title = ' 전에 읽은 책으로 '
                    onPress = {() => this.props.navigation.navigate('Previous')}/>
                </View>
            )
        }
    

    /*addBook=() => {
        //const {text} = this.state;
        this.setState({
            isEditing : true
        });
    },*/
    _controlNewBook = text => {
        this.setState({
            newBook: text,
        });
    };

    _addNewBook = () => {
        const {newBook} = this.state;
        if (newBook !== "") {
            this.setState(prevState => {
                const ID = uuid.v1();
                const newBookObject ={
                    [ID] : {
                        id: ID,
                        text: newBook,
                        createdAt : Date.now(),
                    }
                };
                const newState ={
                    ...prevState,
                    newBook: "",
                    Books: {
                        ...prevState.Books,
                        ...newBookObject
                    }
                };
                this._saveBooks(newState.Books);
                return { ...newState};
            });
        this.setState({ isEditing: false})
        }
        
    };

    _saveBooks = (newBooks,Books) => {
        const saveBooks = AsyncStorage.setItem("Books", JSON.stringify(newBooks));
        //console.log(JSON.stringify(newBooks))
        console.log(Books)
    }

}




