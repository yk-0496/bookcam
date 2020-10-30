import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, Dimensions, Modal, Image, TextInput,event, Button, AsyncStorage, createdAt} from "react-native";
import { AppLoading } from "expo";

import PropTypes from "prop-types";
import styles from "./styles";
import PrevBookList from "./prevshelves.component"
import CameraPage from './camera.page';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Book from "./Books";


import uuid from 'react-native-uuid';
//import { v1 as uuidv1 } from 'uuid';

const { width, height} = Dimensions.get("window")

export default class Current extends React.Component {     
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
        compBooks: {},
        isEditing: false,
     };
     

    componentDidMount = () => {
        this._loadBooks();
        this._loadcompBook();
        
    };


    /*static propTypes = {
        text: PropTypes.string.isRequired,
      }*/

      render() {
            const { Books, newBook , isEditing, loadedBooks, compBooks } = this.state;
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
                    <TouchableOpacity onPress={() => this.setState({ isEditing: true })} >
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
                        <TouchableOpacity onPress={() => this.setState({ isEditing : false })}> 
                            <Text>추가 안함</Text> 
                        </TouchableOpacity>
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
                            updatePic = {this._updatePic}
                            navigation = {this.props.navigation}
                            book = {book}
                            title ={book.text}
                            completeReading = {this._completeReading}
                            deleteCapture ={this._deleteCapture}
                            {...book}
                            />                            
                        ))}
                        
                    </ScrollView>

             
                    </View>
                    <Button 
                    title = ' 전에 읽은 책으로 '
                    onPress = {() => 
                    this.props.navigation.navigate('Previous', { passed_prevBooks : compBooks, 'turntocurrent' : this._turntocurrent.bind(this), 'deletecompBooks': this._deletecompBooks.bind(this)})
                    } />
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

    _loadcompBook = async () => {
        try{
            const compBooks = await AsyncStorage.getItem("compBooks");
            const parsedcompBooks = JSON.parse(compBooks);
            this.setState({ loadedcompBooks : true, compBooks : parsedcompBooks || {} });
            console.log("completedBook" + compBooks)
            
        } catch(e) {
            console.log(e)
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
                        captures : [],
                        numPic : 0
                    }
                };
                //console.log(newBookObject.id)
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
                    //isCompleted: false
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



    _deletecompBooks = (id) => {
        this.setState(prevState => {
            const compBooks = prevState.compBooks;
            delete compBooks[id];
            const newState = {
                ...prevState,
                ...compBooks
            };
            this._savecompBooks(newState.compBooks)
            return {...newState}
        });
    }


    _completeReading = (id) => {
        this.setState(prevState => {
            const newcompBooks = {
                [id] : prevState.Books[id] }
            const newState ={
                ...prevState,
                newcompBooks: "",
                compBooks: {
                    ...prevState.compBooks,
                    ...newcompBooks,
                }
            };

            this._savecompBooks(newState.compBooks);
            this._deleteBook(id);
            return { ...newState};
        }
        )};

    _turntocurrent = (id) => {
        this.setState(prevState => {
            const turnBook = {
                [id] :  prevState.compBooks[id] }
            const newState ={
                ...prevState,
                turnBook: "",
                Books: {
                    ...prevState.Books,
                    ...turnBook,
                }
            };
            this._saveBooks(newState.Books);
            this._deletecompBooks(id)
            return { ...newState}
            }
        )

}
            /*

            const newState = {
                ...prevState,
                Books: {
                    ...prevState.Books,
                [id]: {
                    ...prevState.Books[id],
                    readingState: false,
                }
                };
            
            //const tempcompBooks = newState.Books[id]
            const compBooks = {
                ...compBooks,
                newState.Books[id]};
            this._moveBooks(compBooks);
            this._deleteBook(id);
        };
        })*/

       /* this.setState(prevcompBooks =>{
            const newcompBooks ={
                ...prevcompBooks,
                compBooks:{
                    ...prevcompBooks.compBooks,
                    ...newState.Books[id]
                }
            }
        })*/
       // this.setState(prevState => {
         //   const newState ={
           //     ...prevState,
             //   compBooks: {
               //     ...prevState.compBooks,
                 //   newcompBooks
               // }
           // }
        //this._moveBooks(newcompBooks);
        //})
        
          //  this._moveBooks(newcompBooks);
            //this._deleteBook(id);
            //return { ...newState};
       


    _updateBooks = (id,text) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
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
    };
    _updatePic = (id,photoData) => {
        this.setState(prevState => {
            const i = prevState.Books[id].numPic
            photoData["index"] = i
            const newState = {
                Books : {
                    ...prevState.Books,
                [id]: {
                    ...prevState.Books[id],
                    captures : [photoData, ...prevState.Books[id].captures],
                    numPic : prevState.Books[id].numPic+1
                }
                }
            };
            newState.Books[id].captures.sort((a,b) => a.index - b.index )
            this._saveBooks(newState.Books);
            return {...newState};
        })
    };

    _deleteCapture = (id, index) => {
        this.setState(prevState => {
            const arrLength = prevState.Books[id].numPic
            //const targetIndex = arrLength-index-1
            console.log("$$$$$$$$$$arrLenght",arrLength)
            const targetIndex = index
            console.log("@@@전@@@@",prevState.Books[id].captures)
            prevState.Books[id].captures.splice(targetIndex, 1)
            console.log("@@@후@@@@",prevState.Books[id].captures)
            const newState ={
                Books : { 
                    ...prevState.Books,
                [id]: {
                    ...prevState.Books[id],
                    captures : [...prevState.Books[id].captures],
                    numPic : prevState.Books[id].numPic-1
                }
                }
            };
            this._saveBooks(newState.Books);
            this._rearrangeIndex(id, targetIndex);
            return {...newState};
        })
    }
    
    _rearrangeIndex = (id, targetIndex) => {
        this.setState(prevState => {
            const numberPic = prevState.Books[id].numPic;
            let newIndexArray = [];
            for (var i=0; i < numberPic ; i++) {
                const current = prevState.Books[id].captures[i];
                const currentIndex = current.index;
                if (targetIndex < currentIndex) {
                    current.index = currentIndex-1
                    newIndexArray = [current, ...newIndexArray]
                        } else {
                            current.index = currentIndex
                            newIndexArray = [current, ...newIndexArray]
                        }
                    };
                newIndexArray.sort((a,b) => a.index - b.index)
                const newState={
                    Books: {
                        ...prevState.Books,
                    [id]:{
                        ...prevState.Books[id],
                    captures : newIndexArray
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
    _savecompBooks = completedBooks => {
        const savecompBooks = AsyncStorage.setItem("compBooks", JSON.stringify(completedBooks));
    }
}




