import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput,FlatList, Pressable, Animated,Dimensions,Modal} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
const FlashCardStack = createStackNavigator();
const {width, height} = Dimensions.get("screen")
const cW = width * 0.75
const cH = cW * 1.41
const iW = width * 0.9
const iH = iW * 0.68
const mar = width * 0.98 * 0.47



const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export function FlashCard({ navigation, route }) {
  const user = useAuth();
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
//   const CreateFlashCard = ({navigation}) => { 
//   return (
//     <View style={styles.body}>
//       <Image
//         resizeMode="cover"
//         source = {{uri:"https://i.pinimg.com/564x/62/8a/e2/628ae22269e50e2b4e335770c3bbc742.jpg"}}
//         style = {StyleSheet.absoluteFillObject}
//         blurRadius = {70}/>
//       <CustomTabHeading
//       onPage = {true}
//       title1 = "Create"
//       title2 = "Test"
//       onPress2 = {()=>{navigation.navigate("View Flash Card")}}
//       onPress1 = {()=>{null}}/>
//       <Text style={styles.text}>Start using Flashcards now!</Text>
//       <View style={styles.buttons}>
//         <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Topic List")}>
//           <Text> Create new flashcard </Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("View Flash Card")}>
//           <Text> Test Yourself! </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
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
      <View style = {{justifyContent:"flex-start",alignItems:"center",flex:1}}>
      <CustomTabHeading
          onPage = {true}
          title1 = "Create"
          title2 = "Test"
          onPress2 = {()=>{navigation.navigate("View Flash Card")}}
          onPress1 = {()=>{navigation.navigate("Topic List")}}/>
      </View>
      <View style = {{justifyContent:"center",alignItems:"center",flex:3.3,width:"100%",alignSelf:"stretch",alignSelf:"center"}}>
      <Image
              source={require("../../assets/HeaderForChoosing.png")}
              style={styles.imageHeader}
              resizeMode = "cover"
            />
      </View>
      <View style={[styles.listSize, {marginTop:0}]}>
          <DropDown
          item={selectedItem}
          sItem = {selectedItem}
          data = {tList}
          onSelect={onSelect}/>
      </View>
      <View style = {{justifyContent:"center",alignItems:"center",flex:0.5,marginBottom:2}}>
      <ProceedButton
      title = "Proceed"
      style = {{marginBottom:25}}
      onPress={()=>{
        if (selectedItem) {navigation.navigate("Input for Flashcard", {topicSelected:`${selectedItem.name}`})}
        else {alert("Please select a topic!")}}}

        />
      </View>
    </View>
  ); }

  const FlashCardInput = ({route,navigation}) => { 
    const topic =  (route.params) ? route.params["topicSelected"] : null
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
      <KeyboardAwareScrollView enableOnAndroid={true}   contentContainerStyle={{flexGrow: 1}}> 
      <View style={styles.body}>
        <View style = {{flexDirection:"row", flex:0.2, alignItems: "flex-start",justifyContent: "space-evenly",width:"98%",}}>
        <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} style= {{alignSelf: "flex-start", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom:20, marginRight:mar,}} onPress={()=>
          navigation.goBack()}>
        <Image style = {[styles.iconimage,{marginRight:3}]} source = {{uri: "https://icons.veryicon.com/png/o/miscellaneous/arrows/go-back-2.png"}} tintColor= '#008b8b'></Image>
        <Text style = {{fontSize:17,color: '#008b8b'}}>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} style= {{alignSelf: "flex-start", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom:20}} onPress={async ()=>{
          try {
            let newObj = {topic: currentTopic, Question: question, Answer:answer}
            await updateDoc(wdoc, {FlashCardContent:arrayUnion(newObj)})
          } catch (err){
            alert("Error!");
            console.log(err);
          };navigation.navigate("Topic List")}}>
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
      </KeyboardAwareScrollView>
    ); }
  const SelectTopic = ({route,navigation}) => { 
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
              );repList.push(element.topic);}
          });
        }
      else{null};})}else{}},[selectedItem])
    return (
      <View style={styles.body}>
        <View style = {{justifyContent:"flex-start",alignItems:"center",flex:1}}>
        <CustomTabHeading
          onPage = {false}
          title1 = "Create"
          title2 = "Test"
          onPress2 = {()=>{navigation.navigate("View Flash Card")}}
          onPress1 = {()=>{navigation.navigate("Topic List")}}/>
          </View>
          <View style = {{justifyContent:"center",alignItems:"center",flex:3.3,width:"100%",alignSelf:"stretch"}}>
        <Image
              source={require("../../assets/HeaderForChoosing2.png")}
              style={styles.imageHeader}
              resizeMode = "cover"
            />
        </View>
        <View style={[styles.listSize, {marginTop:0}]}>
            <DropDown
            item={selectedItem}
            sItem = {selectedItem}
            data = {tList}
            onSelect={onSelect}/>
        </View>
        <View style = {{justifyContent:"center",alignItems:"center",flex:0.5,marginBottom:2}}>
        <ProceedButton
          title = "Proceed"
          style = {{marginBottom:25}}
          onPress={()=>{
            if (selectedItem && (selectedItem.name != "Add New Topic")) {navigation.navigate("Display Cards", {topicSelected:`${selectedItem.name}`})}
            else if (selectedItem && (selectedItem.name == "Add New Topic")) {navigation.navigate("Input for Flashcard", {topicSelected:`${selectedItem.name}`})}
            else {alert("Please select a topic!")}}}

        />
        </View>
      </View>
    ); }

  const DisplayCards = ({navigation,route}) =>{
    const wdoc = user ? doc(dbInit, "users", auth?.currentUser.uid) : null ;
    const [show,setShow] = useState(true)
    const [attempted,setAttempted] = useState("-") 
    const cList = useRef([])
    const wList = useRef([])
    const [appear,setAppear] = useState(false)
    const totCount = useRef(0)
    const [sco,setSco] = useState("-");
    const totalsco = useRef("-");
    const [s,setS] = useState("-");
    const totals = useRef("-");
    const [test,setTest] = useState(true);
    const [ref, setRef] = useState(null);
    const [showInput, setShowInput] = useState(false)
    const [newQ,setNewQ] = useState()
    const [newA, setNewA] = useState();
    const amendItems = (number,top,q,a) =>{
      if (newQ == q && newA == a) {}
      else{
      if (tList) {
        let tempList = tList
        tList.forEach((element)=>{
        updateDoc(wdoc, {FlashCardContent:arrayRemove(element)})});
        tempList[number] = { Answer: newA, Question: newQ, topic: top};
        tempList.forEach((element)=>{
          updateDoc(wdoc, {FlashCardContent:arrayUnion(element)});
        });
        setChangeInTList(!changeInTList);
        if (number === 0) {null}
        else{ref.scrollToIndex({
          animated: true,
          index: number,
          viewPosition: 0
        });setSelectedItem(number)};
        }
      else {null}
    }}
    const tracking = () =>{
      setAppear(true);
      console.log("h",test);
      if (test){
        setAppear(false);
        cList.current = [];
        wList.current = [];
        setSco(0);
        setAttempted(0);
        totalsco.current = totCount.current;
      }else{ setAppear(true); setS(sco); totals.current = totalsco.current;setSco("-");totalsco.current = "-";cList.current = [];
      wList.current = [];setAttempted("-")}
  


    }
    const _viewabilityConfig = {
      itemVisiblePercentThreshold: 40,
    };
    const _onViewableItemsChanged = useCallback(({ viewableItems,changed}) => {
      if (viewableItems != undefined || viewableItems) {
      console.log("Visible items are", viewableItems);
      console.log("Changed in this iteration", changed);
      console.log(viewableItems[0].index);
      setSelectedItem(viewableItems[0].index);}
      else {setSelectedItem(0)}
    },[selectedItem]);

    const selectC = (a,b,c) =>{
      if (a.current.includes(c)) {
        return(
        "red")
      }
      else if (b.current.includes(c)){return(
        "#32cd32")
      }
      else{
        return(
        "#dcdcdc")
      }
    }
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
        setShow(!show)
      });
    }

    const deleteFlashcards = (number) =>
      {if (tList.length == 1) { 
        try {
          let newObj = tList[number];
          updateDoc(wdoc, {FlashCardContent:arrayRemove(newObj)})
          ;alert("Flashcard has been successfully deleted!")
        } catch (err){
          alert("Error!");
          console.log(err);
        }; navigation.navigate("View Flash Card")}
        else {
          try {
            let newObj = tList[number];
            updateDoc(wdoc, {FlashCardContent:arrayRemove(newObj)})
            ;alert("Flashcard has been successfully deleted!");
            setChangeInTList(!changeInTList);
            if (number == 0) {ref.scrollToIndex({
              animated: true,
              index: 0,
              viewPosition: 0
            })}
            else {ref.scrollToIndex({
              animated: true,
              index: number - 1,
              viewPosition: 0
            }); setSelectedItem(number - 1)}
          } catch (err){
            alert("Error!");
            console.log(err);};
    }}

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
      <Pressable style = {{alignSelf:"center", justifyContent: "center", alignItems:"center",width,height: cH}} onPress = {()=>{handleFlip()}}>  
            <Animated.View style={[{transform:[{rotateY:interpolateFront}]},styles.hidden,{width: cW,height: cH,zIndex: show ? 10 : 0}]}>
            <FlipCard
            test = {false}
            shows = {show}
            setNew={setNewQ}
            onFinishEdit = {()=>{amendItems(index, item.topic,item.Question,item.Answer)}}
            onPressLink = {()=>{setShowInput(!showInput);setNewA(item.Answer);setNewQ(item.Question)}}
            showInputs = {showInput}
            onPress4 = {()=> {deleteFlashcards(index);setShowInput(!showInput)}}
            bc = {selectC(wList,cList,index)}
            heading = "Question"
            image = "https://icons.veryicon.com/png/o/education-technology/alibaba-big-data-oneui/ask-q.png"
            title = {item.Question}
            pageNum = {`${index + 1}/${tList.length}`}/>

            </Animated.View>
          
          <Animated.View style = {[styles.back, styles.hidden,{width: cW,height: cH,zIndex: show ? 0 : 10},{transform:[{rotateY:interpolateBack}]}]}>
            <FlipCard
            test = {!test}
            shows = {show}
            setNew={setNewA}
            showInputs = {showInput}
            onPress4 = {()=> {deleteFlashcards(index);setShowInput(!showInput)}}
            onPress1 = {()=>{wList.current.push(index);setAttempted(attempted + 1)}}
            onPress2 = {()=>{setSco(sco + 1);cList.current.push(index);setAttempted(attempted + 1)}}
            bcolor= "#dcdcdc"
            heading = "Answer"
            image = "https://icons.veryicon.com/png/o/education-technology/alibaba-big-data-oneui/answer-a.png"
            title = {item.Answer}
            pageNum = {`${index + 1}/${tList.length}`}/>
          </Animated.View>

      </Pressable>
      
      
      ))
    const [tList,setTList] = useState()
    const [changeInTList, setChangeInTList] = useState(true)
    console.log(tList)
    const topic =  (route.params) ? route.params["topicSelected"] : null
    console.log(topic)
    useEffect(()=>{
      console.log("yoloo",test)
      if (user) {
      const wdoc = doc(dbInit, "users", auth?.currentUser.uid);
        return onSnapshot(wdoc, (doc) => {
          let Data = doc.data()?.FlashCardContent
          let dList = [{}]
          if (Data != null) {
          Data.forEach((element)=> {
            if (element.topic == topic) {dList.push({Question:element.Question, Answer:element.Answer, topic: element.topic});}
            else {}
          })
        } else{null};
        dList.splice(0,1);
      setTList(dList);totCount.current = dList.length})}else{}},[changeInTList])
    return(
    <View style={[styles.flashCardBody,{backgroundColor:"#f5f5dc"}]}>
      <Modal
      visible = {appear}
      transparent = {true}
      onRequestClose={()=> setAppear(false)}>
        <View style = {styles.modalOver}>
        <View style = {styles.modalStyle}>
          <View style = {{flexDirection:"row",justifyContent:"space-evenly",borderBottomWidth:2,height:50,alignItems:"center",backgroundColor:"#fcfa7c",borderTopLeftRadius:10,borderTopRightRadius:10}}>
            <Image source = {{uri:"https://icons.veryicon.com/png/o/construction-tools/function-icon-6/performance-management-8.png"}}style = {styles.iconimage}></Image>
            <Text style = {styles.text}>Results</Text>
            <Text style = {styles.text}>      </Text>
          </View>
          <View style = {{justifyContent:"center",alignItems:"center",height:205,backgroundColor:"#d5f5f3"}}>
          <Text style = {styles.text}>You Have Scored : </Text>
          <Text style = {[styles.text,{marginTop:40}]}>{s}/{totals.current}</Text>
          </View>
          <Pressable onPress ={()=> setAppear(false)}  style = {{alignSelf:"center",justifyContent:"center",height:45,backgroundColor:"#ebd7cc",width:300,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
            <Text style = {styles.text}>Ok</Text>
          </Pressable>
        </View>
        </View>


      </Modal>
      <View style = {{width:"98%"}}>
      <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} style= {{alignSelf: "flex-start", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom:20}} onPress={()=>
          navigation.goBack()}>
        <Image style = {[styles.iconimage,{marginRight:3}]} source = {{uri: "https://icons.veryicon.com/png/o/miscellaneous/arrows/go-back-2.png"}} tintColor= '#008b8b'></Image>
        <Text style = {{fontSize:17,color: '#008b8b'}}>Go Back</Text>
      </TouchableOpacity>
      </View>
      <View style = {{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
      <View style = {{width:"40%", backgroundColor:"yellow", alignItems:"stretch",borderRadius:5,height:60,justifyContent:"flex-end",marginRight:"5%"}}>
      <Text style = {{fontSize:18,alignSelf:"center"}}>Attempted</Text>
      <View style = {{height:"60%",backgroundColor:"white",borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
        <Text style = {{fontSize:20,alignSelf:"center"}}>{attempted}/{totalsco.current}</Text>
      </View>


      </View>
      <View style = {{width:"40%", backgroundColor:"#07bab4", alignItems:"stretch",borderRadius:5,height:60,justifyContent:"flex-end",marginLeft:"5%"}}>
      <Text style = {{fontSize:18,alignSelf:"center"}}>Score</Text>
      <View style = {{height:"60%",backgroundColor:"white",borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
      <Text style = {{fontSize:20,alignSelf:"center"}}>{sco}/{totalsco.current}</Text>
      </View>


      </View>
      </View>
      <FlatList
        ref={(ref) => {
          setRef(ref);
        }}
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={()=>{flipback(isFlipped,handleFlip)}}
        viewabilityConfig={_viewabilityConfig}
        horizontal = {true}
        keyExtractor={keyExtractor}
        extraData = {[tList]}
        decelerationRate = "fast"
        pagingEnabled
        data = {tList}
        renderItem={renderItem}/>
      <View style = {{flex:1.5,alignItems:"center",justifyContent:"flex-end",width:"50%"}}>
      <MashButton
      style = {{borderWidth:1}}
      title = {test ? "Start Scoring" : "Stop Scoring" }
      onPress={()=>{setTest(!test);tracking()}}
      />
      </View>
    </View>
  )}



  return(
    <FlashCardStack.Navigator
    initialRouteName="Topic List">
        <FlashCardStack.Screen
          name = "Topic List"
          component={TopicList}
          options = {{
            header : ()=> null,
            transitionSpec: {
              open: config,
              close: config,
            },
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
            transitionSpec: {
              open: config,
              close: config,
            },
          }}/> 
          <FlashCardStack.Screen
          name= "Display Cards"
          component={DisplayCards}
          options = {{
            header : ()=> null,
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
  imageHeader:{
    height: iH,
    width: "86%",
    flex:1
  },
  listSize:{
    flex:4,
    alignItems: "center",
    justifyContent: "flex-start",
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
  modalOver:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#00000099",

  },
  modalStyle:{
    borderRadius:10,
    height:300,
    width:300,
    backgroundColor:"#ffffff",
  },

});
