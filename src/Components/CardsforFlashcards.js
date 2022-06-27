import { Card,Title, Subheading } from "react-native-paper";
import React, {component, useState, useEffect} from "react";
import {View, Image,Text, StyleSheet, Pressable, TouchableWithoutFeedback, TouchableOpacity, FlatList} from "react-native";
import ProceedButton from "./ProceedButton";

export default FlipCard = (p) =>{
    const [bcolor,setBColor] = useState("#dcdcdc")
    const [display,setDisplay] = useState()
    useEffect(()=>{
        setDisplay(p.test);
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
            <Card.Content style = {{alignItems:"center",justifyContent:"center"}}>
                <View style = {{flexDirection:"row",alignItems:"center", justifyContent:"center",marginBottom:30}}>
                <Image resizeMode="contain" source = {{uri:p.image}} style ={{height: 45,width: 45, marginRight:34,justifyContent:"center"}}></Image>
                <Title style = {{alignSelf:"center",marginRight:76}}>{p.heading}</Title>
                </View>
                <Subheading style = {{alignSelf:"center"}}>{p.title}</Subheading>
                <View style = {{flex:1,justifyContent: "center",alignItems: "flex-end", alignSelf:"center",flexDirection:"row"}}>
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



})