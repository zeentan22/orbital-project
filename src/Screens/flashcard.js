import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from "react-native";
import React, { userState, useState, useEffect } from "react";
import MashButton from "../Components/CustomButton";
import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator, Header } from "@react-navigation/stack";
import { dbInit, auth} from "../../firebase";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { color } from "react-native-reanimated";
import DropDown from "../Components/DropDown";
const FlashCardStack = createStackNavigator()

export function FlashCard({ navigation, route }) {
  const [flashCardList,setFlashCardList] = useState();

  const CreateFlashCard = ({navigation}) => { 
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Start using Flashcards now!</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Topic List")}>
          <Text> Create new flashcard </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text> Test Yourself! </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const TopicList = ({navigation, route}) => { 
  let fruits = [{id:1, name: 'Mango'}, {id:2, name: 'Banana'},{id:3, name: 'Apple'}, {id:4, name:"Add New Topic"}]
  const [topic, setTopic] = useState("")
  const [fsDataList, setFsDataList] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const onSelect = (item) => {
    setSelectedItem(item)
  }

  useEffect(()=>{
    setTopic("");
    const wdoc = doc(dbInit, "users", auth?.currentUser.uid);
    const fetchData = async() =>{}
  },[])
  return (
    <View style={styles.body}>
      <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} style= {{alignSelf: "flex-start", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom:20,marginLeft:2}} onPress={()=>navigation.goBack()}>
        <Image style = {[styles.iconimage,{marginRight:3}]} source = {{uri: "https://icons.veryicon.com/png/o/miscellaneous/arrows/go-back-2.png"}} tintColor= '#008b8b'></Image>
        <Text style = {{fontSize:17,color: '#008b8b'}}>Go Back</Text>
      </TouchableOpacity>
      <Text style={[styles.subtitle, {marginTop:10}]}>Choose Your Topic</Text>
      <View style={[styles.listSize, {marginTop:60}]}>
          <DropDown
          value={selectedItem}
          data = {fruits}
          onSelect={onSelect}/>
      </View>
      <TouchableOpacity style= {{alignItems: "center", flexDirection: "row-reverse", justifyContent:"center", width: "100%", flex : 0.3}} onPress={()=>{navigation.navigate("Input for Flashcard", {topicSelected:`${topic}`})}}>
      <Image
      style = {[styles.image,{marginRight: 10}]}
      tintColor = "#1e90ff"
      source = {{uri: "https://icons.veryicon.com/png/o/clothes-accessories/through-item/arrow-right-31.png"}}></Image>
      <Text style = {{fontSize:24, color:`#1e90ff`}}>Proceed</Text>
      </TouchableOpacity>
    </View>
  ); }

  const FlashCardInput = ({route,navigation}) => { 
    const topic =  route.params.topicSelected
    const [currentTopic, setCurrentTopic] = useState(topic ? topic : "Null")
    const wdoc = doc(dbInit, "users", auth?.currentUser.uid);
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
          {(topic==currentTopic) ?<TextInput
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
  const SelectTopic = ({navigation}) => { 
      return (
        <View style={styles.body}>
          <Text style={styles.text}>Customise your FlashCard2 now!</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button}>
              <Text> Create new flashcard </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text> Test Yourself! </Text>
            </TouchableOpacity>
          </View>
        </View>
      ); }
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
      name = "Select Your Topic"
      component={SelectTopic}
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
    paddingTop: 10,
    alignItems:"center",
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
});
