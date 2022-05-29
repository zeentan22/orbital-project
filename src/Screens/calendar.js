"use strict";
import React, { userState, useState, useRef, useEffect } from "react";
// import type Node from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {addDoc, collection, doc, setDoc} from "firebase/firestore"
import {
  StatusBar,
  Alert,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
  ScrollView,
  RefreshControl,
  FlatList,
  SectionList,
  Pressable,
  TextInput,
  ToastAndroid,
  Modal,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import MashButton from "../Components/CustomButton";

export default function SetCalendar ({navigation}) {
    return (
        <View style = {styles.body}>
            <Text style = {styles.text}>
                Customise your Flashcards now!
            </Text>
        </View>
    )
}



const styles = StyleSheet.create({
    text: {
      fontSize: 40,
    },
    body: {
      flex: 1,
    },
  });