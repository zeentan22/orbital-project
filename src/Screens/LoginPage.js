import React, { useState, useEffect } from "react";
import { login } from "../../firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import MashButton from "../Components/CustomButton";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phEmail, setPHEmail] = useState();
  const [phPassword, setPHPassword] = useState();
  const [phEmailC, setPHEmailC] = useState();
  const [phPasswordC, setPHPasswordC] = useState();
  const platform = Platform.OS === "ios";

  useEffect(() => {
    setEmail("");
    setPassword("");
    setPHEmail("Enter your Email");
    setPHPassword("Enter your Password");
    setPHEmailC("grey");
    setPHPasswordC("grey");
  }, []);
  const onPressHandler = () => {
    navigation.replace("Createpage"); //used for when we click on Create Account Button, go to that page
  };

  async function handleLogin() {
    if (email == "" || password == "") {
      if (password == "") {
        setPHPassword("Password: Input required !");
        setPHPasswordC("red");
      }
      if (email == "") {
        setPHEmail("Email: Input required !");
        setPHEmailC("red");
      }
    } else {
      navigation.navigate("Loading page");
      setTimeout(async () => {
        try {
          await login(email.trim(), password.trim());
          // console.log("logged in!");
          alert("Welcome back!");
        } catch {
          alert("Invalid Email/Password!");
          navigation.goBack();
        }
      }, 1500);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.body}>
          <Image
            resizeMode="cover"
            source={{
              uri: "https://i.pinimg.com/564x/3c/3a/35/3c3a357172fb7a9f153bfae96c2d5e17.jpg",
            }}
            style={StyleSheet.absoluteFillObject}
            blurRadius={60}
          />
          <View style={styles.body1}>
            <Image
              style={styles.image}
              resizeMode="stretch"
              source={require("../../assets/!Procrastinate_Logo.png")}
            />
            <Text style={styles.textintro}>Welcome !</Text>
          </View>
          <TextInput
            style={[
              {
                marginBottom: 0,
                borderBottomWidth: 0.5,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
              styles.input,
            ]}
            placeholder={phEmail}
            onChangeText={(text) => setEmail(text)} //connect to backend to login by checking with database
            placeholderTextColor={phEmailC}
          />
          <TextInput
            style={[
              {
                marginTop: 0,
                borderTopWidth: 0.5,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              },
              styles.input,
            ]}
            placeholder={phPassword}
            onChangeText={(text) => setPassword(text)} //connect to backend to login by checking with database
            secureTextEntry={platform || (password !== "" && platform !== true)}
            placeholderTextColor={phPasswordC}
          />
          <View
            style={{
              flex: 0.1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pressable
              style={({ pressed }) => [
                { flex: 1 },
                { backgroundColor: pressed ? "#b0c4de" : null },
              ]}
              onPress={() => {
                navigation.replace("Forget Password Page");
              }}
            >
              <Text style={{ fontSize: 15, borderBottomWidth: 0.5 }}>
                Forget Password ?
              </Text>
            </Pressable>
          </View>
          <MashButton //havent create the login button function yet
            title="LOGIN"
            color="red"
            textStyle={{
              color: "white",
              fontWeight: "bold",
              fontStyle: "normal",
            }}
            style={{ borderWidth: 1, borderColor: "red", marginBottom: 20 }}
            onPress={handleLogin}
          />
          <View
            style={{
              flex: 1 / 3,
              alignItems: "center",
              marginTop: 0,
              width: "94%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                height: 50,
              }}
            >
              <View style={styles.lineStyle} />
              <View
                style={{
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.textintro2}>New User?</Text>
              </View>
              <View style={styles.lineStyle} />
            </View>

            <MashButton
              style={{ borderWidth: 1, width: "100%" }}
              textStyle={{ fontWeight: "bold", fontStyle: "normal" }}
              title="GET STARTED"
              onPress={onPressHandler}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollbody: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    flex: 1,
  },
  body: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  body1: {
    flex: 0.5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 40,
    fontStyle: "italic",
    alignSelf: "center",
  },
  textintro: {
    fontSize: 40,
    alignSelf: "center",
    marginBottom: 20,
  },

  textintro2: {
    fontSize: 17,
    alignSelf: "center",
    fontStyle: "normal",
    color: "black",
    textAlign: "center",
  },
  input: {
    margin: 5,
    backgroundColor: "white",
    borderWidth: 1,
    alignSelf: "center",
    width: "94%",
    height: 50,
    borderColor: "#555",
    borderRadius: 5,
    textAlign: "center",
    margin: 15,
    paddingHorizontal: 10,
  },
  button: {
    height: 50,
    width: "100%",
    justifyContent: "center",
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: "center",
    justifyContent: "center",
  },
  lineStyle: {
    flex: 1,
    height: 1.5,
    backgroundColor: "black",
    width: "35%",
  },
});
