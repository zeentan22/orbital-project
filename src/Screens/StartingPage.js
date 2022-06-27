import React, {useRef, useEffect} from "react";
import {View, Animated, TouchableOpacity, Text,  StyleSheet,Image} from "react-native"







export default StartPage = ({navigation}) =>{
    const opacity = useRef(new Animated.Value(0)).current
    useEffect(()=>{
        fadeIn();
        setTimeout(()=>{
            fadeOut();
        },500);
        setTimeout(()=>{navigation.replace("Login Page")},1100)
    },[])
    function fadeIn(){
        Animated.timing(opacity,{
            toValue: 1,
            duration: 500,
            useNativeDriver:true
        }).start()
    };

    function fadeOut(){
        Animated.timing(opacity,{
            toValue: 0.2,
            duration: 600,
            useNativeDriver:true
        }).start()
    };



    return (
        <View style = {styles.body}>
            <Image
            style={styles.image}
            resizeMode = "stretch"
            source={require("../../assets/!Procrastinate_Logo.png")}
          />
            <Animated.View style = {[{width:"100%", opacity,alignSelf:"center"}]}>
                <Text style = {[styles.text2, "font-family: Cursive"]}>From</Text>
                <Text style = {[styles.text, "font-family: fantasy"]}>!Procrastinate</Text>

            </Animated.View>


        </View>
    )
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        padding: 10,
    },
    image: {
        height:350,
        width: 350,
        marginTop:80,
        marginRight:15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius:2,
      },
    text: {
      alignSelf: "center",
      justifyContent: "center",
      color: "#21d6ff",
      fontSize: 25,
      fontStyle: "italic",
    },
    text2: {
      alignSelf: "center",
      justifyContent: "center",
      color: "black",
      fontSize: 20,
      fontStyle: "italic",
    },
  });