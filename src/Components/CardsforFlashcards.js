import { Card,Title, Subheading } from "react-native-paper";
import React, {component, useState, useEffect} from "react";
import {View, Image,Text, StyleSheet, Pressable, TouchableWithoutFeedback, TouchableOpacity, FlatList, TextInput} from "react-native";
import ProceedButton from "./ProceedButton";

export default FlipCard = (p) =>{
    const [bcolor,setBColor] = useState("#dcdcdc")
    const [display,setDisplay] = useState()
    const [editText,setEditText] = useState()
    useEffect(()=>{
        setDisplay(p.test);
        setEditText("Edit")
        if (bcolor != "#dcdcdc"){
        setBColor(p.bcolor);
        }},[p.test])
    const [c1,setC1] = useState("red");
    const [c2,setC2] = useState("#32cd32");
    const changeColor = (a) => {
        if (a == c1) {
        setC1("#dcdcdc")
        setTimeout(()=>{
            setC1("red")
        },150)}
        else{setC2("#dcdcdc")
        setTimeout(()=>{
            setC2("#32cd32")
        },150)}
    }
    return(
        <Card style = {[styles.card,{borderColor: (p.heading == "Answer") ? bcolor : p.bc}]}>
            {(editText == "Done") ? <Pressable style = {{flex: 0.2,alignSelf:"flex-start",position:"absolute",justifyContent:"center"}} disabled= {p.shows ? false : true} onPress= {()=>{p.onPress4();setEditText("Edit")}} hitSlop={{ top: 30, bottom: 30, right: 30, left: 30 }}>
                <Image style = {[styles.imageTop,{tintColor : `${c1}`}]} source = {{uri:"https://icons.veryicon.com/png/o/internet--web/web-page-general-icon/cross-44.png"}}/>
            </Pressable>
            :
            <View style = {{flex: 0.2,alignSelf:"flex-start",position:"absolute"}}></View>}
            <Card.Content style = {{alignItems:"center",justifyContent:"center",flex:1}}>
                <View style = {{flex:0.45,flexDirection:"row",alignItems:"center", justifyContent:"space-around"}}>
                <Image resizeMode="contain" source = {{uri:p.image}} style ={{height: 45,width: "25%",justifyContent:"center"}}></Image>
                <View style = {{width:"60%",alignItems:"center"}}>
                <Title style = {{alignSelf:"center"}}>{p.heading}</Title>
                </View>
                {(p.heading == "Question" && display == false) ? 
                <View style = {{height:45,width:"25%",justifyContent:"center",alignItems:"center"}}>
                <Pressable style = {{justifyContent:"center",alignItems:"center"}} onPress = {()=>{p.onPressLink(); if (editText == "Edit") {setEditText("Done")} else {setEditText("Edit");p.onFinishEdit()}} } hitSlop={{ top: 40, bottom: 40, right: 40, left: 40 }} disabled = {p.shows ? false : true}>
                    <Text style = {{fontSize:18, color: editText == "Edit" ? "blue" : "#00bf4f",alignSelf:"center",borderBottomWidth:2,borderBottomColor:editText == "Edit" ? "blue" : "#00bf4f"}}>{editText}</Text>
                </Pressable>
                </View>
                :
                <View style = {{height:45,width:"25%"}}></View>}
                </View>
                <View style = {{flex:1.2,alignItems:"stretch",borderWidth: p.showInputs ? 2 : 0,width:"100%"}}>
                <TextInput textAlign="center" editable = {(p.showInputs == true) ? 
                    true : false} style = {{flex:1}}
                    onChangeText={(value) => p.setNew(value)}
                    ><Text style = {styles.text}>{p.title}</Text></TextInput>
                </View>
                <View style = {{flex:0.3,justifyContent: "space-around",alignItems: "flex-end", alignSelf:"center",flexDirection:"row",}}>
                    {display ? <Pressable disabled = {p.shows}
                    style = {{height:55,width:55,marginRight:50}}
                    onPress={()=> {[changeColor(c1),setBColor("red"),setDisplay(false),p.onPress1()]}}>
                        <Image style = {[styles.image,{tintColor : `${c1}`}]} source = {{uri:"https://icons.veryicon.com/png/o/miscellaneous/linear-icon-44/wrong-21.png"}}/>
                    </Pressable>
                    :
                    null


                    
                    }


                    <Text style = {{fontSize:18}}>{p.pageNum}</Text>




                    {display ? <Pressable  disabled = {p.shows}
                    style = {({pressed})=> [{height:55,width:55,marginLeft:50}]}
                    onPress={()=> {[changeColor(c2),setBColor("#32cd32"),setDisplay(false),p.onPress2()]}}>
                        <Image  style = {[styles.image,{tintColor : `${c2}`}]} source = {{uri:"https://icons.veryicon.com/png/o/miscellaneous/szj/correct-40.png"}}/>
                    </Pressable>
                    :
                    null
                    
                    
                    }
                </View>
            </Card.Content>


        </Card>
    )   
}


const styles = StyleSheet.create({
    card:{
        width:"100%",
        height:"100%",
        borderWidth:2,
        borderRadius:16,
        shadowColor: "#000",
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:1,
        shadowRadius:16,
        elevation:8,
        alignItems:"center",
        justifyContent:"center"
    },
    image:{
        height: 55,
        width: 55,
        resizeMode:"cover",
      },
    imageTop:{
        height: 28,
        width: 28,
        resizeMode:"cover",
      },
    text: {
        fontSize:20,
        textAlign: "center",
        fontWeight:"bold",
        color:"black",
        textAlign:"center",
        alignSelf:"center",
        

    }



})