import React, { useContext, useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import AuthContext from "../Auth/context.js";
import AuthStorage from "../Auth/storage.js";
import getProfile from "../API/getProfile.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function accountScreen(props) {
  const { user, setUser } = useContext(AuthContext);
  const [profileName, setProfileName] = useState();
  const [profileNumber, setProfileNumber] = useState();

  const bringProfile = async () => {
    const result = await getProfile.getProfile(user);
    setProfileName(result.data.data[0].name);
    setProfileNumber(result.data.data[0].phone);
  };

  useEffect(() => {
    bringProfile();
  }, []);

  const handleLogout = () => {
    setUser(null);
    AuthStorage.removeUser();
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="account-circle"
        size={120}
        color="grey"
        style={{ padding: 20 }}
      />

      <View>
        <View style={styles.unit}>
          <Text style={styles.text}>الاسم: </Text>
          <Text style={styles.text}>{profileName}</Text>
        </View>
        <View style={styles.unit}>
          <Text style={styles.text}>رقم الهاتف: </Text>
          <Text style={styles.text}>{profileNumber}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.logout}>
          <Text style={{ fontSize: 20, color: "red", fontWeight: "bold" }}>
            الخروج من الحساب
          </Text>
        </View>
      </TouchableOpacity>
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
  logout: {
    margin: 5,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "aqua",
    elevation: 20,
    marginTop: 80,
  },
  unit: {
    flexDirection: "row-reverse",
    backgroundColor: "#cdd",
    borderRadius: 12,
    margin: 8,
    padding: 4,
  },
  text: {
    fontSize: 19,
    padding: 2,
  },
});
export default accountScreen;
