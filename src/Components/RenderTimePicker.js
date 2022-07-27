import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const RenderIOSOrAndroidTimePicker = (props) => {
  const os = props.os;
  const chooseDate = props.chooseDate;
  const chooseTime = props.chooseTime;
  const date = props.date;
  const onChangeTime = props.onChangeTime;
  const setChooseTime = props.setChooseTime;
  const setModalOpen = props.setModalOpen;

  if (os) {
    return (
      <Modal visible={chooseTime} animationType="fade">
        <View style={styles.modalContent}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 300,
              height: 200,
              borderColor: "black",
              borderRadius: 5,
              borderWidth: 2,
            }}
          >
            <Text style={{ marginBottom: 20 }}>Set Your Start Time here</Text>
            <DateTimePicker
              isVisible={true}
              testID="dateTimePicker"
              value={date}
              mode={"time"}
              display="default"
              is24Hour={true}
              onChange={onChangeTime}
              style={{ width: 200, marginRight: 90 }}
            />
            <TouchableOpacity
              style={{
                marginTop: 25,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 5,
              }}
              onPress={() => {
                setChooseTime(false);
                setModalOpen(true);
              }}
            >
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  } else {
    if (chooseTime) {
      return (
        <DateTimePicker
          isVisible={chooseTime}
          testID="dateTimePicker"
          value={date}
          mode={"time"}
          display="default"
          is24Hour={chooseDate}
          onChange={onChangeTime}
        />
      );
    } else {
      return null;
    }
  }
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
    backgroundColor: "#ffe6cc",
  },
});

export default RenderIOSOrAndroidTimePicker;
