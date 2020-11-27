import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
  Alert,
} from "react-native";
import postStatusEnquiry from "../API/postStatusEnquiry";
import AuthContext from "../Auth/context.js";

function ItemScreen({ navigation }) {
  const route = useRoute();
  const [statusEnquiry, setStatusEnquiry] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setStatusEnquiry(route.params.itemSend.callcenter_id);
    //console.log(route.params.itemSend);
  }, []);

  const changeStatusEnquiry = async () => {
    const result = await postStatusEnquiry.postStatusEnquiry(
      user,
      route.params.itemSend.id
    );
    //console.log(result);
    if (result.status != 200) {
      Alert("هنالك مشكلة في الاتصال");
    } else {
      setStatusEnquiry(1);
    }
  };

  const goToChat = () => {
    navigation.navigate("ChatScreen", { itemSendChat: route.params.itemSend });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.part1}>
          <View style={styles.infoBit}>
            <Text style={styles.text1}>رقم الطلبية</Text>
            <Text style={styles.text2}>{route.params.itemSend.order_no}</Text>
          </View>

          <View style={styles.infoBit}>
            <Text style={styles.text1}>رقم الزبون</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "tel:" + route.params.itemSend.customer_phone.toString()
                )
              }
            >
              <Text style={[styles.text2, styles.phoneNumber]}>
                {route.params.itemSend.customer_phone}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBit}>
            <Text style={styles.text1}>عنوان الزبون</Text>
            <Text style={styles.text2}>{route.params.itemSend.address}</Text>
          </View>

          <View style={styles.infoBit}>
            <Text style={styles.text1}>تاريخ الادخال</Text>
            <Text style={styles.text2}>{route.params.itemSend.date}</Text>
          </View>

          <View style={styles.infoBit}>
            <Text style={styles.text1}>السعر</Text>
            <Text style={styles.text2}>{route.params.itemSend.price}</Text>
          </View>

          <View style={styles.infoBit}>
            <Text style={styles.text1}>اسم العميل</Text>
            <Text style={styles.text2}>
              {route.params.itemSend.client_name}
            </Text>
          </View>

          <View style={styles.infoBit}>
            <Text style={styles.text1}>رقم العميل</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "tel:" + route.params.itemSend.client_phone.toString()
                )
              }
            >
              <Text style={[styles.text2, styles.phoneNumber]}>
                {route.params.itemSend.client_phone}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBit}>
            <Text style={styles.text1}>حالة الطلبية</Text>
            <Text style={styles.text2}>
              {route.params.itemSend.status_name}
            </Text>
          </View>

          <View style={styles.infoBit}>
            <Text style={styles.text1}>الحساب</Text>
            <Text style={styles.text2}>
              {route.params.itemSend.money_status}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          {statusEnquiry == 0 && (
            <View style={styles.part2}>
              <TouchableOpacity onPress={() => changeStatusEnquiry()}>
                <AntDesign name="checkcircle" size={60} color="green" />
                <Text style={{ fontSize: 20 }}>تم التحاسب</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.part2}>
            <TouchableOpacity onPress={() => goToChat()}>
              <AntDesign name="message1" size={60} color="grey" />
              <Text style={{ fontSize: 20 }}>الرسالة</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "blue",
  },
  container: { top: 40 },
  part1: { backgroundColor: "#ddd", borderRadius: 30, margin: 2 },
  part2: {
    flexDirection: "row-reverse",
    padding: 15,
    alignContent: "center",
    justifyContent: "center",
  },
  infoBit: { flexDirection: "row-reverse", margin: "3%" },
  text1: {
    fontSize: 20,
    color: "#755",
    marginLeft: "5%",
    fontWeight: "bold",
  },
  text2: { fontSize: 20 },
  phoneNumber: { color: "blue", textDecorationLine: "underline" },
  statusList: { margin: 12, marginTop: 30 },
  statusBit: { flexDirection: "row-reverse" },
  statusIcon: { backgroundColor: "green", padding: 6, borderRadius: 60 },
  statusDetails: {
    backgroundColor: "#ddd",
    padding: 15,
    marginRight: 15,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f77",
  },
});

export default ItemScreen;
