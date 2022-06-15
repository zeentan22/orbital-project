import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput,FlatList, Pressable, Animated,Dimensions} from "react-native";
import React, { userState, useState, useEffect, useRef, useCallback } from "react";
import LottieView from "lottie-react-native";
import { login, useAuth, logout,auth} from "../../firebase";

export default Loading = ({navigation}) => {
  const user = useAuth();
  useEffect(()=>{
    if (user) {
      logout();
    };
    navigation.navigate("Login Stack");

  },[])
  return(
    <View style = {styles.body}>
        <Image
            style={styles.image}
            resizeMode = "stretch"
            source={require("../../assets/!Procrastinate_Logo.png")}
          />
          <LottieView style = {[StyleSheet.absoluteFillObject,styles.container]} source = {require("../Components/98304-bouncing-ball-loader.json")} autoPlay = {true} loop={true}/>
    </View>
  )
};




const styles = StyleSheet.create({
    body: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#ffffff",
      alignItems: "center",
      justifyContent: "flex-start",
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
    container:{
      justifyContent:"center",
      alignItems:"center",
      justifyContent:"flex-end",
      marginTop:200,
      
    }
  });
  