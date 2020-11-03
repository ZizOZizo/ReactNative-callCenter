import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Linking,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AppPicker from "../Components/AppPicker";
import AuthContext from "../auth/context";
import getItems from "../API/getItems";

const categories = [
  { label: "Furniture", value: 1 },
  { label: "Clothing", value: 2 },
  { label: "Cameras", value: 3 },
];

function homeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState();
  useEffect(() => {
    bringItems();
  });
  const bringItems = async () => {
    const result = await getItems.getItems(user.token);
    setItems(result.data.data);
  };

  const [category, setCategory] = useState(categories[0]);

  return (
    <View>
      <Text style={styles.title}>أهــلا {user.data.name}</Text>

      <AppPicker
        selectedItem={category}
        onSelectItem={(item) => setCategory(item)}
        items={categories}
        icon="apps"
        placeholder="Category"
      />

      <View style={styles.flatlist}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() =>
                navigation.navigate("ItemScreen", {
                  itemSend: item,
                })
              }
            >
              <View style={styles.item}>
                <View style={{ width: "30%" }}>
                  <Text style={styles.itemContent}>{item.order_no}</Text>
                  <Text style={styles.itemContent}>{item.address}</Text>
                  <Text style={styles.itemContent}>{item.money_status}</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    alignContent: "center",
                    textAlign: "center",
                    width: "30%",
                  }}
                >
                  <Text style={styles.itemContent}>{item.store_name}</Text>
                  <Text style={styles.itemContent}>{item.client_name}</Text>
                  <Text style={styles.itemContent}>{item.status_name}</Text>
                </View>

                <View
                  style={{
                    alignItems: "flex-start",
                    alignContent: "flex-start",
                    width: "30%",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL("tel:" + item.customer_phone.toString())
                    }
                  >
                    <Feather
                      style={{
                        backgroundColor: "#dc9696",
                        borderRadius: 50,
                        padding: 10,
                      }}
                      name="phone-call"
                      size={45}
                      color="black"
                      backgroundColor="blue"
                      borderRadius={50}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 10,
  },
  itemContent: {
    fontSize: 18,
    margin: 5,
  },
  flatlist: {
    flexDirection: "row-reverse",
    margin: 10,
    padding: 10,
  },
  item: {
    minWidth: 355,
    maxWidth: 355,
    fontSize: 18,
    backgroundColor: "#dddddd",
    //margin: 8,
    marginBottom: 10,
    borderRadius: 30,
    flexDirection: "row-reverse",
    //alignSelf: "stretch",
    //width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: "red",
  },
});

export default homeScreen;
