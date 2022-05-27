import React, { useState, useEffect } from "react";
import { login } from "../../firebase";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const onPressHandler = () => {
    navigation.navigate("Createpage"); //used for when we click on Create Account Button, go to that page
  };

  async function handleLogin() {
    setLoading(true);
    try {
      await login(email, password);
      console.log("logged in!");
      navigation.navigate("Screenc");
      alert("Logged in!");
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.body}>
        <View style={styles.body1}>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={require("../../assets/!Procrastinate_Logo.png")}
          ></Image>
          <Text style={styles.textintro}>Welcome !</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="E.g. xxx@gmail.com"
          onChangeText={(text) => setEmail(text)} //connect to backend to login by checking with database
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={(text) => setPassword(text)} //connect to backend to login by checking with database
          secureTextEntry
        />
        <MashButton //havent create the login button function yet
          title="Login"
          color="#D3D3D3"
          onPress={handleLogin}
        />
        <MashButton
          title="Create Account"
          color="#D3D3D3"
          onPress={onPressHandler}
        />
      </View>
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
    flex: 1 / 3,
    flexDirection: "column",
    backgroundColor: "#ffffff",
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
    // fontFamily: "Cochin",
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
