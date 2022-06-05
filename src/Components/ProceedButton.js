import React from "react";
import { Pressable, StyleSheet, Text, Button } from "react-native";

const ProceedButton = (p) => {
    return (
      <Pressable
        onPress={p.onPress}
        hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
        style={({ pressed }) => [
          { backgroundColor: pressed ? "#dddddd" : "#00fa9a"},
          styles.button,
          {borderRadius:8, borderWidth:1},
          {borderBottomWidth: pressed ? 1 : 4},
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
      width: 140,
      height: 45,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      margin: 10,
      borderRadius: 3,
    },
  });
  export default ProceedButton;
  