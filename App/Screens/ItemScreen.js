import { useRoute } from "@react-navigation/native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

function ItemScreen(props) {
  const route = useRoute();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>تفاصيل الطلبية</Text>
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
