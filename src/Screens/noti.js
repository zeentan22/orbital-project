"use strict";
import React, { useState, useEffect,useRef } from "react";
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
  Alert,
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Card, Avatar } from "react-native-paper";
import { dbInit, useAuth } from "../../firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Swipeable } from "react-native-gesture-handler";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export default function SetNotifications ({navigation}) {
  const user = useAuth();
  const docRef = user ? doc(dbInit, "users", getAuth().currentUser.uid) : null;
  const [items, setItems] = useState({});
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(0);
  const [updateItem, setupdateItem] = useState(false);
  const [chooseDate, setChooseDate] = useState(false);
  const [chooseTime, setChooseTime] = useState(false);
  const [title,setTitle] = useState("");
  const [body,setBody] = useState("");
  const [notiDate, setNotiDate] = useState("")
  const [notiTime, setNotiTime] = useState("")
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0)
  const [os, setOS] = useState(true);
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    async function schedulePushNotification() {
      const day = parseInt(dateFormat.split("-")[2]);
      const month = parseInt(dateFormat.split("-")[1]);
      const sec = ((date.getTime()-new Date().getTime())/1000)

      await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: `${body} \n Alarm: ${dateFormat}, ${notiTime}`,
          data: { data: 'goes here' },
        },
        trigger: (Platform.OS === "ios") ? { day: day, nonth: month, hour: hours, minute: mins,channelId: 'new-emails'} : {seconds: sec},
      });
    }

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
    if (os ===false) {setChooseDate(!chooseDate)}
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
    if (os === false) {setChooseTime(!chooseTime);}
    let x = moment(selectedTime).format("YYYY-MM-DD HH:mm:ss");
    let time = x.split(" ")[1];
    const hour = time.split(":")[0];
    const minutes = time.split(":")[1];
    setHours(parseInt(hour));
    setMins(parseInt(minutes));
    setDate(selectedTime);
    setStartTime(parseInt(hour) * 60 + parseInt(minutes));
    setNotiTime(convertTime(parseInt(hour) * 60 + parseInt(minutes)));
    console.log(notiTime)
  };



  useEffect(() => {
    setOS(Platform.OS === "ios");
    setTitle("");
    setBody("");
    setDays(0);
    setHours(0);
    setMins(0);
    setNotiTime("");
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const convertTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const appendHr = hours < 10 ? "0" : "";
    const appendMins = minutes < 10 ? "0" : "";
    return `${appendHr}${hours}:${appendMins}${minutes}`;
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
      }
    }
  };

  return (
        <KeyboardAwareScrollView enableOnAndroid={true}  contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.modalContent}>
          <Image
          resizeMode="cover"
          source = {{uri:"https://images.pexels.com/photos/4862873/pexels-photo-4862873.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4862873.jpg&fm=jpg"}}
          style = {StyleSheet.absoluteFillObject}
          blurRadius = {0}/>
          <View
            style={{
              width:"100%",
              justifyContent: "space-evenly",
              alignItems: "center",
              borderRadius: 5,
              height:"100%"
            }}
          >
            <Text style={{ marginBottom: 15, fontSize:25, fontWeight:"bold" }}>
              Date Chosen: {dateFormat}
            </Text>

            <TouchableOpacity
              style={{ borderRadius: 10, borderWidth: 2,marginBottom: 25,height:35,justifyContent:"center",width:"40%",alignItems:"center"  }}
              onPress={() => {
                setChooseDate(true);
              }}
            >
              <Text> Pick a date </Text>
            </TouchableOpacity>

            <Text style={{marginBottom: 15, fontSize:25,fontWeight:"bold"  }}>
              Time Chosen: {convertTime(startTime)}
            </Text>

            <TouchableOpacity
              style={{ borderRadius: 10, borderWidth: 2,marginBottom: 25,height:35,justifyContent:"center" ,width:"40%" ,alignItems:"center"  }}
              onPress={() => {
                setChooseTime(true);
              }}
            >
              <Text style = {{textAlign:"center"}}> Pick a Time </Text>
            </TouchableOpacity>

            <TextInput
              placeholderTextColor={"black"}
              style={styles.input}
              placeholder="Notification Title"
              onChangeText={(val) => {
                setTitle(val);
              }}
            />
            <TextInput
              placeholderTextColor={"black"}
              style={styles.input}
              placeholder="Notification Message"
              onChangeText={(val) => {
                setBody(val);
              }}
            />
            
            <TouchableOpacity
              style={{ borderColor: "black", borderWidth: 2, borderRadius: 10,height:40, alignItems:"center",justifyContent:"center",width:"60%",marginTop:20}}
              onPress={async () => {
                console.log(dateFormat);
                if (title == "" || body == "")
                {Alert.alert("Please fill in both Title and Message!")}
                else{
                await schedulePushNotification().then(()=>{
                navigation.navigate("first")
              })}}}
            >
              <Text> Set Notification </Text>
            </TouchableOpacity>
          </View>
      {renderIOSOrAndroidDatePicker()}
      {renderIOSOrAndroidTimePicker()}

    </View>
    </KeyboardAwareScrollView>
  );
};

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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width:"100%",
  },

  input: {
    borderWidth: 1,
    borderColor:"black",
    marginBottom:20,
    textAlign:"center",
    height:60,
    width:"85%",
    // margin: 10
    // marginTop: 20,

    // marginRight: 300,
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: "#777",
    textAlign:"center",
    width:80,
    height:40,
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
