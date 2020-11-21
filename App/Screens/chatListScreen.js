import React from "react";
import { Text, View, StyleSheet } from "react-native";

function chatListScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
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
});

export default chatListScreen;
