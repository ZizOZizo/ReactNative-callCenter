import React from "react";
import "react-native-gesture-handler";
import LoginScreen from "../Screens/loginScreen";
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
      name="LoginScreen"
      component={LoginScreen}
      options={{ title: "تسجيل الدخول" }}
    />
  </MainStack.Navigator>
);
