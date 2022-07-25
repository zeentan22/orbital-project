import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const RenderIOSOrAndroidDatePicker = (props) => {
  const os = props.os;
  const chooseDate = props.chooseDate;
  const date = props.date;
  const onChange = props.onChange;
  const setChooseDate = props.setChooseDate;
  const setModalOpen = props.setModalOpen;

  if (os) {
    return (
      <Modal
        visible={chooseDate}
        animationType="fade"
        style={{ borderWidth: 2, zIndex: 2 }}
      >
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
              // backgroundColor: "blue",
            }}
          >
            <Text style={{ marginBottom: 20 }}> Set your Date Below </Text>
            <DateTimePicker
              isVisible={true}
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              display="default"
              is24Hour={true}
              onChange={onChange}
              style={{ width: 200, marginRight: 70 }}
            />
            <TouchableOpacity
              style={{
                marginTop: 25,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 5,
              }}
              onPress={() => {
                setChooseDate(false);
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
    if (chooseDate) {
      return (
        <DateTimePicker
          // isVisible={chooseDate}
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display="default"
          is24Hour={true}
          onChange={onChange}
          style={{ width: 200, marginRight: 70 }}
        />
      );
    } else{return (null)}
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
  },
});

export default RenderIOSOrAndroidDatePicker;
