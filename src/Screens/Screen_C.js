import React, { userState, useState, useEffect } from "react";
import {logout, dbInit, useAuth} from "../../firebase";
import {getAuth} from "firebase/auth";
import {getDoc, onSnapshot, doc} from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
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
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer';
import {Avatar, Title, Caption,Paragraph,Drawer,TouchableRipple,Switch} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SetFlashCard from "./flashcard";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import MashButton from "../Components/CustomButton";
import SetCalendar from "./calendar";
import SetNotifications from "./noti";
const homeStackTab = createBottomTabNavigator()
const homeDrawer = createDrawerNavigator()

export function HomeStack({navigation}) {
  const HomePageStack = () => {return(
    <NavigationContainer
    independent = {true}>
      <homeStackTab.Navigator>
        <homeStackTab.Screen
        name = "Calendar"
        component={SetCalendar}/>

        <homeStackTab.Screen
        name = "Notifications"
        component={SetNotifications}/>

        <homeStackTab.Screen
        name = "Flashcards"
        component={SetFlashCard}/>

      </homeStackTab.Navigator>
    </NavigationContainer>
  )
}
return(
    <homeDrawer.Navigator drawerContent={(props) => <DrawerContent {...props}/>}>
      <homeDrawer.Screen
      name = "Home"
      component={HomePageStack}/>


    </homeDrawer.Navigator>


)
}


export function DrawerContent (props) {
/*  const [username, setUserName] = useState("")
  useEffect(() => {
    const wdoc = doc(dbInit, "users", getAuth().currentUser.uid);
    const dat = onSnapshot(wdoc, (doc) =>{
      console.log(doc.data().firstname)
      setUserName(doc.data().firstname)
    });
    return dat
  },[]) */

   return (
    <View style ={{flex:1}}>
      <DrawerContentScrollView {...props}>
        <View style = {styles.body}>
          <View style = {[styles.body]}>
            <Text>Hello World</Text>
          </View>
        </View>
        <Drawer.Section style={{flex:1, marginTop:40}}>
          <DrawerItem label = "Home" onPress={()=> {props.navigation.navigate("Home")}}></DrawerItem>
          <DrawerItem label = "Sign Out" onPress = {async () =>
          await logout()
          .then(()=>{alert("logged out"); props.navigation.navigate("Login Page")})
          .catch(error=>alert(error.message))}></DrawerItem>




        </Drawer.Section>
      
      </DrawerContentScrollView>
    </View>
   )
}


export function Screenc({ navigation }) {
/*  const [username, setUserName] = useState("")
  const currentUser = useAuth();
  useEffect(() => {
    const wdoc = doc(dbInit, "users", getAuth().currentUser.uid);
    const dat = onSnapshot(wdoc, (doc) =>{
      console.log("hello")
      console.log(doc.data().firstname)
      setUserName(doc.data().firstname)
    });
  },[])  */
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
