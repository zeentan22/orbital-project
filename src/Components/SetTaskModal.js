import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  Image,
  TextInput,
} from "react-native";
import { convertDate, convertTime } from "../Screens/utils";

const SetTaskModal = (props) => {
  const modalOpen = props.modalOpen;
  const setModalOpen = props.setModalOpen;
  const dateFormat = props.dateFormat;
  const setChooseDate = props.setChooseDate;
  const setChooseTime = props.setChooseTime;
  const setTask = props.setTask;
  const startTime = props.startTime;
  const task = props.task;
  const unmodfiedItems = props.unmodfiedItems;
  const handleUpdate = props.handleUpdate;
  const docRef = props.docRef;
  const setupdateItem = props.setupdateItem;
  const updateItem = props.updateItem;
  return (
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
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            height: "94%",
          }}
        >
          <Text
            style={{
              fontSize: 35,
              borderWidth: 3,
              width: "94%",
              textAlign: "center",
            }}
          >
            Set Your Task
          </Text>
          <Text style={{ fontSize: 25 }}>Date Chosen: {dateFormat}</Text>

          <TouchableOpacity
            style={{
              borderRadius: 16,
              borderWidth: 2,
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              width: "40%",
            }}
            onPress={() => {
              setChooseDate(true);
              setModalOpen(false);
            }}
          >
            <Text> Pick a date </Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 25 }}>
            Time Chosen: {convertTime(startTime)}
          </Text>

          <TouchableOpacity
            style={{
              borderRadius: 16,
              borderWidth: 2,
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              width: "40%",
            }}
            onPress={() => {
              setChooseTime(true);
              setModalOpen(false);
            }}
          >
            <Text> Pick a Time </Text>
          </TouchableOpacity>

          <TextInput
            textAlign="center"
            style={styles.input}
            placeholder="Task 1..."
            onChangeText={(val) => {
              setTask(val);
            }}
          />
          <TouchableOpacity
            style={{
              borderColor: "black",
              borderWidth: 2,
              borderRadius: 10,
              width: "60%",
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              const obj = {
                date: dateFormat,
                tasks: [
                  {
                    name: task,
                    done: false,
                    startTime: startTime,
                    date: dateFormat,
                  },
                ],
              };
              let oldData = {};
              unmodfiedItems.forEach((item) => {
                if (item.date === dateFormat) {
                  oldData = item;
                }
              });
              handleUpdate(oldData, obj, docRef, setupdateItem, updateItem);
              setModalOpen(false);
            }}
          >
            <Text> Add Task </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: "90%",
    height: "98%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2,
    marginTop: 5,
  },
  modalClose: {
    // marginTop: 50,
    // marginRight: 10,
    marginBottom: 10,
    width: 35,
    height: 40,
    resizeMode: "contain",
    alignSelf: "flex-end",
    tintColor: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    marginBottom: 20,
    textAlign: "center",
    height: 60,
    width: "85%",
    // margin: 10
    // marginTop: 20,

    // marginRight: 300,
  },
});

export default SetTaskModal;
