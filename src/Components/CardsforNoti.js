import { Card,Title, Subheading } from "react-native-paper";
import React, {component, useState, useEffect} from "react";
import {View, Image,Text, StyleSheet, Pressable, TouchableWithoutFeedback, TouchableOpacity, FlatList} from "react-native";
import ProceedButton from "./ProceedButton";

export default NotiFlipCard = (p) =>{
    return(
        <Card style = {[styles.card,{borderColor: "#dcdcdc"}]}>
            <Card.Content style = {{alignItems:"center",justifyContent:"center"}}>
                <View style = {{flexDirection:"row", justifyContent:"space-evenly",  margin:30, marginTop: 0,width:"100%",alignSelf:"center",alignItems:"center"}}>
                <Image resizeMode="contain" source = {{uri:p.image}} style ={{height: 45,width: 45,justifyContent:"center",alignSelf: "center"}}></Image>
                <Title style = {{alignSelf:"center"}}>{p.heading}</Title>
                <Image resizeMode="contain" source = {{uri:p.imagedone}} style ={{height: 45,width: 45,alignSelf: "center", justifyContent:"center",tintColor: p.tC}}></Image>
                </View>
                <Subheading style = {{alignSelf:"center"}}>{p.title}</Subheading>
                {p.button && (<Pressable onPress = {p.onPress} hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
                style={({ pressed }) => [
          { backgroundColor: pressed ? "#b0c4de" : "#86f09f"},
          styles.button,
          {borderRadius:8,marginTop:50},
          {borderBottomWidth: pressed ? 0 : 4},
          { disabled: p.shows},
          { borderRadius:10, width:180, height:50,alignItems:"center",justifyContent:"center",borderWidth:0.1},
        ]}>
                    <Text style = {{fontSize:20}}>{p.btitle}</Text>
                </Pressable>)}
                <View style = {{flex:1,justifyContent: "center",alignItems: "flex-end", alignSelf:"center",flexDirection:"row"}}>
                    <Text style = {{fontSize:18}}>{p.pageNum}</Text>
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