import React, { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";
import MashButton from "../Components/CustomButton";
import SetCalendar from "./calendar";
const ScheduleStack = createStackNavigator();

export default function Schedule() {
  const Trial = ({ navigation }) => {
    return (
      <View style={styles.body}>
        <Text style={styles.text}>Set your schedule</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("SetCalendar")}
          >
            <Text> Set Schedule </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text> Custom notifications </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const Trial2 = ({ navigation }) => {
    return (
      <View style={styles.body}>
        <MashButton
          title="GO back"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.text}>Set your schedule 2</Text>
      </View>
    );
  };
  return (
    <ScheduleStack.Navigator
      initialRouteName="first"
      screenOptions={{ header: () => null }}
    >
      <ScheduleStack.Screen name="first" component={Trial} />

      <ScheduleStack.Screen name="SetCalendar" component={SetCalendar} />
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
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    width: 300,
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
