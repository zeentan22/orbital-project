import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput,FlatList, Pressable, Animated,Dimensions} from "react-native";
import React, { userState, useState, useEffect, useRef, useCallback } from "react";
import MashButton from "../Components/CustomButton";
import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator, Header } from "@react-navigation/stack";
import { dbInit, auth, useAuth} from "../../firebase";
import ProceedButton from "../Components/ProceedButton";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FlipCard from "../Components/CardsforFlashcards";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import  { color } from "react-native-reanimated";
import CustomTabHeading from "../Components/CustomTabHeading";
import DropDown from "../Components/DropDown";
import { render } from "react-dom";
const FlashCardStack = createStackNavigator();
const {width, height} = Dimensions.get("screen")
const cW = width * 0.7
const cH = cW * 1.54

export function FlashCard({ navigation, route }) {
  const user = useAuth();
  const [score,setScore] = useState();
  const [totalScore,setTotalScore] = useState()
const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
const reverseHorizontalAnimation = {
  cardSyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [1,0],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
  const CreateFlashCard = ({navigation}) => { 
  return (
    <View style={styles.body}>
      <CustomTabHeading
      onPage = {true}
      title1 = "Create"
      title2 = "Test"
      onPress2 = {()=>{navigation.navigate("View Flash Card")}}
      onPress1 = {()=>{null}}/>
      <Text style={styles.text}>Start using Flashcards now!</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Topic List")}>
          <Text> Create new flashcard </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("View Flash Card")}>
          <Text> Test Yourself! </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const TopicList = ({navigation, route}) => { 
  const tList = [{name: "Add New Topic"}];
  const [selectedItem, setSelectedItem] = useState(null);
  const onSelect = (item) => {
    setSelectedItem(item)
  }

  useEffect(()=>{
    if (user) {
    const wdoc = doc(dbInit, "users", auth?.currentUser.uid);
      return onSnapshot(wdoc, (doc) => {
        let repList = [];
        let Data = doc.data()?.FlashCardContent;
        if (Data != null) {
        Data.forEach((element)=> {
          if (repList.includes(element.topic)) {}
          else {tList.unshift({name : element.topic}
            );repList.push(element.topic)}
        })
      }
    else{null}})}else{}},[selectedItem])
  return (
    <View style={styles.body}>
      <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} style= {{alignSelf: "flex-start", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom:20,marginLeft:2}} onPress={()=>navigation.goBack()}>
        <Image style = {[styles.iconimage,{marginRight:3}]} source = {{uri: "https://icons.veryicon.com/png/o/miscellaneous/arrows/go-back-2.png"}} tintColor= '#008b8b'></Image>
        <Text style = {{fontSize:17,color: '#008b8b'}}>Go Back</Text>
      </TouchableOpacity>
      <Text style={[styles.subtitle, {marginTop:10}]}>Choose Your Topic</Text>
      <View style={[styles.listSize, {marginTop:60}]}>
          <DropDown
          item={selectedItem}
          data = {tList}
          onSelect={onSelect}/>
      </View>
      <ProceedButton
      title = "Proceed"
      style = {{marginBottom:25}}
      onPress={()=>{
        if (selectedItem) {navigation.navigate("Input for Flashcard", {topicSelected:`${selectedItem.name}`})}
        else {alert("Please select a topic!")}}}

        />
    </View>
  ); }

  const FlashCardInput = ({route,navigation}) => { 
    const topic =  route.params.topicSelected
    const passedTopic = topic
    const [currentTopic, setCurrentTopic] = useState((topic != "Add New Topic") ? topic : null)
    const wdoc = user ? doc(dbInit, "users", auth?.currentUser.uid) : null ;
    console.log(`${topic}`)
    const [question,setQuestion] = useState("Null")
    const [answer, setAnswer] = useState("Null")
    useEffect(()=>{
      setQuestion("Null");
      setAnswer("Null");
    },[])
    return (
      <View style={styles.body}>
        <View style = {{flexDirection:"row", flex:0.2, alignItems: "flex-start",justifyContent: "flex-start",}}>
        <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} style= {{alignSelf: "flex-start", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom:20, marginLeft:2, marginRight:166,}} onPress={()=>
          navigation.goBack()}>
        <Image style = {[styles.iconimage,{marginRight:3}]} source = {{uri: "https://icons.veryicon.com/png/o/miscellaneous/arrows/go-back-2.png"}} tintColor= '#008b8b'></Image>
        <Text style = {{fontSize:17,color: '#008b8b'}}>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} style= {{alignSelf: "flex-start", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom:20,marginRight:8}} onPress={async ()=>{
          try {
            let newObj = {topic: currentTopic, Question: question, Answer:answer}
            await updateDoc(wdoc, {FlashCardContent:arrayUnion(newObj)})
          } catch (err){
            alert("Error!");
            console.log(err);
          };navigation.navigate("Create Or View Flash Card")}}>
        <Image style = {{marginRight:3,height: 27.3,width: 27.3, alignSelf: "center", justifyContent:"center",}} source = {{uri: "https://cdn.icon-icons.com/icons2/1946/PNG/512/1904674-accept-approved-check-checked-confirm-done-tick_122524.png"}} tintColor= '#008b8b' ></Image>
        <Text style = {{fontSize:17,color: '#008b8b'}}>Confirm</Text>
      </TouchableOpacity>
      </View>
      <View style ={{flex:1, alignItems:"center",justifyContent: "center",}}>
        <View style={{flexDirection:"row", justifyContent:"center", alignItems: "center", paddingBottom:10,}}>
          <Text style = {[styles.titletext,{marginRight:10}]}>Topic:</Text>
          {(passedTopic != "Add New Topic") ?<TextInput
          style = {{justifyContent: "center", alignItems: "center", fontSize:30, fontStyle:"italic",borderBottomWidth:1,textAlign: "center"}}
          placeholder={` ${topic}`}
          placeholderTextColor = "black"
          editable={false}>
          </TextInput>
          : 
          <TextInput
          style = {{justifyContent: "center", alignItems: "center", fontSize:30, fontStyle:"italic",borderBottomWidth:1,textAlign: "center"}}
          placeholder={" Enter here"}
          placeholderTextColor = "grey"
          onChangeText={(text) => setCurrentTopic(text)} 
          editable= {true}>
          </TextInput>}
        </View>
        <Text style = {[styles.text,{marginTop:30}]}>Question:</Text>
        <TextInput
          style = {[styles.input,{marginTop:15}]}
          placeholder="Enter your question"
          onChangeText={(value) => setQuestion(value)}>
        </TextInput>
      </View>
      <View  style ={{flex:1, alignItems:"center",justifyContent: "center",}}>
        <Text style = {[styles.text,{marginTop:15}]}>Answer:</Text>
        <TextInput
          style = {[styles.input,{marginBottom:15}]}
          placeholder="Enter your Answer"
          onChangeText={(value) => setAnswer(value)}>
        </TextInput>
      </View>


      </View >
    ); }
  const SelectTopic = ({route,navigation}) => { 
    const tList = [{name: "Add New Topic"}];
    const [selectedItem, setSelectedItem] = useState(null);
    const onSelect = (item) => {
      setSelectedItem(item)
    }
  
    useEffect(()=>{
      setScore("-");
      if (user) {
      const wdoc = doc(dbInit, "users", auth?.currentUser.uid);
        return onSnapshot(wdoc, (doc) => {
          let repList = [];
          let Data = doc.data()?.FlashCardContent;
          if (Data != null) {
          Data.forEach((element)=> {
            if (repList.includes(element.topic)) {}
            else {tList.unshift({name : element.topic}
              );repList.push(element.topic);}
          });
        }
      else{null};})}else{}},[selectedItem])
    return (
      <View style={styles.body}>
        <CustomTabHeading
          onPage = {false}
          title1 = "Create"
          title2 = "Test"
          onPress2 = {()=>{navigation.navigate("View Flash Card")}}
          onPress1 = {()=>{null}}/>
        <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} style= {{alignSelf: "flex-start", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom:20,marginLeft:2}} onPress={()=>navigation.goBack()}>
          <Image style = {[styles.iconimage,{marginRight:3}]} source = {{uri: "https://icons.veryicon.com/png/o/miscellaneous/arrows/go-back-2.png"}} tintColor= '#008b8b'></Image>
          <Text style = {{fontSize:17,color: '#008b8b'}}>Go Back</Text>
        </TouchableOpacity>
        <Text style={[styles.subtitle, {marginTop:10}]}>Choose Your Topic</Text>
        <View style={[styles.listSize, {marginTop:60}]}>
            <DropDown
            item={selectedItem}
            data = {tList}
            onSelect={onSelect}/>
        </View>
        <ProceedButton
          title = "Proceed"
          style = {{marginBottom:25}}
          onPress={()=>{
            if (selectedItem && (selectedItem.name != "Add New Topic")) {navigation.navigate("Display Cards", {topicSelected:`${selectedItem.name}`})}
            else if (selectedItem && (selectedItem.name == "Add New Topic")) {navigation.navigate("Input for Flashcard", {topicSelected:`${selectedItem.name}`})}
            else {alert("Please select a topic!")}}}

        />
      </View>
    ); }

  const DisplayCards = ({navigation,route}) =>{
    const [test,setTest] = useState();
    const tracking = () =>{
      setTest(!test);
      console.log(test);
      if (test){return(
        setScore(0))
      }else{return(setScore("-"))}
  


    }
    const _viewabilityConfig = {
      itemVisiblePercentThreshold: 40,
    };
    const _onViewableItemsChanged = useCallback(({ viewableItems,changed}) => {
      console.log("Visible items are", viewableItems);
      console.log("Changed in this iteration", changed);
      console.log(viewableItems[0].index);
      setSelectedItem(viewableItems[0].index);
    },[selectedItem]);

    const flipback = useCallback((f,g)=>{
      if (f){
        g();
      }else{}
    },[])
    const animate = useRef(new Animated.Value(0.01));
    const [selectedItem,setSelectedItem] = useState(0)
    const [isFlipped,setIsFlipped] = useState(false)
    const handleFlip = () => {
      Animated.timing(animate.current,{
        duration: 200,
        toValue : isFlipped ? 0.01 : 180, 
        useNativeDriver: true,
      }).start(()=>{
        setIsFlipped(!isFlipped);
      });
    }


    const interpolateFront = animate.current.interpolate({
      inputRange:[0.01,180],
      outputRange: ['0.01deg','180deg'],
    });

    const interpolateBack = animate.current.interpolate({
      inputRange:[0.01,180],
      outputRange: ['180deg','360deg'],
    });
    const keyExtractor=(item,index)=> index.toString()
    const renderItem = useCallback(({item,index})=>(
      <Pressable style = {{alignSelf:"center", justifyContent: "center", alignItems:"center",width,height: cH}} onPress = {()=>{[handleFlip()]}}>  
            <Animated.View style={[{transform:[{rotateY:interpolateFront}]},styles.hidden,{width: cW,height: cH}]}>
            <FlipCard
            heading = "Question"
            image = "https://icons.veryicon.com/png/o/internet--web/truckhome/question-16.png"
            title = {item.Ques}
            pageNum = {`${index + 1}/${tList.length}`}/>

            </Animated.View>
          
          <Animated.View style = {[styles.back, styles.hidden,{width: cW,height: cH},{transform:[{rotateY:interpolateBack}]}]}>
            <FlipCard
            heading = "Answer"
            image = "https://icons.veryicon.com/png/o/education-technology/alibaba-big-data-oneui/answer-a.png"
            title = {item.Ans}
            pageNum = {`${index + 1}/${tList.length}`}/>
          </Animated.View>

      </Pressable>
      
      
      ))
    const [tList,setTList] = useState()
    const topic =  route.params.topicSelected
    useEffect(()=>{
      setTest(false);
      if (user) {
      const wdoc = doc(dbInit, "users", auth?.currentUser.uid);
        return onSnapshot(wdoc, (doc) => {
          let Data = doc.data()?.FlashCardContent
          let dList = [{}]
          if (Data != null) {
          Data.forEach((element)=> {
            if (element.topic == topic) {dList.push({Ques:element.Question, Ans:element.Answer});}
            else {}
          })
        } else{null};
        dList.splice(0,1);
      setTList(dList);setTotalScore(dList.length)})}else{}},[])
    return(
    <View style={[styles.flashCardBody,{backgroundColor:"#f5f5dc"}]}>
      <MashButton
      title = {test ? "Stop Scoring" : "Start Scoring" }
      onPress={tracking}
      />
      <FlatList
        onScrollBeginDrag={()=>{flipback(isFlipped,handleFlip)}}
        onViewableItemsChanged={_onViewableItemsChanged}
        viewabilityConfig={_viewabilityConfig}
        horizontal = {true}
        keyExtractor={keyExtractor}
        extraData = {selectedItem}
        decelerationRate = "fast"
        pagingEnabled
        data = {tList}
        renderItem={renderItem}/>
    </View>
  )}
    
  const HeaderR = () =>{
    return(
      <Text style = {styles.text}>Score: {score}/{totalScore}</Text>
    )
  }
      
  return(
    <FlashCardStack.Navigator>
          <FlashCardStack.Screen
          name = "Create Or View Flash Card"
          component={CreateFlashCard}
          options = {{
            header : ()=> null,
          }}/>
        <FlashCardStack.Screen
          name = "Topic List"
          component={TopicList}
          options = {{
            header : ()=> null,
          }}/>
        <FlashCardStack.Screen
          name = "Input for Flashcard"
          component={FlashCardInput}
          options = {{
            header : ()=> null,
          }}/> 
          <FlashCardStack.Screen
          name = "View Flash Card"
          component={SelectTopic}
          options = {{
            header : ()=> null,
          }}/> 
          <FlashCardStack.Screen
          name= "Display Cards"
          component={DisplayCards}
          options = {{
            headerRight : ()=> (HeaderR())
          }}/>
    </FlashCardStack.Navigator>
  )
  }




