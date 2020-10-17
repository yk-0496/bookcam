import { StyleSheet, Dimensions, Platform, useWindowDimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get ('window');

export default StyleSheet.create({
    preview: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    alignCenter: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    bottomToolbar: {
        width: winWidth,
        position: 'absolute',
        height: 100,
        bottom: 0,
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    captrueBtnActive: {
        width:80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "transparent",
        borderColor: "transparent",
    },
    galleryContainer: {
        bottom: 100
    },
    galleryImageContainer: {
        width: 75,
        height: 75,
        marginRight: 5
    },
    galleryImage: {
        width:75,
        height:75
    },
    popupContainer: {
        //backgroundColor: "rgb(225, 197, 47)",
        backgroundColor: "#FFFFFF",
        alignItems: 'center',
        //flex:1,
        //width: winWidth - 25,
        borderRadius:25,
        marginHorizontal:30,
        marginVertical:150,
        //height: winHeight-10,
        //paddingTop: 100
        ...Platform.select({
            ios: {
              shadowColor: "rgb(50, 50, 50)",
              shadowOpacity: 0.5,
              shadowRadius:5,
              shadowOffset:{
                height:-1,
                width:0
              }
              
            },
            android: {
              elevation: 3
      
            }
          })
    },
    popupTitle: {
        //backgroundColor: "#bbb",
        width: winWidth -100,
        fontSize:30,
        fontWeight:"400",
        paddingBottom: 10,
        paddingTop: 10,
        textAlign: 'center',
        marginTop:10,
        //marginBottom:10
        //borderBottomColor: "#bbb",
        //borderBottomWidth:1
    },
    popupBookList: {
        backgroundColor: "#bbb",
        //flex: 1,
        //paddingBottom:220,
        marginBottom:25,
        //paddingHorizontal:100,
        alignItems: 'center',
        width : winWidth - 100,
        height: 225
    },

    toshelves: {
        marginLeft:200,
        backgroundColor: "yellow",
        marginBottom:25,
    },
    shelveContainer: {
        backgroundColor: "yellow",
        width : winWidth,
        height: winHeight,
        alignItems: 'center'
    },
    shelveTitle: {
        backgroundColor: "#bbb",
        fontSize:30,
        fontWeight: "400",
        marginTop: 50,
    },
    shelves: {
        backgroundColor: "#FFFFFF",
        marginTop:30,
        flex:1,
        width: winWidth - 50,
        marginBottom:20,
    },
    toPrevShelves: {
        fontSize: 40,
        backgroundColor: "blue",
        marginBottom:60,
        alignSelf: 'flex-end',
    },
    prevShelveContainer:{
        backgroundColor: "brown",
        width : winWidth,
        height: winHeight,
        alignItems: 'center'
    },
    prevShelve: {
        backgroundColor: "#FFFFFF",
        marginTop:30,
        flex:1,
        width: winWidth - 50,
        marginBottom:20,
    },

    
});