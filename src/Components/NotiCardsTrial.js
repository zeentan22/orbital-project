import { Card,Title, Subheading } from "react-native-paper";
import React, {component, useState, useEffect} from "react";
import {View, Image,Text, StyleSheet, Pressable, TouchableWithoutFeedback, TouchableOpacity, FlatList, ImageBackground} from "react-native";
import ProceedButton from "./ProceedButton";

export default NotiFlipCard = (p) =>{
    return(
        <View style = {{flex:1, alignItems:"center",justifyContent:"flex-start",}}>
            <View style = {[styles.card,{borderColor: "#dcdcdc"}]}>
            <Image
            resizeMode="cover"
            source = {require("../../assets/NotepadForTask.png")}
            style = {[StyleSheet.absoluteFillObject,{height:"100%",width:"100%"}]}
            
            />
            <View style = {{alignItems:"center",justifyContent:"center",position:"absolute",height:350,width:"100%"}}>
                <View style = {{flexDirection:"row", justifyContent:"space-evenly",width:"100%",alignSelf:"center",alignItems:"center"}}>
                <Image resizeMode="contain" source = {{uri:p.image}} style ={{height: 47,width: 47,justifyContent:"center",alignSelf: "center",top:45,left:-20}}></Image>
                <Text style = {{alignSelf:"center",fontWeight:"bold",top:60,fontSize:22}}>{p.heading}</Text>
                {p.marking ? <View style ={{height:47,width:47,borderWidth:3,alignSelf:"center",justifyContent:"center",top:45,right:-20}}>
                <Image resizeMode="contain" source = {p.imagedone} style ={{height: 135,width: 135,alignSelf: "center", justifyContent:"center",tintColor: p.tC}}></Image>
                </View>
                : 
                <View style={{height:47,width:47,alignSelf:"center",justifyContent:"center",top:45,right:-20}}></View>}
                </View>
                <Text style = {{alignSelf:"center",top:80,fontSize:27,fontWeight:"normal"}}>{p.title}</Text>
                {p.button && (<Pressable onPress = {p.onPress} disabled = {p.shows} hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
                style={({ pressed }) => [
          { backgroundColor: pressed ? "#b0c4de" : "#86f09f"},
          styles.button,
          {borderRadius:8,marginTop:50,top:50},
          {borderBottomWidth: pressed ? 0 : 4},
          { borderRadius:10, width:180, height:50,alignItems:"center",justifyContent:"center",borderWidth:0.1},
        ]}>
                    <View style = {{flexDirection:"row",justifyContent:"space-around"}}>
                    <Image source = {{uri:"https://icons.veryicon.com/png/o/miscellaneous/core-music/task-42.png"}} style = {{height:30,width:30,marginRight:10}}/>
                    <Text style = {{fontSize:20}}>{p.btitle}</Text>
                    </View>
                </Pressable>)}
                <View style = {{flex:1,justifyContent: "center",alignItems: "flex-end", alignSelf:"center",flexDirection:"row"}}>
                    <Text style = {{fontSize:18}}>{p.pageNum}</Text>
                </View>
            </View>
        </View>
        </View>
    )   
}


const styles = StyleSheet.create({
    card:{
        width:"100%",
        height:"90%",
        shadowColor: "#000",
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:1,
        shadowRadius:16,
        alignItems:"center",
        justifyContent:"center",
    },
    image:{
        height: 55,
        width: 55,
        resizeMode:"cover",
      },



})