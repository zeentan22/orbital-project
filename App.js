import React, { userState, useState, useEffect } from "react";
// import type Node from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
// import { Card } from "@rneui/themed";
import MashButton from "./src/Components/CustomButton";
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
import { createStackNavigator, Header } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Login from "./src/Screens/LoginPage";
import CreateAccount from "./src/Screens/CreateAccountPage";
// import Screenc from "./src/Screens/Screen_C";
// import { yupResolver } from "@hookform/resolvers/yup";
import Screenc from "./src/Screens/Screen_C";
import "react-native-gesture-handler";
import Tabs from "./src/Navigation/tabs";
const Wholelogin = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Wholelogin.Navigator>
        <Wholelogin.Screen
          name="Login Page"
          component={Login}
          options={{ title: "Login" }}
        />

        <Wholelogin.Screen
          name="Createpage"
          component={CreateAccount}
          options={{ title: "Create Account" }}
        />
        <Wholelogin.Screen
          name="Screenc"
          component={Tabs}
          options={{ title: "!Procrastinate" }}
        />
      </Wholelogin.Navigator>
    </NavigationContainer>
  );
}

export default App;
/*const LoginScreen = ({navigation}) => {
  const [change, setChange] = useState([]);
  const {emails,passwords} = user;
  const[text, setText] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  async function doLogin() {
    const {user,error} = signIn(email,password);
    if (error) {
      Alert.alert("Error Signing in", error.message,[{text: "OK", onPress:()=> null},]);
    }
  }
  return (
    <View style = {styles.body}>
      <StatusBar stylew = "auto"/>
      <Card>
        <Card.Title title="LOGIN"/>
        <Card.Content>
          <TextInput
          label = "Email"
          value = {text}
          onChangeText={(text)=>setEmail(text)}
          style = {{marginBottom:12}}/>
          <TextInput
          label = "Password"
          secureTextEntry
          value = {text}
          onChangeText={(text)=>setPassword(text)}
          style = {{marginBottom:12}}/>
        </Card.Content>
        <Card.Actions>
          <Button color="#E82127"
          onPress={()=>doLogin()}
          title = "LOGIN"></Button>
          <Button
          color="#E82127"
          onPress={()=>navigation.navigate("CreateAccount")}
          title = "CREATE ACCOUNT"></Button>
        </Card.Actions>
      </Card>



    </View>
  )
}


const loadAllChanges = async () => {
  const {change, error} = await getAllFlashcard();
  setChange(flashcard); } ;
  useEffect(()=> {
  loadAllChanges()
}
  )
const App = () =>{
  const [auth,setAuth] = useState(false);
  const [loading,setLoading] = useState(false)
  return (
    <LoginScreen/>
  )

}
*/

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
