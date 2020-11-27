import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Alert,
  TouchableHighlight,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import getChat from "../API/getChat";
import getProfile from "../API/getProfile";
import AuthContext from "../Auth/context";
import sendMessage from "../API/sendMessage";
import { FontAwesome } from "@expo/vector-icons";

function chatScreen({ navigation }) {
  const route = useRoute();
  const { user, setUser } = useContext(AuthContext);
  const [messages, setMessages] = useState();
  const [profile, setProfile] = useState();
  const [profileName, setProfileName] = useState();
  const messageRef = useRef(null);
  const [textMessage, setTextMessage] = useState();

  const brinChat = async () => {
    const result = await getChat.getChat(user, route.params.itemSendChat.id);
    //console.log(result.data.data);
    setMessages(result.data.data);
  };

  const brinProfile = async () => {
    const result = await getProfile.getProfile(user);
    //console.log(result.data.data[0].id);
    setProfile(result.data.data[0].id);
    setProfileName(result.data.data[0].name);
  };

  const sendNewMessage = async () => {
    if (textMessage != "" && textMessage != null) {
      const result = await sendMessage.sendMessage(
        user,
        route.params.itemSendChat.id,
        textMessage
      );
      //console.log(result.data.code);
      if (result.data.code == 200) {
        brinChat();
        messageRef.current.clear();
      } else {
        Alert(" حصل خلل في ارسال الرسالة " + result.data.code);
      }
    }
  };

  useEffect(() => {
    brinChat();
    brinProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <TouchableHighlight
          onPress={() =>
            navigation.navigate("ItemScreen", {
              itemSendChat: route.params.itemSendChat,
            })
          }
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              margin: 12,
            }}
          >
            {"رقم الطلبية: " + route.params.itemSendChat.order_no}
          </Text>
        </TouchableHighlight>
      </View>
      <View style={{ width: "98%", padding: 6, flex: 1 }}>
        <FlatList
          inverted={-1}
          data={messages}
          renderItem={({ item }) => (
            <View style={styles.chat}>
              <View style={styles.client}>
                {item.is_client == 1 && (
                  <Text style={styles.text}>
                    {"العميل (" + item.client_name + "): " + item.message}
                  </Text>
                )}
              </View>

              <View style={styles.callCenter}>
                {item.is_client == 0 && item.from_id == profile && (
                  <Text style={styles.text}>
                    {profileName + ":  " + item.message}
                  </Text>
                )}
              </View>

              <View style={styles.staff}>
                {item.is_client == 0 && item.from_id != profile && (
                  <Text style={styles.text}>
                    {item.role_name +
                      "(" +
                      item.staff_name +
                      ")" +
                      ": " +
                      item.message}
                  </Text>
                )}
              </View>
            </View>
          )}
        ></FlatList>
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            height: 60,
          }}
        >
          <TouchableHighlight onPress={() => sendNewMessage()}>
            <FontAwesome
              name="send"
              size={40}
              color="black"
              style={{ transform: [{ rotateY: "180deg" }] }}
            />
          </TouchableHighlight>
        </View>

        <TextInput
          placeholder="اكتب الرسالة هنا"
          clearButtonMode="always"
          //autoFocus={true}
          ref={messageRef}
          onChangeText={(text) => setTextMessage(text)}
          style={{
            height: 50,
            width: "80%",
            backgroundColor: "#ddd",
            borderRadius: 15,
            margin: 8,
            //marginBottom: 45,
          }}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 110,
    //borderWidth: 3,
    height: "90%",
    //borderColor: "red",
  },
  chat: { flexDirection: "column" },
  client: {
    backgroundColor: "#bbe",
    margin: 1,
    borderRadius: 5,
    alignSelf: "flex-start",
    width: "75%",
  },
  staff: {
    backgroundColor: "#7eb",
    margin: 1,
    borderRadius: 5,
    alignSelf: "flex-start",
    width: "75%",
  },
  callCenter: {
    backgroundColor: "#beb",
    margin: 1,
    borderRadius: 5,
    //flexDirection: "row-reverse",
    alignSelf: "flex-end",
    width: "75%",
  },
  text: { fontSize: 18 },
});

export default chatScreen;
