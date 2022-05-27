"use strict";
import React, { userState, useState, useRef } from "react";
// import type Node from 'react';
import { NavigationContainer } from "@react-navigation/native";
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
import { signup, login, logout, useAuth } from "../../firebase";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MashButton from "../Components/CustomButton";

export default function CreateAccount({ navigation }) {
  const onPressHandler = () => {
    navigation.navigate("Login Page");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  //   const emailRef = useRef();
  //   const passwordRef = useRef();

  async function handleSignup() {
    setLoading(true);
    try {
      await signup(email, password);
      alert("signed up sucessfully");
      navigation.navigate("Login Page");
    } catch (err) {
      alert("Error!");
      console.log(err);
    }
    setLoading(false);
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.body} behavior="padding">
        <View style={styles.body1}>
          <Text style={styles.textintro}>Create your account</Text>
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
        <MashButton //havent create the signup button function yet to store into database,
          // for now it goes back to login page when you lick create account
          title="Create Account"
          color="#D3D3D3"
          style={{ marginTop: 40 }}
          onPress={handleSignup}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  body1: {
    flex: 0.4,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "flex-end",
    justifyContent: "flex-start",
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
    // fontFamily: "",
  },
  input: {
    margin: 5,
    borderWidth: 2,
    alignSelf: "center",
    width: 250,
    borderColor: "#555",
    borderRadius: 5,
    textAlign: "center",
    margin: 10,
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
