import React, { userState, useState, useEffect } from "react";
import {logout, dbInit, useAuth} from "../../firebase";
import {getAuth} from "firebase/auth";
import {getDoc, onSnapshot, doc} from "firebase/firestore";
// import type Node from 'react';
// import { NavigationContainer } from "@react-navigation/native";
// import { Card } from "@rneui/themed";
// import { signIn, supabase } from "./Lib/supabase-client.js";
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
} from "react-native";
import MashButton from "../Components/CustomButton";

// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import MashButton from "../Components/CustomButton";

export default function Screenc({ navigation }) {
  const [username, setUserName] = useState("")
  const currentUser = useAuth();
  useEffect(() => {
    const wdoc = doc(dbInit, "users", getAuth().currentUser.uid);
    const dat = onSnapshot(wdoc, (doc) =>{
      console.log("hello")
      console.log(doc.data().firstname)
      setUserName(doc.data().firstname)
    });
  },[]) 
  console.log(typeof currentUser);
  console.log(currentUser?.email);
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      alert("log out");
      navigation.navigate("Login Page");
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  return (
    <View>
      <Text style={styles.text}>Hello Friend {username} </Text>
      <MashButton title="Log Out" color="#D3D3D3" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
  body: {
    flex: 1,
  },
});
