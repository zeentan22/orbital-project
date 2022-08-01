"use strict";
import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { onSnapshot, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Card, Avatar } from "react-native-paper";
import { dbInit, useAuth } from "../../firebase";
import { Swipeable } from "react-native-gesture-handler";
import {
  fetchDataFromNusMods,
  getExamDate,
  convertDate,
  convertTime,
  handleUpdate,
  handleDelete,
} from "./utils";
import RenderIOSOrAndroidTimePicker from "../Components/RenderTimePicker";
import RenderIOSOrAndroidDatePicker from "../Components/RenderDatePicker";
import ExamModal from "../Components/ExamModal";
import SetTaskModal from "../Components/SetTaskModal";
import CalendarOptions from "../Components/CalendarOptions";
const { width, height } = Dimensions.get("screen");
const mar = width * 0.02;
const mar2 = width * 0.004;
const marLeft = width * 0.6;

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

  const [dateFormat, setDateFormat] = useState(convertDate(date));

  let fDateTime = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const onChange = (event, selectedDate) => {
    if (os === false) {
      setChooseDate(false);
      setModalOpen(true);
    }
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
    if (os === false) {
      setChooseTime(false);
      setModalOpen(true);
    }
    let x = moment(selectedTime).format("YYYY-MM-DD HH:mm:ss");
    let time = x.split(" ")[1];
    const hour = time.split(":")[0];
    const minutes = time.split(":")[1];
    setDate(selectedTime);
    setStartTime(parseInt(hour) * 60 + parseInt(minutes));
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
        setUnmodifiedItems(unmodfiedItems);
      }
    );
  }, [updateItem]);

  const retrieveExamDate = async (acadYear, moduleCode, semester) => {
    const data = await fetchDataFromNusMods(acadYear, moduleCode.toUpperCase());
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
      handleUpdate(oldData, obj, docRef, setupdateItem, updateItem);
    }
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
      handleDelete(oldData, newData, docRef, setupdateItem, updateItem);
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

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <SetTaskModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        dateFormat={dateFormat}
        setChooseDate={setChooseDate}
        setTask={setTask}
        startTime={startTime}
        task={task}
        unmodfiedItems={unmodfiedItems}
        handleUpdate={handleUpdate}
        docRef={docRef}
        setupdateItem={setupdateItem}
        updateItem={updateItem}
        setChooseTime={setChooseTime}
      />
      <RenderIOSOrAndroidDatePicker
        os={os}
        chooseDate={chooseDate}
        date={date}
        onChange={onChange}
        setChooseDate={setChooseDate}
        setModalOpen={setModalOpen}
      />
      <RenderIOSOrAndroidTimePicker
        os={os}
        chooseDate={chooseDate}
        chooseTime={chooseTime}
        date={date}
        onChangeTime={onChangeTime}
        setChooseTime={setChooseTime}
        setModalOpen={setModalOpen}
      />

      <ExamModal
        examModalOpen={examModalOpen}
        setExamModalOpen={setExamModalOpen}
        acadYear={acadYear}
        tList={tList}
        onSelect={onSelect}
        semester={semester}
        semList={semList}
        setSemester={setSemester}
        setModuleCode={setModuleCode}
        retrieveExamDate={retrieveExamDate}
        moduleCode={moduleCode}
      />
      <CalendarOptions
        mar={mar}
        mar2={mar2}
        setExamModalOpen={setExamModalOpen}
        setModalOpen={setModalOpen}
      />

      <Agenda
        items={items}
        minDate={"2018-05-10"}
        extraData={updateItem}
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
