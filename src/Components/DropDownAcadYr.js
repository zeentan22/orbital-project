import React, { component, useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default DropdownAcadYr = ({
  data = [],
  item = {},
  title = "",
  onSelect = () => {},
}) => {
  const [showOption, setShowOption] = useState(false);
  const onSelectedItem = (item) => {
    setShowOption(false);
    onSelect(item);
  };
  return (
    <View styles={styles.input}>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center", alignSelf:"stretch" }}
        activeOpacity={0.8}
        onPress={() => setShowOption(!showOption)}
      >
        <View style={styles.dropDownStyle}>
          <Text
            style={[styles.text, { alignSelf: "stretch", alignItems: "center", width:"88%" }]}
          >
            {!!item ? item.name : "Select A Year"}
          </Text>
          <Image
            style={[
              styles.image,
              { transform: [{ rotate: showOption ? "180deg" : "0deg" }],width:"12%" },
            ]}
            source={{
              uri: "https://icons.veryicon.com/png/o/miscellaneous/dowell/drop-down-25.png",
            }}
          ></Image>
        </View>
      </TouchableOpacity>
      {showOption && (
        <View
          style={{
            backgroundColor: "#add8e6",
            padding: 8,
            height: 240,
            alignSelf:"stretch",
            borderBottomLeftRadius:6,
            borderBottomRightRadius:6
          }}
        >
          <Text
            style={[
              styles.text,
              { justifyContent: "center", marginBottom: 10 },
            ]}
          >
            {title}
          </Text>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onSelectedItem(item)}
                style={{
                  paddingVertical: 8,
                  borderRadius: 4,
                  height:45,
                  paddingHorizontal: 6,
                  marginBottom: 8,
                  backgroundColor: "white",
                }}
              >
               <Text
                style={{
                  alignSelf: "center",
                  fontSize: 15,
                  marginBottom: 9,
                  justifyContent: "center",
                  }}
                >
                  {item.name}
                </Text>

              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex:1, 
    width:"100%",
    alignItems:"center",
    position:"absolute"
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
    alignSelf: "center",
  },
  textInp: {
    fontSize: 15,
    textAlign: "center",
    color: "black",
    alignSelf: "center",
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
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    height: 25,
    width: 25,
    alignSelf: "center",
    justifyContent: "center",
  },
  listSize: {
    flex: 1,
    height: 250,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 20,
  },
  iconimage: {
    height: 30,
    width: 30,
    alignSelf: "center",
    justifyContent: "center",
  },
  dropDownStyle: {
    backgroundColor: "#d3d3d3",
    padding: 8,
    borderRadius: 6,
    minHeight: 42,
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 2,
    width: "100%",
    alignItems: "center",
  },
});
