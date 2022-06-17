import React, { userState, useState, useEffect, useRef,useCallback } from "react";
import { logout, dbInit, useAuth } from "../../firebase";
import { getAuth } from "firebase/auth";
import { getDoc, onSnapshot, doc } from "firebase/firestore";
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
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";
const {width, height} = Dimensions.get("screen")
const cW = width * 0.7
const cH = cW * 1.54


export function Screenc({ navigation }) {
  const user = useAuth()
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isFlipped,setIsFlipped] = useState(false)
  const [selectedItem,setSelectedItem] = items ? useState(0) : null
  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 40,
  };
  const _onViewableItemsChanged = useCallback(({ viewableItems,changed}) => {
    console.log("Visible items are", viewableItems);
    console.log("Changed in this iteration", changed);
    console.log(viewableItems[0].index);
    setSelectedItem(viewableItems[0].index);
  },[selectedItem]);

  const viewabilityConfigCallbackPairs = useRef([
    { _onViewableItemsChanged },
  ]);

  const flipback = useCallback((f,g)=>{
    if (f){
      g();
    }else{}
  },[])

  const animate = useRef(new Animated.Value(0.01));

  const interpolateFront = animate.current.interpolate({
    inputRange:[0.01,180],
    outputRange: ['0.01deg','180deg'],
  });

  const interpolateBack = animate.current.interpolate({
    inputRange:[0.01,180],
    outputRange: ['180deg','360deg'],
  });
  
  const handleFlip = () => {
    Animated.timing(animate.current,{
      duration: 200,
      toValue : isFlipped ? 0.01 : 180, 
      useNativeDriver: true,
    }).start(()=>{
      setIsFlipped(!isFlipped);
    });
  }

  const getData = async (date) => {
    let result = [];
    if (user) {
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
  ;}else{}}

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
    if (user) {
    return onSnapshot(
      doc(dbInit, "users", getAuth()?.currentUser.uid),
      (doc) => {
        console.log("onSnapshot");
        getData(convertDate(date));
      }
    );
  }else{null}}, [user]);

  const keyExtractor=(item,index)=> index.toString()
  const renderItem = useCallback(({item,index})=>(
    <Pressable style = {{alignSelf:"center", justifyContent: "center", alignItems:"center",width,height: cH}} onPress = {()=>{[handleFlip()]}}>  
          <Animated.View style={[{transform:[{rotateY:interpolateFront}]},styles.hidden,{width: cW,height: cH}]}>
          <FlipCard
          heading = {`Task ${index + 1}`}
          image = {null}
          title = {item.name}
          pageNum = {`${index + 1}/${items.length}`}/>

          </Animated.View>
        
        <Animated.View style = {[styles.back, styles.hidden,{width: cW,height: cH},{transform:[{rotateY:interpolateBack}]}]}>
          <FlipCard
          heading = "Done"
          image = "https://icons.veryicon.com/png/o/education-technology/alibaba-big-data-oneui/answer-a.png"
          title = {item.done}
          pageNum = {`${index + 1}/${items.length}`}/>
        </Animated.View>

    </Pressable>
    
    
    ))

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
          onScrollBeginDrag={()=>{flipback(isFlipped,handleFlip)}}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          viewabilityConfig={_viewabilityConfig}
          horizontal = {true}
          keyExtractor={keyExtractor}
          extraData = {selectedItem}
          decelerationRate = "fast"
          pagingEnabled
          data = {items}
          renderItem={renderItem}/>
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
  hidden:{
    backfaceVisibility:"hidden",
  },
  back:{
    position:"absolute",
    top: 0
  },
  flashCardBody: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: "white",
  },
});
