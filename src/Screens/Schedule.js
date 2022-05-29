import React, { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Schedule({ navigation }) {
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Set your schedule</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Text> Set Schedule </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text> Custom notifications </Text>
        </TouchableOpacity>
      </View>
    </View>
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
