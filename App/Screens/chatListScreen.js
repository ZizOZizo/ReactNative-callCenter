import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import getAllChat from "../API/getAllChat";
import AuthContext from "../Auth/context";

function chatListScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [chatList, setChatList] = useState();
  const [page, setPage] = useState(1);
  const [loadingChats, setLoadingChats] = useState(false);

  useEffect(() => {
    bringAllChat();
  }, [page]);

  const bringAllChat = async () => {
    const result = await getAllChat.getAllChat(user, page);
    if (result.data.data) {
      if (page == 1) {
        setChatList(result.data.data);
      } else {
        let itms = [...chatList];
        result.data.data.forEach((element) => {
          itms.push(element);
        });
        setChatList(itms);
      }
    }
  };

  const flatlistEndReached = () => {
    //console.warn("Reach to end");
    setPage(page + 1);
    //bringAllChat();
  };

  useEffect(() => {
    bringAllChat();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "blue" }}>
        قائمة الرسائل
      </Text>

      <View style={{ flexDirection: "column" }}>
        {!chatList && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.activityIndicator}
          />
        )}
        {chatList && (
          <View style={styles.flatlist}>
            <FlatList
              data={chatList}
              onEndReached={() => flatlistEndReached()}
              renderItem={({ item }) => (
                <View style={styles.list}>
                  <TouchableHighlight
                    onPress={() =>
                      navigation.navigate("ChatScreen", {
                        itemSendChat: item,
                      })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row-reverse",
                        margin: 3,
                        width: "93%",
                        flex: 0,
                      }}
                    >
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                          {"رقم الطلبية: " + item.order_no}
                        </Text>
                      </View>
                      <View style={{ width: "96%", flexGrow: 1, fontSize: 17 }}>
                        <Text numberOfLines={1}>{" : " + item.message}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    //borderColor: "red",
    // borderWidth: 5,
  },
  flatlist: {
    //flexDirection: "row-reverse",
    alignItems: "flex-start",
    margin: 7,
    padding: 7,
    height: 620,
    //marginBottom: 600,
    //flex: 0,
    //borderWidth: 3,
  },
  list: {
    margin: 5,
    padding: 3,
    borderRadius: 10,
    backgroundColor: "#ccc",
    marginRight: 120,
  },
  activityIndicator: {
    alignSelf: "center",
  },
});

export default chatListScreen;
