import { Card,Title } from "react-native-paper";
import React, {component, useState, useEffect} from "react";
import {View, Image,Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList} from "react-native";
import ProceedButton from "./ProceedButton";

export default FlipCard = (p) =>{
    return(
        <Card style = {styles.card}>
            <Card.Content>
                <Title>{p.title}</Title>
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
        elevation:10
    },



})