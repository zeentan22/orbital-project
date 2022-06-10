import { Card,Title, Subheading } from "react-native-paper";
import React, {component, useState, useEffect} from "react";
import {View, Image,Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList} from "react-native";
import ProceedButton from "./ProceedButton";

export default FlipCard = (p) =>{
    return(
        <Card style = {styles.card}>
            <Card.Content style = {{alignItems:"center",justifyContent:"center"}}>
                <View style = {{flexDirection:"row",alignItems:"center", justifyContent:"center",marginBottom:30}}>
                <Image source = {{uri:p.image}} style ={{height: 45,width: 45, marginRight:34,justifyContent:"center"}}></Image>
                <Title style = {{alignSelf:"center",marginRight:76}}>{p.heading}</Title>
                </View>
                <Subheading style = {{alignSelf:"center"}}>{p.title}</Subheading>
            </Card.Content>


        </Card>
    )   
}


const styles = StyleSheet.create({
    card:{
        width:"100%",
        height:"100%",
        borderRadius:16,
        shadowColor: "#000",
        shadowOffset:{
            width:0,
            height:0
        },
        shadowOpacity:1,
        shadowRadius:16,
        elevation:10,
        alignItems:"center",
        justifyContent:"center"
    },



})