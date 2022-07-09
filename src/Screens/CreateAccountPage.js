"use strict";
import React, { userState, useState, useRef, useEffect} from "react";
// import type Node from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
  Dimensions
} from "react-native";
import { signup, login, logout, useAuth, dbInit } from "../../firebase";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MashButton from "../Components/CustomButton";
// import { registerIndieID } from "native-notify";
// import axios from "axios";

export default function CreateAccount({ navigation }) {
  const {width, height} = Dimensions.get("screen")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const [phFName,setPHFName] = useState();
  const [phEmail,setPHEmail] = useState();
  const [phLName,setPHLName] = useState();
  const [phPassword,setPHPassword] = useState();
  const [phFNameC,setPHFNameC] = useState();
  const [phEmailC,setPHEmailC] = useState();
  const [phLNameC,setPHLNameC] = useState();
  const [phPasswordC,setPHPasswordC] = useState();
  const mar = width * 0.01
  const currentUser = useAuth();
  useEffect(()=>{
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setPHEmail("Enter your Email");
    setPHFName("Enter your First Name");
    setPHLName("Enter your Last Name");
    setPHPassword("Enter your Password");
    setPHEmailC("grey");
    setPHFNameC("grey");
    setPHLNameC("grey");
    setPHPasswordC("grey")
    
    
  },[])
  //   const emailRef = useRef();
  //   const passwordRef = useRef();

  async function handleSignup() {
    if ((email == "") || (password == "") || (first_name == "") || (last_name == "")) {
      if (password == "") {setPHPassword ("Password: Input required !");setPHPasswordC("red")};
      if (first_name == "") {setPHFName("First Name: Input required !");setPHFNameC("red")};
      if (last_name == "") {setPHLName("Last Name: Input required !");setPHLNameC("red")};
      if (email == "") {setPHEmail("Email: Input required !");setPHEmailC("red")};
    }
    else{
    navigation.navigate("Loading page");
    setTimeout(async ()=>{
    try {
      console.log("hello");
      console.log(email);
      await signup(email.trim(), password.trim()).then(async () => {
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
      if (err == "FirebaseError: Firebase: Error (auth/email-already-in-use)."){
      alert("Email is already in use! Did you forget your password?");}
      else if (err ==  "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."){alert("Password should be at least 6 characters!")}
      else {alert("Error!")};
      console.log(err);
      navigation.goBack()
    }},900)
  }}
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.body}>
      <Image
        resizeMode="cover"
        source = {{uri:"https://i.pinimg.com/736x/b0/5c/80/b05c80ef1dfc5df58f63086e45267bda.jpg"}}
        style = {[StyleSheet.absoluteFillObject]}
        blurRadius = {60}/>
        <View style = {{flex:0.2, alignItems:"flex-start",justifyContent:"flex-start",marginLeft:mar}}>
        <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} style= {{alignSelf: "flex-start", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}} onPress={()=>
          navigation.replace("Login Page")}>
        <Image style = {[styles.iconimage,{marginRight:3}]} source = {{uri: "https://icons.veryicon.com/png/o/miscellaneous/arrows/go-back-2.png"}} tintColor= '#008b8b'></Image>
        <Text style = {{fontSize:17,color: '#008b8b'}}>Go Back</Text>
      </TouchableOpacity>
      </View>
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
          placeholder={phFName}
          onChangeText={(value) => setFirstname(value)}
          placeholderTextColor={phFNameC}
        />
        <TextInput
          style={styles.input}
          placeholder={phLName}
          onChangeText={(value) => setLastname(value)}
          placeholderTextColor={phLNameC}
        />
        <TextInput
          style={styles.input}
          placeholder={phEmail}
          onChangeText={(value) => setEmail(value)}
          placeholderTextColor={phEmailC}
        />
        <TextInput
          style={styles.input}
          placeholder={phPassword}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry = {password === "" ? false : true}
          placeholderTextColor={phPasswordC}
        />
         <MashButton //havent create the login button function yet
          title="SIGN UP"
          color="red"
          textStyle = {{color: "white", fontWeight: "bold",fontStyle: "normal"}}
          style = {{borderWidth:1,borderColor:"red",marginBottom:10,marginTop:40}}
          onPress={handleSignup}
        />
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
