import React from "react";
import { Pressable, View, StyleSheet, Text, Button } from "react-native";

export default CustomTabHeading = (p) => {
  const onPage = p.onPage
    return (
    <View style = {{flexDirection: "row",borderWidth:1,borderRadius:12,width:"90%",height:40,justifyContent:"center",alignItems:"center",backgroundColor:"#008080"}}>
      <Pressable
        onPress={p.onPress1}
        hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
        style={({ pressed }) => [
          { backgroundColor: onPage ? "white" : "#008080"},
          styles.button,
          { borderRadius:10},
          {width:"49.2%",height:"90%",alignSelf:"center"},
          { disabled: onPage ? true : false },
        ]}
      >
        <Text style={onPage ? styles.text2 : styles.text}>{p.title1}</Text>
      </Pressable>
      <Pressable
        onPress={p.onPress2}
        hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
        style={({ pressed }) => [
          { backgroundColor: onPage ? "#008080" : "white"},
          styles.button,
          { borderRadius:10},
          {width:"49.8%",height:"96%",alignSelf:"center"},
          { disabled: onPage ? false : true },
        ]}
      >
        <Text style={onPage ? styles.text : styles.text2}>{p.title2}</Text>
      </Pressable>
    </View>
    );
  };


  const styles = StyleSheet.create({
    text: {
      alignSelf: "center",
      justifyContent: "center",
      color: "white",
      fontSize: 15,
      fontStyle: "italic",
    },
    text2: {
      alignSelf: "center",
      justifyContent: "center",
      color: "black",
      fontSize: 15,
      fontStyle: "italic",
    },
    button: {
      width: 140,
      height: 45,
      alignSelf: "stretch",
      alignItems: "stretch",
      justifyContent: "center",
    },
  });