const styles = StyleSheet.create({
  subtitle:{
    fontSize: 35,
    textAlign: "center",
    borderTopWidth:3,
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "black"
  },
  titletext: {
    fontSize: 30,
    textAlign: "center",
    color: "black"
  },
  inputText: {
    fontSize: 30,
    textAlign: "center",
    color: "black",
    fontStyle: "italic",
  },
  body: {
    flex: 1,
    alignItems:"center",
    justifyContent:"flex-start",
    backgroundColor: "white",
  },
  flashCardBody: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    width: 300,
    borderRadius: 20,
    borderWidth: 2,
    padding: 10,
    margin: 20,
  },
  buttons: {
    marginTop: 150,
    justifyContent: "center",
    // alignItems: "center",
  },
  image:{
    height: 45,
    width: 45,
    alignSelf: "center",
    justifyContent:"center",
  },
  listSize:{
    flex:1,
    height: 250,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 20,
  },
  iconimage:{
    height: 30,
    width: 30,
    alignSelf: "center",
    justifyContent:"center",
  },
  input: {
    margin: 5,
    borderWidth: 2,
    alignSelf: "center",
    width: 300,
    borderColor: "#555",
    borderRadius: 5,
    textAlign: "center",
    margin: 15,
    height: 155,
  },
  hidden:{
    backfaceVisibility:"hidden",
  },
  back:{
    position:"absolute",
    top: 0
  },
});
