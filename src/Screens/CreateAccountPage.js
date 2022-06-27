"use strict";
import React, { userState, useState, useRef, useEffect} from "react";
// import type Node from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
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
import { signup, login, logout, useAuth, dbInit } from "../../firebase";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MashButton from "../Components/CustomButton";
// import { registerIndieID } from "native-notify";
// import axios from "axios";

export default function CreateAccount({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
  useEffect(()=>{
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    
  },[])
  //   const emailRef = useRef();
  //   const passwordRef = useRef();

  async function handleSignup() {
    navigation.replace("Loading page");
    setTimeout(async ()=>{
    try {
      console.log("hello");
      console.log(email);
      await signup(email, password).then(async () => {
        try {
          alert(`Welcome to the app, ${last_name}!`);
          const wdoc = doc(dbInit, "users", getAuth().currentUser.uid);
          // await registerIndieID(
          //   getAuth().currentUser.uid,
          //   2943,
          //   "BmROKxqlbzefNiBbzAbRXt"
          // );

          // axios
          //   .post(`https://app.nativenotify.com/api/indie/notification`, {
          //     subID: getAuth().currentUser.uid,
          //     appId: 2943,
          //     appToken: "BmROKxqlbzefNiBbzAbRXt",
          //     title: "!Procastinate",
          //     message: "Signed up!",
          //     dateSent: "13-6-2022 8:30PM",
          //   })
          //   .catch((e) => console.log(e));

          setDoc(wdoc, {
            firstname: first_name,
            lastname: last_name,
            emailadd: email,
            tasks: [],
          });
          console.log("Document written with ID: ", wdoc.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      });
    } catch (err) {
      alert("Error!");
      console.log(err);
      navigation.replace("Createpage")
    }},900)
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.body}>
      <Image
        resizeMode="cover"
        source = {{uri:"https://i.pinimg.com/736x/b0/5c/80/b05c80ef1dfc5df58f63086e45267bda.jpg"}}
        style = {[StyleSheet.absoluteFillObject]}
        blurRadius = {60}/>
        <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} style= {{alignSelf: "flex-start", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom:20, marginLeft:2, marginRight:166,}} onPress={()=>
          navigation.goBack()}>
        <Image style = {[styles.iconimage,{marginRight:3}]} source = {{uri: "https://icons.veryicon.com/png/o/miscellaneous/arrows/go-back-2.png"}} tintColor= '#008b8b'></Image>
        <Text style = {{fontSize:17,color: '#008b8b'}}>Go Back</Text>
      </TouchableOpacity>
        <View style={styles.body1}>
        <Image
        resizeMode="cover"
        source = {{uri:"https://i.pinimg.com/564x/58/c8/51/58c851da1dd0d65cd196de3d3de2916d.jpg"}}
        style = {[StyleSheet.absoluteFillObject,{borderRadius:20}]}
        blurRadius = {0}/>
          <Text style={[styles.textintro]}>Sign up Now</Text>
          <Text style={[styles.textintroSmall]}>It's quick and easy.</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={(value) => setFirstname(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(value) => setLastname(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="E.g. xxx@gmail.com"
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={(value) => setPassword(value)}
          secureTextEntry
        />
         <MashButton //havent create the login button function yet
          title="SIGN UP"
          color="red"
          textStyle = {{color: "white", fontWeight: "bold",fontStyle: "normal"}}
          style = {{borderWidth:1,borderColor:"red",marginBottom:10,marginTop:40}}
          onPress={handleSignup}
        />
      </View>
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
    width: "90%",
    borderRadius:20,
    flexDirection: "column",
    backgroundColor: "#ffffff",
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
    fontSize: 45,
    alignSelf: "center",
    marginBottom: 20,
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
    width: 300,
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
    height: 200,
    width: 200,
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
