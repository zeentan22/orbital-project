import React, {component, useState, useEffect} from "react";
import {View, Image,Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from "react-native";



export default Dropdown = ({
    data =[],
    value = {},
    onSelect = () =>{}



}) =>{
    const [showOption, setShowOption] = useState(false)
    const onSelectedItem = (val) => {
        setShowOption(false);
        onSelect(val)
    }
        return (
        <View styles = {styles.input}>
            <TouchableOpacity
            style = {{alignItems: "center", justifyContent:"center"}}
            activeOpacity={0.8}
            onPress={()=> setShowOption(!showOption)}>
                <View style = {styles.dropDownStyle}>
                <Text style = {styles.text}>{value? value.name : "Select An Option"}</Text>
                <Image
                style = {[styles.image, {transform:[{rotate: showOption? "180deg" : "0deg"}]}]}
                source = {{uri: "https://icons.veryicon.com/png/o/miscellaneous/dowell/drop-down-25.png"}}></Image>
                </View>
            </TouchableOpacity>
            {showOption && (<View style = {{backgroundColor: "#f5f5dc", padding: 8}}> 
                {data.map((val,i)=>{
                return(
                    <TouchableOpacity
                    key = {String(i)}
                    onPress={()=>onSelectedItem(val)}
                    style={{
                        paddingVertical:8,
                        borderRadius: 4,
                        paddingHorizontal: 6,
                        marginBottom: 6,
                        backgroundColor: "white"
                    }}>
                        <Text style = {{alignSelf: "center", fontSize:25,marginBottom:6}}>{val.name}</Text>
                    </TouchableOpacity>
                )
            })}
            </View>)}
        </View>
    )
}



const styles = StyleSheet.create({
    text: {
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
    image:{
      height: 30,
      width: 30,
      marginTop:8,
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
    dropDownStyle:{
        backgroundColor : "#d3d3d3",
        padding: 8,
        borderRadius: 6,
        minHeight: 42,
        justifyContent: "space-between",
        flexDirection:"row",
        alignItems: "center",
        marginBottom: 2

    },
  });