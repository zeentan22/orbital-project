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
        style={{ alignItems: "center", justifyContent: "center", width: 280 }}
        activeOpacity={0.8}
        onPress={() => setShowOption(!showOption)}
      >
        <View style={styles.dropDownStyle}>
          <Text
            style={[styles.text, { alignSelf: "center", alignItems: "center" }]}
          >
            {!!item ? item.name : "Select A Year"}
          </Text>
          <Image
            style={[
              styles.image,
              { transform: [{ rotate: showOption ? "180deg" : "0deg" }] },
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
            height: 280,
            width: 280,
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
                  paddingHorizontal: 6,
                  marginBottom: 8,
                  backgroundColor: "white",
                }}
              >
                {item.name == "Add New Topic" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={[
                        styles.iconimage,
                        {
                          alignSelf: "center",
                          marginBottom: 7,
                          marginRight: 8,
                        },
                      ]}
                      source={{
                        uri: "https://icons.veryicon.com/png/o/internet--web/myicon/add-41.png",
                      }}
                    />
                  </View>
                ) : (
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 25,
                      marginBottom: 9,
                      justifyContent: "center",
                    }}
                  >
                    {item.name}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
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
    height: 30,
    width: 30,
    marginTop: 8,
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
    width: 300,
    alignItems: "center",
  },
});
