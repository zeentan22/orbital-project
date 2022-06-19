"use strict";
import React, { userState, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Screenc } from "../Screens/Screen_C";
import Schedule from "../Screens/Schedule";
import { FlashCard } from "../Screens/flashcard";
import MashButton from "../Components/CustomButton";
import ProceedButton from "../Components/ProceedButton";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  closeDrawer,
  DrawerActions,
} from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { logout, dbInit, useAuth, auth } from "../../firebase";
import { getDoc, onSnapshot, doc } from "firebase/firestore";
import Loading from "../Screens/Loading";

const homeStackTab = createBottomTabNavigator();
const homeDrawer = createDrawerNavigator();

export const BotTabs = () => {
  const HomeStacks = () => {
    return (
      <homeStackTab.Navigator
        initialRouteName="Home Page"
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabel: ({ focused }) => {
            let textStyle;
            textStyle = focused
              ? {
                  fontSize: 14,
                  paddingBottom: 2,
                  fontWeight: "bold",
                  color: "#32cd32",
                }
              : {
                  fontSize: 11,
                  paddingBottom: 2,
                  fontWeight: "normal",
                  color: "black",
                };
            return <Text style={textStyle}>{route.name}</Text>;
          },
          tabBarActiveTintColor: "#32cd32",
          tabBarInactiveTintColor: "#555",
          tabBarActiveBackgroundColor: "#fff",
        })}
      >
        <homeStackTab.Screen
          name="Set Schedule"
          component={Schedule}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../assets/schedule.png")}
                style={{
                  width: focused ? 27 : 20,
                  height: focused ? 27 : 20,
                  marginTop: 3,
                }}
                tintColor={focused ? "#32cd32" : "black"}
              />
            ),
          }}
        />
        <homeStackTab.Screen
          name="Home"
          component={Screenc}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../assets/home.png")}
                style={{
                  width: focused ? 27 : 20,
                  height: focused ? 27 : 20,
                  marginTop: 3,
                }}
                tintColor={focused ? "#32cd32" : "black"}
              />
            ),
          }}
        />
        <homeStackTab.Screen
          name="Flash Card"
          component={FlashCard}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../assets/flash-cards.png")}
                style={{
                  width: focused ? 27 : 20,
                  height: focused ? 27 : 20,
                  marginTop: 3,
                }}
                tintColor={focused ? "#32cd32" : "black"}
              />
            ),
          }}
        />
      
      </homeStackTab.Navigator>
    );
  };
return(
  <homeDrawer.Navigator drawerStatusBarAnimation = "slide" DrawerActions = "closeDrawer"   swipeEnabled = {true} drawerContent={(props) => <DrawerContent {...props}/>}>
    <homeDrawer.Screen
    name = "Home Page"
    component={HomeStacks}
    options={{title:false,}}
    />
    <homeStackTab.Screen
        name = "loading"
        component={Loading}
        options={{
          drawerLockMode: "locked-closed",
          tabBarButton: () => null,
          tabBarVisible: false,
          header:()=>null,
          swipeEnabled: false,
        }}/>
  </homeDrawer.Navigator>

);}

export function DrawerContent(props) {
  const user = useAuth();
  const [username, setUserName] = useState("");
  const [trying, setTrying] = useState();
  useEffect(() => {
    if (user) {
      const wdoc = doc(dbInit, "users", auth?.currentUser.uid);
      const dat = () => {
        onSnapshot(wdoc, (doc) => {
          setUserName(doc.data().firstname);
        });
      };
      dat();
    } else {
      null;
    }
  }, [user]);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.body}>
          <View
            style={[styles.body, { alignItems: "flex-start", marginLeft: 10 }]}
          >
            <Avatar.Image
              source={{
                uri: "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png",
              }}
              size={50}
            />
            <Text style={styles.text}>Welcome, {username}</Text>
          </View>
        </View>
        <Drawer.Section style={{ flex: 1, marginTop: 40, marginLeft: 10 }}>
          <DrawerItem
            label="Home"
            onPress={() => [
              props.navigation.closeDrawer(),
              props.navigation.navigate("Home Page"),
            ]}
          ></DrawerItem>
        </Drawer.Section>
        <Drawer.Section style={{ flex: 1, marginLeft: 10 }}>
          <DrawerItem
            label="Sign Out"
            onPress={async () =>
              await logout()
                .then(() => {
                  alert("logged out");
                })
                .catch((error) => alert(error.message))
            }
          ></DrawerItem>
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  body: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
