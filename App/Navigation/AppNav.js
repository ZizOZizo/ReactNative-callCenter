import React from "react";
import "react-native-gesture-handler";
import HomeScreen from "../Screens/homeScreen";
import ItemScreen from "../Screens/ItemScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export default function Nav() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

const MainStack = createStackNavigator();
const MainStackNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ title: "الصفحة الرئيسية " }}
    />
    <MainStack.Screen
      name="ItemScreen"
      component={ItemScreen}
      options={{ title: "تفاصيل البضاعة" }}
    />
  </MainStack.Navigator>
);
