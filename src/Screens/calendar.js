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
  Pressable,
  TextInput,
  Animated,
  Platform,
  Dimensions
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
import { dbInit, useAuth } from "../../firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Swipeable } from "react-native-gesture-handler";
import DropDown from "../Components/DropDown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownAcadYr from "../Components/DropDownAcadYr";
import { fetchDataFromNusMods, getExamDate } from "./utils";
const {width, height} = Dimensions.get("screen")
const mar = width * 0.02
const mar2 = width * 0.004
const marLeft = width * 0.6

const SetCalendar = ({ navigation }) => {
  const user = useAuth();
  const docRef = user ? doc(dbInit, "users", getAuth().currentUser.uid) : null;
  const [items, setItems] = useState({});
  const [unmodfiedItems, setUnmodifiedItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [examModalOpen, setExamModalOpen] = useState(false);
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(0);
  const [visible, setVisibility] = useState(false);
  const [itemFocus, setItemFocus] = useState({});
  const [updateItem, setupdateItem] = useState(false);
  const [chooseDate, setChooseDate] = useState(false);
  const [chooseTime, setChooseTime] = useState(false);
  const [semester, setSemester] = useState({ name: 1 });
  const [acadYear, setAcadYear] = useState({ name: "2022-2023" });
  const [moduleCode, setModuleCode] = useState("");
  const [os, setOS] = useState(true);

  const tList = [
    { name: "2022-2023" },
    { name: "2021-2022" },
    { name: "2020-2021" },
  ];

  const semList = [{ name: "1" }, { name: "2" }];
  const onSelect = (item) => {
    setAcadYear(item);
  };

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
    if (os === false) {setChooseDate(false);setModalOpen(true)}
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
    if (os === false) {setChooseTime(false);setModalOpen(true)};
    let x = moment(selectedTime).format("YYYY-MM-DD HH:mm:ss");
    let time = x.split(" ")[1];
    const hour = time.split(":")[0];
    const minutes = time.split(":")[1];
    setDate(selectedTime);
    setStartTime(parseInt(hour) * 60 + parseInt(minutes));
  };

  const handleUpdate = async (oldData, obj, docRef) => {
    if (Object.keys(oldData).length === 0) {
      await updateDoc(docRef, { tasks: arrayUnion(obj) });
      alert("added task successfully");
    } else {
      await updateDoc(docRef, {
        tasks: arrayRemove(oldData),
      });
      let updatedTasks = [...oldData.tasks, ...obj.tasks];
      updatedTasks.sort((a, b) => {
        return parseInt(a.startTime) - parseInt(b.startTime);
      });
      let newObj = { date: obj.date, tasks: updatedTasks };
      await updateDoc(docRef, { tasks: arrayUnion(newObj) });
      alert("added task successfully");
    }
    setupdateItem(!updateItem);
  };

  const handleDelete = async (oldData, newData, docRef) => {
    await updateDoc(docRef, { tasks: arrayRemove(oldData) });
    await updateDoc(docRef, { tasks: arrayUnion(newData) });
    setupdateItem(!updateItem);
  };

  useEffect(() => {
    setOS(Platform.OS === "ios");
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
  }, [updateItem]);

  const retrieveExamDate = async (acadYear, moduleCode, semester) => {
    const data = await fetchDataFromNusMods(acadYear, moduleCode);
    const value = getExamDate(data, semester);

    if (value.length === 0) {
      alert("Wrong information or module does not have final exam");
      return;
    } else {
      const selectedDate = new Date(value[1]);
      let x = moment(selectedDate).format("YYYY-MM-DD HH:mm:ss");
      let time = x.split(" ")[1];
      const hour = time.split(":")[0];
      const minutes = time.split(":")[1];
      setDateFormat(convertDate(selectedDate));
      setStartTime(parseInt(hour) * 60 + parseInt(minutes));
      setTask(value[0] + " exam");
      const obj = {
        date: convertDate(selectedDate),
        tasks: [
          {
            name: value[0] + " exam",
            done: false,
            startTime: parseInt(hour) * 60 + parseInt(minutes),
            date: convertDate(selectedDate),
          },
        ],
      };
      let oldData = {};
      unmodfiedItems.forEach((item) => {
        if (item.date === convertDate(selectedDate)) {
          oldData = item;
        }
      });
      handleUpdate(oldData, obj, docRef);
    }
  };

  const convertTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const appendHr = hours < 10 ? "0" : "";
    const appendMins = minutes < 10 ? "0" : "";
    return `${appendHr}${hours}:${appendMins}${minutes}`;
  };

  const RightActions = ({ progress, dragX, onPress }) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.rightAction}>
          <Animated.Text
            style={[styles.actionText, { transform: [{ scale }] }]}
          >
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = (item) => {
    const onRightPress = () => {
      const date = item.date;
      const oldData = unmodfiedItems.filter((ele) => ele.date === item.date)[0];
      const newtasks = unmodfiedItems
        .filter((ele) => ele.date === item.date)
        .flatMap((ele) => ele.tasks)
        .filter((ele) => ele !== item);
      const newData = { date: date, tasks: newtasks };
      handleDelete(oldData, newData, docRef);
    };
    return (
      <View style={{ justifyContent: "center" }}>
        <Swipeable
          renderRightActions={(progress, dragX) => (
            <RightActions
              progress={progress}
              dragX={dragX}
              onPress={onRightPress}
            />
          )}
          style={{ marginTop: 10, marginBottom: 10 }} // ?
        >
          <TouchableOpacity
            style={{
              shadowColor: "#000000",
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {
                height: 2,
                width: 1,
              },
              borderBottomWidth: 2,
              borderLeftWidth: 1,
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
        </Swipeable>
      </View>
    );
  };

  const renderIOSOrAndroidDatePicker = () => {
    if (os) {
      return (
        <Modal
          visible={chooseDate}
          animationType="fade"
          style={{ borderWidth: 2, zIndex: 2 }}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                setChooseDate(false);
                setModalOpen(true);
              }}
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
                height: 200,
                borderColor: "black",
                borderRadius: 5,
                borderWidth: 2,
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
                style={{ width: 120 }}
              />
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
      }
    }
  };

  const renderIOSOrAndroidTimePicker = () => {
    if (os) {
      return (
        <Modal visible={chooseTime} animationType="fade">
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                setChooseTime(false);
                setModalOpen(true);
              }}
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
                style={{ width: 200, marginRight: 70 }}
              />
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

    }}
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
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
            <Text style={{fontSize:35, borderWidth:3, width:"94%", textAlign:"center"}}>Set Your Task</Text>
            <Text style={{fontSize:25 }}>
              Date Chosen: {dateFormat}
            </Text>

            <TouchableOpacity
              style={{ borderRadius: 16,borderWidth: 2,height:35,alignItems:"center",justifyContent:"center",width:"40%" }}
              onPress={() => {
                setChooseDate(true);
                setModalOpen(false)
              }}
            >
              <Text> Pick a date </Text>
            </TouchableOpacity>

            <Text style={{fontSize:25 }}>
              Time Chosen: {convertTime(startTime)}
            </Text>

            <TouchableOpacity
              style={{ borderRadius: 16, borderWidth: 2,height:35,alignItems:"center",justifyContent:"center",width:"40%" }}
              onPress={() => {
                setChooseTime(true);
                setModalOpen(false)
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
              style={{ borderColor: "black", borderWidth: 2, borderRadius: 10, width:"60%", height:40,alignItems:"center",justifyContent:"center" }}
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
                handleUpdate(oldData, obj, docRef);
                setModalOpen(false);
              }}
            >
              <Text> Add Task </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {renderIOSOrAndroidDatePicker()}
      {renderIOSOrAndroidTimePicker()}
      <Modal visible={examModalOpen} animationType="slide">
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => setExamModalOpen(false)}
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
                fontSize: 30,
                width:"94%",
                textAlign:"center",
                borderWidth: 2,
                height:50
              }}
            >
              Get Your Exam Dates
            </Text>

            <View style={{zIndex: 2,alignItems:"center",justifyContent:"center", width:"80%"}}>
              <Text style = {{fontSize:25}}>Academic Year :</Text>
              <DropDownAcadYr
                item={acadYear}
                data={tList}
                onSelect={onSelect}
                title={"Select Academic Year"}
              />
            </View>

            <View style={{zIndex: 2,alignItems:"center",justifyContent:"center", width:"80%" }}>
            <Text style = {{fontSize:25,marginBottom:10}}>Semester :</Text>
              <DropDownAcadYr
                item={semester}
                data={semList}
                onSelect={(val) => setSemester(val)}
                title={"Select Semester"}
              />
            </View>
            <View style = {{width:"80%", alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontSize: 20 }}>
              Module Code:
            </Text>
            <TextInput
              textAlign="center"
              placeholder="E.g. CS1010S"
              style={{
                borderWidth: 1,
                width: "100%",
                height: 40,
                borderRadius: 2,
                marginTop:5
              }}
              onChangeText={(val) => {
                setModuleCode(val);
              }}
            />
            </View>
            <TouchableOpacity
              style={{ borderColor: "black", borderWidth: 2, borderRadius: 10, width:"84%", height:40,alignItems:"center",justifyContent:"center" }}
              onPress={() => {
                retrieveExamDate(acadYear.name, moduleCode, semester.name);
              }}
            >
              <Text style = {{fontSize:15}}> Insert exam date into my calendar </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style = {{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <TouchableOpacity style = {{justifyContent:"space-around", flexDirection:"row", alignItems:"center",marginLeft:mar}} onPress={() => setExamModalOpen(true)}>
          <Image source = {{uri: "https://icons.veryicon.com/png/o/system/system-project/add-97.png"}} style = {{height: 20, width: 20,marginRight:mar2, tintColor:"blue"}}/>
          <Text style = {{fontSize:15, color:"blue"}}>Get my exam dates </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{justifyContent:"center"}}
          onPress={() => setModalOpen(true)}
        >
          <Text style={styles.add}> + </Text>
        </TouchableOpacity>
      </View>
      <Agenda
        items={items}
        minDate={"2018-05-10"}
        extraData= {updateItem}
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
    margin: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  add: {
    fontSize: 30,
    justifyContent:"center"
    // margin: 1,
  },

  modalClose: {
    // marginTop: 50,
    // marginRight: 10,
    marginBottom: 10,
    width: 35,
    height: 40,
    resizeMode: "contain",
    alignSelf: "flex-end",
    tintColor:"red",
  },

  deleteTaskBtn: {
    alignSelf: "flex-end",
    justifyContent: "center",
    marginBottom: -20,
    zIndex: 1,
  },

  deleteImg: {
    width: 15,
    height: 20,
    resizeMode: "contain",
  },

  modalContent: {
    width:"90%",
    height:"98%",
    alignSelf:"center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2,
    marginTop: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#777",
    marginBottom:20,
    textAlign:"center",
    height:60,
    width:"85%",
    // margin: 10
    // marginTop: 20,

    // marginRight: 300,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  rightAction: {
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    flex: 1,
    alignItems: "flex-end",
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    padding: 20,
  },
});
