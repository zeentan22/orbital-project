import React, {
  userState,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { logout, dbInit, useAuth } from "../../firebase";
import { getAuth } from "firebase/auth";
import { getDoc, onSnapshot, doc ,updateDoc,
  arrayUnion,
  arrayRemove, } from "firebase/firestore";

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
import NotiFlipCard from "../Components/CardsforNoti"
const {width, height} = Dimensions.get("screen")
const cW = width * 0.7
const cH = cW * 1.54


export function Screenc({ navigation }) {
  const [show,setShow] = useState(true)
  const docRef = user ? doc(dbInit, "users", getAuth().currentUser.uid) : null
  const user = useAuth()
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedItem, setSelectedItem] = items ? useState(0) : null;
  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 40,
  };
  const _onViewableItemsChanged = useCallback(
    ({ viewableItems, changed }) => {
      console.log("Visible items are", viewableItems);
      console.log("Changed in this iteration", changed);
      console.log(viewableItems[0].index);
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
      setShow(!show)
    });
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
          console.log(item);
        });
        console.log(result);
        setItems(result);
      }
     else {
    }
  ;}

  const convertDate = (date) => {
    const extraMonthFormat = date.getMonth() + 1 < 10 ? "0" : "";
    const extraDayFormat = date.getDate() < 10 ? "0" : "";
    return `${date.getFullYear()}-${extraMonthFormat}${
      date.getMonth() + 1
    }-${extraDayFormat}${date.getDate()}`;
  };

  const updateData = async (item,index) => {
    item.done = true;
    console.log(item);

  };

  useEffect(() => {
    let result = {};
    const todayTasks = getData(convertDate(date));
    return onSnapshot(
      doc(dbInit, "users", getAuth()?.currentUser.uid),
      (doc) => {
        console.log("onSnapshot");
        getData(convertDate(date));
      }
    );}, []);

  const keyExtractor=(item,index)=> index.toString()
  const renderItem = useCallback(({item,index})=>(
    <Pressable style = {{alignSelf:"center", justifyContent: "center", alignItems:"center",width,height: cH}} onPress = {()=>{[handleFlip()]}}>  
          <Animated.View style={[{transform:[{rotateY:interpolateFront}]},styles.hidden,{width: cW,height: cH}]}>
          <NotiFlipCard
          heading = {`Task ${index + 1}`}
          button = {false}
          image = "https://icons.veryicon.com/png/o/business/erp-system-background-icon/task-6.png"
          imagedone = {item.done ? "https://icons.veryicon.com/png/o/business/intranet-portal/already-done-1.png" : "https://icons.veryicon.com/png/o/system/system-icon-line/order-incomplete.png"}
          tC = {item.done? "#32cd32" : "red"}
          title = {item.name}
          btitle = {null}
          pageNum = {`${index + 1}/${items.length}`}/>

          </Animated.View>
        
        <Animated.View style = {[styles.back, styles.hidden,{width: cW,height: cH},{transform:[{rotateY:interpolateBack}]}]}>
          <NotiFlipCard
          heading = "Mark As:"
          shows = {show}
          onPress = {()=>updateData(item)}
          button = {true}
          image = "https://icons.veryicon.com/png/o/miscellaneous/core-music/task-42.png"
          btitle = "Completed"
          title = {item.name}
          pageNum = {`${index + 1}/${items.length}`}/>
        </Animated.View>
    </Pressable>
  ));

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
            onScrollBeginDrag={() => {
              flipback(isFlipped, handleFlip);
            }}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            viewabilityConfig={_viewabilityConfig}
            horizontal={true}
            keyExtractor={keyExtractor}
            extraData={[selectedItem,items]}
            decelerationRate="fast"
            pagingEnabled
            data={items}
            renderItem={renderItem}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.body}>
      <Image
        resizeMode="cover"
        source = {{uri:"https://i.pinimg.com/564x/73/bc/d3/73bcd34f81b6dcc9aac810ff321e419c.jpg"}}
        style = {StyleSheet.absoluteFillObject}
        blurRadius = {70}/>
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
    alignSelf:"center"
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
});
