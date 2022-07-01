import React, {component, useState, useEffect} from "react";
import {View, Image,Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList} from "react-native";



export default Dropdown = ({
    data =[],
    item = {},
    onSelect = () =>{},
    sItem = {},



}) =>{
    const [showOption, setShowOption] = useState(false)
    const onSelectedItem = (item) => {
        setShowOption(false);
        onSelect(item)
    }
        return (
        <View style = {{flex:1, width:"75%",alignItems:"center"}}>
            <TouchableOpacity
            style = {{alignItems: "center", justifyContent:"center",borderRadius:20, borderBottomRightRadius:showOption ? 0 : 20,height:40}}
            activeOpacity={0.8}
            onPress={()=> setShowOption(!showOption)}>
                <View style = {[styles.dropDownStyle,{borderBottomRightRadius: showOption ? 0 : 13,borderBottomLeftRadius: showOption ? 0 : 13,borderBottomWidth: showOption ? 1: 2}]}>
                <Text style = {[styles.text,{width:"88%",paddingBottom: showOption ? 1 : 0}]}>{!! item? item.name : "Please Select..."}</Text>
                <View style = {{flexDirection:"row",marginBottom: showOption ? 1 : 0,width:"12%",justifyContent:"space-around",alignItems:"center",alignSelf:"center",backgroundColor:"#ccc9c8",borderTopRightRadius:13.5,borderBottomRightRadius: showOption ? 0 : 11.5,borderLeftWidth:2,height:40.5}}>
                <Image
                style = {[styles.image, {transform:[{rotate: showOption? "180deg" : "0deg"}]}]}
                source = {{uri: "https://icons.veryicon.com/png/o/miscellaneous/eva-icon-fill/arrow-down-38.png"}}></Image>
                </View>
                </View>
            </TouchableOpacity>
            {showOption ?<View style = {{backgroundColor: "white", padding: 8, height:"80%", borderLeftWidth:2,borderRightWidth:2,borderBottomWidth:2,borderBottomRightRadius:20,borderBottomLeftRadius:20,alignSelf:"stretch"}}> 
            <Image
            resizeMode="cover"
            source = {{uri:"https://images.pexels.com/photos/6404231/pexels-photo-6404231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}}
            style = {[StyleSheet.absoluteFillObject,{borderBottomRightRadius:18,borderBottomLeftRadius:18}]}
            blurRadius = {60}/>
                <FlatList
                        keyExtractor={(item,index) => index.toString()}
                        data = {data}
                        renderItem={({item})=>(
                    <TouchableOpacity
                    onPress={()=>onSelectedItem(item)}
                    style={{
                        paddingVertical:8,
                        borderRadius: 4,
                        height:45,
                        paddingHorizontal: 6,
                        marginBottom: 8,
                        backgroundColor: (sItem && sItem.name == item.name) ? "#fceb92" : "white",
                        borderWidth:2,
                        borderRadius:5,
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                      {(item.name == "Add New Topic") ?
                      <View style = {{flexDirection:"row", alignItems: "center", justifyContent: "center"}}>
                        <Image
                        style={[styles.iconimage,{alignSelf:"center"}]}
                        source = {{uri : "https://icons.veryicon.com/png/o/internet--web/myicon/add-41.png"}}/>

                      </View>
                        :
                        <View style = {{flexDirection:"row", alignItems: "center", justifyContent: "center",marginTop:-5}}>
                        <Text style = {{fontSize:20,}}>{item.name}</Text>
                        </View>
                  }
                      </TouchableOpacity>
                        )}/>
            </View>
            :
          null}
        </View>
    )
}



const styles = StyleSheet.create({
    text: {
      fontSize: 22,
      textAlign: "center",
      color: "black",
      alignSelf:"center",
      justifyContent:"center"
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
      height: 25,
      width: 25,
      alignSelf: "center",
      justifyContent:"center",
    },
    listSize:{
      flex:1,
      height: 270,
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
        borderRadius: 15,
        borderWidth:2,
        height: 45,
        justifyContent: "center",
        flexDirection:"row",
        marginBottom: 2,
        width:"90%",
        alignItems: "center",

    },
  });