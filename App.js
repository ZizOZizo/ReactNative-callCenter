import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNav from "./App/Navigation/AppNav.js";
import AuthNav from "./App/Navigation/AuthNav.js";
import AuthContext from "./App/Auth/context.js";
import AuthStorage from "./App/Auth/storage.js";

export default function App() {
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const u = await AuthStorage.getUser();
    if (!u) return;
    setUser(u);
  };

  useEffect(() => {
    restoreUser();
  }, []);

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
