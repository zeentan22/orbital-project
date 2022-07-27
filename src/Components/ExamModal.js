"use strict";
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
import DropDownAcadYr from "./DropDownAcadYr";

const ExamModal = (props) => {
  const examModalOpen = props.examModalOpen;
  const setExamModalOpen = props.setExamModalOpen;
  const acadYear = props.acadYear;
  const tList = props.tList;
  const onSelect = props.onSelect;
  const semester = props.semester;
  const semList = props.semList;
  const setSemester = props.setSemester;
  const setModuleCode = props.setModuleCode;
  const retrieveExamDate = props.retrieveExamDate;
  const moduleCode = props.moduleCode;

  return (
    <Modal visible={examModalOpen} animationType="slide">
      <View style={styles.modalContent}>
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
              fontSize: 30,
              width: "94%",
              textAlign: "center",
              borderWidth: 2,
              height: 50,
            }}
          >
            Get Your Exam Dates
          </Text>

          <View
            style={{
              zIndex: 2,
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
            }}
          >
            <Text style={{ fontSize: 25 }}>Academic Year :</Text>
            <DropDownAcadYr
              item={acadYear}
              data={tList}
              onSelect={onSelect}
              title={"Select Academic Year"}
            />
          </View>

          <View
            style={{
              zIndex: 2,
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
            }}
          >
            <Text style={{ fontSize: 25, marginBottom: 10 }}>Semester :</Text>
            <DropDownAcadYr
              item={semester}
              data={semList}
              onSelect={(val) => setSemester(val)}
              title={"Select Semester"}
            />
          </View>
          <View
            style={{
              width: "80%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>Module Code:</Text>
            <TextInput
              textAlign="center"
              placeholder="E.g. CS1010S"
              style={{
                borderWidth: 1,
                width: "100%",
                height: 40,
                borderRadius: 2,
                marginTop: 5,
              }}
              onChangeText={(val) => {
                setModuleCode(val);
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              borderColor: "black",
              borderWidth: 2,
              borderRadius: 10,
              width: "84%",
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              retrieveExamDate(acadYear.name, moduleCode, semester.name);
            }}
          >
            <Text style={{ fontSize: 15 }}>
              {" "}
              Insert exam date into my calendar{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 16,
              borderWidth: 2,
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              width: "40%",
            }}
            onPress={() => setExamModalOpen(false)}
          >
            <Text> Close </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalClose: {
    marginBottom: 10,
    width: 35,
    height: 40,
    resizeMode: "contain",
    alignSelf: "flex-end",
    tintColor: "red",
  },
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

export default ExamModal;
