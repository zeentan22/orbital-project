"use strict";
import React, { View, Text, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Screenc from "../Screens/Screen_C";
import Schedule from "../Screens/Schedule";
import FlashCard from "../Screens/FlashCard";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Screenc}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/home.png")}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Set Schedule"
        component={Schedule}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/schedule.png")}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Flash Card"
        component={FlashCard}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../../assets/flash-cards.png")}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
