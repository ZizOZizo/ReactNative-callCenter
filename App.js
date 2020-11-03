import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNav from "./app/navigation/AppNav";
import AuthNav from "./app/navigation/AuthNav";
import AuthContext from "./app/auth/context";

export default function App() {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user ? <AppNav /> : <AuthNav />}
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
