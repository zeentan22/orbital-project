import React, { useState, useEffect } from "react";
import { login, useAuth, logout,auth} from "../../firebase";
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
  Keyboard,
} from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MashButton from "../Components/CustomButton";
export default function Login({ navigation }) {
  const user = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onPressHandler = () => {
    navigation.navigate("Createpage"); //used for when we click on Create Account Button, go to that page
  };

  async function handleLogin() {
    navigation.replace("Loading page");
    setTimeout(async ()=>{
    try {
      await login(email, password);
      console.log("logged in!");
      alert("Welcome back!");
    } catch {
      alert("Error!");
      navigation.replace("Login Page")
    }},1500)
  };
  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.body}>
        <Image
        resizeMode="cover"
        source = {{uri:"https://i.pinimg.com/564x/3c/3a/35/3c3a357172fb7a9f153bfae96c2d5e17.jpg"}}
        style = {StyleSheet.absoluteFillObject}
        blurRadius = {60}/>
        <View style={styles.body1}>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={require("../../assets/!Procrastinate_Logo.png")}
          ></Image>
          <Text style={styles.textintro}>Welcome !</Text>
        </View>
        <TextInput
          style={[{marginBottom:0,borderBottomWidth:0.5,borderBottomLeftRadius:0,borderBottomRightRadius:0},styles.input]}
          placeholder="E.g. xxx@gmail.com"
          onChangeText={(text) => setEmail(text)} //connect to backend to login by checking with database
        />
        <TextInput
          style={[{marginTop:0,borderTopWidth:0.5,borderTopLeftRadius:0,borderTopRightRadius:0},styles.input]}
          placeholder="Enter Password"
          onChangeText={(text) => setPassword(text)} //connect to backend to login by checking with database
          secureTextEntry
        />
        <MashButton //havent create the login button function yet
          title="LOGIN"
          color="red"
          textStyle = {{color: "white", fontWeight: "bold",fontStyle: "normal"}}
          style = {{borderWidth:1,borderColor:"red",marginBottom:20}}
          onPress={handleLogin}
        />

        <View style = {{flex:1/4,alignItems:"center",marginTop:40}}>
        <View style={{flexDirection: 'row', alignItems: 'center',width:350, height:50,marginBottom:0}}>
          <View style={{flex: 1, height: 1.5, backgroundColor: 'black',width:100}} />
          <View>
            <Text style={[styles.textintro2,{width: 100,fontStyle: "normal", textAlign: 'center'}]}>New User?</Text>
          </View>
          <View style={{flex: 1, height: 1.5, backgroundColor: 'black',width:100}} />
        </View>

        <MashButton 
          style = {{borderWidth:1}}
          textStyle = {{fontWeight: "bold",fontStyle: "normal"}}
          title="GET STARTED"
          onPress={onPressHandler}
        />
        </View>

      </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollbody: {
    backgroundColor: "#ffffff",
    justifyContent: 'center',
    flex: 1,

  },
  body: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  body1: {
    flex: 0.5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 40,
    fontStyle: "italic",
    alignSelf: "center",
  },
  textintro: {
    fontSize: 40,
    alignSelf: "center",
    marginBottom: 20,
  },

  textintro2: {
    fontSize: 17,
    alignSelf: "center",
    fontStyle: "italic",
    color:"black",
  },
  input: {
    margin: 5,
    backgroundColor:"white",
    borderWidth: 1,
    alignSelf: "center",
    width: 350,
    height: 50,
    borderColor: "#555",
    borderRadius: 5,
    textAlign: "center",
    margin: 15,
    paddingHorizontal: 10,
  },
  button: {
    height: 50,
    width: "100%",
    justifyContent: "center",
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
    justifyContent: "center",
  },
});
