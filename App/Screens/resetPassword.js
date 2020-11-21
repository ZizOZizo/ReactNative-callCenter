import React, { useContext, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import AuthContext from "../Auth/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import resetPassword from "../API/resetPassword";

function accountScreen(props) {
  const { user, setUser } = useContext(AuthContext);
  const route = useRoute();
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const password1Ref = useRef(null);
  const password2Ref = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  const handleChangeProfile = () => {
    if ((pass1 && pass2 === "") || (pass1 === "" && pass2)) {
      alert("يجب ادخال الرمز في كلا الحقلين");
    } else {
      if (pass1 != pass2) {
        alert("رمز الدخول غير متطابق");
        password1Ref.current.clear();
        password2Ref.current.clear();
      } else {
        const result = resetPassword.resetPassword(user, name, phone, pass1);
        password1Ref.current.clear();
        password2Ref.current.clear();
        nameRef.current.clear();
        phoneRef.current.clear();
        console.log(result);
        if (true) {
          //alert(result);
        } else {
          setUser(null);
          AuthStorage.removeUser();
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="shield-key-outline"
        size={80}
        color="grey"
        style={{ padding: 20 }}
      />

      <View style={styles.block}>
        <Text style={styles.title}>تغيير رمز الدخول</Text>
        <TextInput
          ref={password1Ref}
          placeholder=" ادخل الرمز الجديد "
          clearButtonMode="always"
          style={styles.textField}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            if (text) setPass1(text);
          }}
        />
        <TextInput
          ref={password2Ref}
          placeholder=" اعد ادخال الرمز الجديد "
          clearButtonMode="always"
          style={styles.textField}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            if (text) setPass2(text);
          }}
        />
      </View>

      <View style={styles.block}>
        <Text style={styles.title}>تغيير اسم الحساب </Text>
        <TextInput
          ref={nameRef}
          placeholder=" ادخل الاسم الجديد  "
          clearButtonMode="always"
          style={styles.textField}
          secureTextEntry={false}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            if (text) setName(text);
          }}
        />
      </View>

      <View style={styles.block}>
        <Text style={styles.title}>تغيير رقم الهاتف </Text>
        <TextInput
          ref={phoneRef}
          placeholder=" ادخل رقم الهاتف الجديد  "
          clearButtonMode="always"
          style={styles.textField}
          secureTextEntry={false}
          autoCapitalize="none"
          maxLength={11}
          keyboardType="decimal-pad"
          autoCorrect={false}
          onChangeText={(text) => {
            if (text) setPhone(text);
          }}
        />
      </View>

      <Button onPress={handleChangeProfile} title={"تطبيق التغيرات"} />
    </View>
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
  block: { margin: 5, width: "90%", backgroundColor: "#abb", padding: 3 },
  title: { fontSize: 18, fontWeight: "bold" },
  textField: {
    //height: 60,
    //width: "80%",
    backgroundColor: "#ddd",
    borderRadius: 5,
    margin: 6,
    height: 54,
    textAlign: "right",
  },
});
export default accountScreen;
