import React from "react";
import { Pressable, StyleSheet, Text, Button } from "react-native";

const MashButton = (p) => {
  return (
    <Pressable
      onPress={p.onPress}
      hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
      android_ripple={{ color: "#00f" }}
      style={({ pressed }) => [
        { backgroundColor: pressed ? "#dddddd" : p.color },
        styles.button,
        { disabled: pressed ? true : false },
        { ...p.style },
      ]}
    >
      <Text style={styles.text}>{p.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: "center",
    justifyContent: "center",
    color: "#000000",
    fontSize: 15,
    fontStyle: "italic",
  },
  button: {
    width: 200,
    height: 45,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 10,
  },
});
export default MashButton;
