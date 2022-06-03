"use strict";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import { onSnapshot, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Card, Avatar } from "react-native-paper";
import { dbInit } from "../../firebase";

const SetCalendar = ({ navigation }) => {
  const [items, setItems] = useState({});

  useEffect(() => {
    let result = {};
    return onSnapshot(
      doc(dbInit, "users", getAuth().currentUser.uid),
      (doc) => {
        let allData = doc.data().tasks;
        allData.forEach((element) => {
          const dateInput = element.date;
          result[dateInput] = element.tasks;
        });
        console.log(result);
        setItems(result);
      }
    );
  }, []);

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={{
          marginRight: 10,
          marginTop: 20,
          shadowColor: "#000000",
          shadowOpacity: 0.8,
          shadowRadius: 2,
          shadowOffset: {
            height: 2,
            width: 1,
          },
        }}
      >
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyData={() => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}> No tasks </Text>
          </View>
        )}
        showOnlySelectedDayItems={true}
      />
    </View>
  );
};

export default SetCalendar;

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
  body: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
