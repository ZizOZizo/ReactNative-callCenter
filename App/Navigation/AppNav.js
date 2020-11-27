import React from "react";
import "react-native-gesture-handler";
import HomeScreen from "../Screens/homeScreen";
import ItemScreen from "../Screens/ItemScreen";
import AccountScreen from "../Screens/accountScreen";
import ResetPasswordScreen from "../Screens/resetPassword";
import ChatScreen from "../Screens/chatScreen";
import ChatListScreen from "../Screens/chatListScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Nav() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      keyboardHidesTabBar: true,
      activeBackgroundColor: "tomato",
      activeTintColor: "white",
      inactiveBackgroundColor: "#eee",
      inactiveTintColor: "black",
    }}
  >
    <Tab.Screen
      name="AccountScreen"
      component={AccountStackkNavigator}
      options={{
        keyboardHidesTabBar: true,
        title: "الحساب",
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Home"
      component={MainStackNavigator}
      options={{
        keyboardHidesTabBar: true,
        title: "الـرئـيـسـيـة",
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="home" size={size} color="blue" />
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={ChatStackkNavigator}
      options={{
        title: "المحادثات",
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="chat" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainStack = createStackNavigator();
const MainStackNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="ItemScreen"
      component={ItemScreen}
      options={{ title: "تفاصيل البضاعة" }}
    />
  </MainStack.Navigator>
);

const AccountStack = createStackNavigator();
const AccountStackkNavigator = () => (
  <AccountStack.Navigator>
    <AccountStack.Screen
      name="AccountScreen"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <AccountStack.Screen
      name="ResetPasswordScreen"
      component={ResetPasswordScreen}
      options={{ headerShown: false }}
    />
  </AccountStack.Navigator>
);

const ChatStack = createStackNavigator();
const ChatStackkNavigator = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen
      name="ChatListScreen"
      component={ChatListScreen}
      options={{ headerShown: false }}
    />
    <ChatStack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{ headerShown: false }}
    />
  </ChatStack.Navigator>
);
