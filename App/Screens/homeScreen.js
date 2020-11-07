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
import AuthContext from "../Auth/context.js";
import getItems from "../API/getItems.js";
import getStatuses from "../API/getStatuse.js";
import getCities from "../API/getCities.js";

/*
const statusCategories = [
  { label: "الكل", value: "" },
  { label: "في الطريق", value: "onway" },
  { label: "مستلمة", value: "recived" },
  { label: "مؤجلة", value: "posponded" },
  { label: "راجع", value: "returned" },
  { label: "في المخزن", value: "instorage" },
];
*/

function homeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState();
  const [page, setPage] = useState(1);
  const [statusCategories, setStatusCategories] = useState(); //all status catogories
  const [statusCategory, setStatusCategory] = useState(""); //the selected status

  const [cityCategories, setCityCategories] = useState(); //all status catogories
  const [cityCategory, setCityCategory] = useState(""); //the selected status

  const [testVariable, setTestVariable] = useState();

  useEffect(() => {
    bringStatuses();
    bringCities();
  }, []);

  useEffect(() => {
    bringItems();
  });

  const bringStatuses = async () => {
    const result = await getStatuses.getStatuses(user.token);
    setStatusCategories(result.data.data);
  };

  const bringCities = async () => {
    const result = await getCities.getCities(user.token);
    setCityCategories(result.data.data);
  };

  const bringItems = async () => {
    const result = await getItems.getItems(
      user.token,
      page,
      statusCategory,
      cityCategory
    );
    setItems(result.data.data);
    console.log(result.data.data);
  };

  return (
    <View>
      <Text style={styles.title}>أهــلا {user.data.name}</Text>

      <AppPicker
        selectedItem={statusCategory}
        onSelectItem={(item) => {
          setStatusCategory(item);
          bringItems();
        }}
        items={statusCategories}
        icon="apps"
        placeholder="الحالة"
      />

      <AppPicker
        selectedItem={cityCategory}
        onSelectItem={(item) => {
          setCityCategory(item);
          bringItems();
          console.log("Get cities ");
        }}
        items={cityCategories}
        icon="apps"
        placeholder="المحافظة"
      />

      <View style={styles.flatlist}>
        <FlatList
          data={items}
          //onEndReached={}
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
