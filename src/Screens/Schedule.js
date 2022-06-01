import React, { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";
import MashButton from "../Components/CustomButton";

const ScheduleStack = createStackNavigator();

export default function Schedule() {






const Trial = ({navigation}) =>{
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Set your schedule</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress ={()=> navigation.navigate("second")}>
          <Text> Set Schedule </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text> Custom notifications </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Trial2 = ({navigation}) =>{
  return (
    <View style={styles.body}>
      <MashButton title = "GO back" onPress={()=>{navigation.goBack()}}/>
      <Text style={styles.text}>Set your schedule 2</Text>
    </View>
  );
};
return (
<ScheduleStack.Navigator
initialRouteName="first"
screenOptions={{header: ()=> null}}>
<ScheduleStack.Screen
  name = "first"
    component={Trial}/>


    <ScheduleStack.Screen
    name = "second"
    component={Trial2}/>




  </ScheduleStack.Navigator>
  );

}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    textAlign: "center",
  },
  body: {
    flex: 1,
    // justifyContent: "center",
  },
  button: {
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    padding: 10,
    margin: 20,
  },
  buttons: {
    marginTop: 150,
    justifyContent: "center",
    // alignItems: "center",
  },
});
