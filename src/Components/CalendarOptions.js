"use strict";
import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
const CalendarOptions = (props) => {
  const mar = props.mar;
  const mar2 = props.mar2;
  const setExamModalOpen = props.setExamModalOpen;
  const setModalOpen = props.setModalOpen;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: mar,
        }}
        onPress={() => setExamModalOpen(true)}
      >
        <Image
          source={{
            uri: "https://icons.veryicon.com/png/o/system/system-project/add-97.png",
          }}
          style={{
            height: 20,
            width: 20,
            marginRight: mar2,
            tintColor: "blue",
          }}
        />
        <Text style={{ fontSize: 15, color: "blue" }}>Get my exam dates </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ justifyContent: "center" }}
        onPress={() => setModalOpen(true)}
      >
        <Text style={styles.add}> + </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  add: {
    fontSize: 30,
    justifyContent: "center",
    // margin: 1,
  },
});

export default CalendarOptions;
