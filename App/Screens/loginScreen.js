import React, { useState, useRef, useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AuthContext from "../Auth/context.js";
import loginApi from "../API/loginApi.js";
import AuthStorage from "../Auth/storage.js";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const { user, setUser } = useContext(AuthContext);

  const send = async () => {
    const result = await loginApi.loginApi(username, password);
    //console.log(result);
    if (result.data != null) {
      if (result.data.message != 1) {
        //WRONG USERNAME AND PASSWORD
        alert(result.data.message);
        //console.log(result.data);
        usernameRef.current.clear();
        passwordRef.current.clear();
      } else {
        // REDIRECT TO THE APPLICATION
        AuthStorage.storeUser(result.data.token);
        setUser(result.data.token);
        //AuthStorage.storeUser(result.data);
      }
    } else {
      alert("مشكلة في اتصال الانترنت!");
      usernameRef.current.clear();
      passwordRef.current.clear();
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>الشركة للتوصيل</Text>
        </View>
        <View style={styles.containerUserName}>
          <TextInput
            ref={usernameRef}
            placeholder="رقم الهاتف"
            placeholderTextColor="gray"
            style={styles.textInput}
            maxLength={11}
            keyboardType="decimal-pad"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setUsername(text)}
          />
          <Entypo style={styles.Icon} name="user" size={50} color="black" />
        </View>

        <View style={styles.containerPassword}>
          <TextInput
            ref={passwordRef}
            placeholder="كلمه المرور"
            placeholderTextColor="gray"
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setPassword(text)}
          />
          <Entypo name="key" size={50} color="black" />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={send}>
          <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  containerSignIn: {
    height: 60,
    width: "80%",
    borderRadius: 50,
  },
  containerUserName: {
    height: 60,
    width: "80%",
    flexDirection: "row",
    backgroundColor: "#eee",
    marginBottom: 10,
  },
  containerPassword: {
    height: 60,
    width: "80%",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },

  loginButton: {
    width: "80%",
    backgroundColor: "blue",
    fontSize: 20,
    borderRadius: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#ccc",
    fontSize: 30,
  },
  Icon: {},
  textInput: {
    backgroundColor: "transparent",
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    color: "black",
    direction: "rtl",
  },
  title: {
    color: "#aaaaaa",
    fontSize: 34,
    paddingVertical: 23,
    fontWeight: "bold",
  },
});
