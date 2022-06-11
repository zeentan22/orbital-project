"use strict";
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { Agenda } from "react-native-calendars";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Card, Avatar } from "react-native-paper";
import { dbInit } from "../../firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
const SetCalendar = ({ navigation }) => {
  const docRef = doc(dbInit, "users", getAuth().currentUser.uid);
  const [items, setItems] = useState({});
  const [unmodfiedItems, setUnmodifiedItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date());

  const convertDate = (date) => {
    const extraMonthFormat = date.getMonth() + 1 < 10 ? "0" : "";
    const extraDayFormat = date.getDate() < 10 ? "0" : "";
    return `${date.getFullYear()}-${extraMonthFormat}${
      date.getMonth() + 1
    }-${extraDayFormat}${date.getDate()}`;
  };

  const [dateFormat, setDateFormat] = useState(convertDate(date));

  let fDateTime = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const onChange = (event, selectedDate) => {
    fDateTime = convertDate(selectedDate);
    setDate(selectedDate);
    setDateFormat(convertDate(selectedDate));
    console.log(fDateTime);
  };

  useEffect(() => {
    let result = {};
    let unmodifiedResult = [];
    return onSnapshot(
      doc(dbInit, "users", getAuth().currentUser.uid),
      (doc) => {
        let allData = doc.data().tasks;
        allData.forEach((element) => {
          unmodifiedResult.push(element);
          const dateInput = element.date;
          result[dateInput] = element.tasks;
        });
        setItems(result);
        setUnmodifiedItems(unmodifiedResult);
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
      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => setModalOpen(false)}
            style={{ alignSelf: "flex-end" }}
          >
            <Image
              source={require("../../assets/cross.png")}
              style={styles.modalClose}
            />
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 300,
              height: 700,
              borderColor: "black",
              borderRadius: 5,
              borderWidth: 2,
            }}
          >
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              display="default"
              is24Hour={true}
              onChange={onChange}
              // style={{ width: 200, marginRight: 70 }}  
            />

            <TextInput
              style={styles.input}
              placeholder="task 1..."
              onChangeText={(val) => {
                setTask(val);
                console.log(task);
              }}
            />

            <TouchableOpacity
              style={{ borderColor: "black", borderWidth: 2, borderRadius: 5 }}
              onPress={() => {
                const obj = { date: dateFormat, tasks: [{ name: task }] };
                let oldData = {};
                unmodfiedItems.forEach((item) => {
                  if (item.date === dateFormat) {
                    oldData = item;
                  }
                });
                if (Object.keys(oldData).length === 0) {
                  updateDoc(docRef, { tasks: arrayUnion(obj) });
                } else {
                  updateDoc(docRef, { tasks: arrayRemove(oldData) });
                  let updatedTasks = [...oldData.tasks, ...obj.tasks];
                  let newObj = { date: dateFormat, tasks: updatedTasks };
                  updateDoc(docRef, { tasks: arrayUnion(newObj) });
                }
              }}
            >
              <Text> Add Task </Text>
            </TouchableOpacity>

            {/* <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={"time"}
              display="default"
              is24Hour={true}
            /> */}
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{ alignSelf: "flex-end" }}
        onPress={() => setModalOpen(true)}
      >
        <Text style={styles.add}> + </Text>
      </TouchableOpacity>
      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyData={() => (
          <View style={styles.itemContainer}>
            <Text style={styles.noTasksText}> No tasks </Text>
          </View>
        )}
        showOnlySelectedDayItems={true}
      />
    </View>
  );
};

export default SetCalendar;

const styles = StyleSheet.create({
  noTasksText: {
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

  add: {
    fontSize: 30,
    margin: 1,
  },

  modalClose: {
    // marginTop: 50,
    // marginRight: 10,
    marginBottom: 10,
    width: 35,
    height: 40,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },

  modalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 50,
    // margin: 10
    // marginTop: 20,

    // marginRight: 300,
    width: 200,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
