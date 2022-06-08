"use strict";
import React, { useState, useEffect } from "react";
import moment from "moment";
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
  const [startTime, setStartTime] = useState(0);

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
    let x = moment(selectedDate).format("YYYY-MM-DD HH:mm:ss");
    let time = x.split(" ")[1];
    const hour = time.split(":")[0];
    const minutes = time.split(":")[1];
    setDate(selectedDate);
    setDateFormat(convertDate(selectedDate));
    setStartTime(parseInt(hour) * 60 + parseInt(minutes));
  };

  const onChangeTime = (event, selectedTime) => {
    let x = moment(selectedTime).format("YYYY-MM-DD HH:mm:ss");
    let time = x.split(" ")[1];
    const hour = time.split(":")[0];
    const minutes = time.split(":")[1];
    setDate(selectedTime);
    setStartTime(parseInt(hour) * 60 + parseInt(minutes));
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
          element.tasks.sort((a, b) => {
            return parseInt(a.startTime) - parseInt(b.startTime);
          });

          result[dateInput] = element.tasks;
        });
        setItems(result);
        setUnmodifiedItems(unmodifiedResult);
      }
    );
  }, []);

  const convertTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}:${minutes}`;
  };

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
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "#d1d1e0",
                  overflow: "hidden",
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "#d1d1e0",
                }}
              >
                {convertTime(item.startTime)}
              </Text>
              <Text style={{ alignSelf: "center" }}>{item.name}</Text>
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
              style={{ width: 200, marginRight: 70 }}
            />

            <Text> </Text>

            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"time"}
              display="default"
              is24Hour={true}
              style={{ width: 200, margnRight: 70 }}
              onChange={onChangeTime}
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
                const obj = {
                  date: dateFormat,
                  tasks: [{ name: task, done: false, startTime: startTime }],
                };
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
