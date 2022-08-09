import React, {
  userState,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { logout, dbInit, useAuth } from "../../firebase";
import { getAuth } from "firebase/auth";
import {
  getDoc,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import {
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  Image,
  View,
  Pressable,
  Animated,
} from "react-native";
import MashButton from "../Components/CustomButton";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import NotiFlipCard from "../Components/NotiCardsTrial";
import { createNativeWrapper } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
const cW = width * 0.7;
const cH = cW * 1.7;
const hH = height * 0.24;
const wH = cW * 1.6;

export function Screenc({ navigation }) {
  const user = useAuth();
  const [show, setShow] = useState(true);
  const docRef = user ? doc(dbInit, "users", getAuth().currentUser.uid) : null;
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedItem, setSelectedItem] = items ? useState(0) : null;
  const [updateItem, setupdateItem] = useState(false);
  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 40,
  };
  const _onViewableItemsChanged = useCallback(
    ({ viewableItems, changed }) => {
      setSelectedItem(viewableItems[0].index);
    },
    [selectedItem]
  );

  const viewabilityConfigCallbackPairs = useRef([{ _onViewableItemsChanged }]);

  const flipback = useCallback((f, g) => {
    if (f) {
      g();
    } else {
    }
  }, []);

  const animate = useRef(new Animated.Value(0.01));

  const interpolateFront = animate.current.interpolate({
    inputRange: [0.01, 180],
    outputRange: ["0.01deg", "180deg"],
  });

  const interpolateBack = animate.current.interpolate({
    inputRange: [0.01, 180],
    outputRange: ["180deg", "360deg"],
  });

  const handleFlip = () => {
    Animated.timing(animate.current, {
      duration: 200,
      toValue: isFlipped ? 0.01 : 180,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped);
      setShow(!show);
    });
  };

  const handleUpdate = async (oldData, obj, docRef) => {
    // console.log(oldData)
    await updateDoc(docRef, { tasks: arrayRemove(oldData) });
    obj.done = true;
    let updatedTasks = [...oldData.tasks];
    updatedTasks.sort((a, b) => {
      return parseInt(a.startTime) - parseInt(b.startTime);
    });

    let newObj = { date: obj.date, tasks: updatedTasks };
    await updateDoc(docRef, { tasks: arrayUnion(newObj) });

    alert("tasks updated successfully");
    setupdateItem(!updateItem);
  };

  const getData = async (date) => {
    let result = [];
    const docRef = doc(dbInit, "users", getAuth()?.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const allData = docSnap.data().tasks;

    let todayTasks = allData.filter((item) => item.date === date);

    if (todayTasks.length != 0) {
      todayTasks[0].tasks.forEach((item) => {
        result.push(item);
      });

      setItems(result);
    } else {
      setItems([]);
    }
  };

  const convertDate = (date) => {
    const extraMonthFormat = date.getMonth() + 1 < 10 ? "0" : "";
    const extraDayFormat = date.getDate() < 10 ? "0" : "";
    return `${date.getFullYear()}-${extraMonthFormat}${
      date.getMonth() + 1
    }-${extraDayFormat}${date.getDate()}`;
  };

  const updateData = async (item, index) => {
    item.done = true;
    const newObj = item;
    const oldObj = { date: item.date, tasks: items };
    await handleUpdate(oldObj, newObj, docRef);
  };

  useEffect(() => {
    return onSnapshot(
      doc(dbInit, "users", getAuth()?.currentUser.uid),
      (doc) => {
        // console.log("onSnapshot");
        getData(convertDate(date));
      }
    );
  }, [updateItem]);

  const keyExtractor = (item, index) => index.toString();
  const renderItem = useCallback(({ item, index }) => (
    <Pressable
      style={{
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width,
        height: cH,
      }}
      onPress={() => {
        [handleFlip()];
      }}
    >
      <Animated.View
        style={[
          { transform: [{ rotateY: interpolateFront }] },
          styles.hidden,
          { width: "90%", height: cH },
        ]}
      >
        <NotiFlipCard
          heading={`Task ${index + 1}`}
          button={false}
          image="https://icons.veryicon.com/png/o/business/erp-system-background-icon/task-6.png"
          imagedone={
            item.done
              ? require("../../assets/Correct.png")
              : require("../../assets/Wrong.png")
          }
          tC={item.done ? "#32cd32" : "red"}
          marking={true}
          title={item.name}
          btitle={null}
          pageNum={`${index + 1}/${items.length}`}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.back,
          styles.hidden,
          { width: "90%", height: cH },
          { transform: [{ rotateY: interpolateBack }] },
        ]}
      >
        <NotiFlipCard
          heading="Mark As:"
          shows={show}
          marking={false}
          onPress={() => {
            const newObj = item;
            const oldObj = { date: item.date, tasks: items };
            handleUpdate(oldObj, newObj, docRef);
          }}
          button={true}
          image="https://icons.veryicon.com/png/o/business/erp-system-background-icon/task-6.png"
          btitle="Completed"
          title={null}
          pageNum={`${index + 1}/${items.length}`}
        />
      </Animated.View>
    </Pressable>
  ));

  const checkTasks = (items) => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            height: hH,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Image
            source={require("../../assets/HeaderForTasks.png")}
            style={styles.imageHeader}
            resizeMode="cover"
          />
          <Text style={[styles.date, { position: "absolute", top: 75 }]}>
            Date : {convertDate(date)}
          </Text>
          <Text style={[styles.taskHeader, { position: "absolute", top: 120 }]}>
            Today's Tasks: {items.length}
          </Text>
        </View>
        <View style={{ width: "100%", height: cH }}>
          <FlatList
            onScrollBeginDrag={() => {
              flipback(isFlipped, handleFlip);
            }}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            viewabilityConfig={_viewabilityConfig}
            horizontal={true}
            keyExtractor={keyExtractor}
            extraData={[selectedItem, items]}
            decelerationRate="fast"
            pagingEnabled
            data={items}
            renderItem={renderItem}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.body}>
      <Image
        resizeMode="cover"
        source={require("../../assets/BoardBG.png")}
        style={[
          StyleSheet.absoluteFillObject,
          { width: "100%", height: "100%" },
        ]}
      />
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
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
  },

  noTasks: {
    // marginTop: 100,
    fontSize: 50,
  },

  item: {
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
  hidden: {
    backfaceVisibility: "hidden",
  },
  back: {
    position: "absolute",
    top: 0,
  },
  flashCardBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  imageHeader: {
    height: wH,
    width: cW,
    alignSelf: "center",
    justifyContent: "center",
    top: 17,
  },
});
