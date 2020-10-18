import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Dimensions, Modal, TextInput,event, Button, AsyncStorage, createdAt} from "react-native";
import { AppLoading } from "expo";

import PropTypes from "prop-types";
import styles from "./styles";
import PrevBookList from "./prevshelves.component"
//import CameraPage from './camera.page';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Book from "./Books";


import uuid from 'react-native-uuid';
//import { v1 as uuidv1 } from 'uuid';

const { width, height} = Dimensions.get("window")

export default class Current extends React.Component{     
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: null,
            headerTransparent: true,
        }
    };
    
    state = { 
        newBook: "",
        loadedBooks : false,
        Books: {},
        isEditing: false
     };
     

    componentDidMount = () => {
        this._loadBooks();
        
    };


    /*static propTypes = {
        text: PropTypes.string.isRequired,
      }*/

        render() {
            const { Books, newBook , isEditing, loadedBooks } = this.state;
            //const {text} = this.props
            //const { isEditing } = this.props;
            //console.log(text)
           // if (!loadedBooks) {
             //   return <Apploading />;
            //}

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
                        {Object.values(Books)
                        .map(book => (
                            <Book
                            key={book.id}
                            uncompleteBook = {this._uncompleteBook}
                            completeBook = {this._completeBook}
                            updateBook = {this._updateBooks}
                            deleteBook = {this._deleteBook}
                            {...book}
                            />
                        ))}
                        
                        
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

    _loadBooks = async () => {
        try {
            const Books = await AsyncStorage.getItem("Books");
            const parsedBooks = JSON.parse(Books);
            //console.log(Books);
            this.setState({ loadedBooks : true , Books : parsedBooks || {} });
            //console.log(typeof Books)
            //console.log({Books})
            //console.log(Object.values(parsedBooks))
           // console.log(typeof Books, typeof parsedBooks)
           console.log("Book"+Books)


        } catch(err) {
            console.log(err)
        }
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
    _uncompleteBook = (id) => {
        this.setState(prevState => {
            const newState ={
                ...prevState,
                Books: {
                    ...prevState.Books,
                [id] : {
                    ...prevState.Books[id],
                    isCompleted: false
                }
            }
        }
        this._saveBooks(newState.Books);
        return { ...newState};
        })
    };
    _deleteBook = (id) => {
        this.setState(prevState => {
            const Books = prevState.Books;
            delete Books[id];
            const newState = {
                ...prevState,
                ...Books
            };
            this._saveBooks(newState.Books);
            return {...newState}
        });
    }
    _completeBook = (id) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                Books: {
                    ...prevState.Books,
                [id]: {
                    ...prevStete.Books[id],
                    isCompleted: true
                }
                }
            };
            this._saveBooks(newState.Books);
            return { ...newState};
        })
    };
    _updateBooks = (id,text) => {
        this.setState(prevState => {
            const newState = {
                Books: {
                    ...prevState.Books,
                [id]: {
                    ...prevState.Books[id],
                    text: text
                }
                }
            };
            this._saveBooks(newState.Books);
            return {...newState};
        })
    }

    _saveBooks = newBooks => {
        const saveBooks = AsyncStorage.setItem("Books", JSON.stringify(newBooks));
        //console.log(JSON.stringify(newBooks))
        //console.log(Books)
    }

}




