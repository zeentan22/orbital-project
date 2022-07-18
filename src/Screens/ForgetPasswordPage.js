import React, { useState, useEffect } from "react";
import { login, useAuth, logout,auth, resetPasswordEmail} from "../../firebase";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getDoc, collection, doc, setDoc} from "firebase/firestore"
// import type Node from 'react';
// import { NavigationContainer } from "@react-navigation/native";
// import { Card } from "@rneui/themed";
import {
  StatusBar,
  Alert,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
  ScrollView,
  RefreshControl,
  FlatList,
  SectionList,
  Pressable,
  TextInput,
  ToastAndroid,
  Modal,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
} from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MashButton from "../Components/CustomButton";
export default function ForgetPassword({ navigation }) {
  const user = useAuth()
  const [email, setEmail] = useState("");
  const [phEmail,setPHEmail] = useState();
  const [phEmailC,setPHEmailC] = useState();
  const {width, height} = Dimensions.get("screen")
  const mar = width * 0.01

  useEffect(()=>{
    setEmail("");
    setPHEmail("Enter your Email");
    setPHEmailC("grey");
    
    
  },[])

  async function handleForgetPassword() {
      if (email == "") {setPHEmail("Email: Input required !");setPHEmailC("red")}
    else{
    try {
      await resetPasswordEmail(email.trim());
      console.log("Email Sent");
      alert("An Email has been sent to you to reset password!");
      navigation.replace("Login Page");
    } catch {
      alert("Invalid Email!");
    }}
  };
  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView enableOnAndroid={true}  contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.body}>
        <Image
        resizeMode="cover"
        source = {{uri:"https://i.pinimg.com/564x/3c/3a/35/3c3a357172fb7a9f153bfae96c2d5e17.jpg"}}
        style = {StyleSheet.absoluteFillObject}
        blurRadius = {60}/>
          <View style = {{flex:0.2, alignItems:"flex-start",justifyContent:"flex-start",marginLeft:mar}}>
          <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} style= {{alignSelf: "flex-start", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}} onPress={()=>
            navigation.replace("Login Page")}>
          <Image style = {[styles.iconimage,{marginRight:3}]} source = {{uri: "https://icons.veryicon.com/png/o/miscellaneous/arrows/go-back-2.png"}} tintColor= 'black'></Image>
          <Text style = {{fontSize:17,color: 'black',fontWeight:"bold"}}>Go Back</Text>
        </TouchableOpacity>
        </View>
        <View style = {styles.body1}>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={require("../../assets/!Procrastinate_Logo.png")}
          />
        
          <Text style={styles.textintro}>Enter the email associated with your account</Text>
        <TextInput
          style={[styles.input]}
          placeholder={phEmail}
          onChangeText={(text) => setEmail(text)} //connect to backend to login by checking with database
          placeholderTextColor={phEmailC}
        />
        <MashButton //havent create the login button function yet
          title="SEND EMAIL"
          color="red"
          textStyle = {{color: "white", fontWeight: "bold",fontStyle: "normal"}}
          style = {{borderWidth:1,borderColor:"red"}}
          onPress={handleForgetPassword}
        />
        </View>

      </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollbody: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    flex: 1,
  },
  body: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  body1: {
    flex: 0.4,
    width: "94%",
    borderRadius:20,
    flexDirection: "column",
    alignItems: "flex-end",
    alignSelf:"center",
    justifyContent: "center",
    marginBottom:30,
  },
  text: {
    fontSize: 40,
    fontStyle: "italic",
    alignSelf: "center",
  },
  textintro: {
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 20,
    textAlign:"center"
  },
  textintroSmall: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    margin: 5,
    borderWidth: 2,
    alignSelf: "center",
    width: "94%",
    borderColor: "#555",
    borderRadius: 5,
    textAlign: "center",
    margin: 15,
    height: 55,
  },
  button: {
    height: 50,
    width: "100%",
    justifyContent: "center",
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: "center",
    justifyContent: "center",
  },
  iconimage:{
    height: 30,
    width: 30,
    alignSelf: "center",
    justifyContent:"center",
  },
});
