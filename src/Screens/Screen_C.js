import React, { userState, useState, useEffect, useRef } from "react";
import { logout, dbInit, useAuth } from "../../firebase";
import { getAuth } from "firebase/auth";
import { getDoc, onSnapshot, doc } from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  View,
  Pressable,
  Animated,
} from "react-native";
import MashButton from "../Components/CustomButton";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FlashCard from "./flashcard";
import SetCalendar from "./calendar";
import SetNotifications from "./noti";
const homeStackTab = createBottomTabNavigator();
const homeDrawer = createDrawerNavigator();
const { width, height } = Dimensions.get("window");
const SPACING = 10;
const ITEM_SIZE = width * 0.72;

export function HomeStack({ navigation }) {
  const HomePageStack = () => {
    return (
      <NavigationContainer independent={true}>
        <homeStackTab.Navigator>
          <homeStackTab.Screen name="Calendar" component={SetCalendar} />

          <homeStackTab.Screen
            name="Notifications"
            component={SetNotifications}
          />

          <homeStackTab.Screen name="Flashcards" component={FlashCard} />
        </homeStackTab.Navigator>
      </NavigationContainer>
    );
  };
  return (
    <homeDrawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <homeDrawer.Screen name="Home" component={HomePageStack} />
    </homeDrawer.Navigator>
  );
}

export function DrawerContent(props) {
  /*  const [username, setUserName] = useState("")
  useEffect(() => {
    const wdoc = doc(dbInit, "users", getAuth().currentUser.uid);
    const dat = onSnapshot(wdoc, (doc) =>{
      console.log(doc.data().firstname)
      setUserName(doc.data().firstname)
    });
    return dat
  },[]) */

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.body}>
          <View style={[styles.body]}>
            <Text>Hello World</Text>
          </View>
        </View>
        <Drawer.Section style={{ flex: 1, marginTop: 40 }}>
          <DrawerItem
            label="Home"
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          ></DrawerItem>
          <DrawerItem
            label="Sign Out"
            onPress={async () =>
              await logout()
                .then(() => {
                  alert("logged out");
                  props.navigation.navigate("Login Page");
                })
                .catch((error) => alert(error.message))
            }
          ></DrawerItem>
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
}

export function Screenc({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(new Date());
  const [flipped, setFlipped] = useState([]);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  let flipRotation = 0;
  flipAnimation.addListener(({ value }) => (flipRotation = value));

  console.log(ITEM_SIZE);
  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };

  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flipToFront = (item) => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
    // setFlipped(flipped.slice());

    // let index = items.indexOf(item);
    // item.flipped = !item.flipped;
    // setItems(items.splice(index, 1).splice(index, 0, item));
    // console.log(items.splice(index, 1).splice(index, 0, item));
  };

  const flipToBack = (item) => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    let index = flipped.indexOf(item.id);
    setFlipped(flipped.slice(index));
    // let index = items.indexOf(item);
    // item.flipped = !item.flipped;
    // setItems(items.splice(index, 1).splice(index, 0, item));
    // console.log(items.splice(index, 1).splice(index, 0, item));
  };

  console.log(width);

  const getData = async (date) => {
    let result = [];
    const docRef = doc(dbInit, "users", getAuth().currentUser.uid);
    const docSnap = await getDoc(docRef);
    const allData = docSnap.data().tasks;
    let todayTasks = allData.filter((item) => item.date === date);

    if (todayTasks.length != 0) {
      todayTasks[0].tasks.forEach((item) => {
        item["flipped"] = false;
        result.push(item);
        console.log(item);
      });
      console.log(result);
      setItems(result);
    }
  };

  const convertDate = (date) => {
    const extraMonthFormat = date.getMonth() + 1 < 10 ? "0" : "";
    const extraDayFormat = date.getDate() < 10 ? "0" : "";
    return `${date.getFullYear()}-${extraMonthFormat}${
      date.getMonth() + 1
    }-${extraDayFormat}${date.getDate()}`;
  };

  useEffect(() => {
    let result = {};
    const todayTasks = getData(convertDate(date));

    return onSnapshot(
      doc(dbInit, "users", getAuth().currentUser.uid),
      (doc) => {
        getData(convertDate(date));
      }
    );
  }, []);
  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      alert("log out");
      navigation.navigate("Login Page");
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  const checkTasks = (items) => {
    if (items.length === 0) {
      return (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 30 }}> No Schedule Set </Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.taskHeader}>Today's Task: </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={items}
            keyExtractor={(item) => item.name}
            horizontal
            contentContainerStyle={{ alignItems: "center" }}
            snapToInterval={ITEM_SIZE}
            decelerationRate={0}
            bounces={false}
            renderItem={({ item }) => {
              return (
                <View styles={{ marginTop: 50 }}>
                  <Pressable
                    style={{ width: ITEM_SIZE }}
                    onPress={() => console.log("pressed")}
                  >
                    <View
                      style={{
                        ...styles.item,
                        ...(item.done ? styles.done : styles.notDone),
                      }}
                    >
                      <Text> {item.name} </Text>
                    </View>
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.date}>Date : {convertDate(date)}</Text>
      {checkTasks(items)}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    alignSelf: "center",
  },
  body: {
    flex: 1,
    alignItems: "center",
  },

  date: {
    fontSize: 20,
  },

  taskHeader: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
  },

  noTasks: {
    // marginTop: 100,
    fontSize: 50,
  },

  item: {
    marginHorizontal: SPACING,
    padding: 5,
    alignItems: "center",
    // backgroundColor: "white",
    borderRadius: 34,
    height: height * 0.5,
    width: "93%",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "black",
    backfaceVisibility: "hidden",
  },

  backItem: {
    marginHorizontal: SPACING,
    padding: 5,
    alignItems: "center",
    // backgroundColor: "white",
    borderRadius: 34,
    height: height * 0.5,
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "black",
    backfaceVisibility: "hidden",
  },

  done: {
    backgroundColor: "#4dff4d",
  },

  notDone: {
    backgroundColor: "#ff4d4d",
  },

  cardFront: {
    position: "absolute",
  },

  cardBack: {
    backfaceVisibility: "hidden",
  },
});
