import React, { useState, useContext, useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Linking,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppPicker from "../Components/AppPicker.js";
import AuthContext from "../Auth/context.js";
import getItems from "../API/getItems.js";
import getStatuses from "../API/getStatuse.js";
import getCities from "../API/getCities.js";

const enquiryCategories = [
  { label: "لم يتم الاستعلام", value: 1 },
  { label: "تم الاستعلام", value: 2 },
];

function homeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState();
  const [page, setPage] = useState(1);
  const [statusCategories, setStatusCategories] = useState(); //all status catogories
  const [statusCategory, setStatusCategory] = useState(""); //the selected status

  const [cityCategories, setCityCategories] = useState(); //all status catogories
  const [cityCategory, setCityCategory] = useState(""); //the selected status

  const [isDateFromPickerVisible, setDateFromPickerVisibility] = useState(
    false
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isDateToPickerVisible, setDateToPickerVisibility] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [enquiryCategory, setEnquiryCategory] = useState("");

  const [loadingItems, setLoadingItems] = useState(true);
  const [viewedItem, setViewedItem] = useState();

  const [testVariable, setTestVariable] = useState();

  useEffect(() => {
    bringStatuses();
    bringCities();
    bringItems();
    //console.log(statusCategories);
  }, []);

  useEffect(() => {
    setPage(1);
    //bringItems();
  }, [statusCategory]);

  useEffect(() => {
    setPage(1);
    //bringItems();
  }, [cityCategory]);

  useEffect(() => {
    setPage(1);
    //bringItems();
  }, [enquiryCategory]);

  useEffect(() => {
    bringItems();
  }, [page]);

  const bringStatuses = async () => {
    const result = await getStatuses.getStatuses(user);
    setStatusCategories(result.data.data);
  };

  const bringCities = async () => {
    const result = await getCities.getCities(user);
    setCityCategories(result.data.data);
  };

  const bringItems = async () => {
    setLoadingItems(true);
    const result = await getItems.getItems(
      user,
      page,
      statusCategory,
      cityCategory,
      dateFrom,
      dateTo,
      searchText,
      enquiryCategory
    );
    if (result.data.data) {
      if (page == 1) {
        setItems(result.data.data);
        //setViewedItem(result.data.data[1]);
      } else {
        let itms = [...items];
        result.data.data.forEach((element) => {
          itms.push(element);
        });
        setItems(itms);

        //setItems(...items, ...result.data.data);

        /*var itm = items;
        for (var i = 0; i < result.data.data.length; i++) {
          itm.push(result.data.data[i]);
        }
        //console.log(itm);
        setItems(itm);
        */
      }
    }
    setLoadingItems(false);
    //console.log(items);
  };
  const handleDateFromConfirm = (date) => {
    var dt = new Date(date);
    setDateFrom(dt.toLocaleDateString());
    hideDatePicker();
  };
  const handleDateToConfirm = (date) => {
    var dt = new Date(date);
    setDateTo(dt.toLocaleDateString());
    hideDatePicker();
  };
  const showDateFromPicker = () => {
    setDateFromPickerVisibility(true);
  };
  const showDateToPicker = () => {
    setDateToPickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDateFromPickerVisibility(false);
    setDateToPickerVisibility(false);
  };

  const flatlistEndReached = () => {
    //setViewedItem(items[items.length - 1]);
    setPage(page + 1);
  };

  //scrollToIndex = () => {};

  return (
    <View style={{ marginTop: 45 }}>
      <View>
        <View style={styles.searchView}>
          <TextInput
            onChangeText={(text) => setSearchText(text)}
            placeholder="   ابحث عن رقم الوصل او رقم الزبون او سبب الراجع"
            clearButtonMode="always"
            style={{
              height: 60,
              width: "80%",
              backgroundColor: "#ddd",
              borderRadius: 15,
              marginLeft: 3,
              marginRight: 3,
            }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Button
              title={"ابــحــث"}
              onPress={() => {
                setPage(1);
                bringItems();
              }}
              color="orange"
              style={{}}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row-reverse" }}>
          <AppPicker
            selectedItem={statusCategory}
            onSelectItem={(item) => setStatusCategory(item)}
            items={statusCategories}
            icon="apps"
            placeholder="الحالة"
          />

          <AppPicker
            selectedItem={cityCategory}
            onSelectItem={(item) => setCityCategory(item)}
            items={cityCategories}
            icon="apps"
            placeholder="المحافظة"
          />

          <AppPicker
            selectedItem={enquiryCategory}
            onSelectItem={(item) => setEnquiryCategory(item)}
            items={enquiryCategories}
            icon="apps"
            placeholder="الاستعلام"
          />
        </View>

        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Button
            title={" التاريخ: من " + dateFrom}
            onPress={showDateFromPicker}
            style={styles.datePicker}
          />
          <DateTimePickerModal
            isVisible={isDateFromPickerVisible}
            mode="date"
            onConfirm={handleDateFromConfirm}
            onCancel={hideDatePicker}
          />
          <Text> </Text>
          <Button
            title={" التاريخ: الى " + dateTo}
            onPress={showDateToPicker}
            style={styles.datePicker}
          />
          <DateTimePickerModal
            isVisible={isDateToPickerVisible}
            mode="date"
            onConfirm={handleDateToConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.flatlist}>
          <FlatList
            data={items}
            onEndReached={() => flatlistEndReached()}
            contentContainerStyle={{ paddingBottom: 20 }}
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
                    <Text style={(styles.itemContent, { textAlign: "right" })}>
                      {item.order_no}
                    </Text>
                    <Text style={styles.itemContent}>{item.city}</Text>
                    <Text style={styles.itemContent}>{item.town}</Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      alignContent: "center",
                      textAlign: "center",
                      //width: "30%",
                    }}
                  >
                    <Text style={styles.itemContent}>{item.client_name}</Text>
                    <Text style={styles.itemContent}>{item.money_status}</Text>
                    <Text style={styles.itemContent}>{item.status_name}</Text>
                  </View>

                  <View
                    style={{
                      alignItems: "flex-start",
                      alignContent: "flex-start",
                      //left: 60,
                      //width: 10,
                      flex: 1,
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
                          width: 70,
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

        {loadingItems && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.activityIndicator}
          />
        )}
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
    margin: 3,
  },
  flatlist: {
    flexDirection: "row-reverse",
    margin: 7,
    padding: 7,
    height: 470,
    //marginBottom: 600,
    //flex: 0,
  },
  item: {
    //minWidth: 355,
    //maxWidth: 355,
    fontSize: 18,
    backgroundColor: "#dddddd",
    margin: 6,
    //marginBottom: 10,
    borderRadius: 30,
    flexDirection: "row-reverse",
    //alignSelf: "stretch",
    //width: "100%",
    padding: 6,
    paddingLeft: 10,
    borderWidth: 0.4,
    borderColor: "red",
  },

  searchView: { flexDirection: "row-reverse", padding: 4, width: "100%" },

  datePicker: { width: "50%", borderRadius: 50, margin: 6, padding: 6 },
  activityIndicator: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //height: 180,
    //width: 100,
  },
});

export default homeScreen;
