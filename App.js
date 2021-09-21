import React, { useState } from "react";
import { View, Dimensions, AsyncStorage, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";

import CustomDrawerContent from "./src/CustomDrawerContent";

import LoginScreen from "./src/auth/LoginScreen";
import RegisterScreen from "./src/auth/RegisterScreen";

import HomeStack from "./src/tabs/HomeStack";
import SettingStack from "./src/tabs/settingsStack";

import NotificationScreen from "./src/tabs/NotificationScreen/NotificationScreen";

import store from "./src/redux/store/store";
import ConfigScreen from "./src/tabs/ConfigScreen/ConfigScreen";
import OrderStack from "./src/tabs/orderStack";
// if (!window.location) {
//   // App is running in simulator
//   window.navigator.userAgent = "ReactNative";
// }

// This must be below your `window.navigator` hack above
import io from "socket.io-client";
import { getNotifications } from "./src/redux/actions/notificationAction";

let socket = io("http://192.168.228.109:9001", {
  transports: ["websocket"],
  jsonp: false,
});

const navOptionHandler = () => ({
  headerShown: false,
});

const Tab = createBottomTabNavigator();
const NotificationStack = createStackNavigator();

const TabNavigator = () => {
  const dispatch = useDispatch();

  const notificationData = useSelector(
    (state) => state.notification.notification
  );
  const [notification, setNotifications] = useState(notificationData);

  socket.connect();

  socket.on("611a9f504f6430536a310ea1", (data) => {
    console.log(data.order, "=============================Socket");
    setNotifications(data.order);
  });

  React.useEffect(() => {
    dispatch(getNotifications(notification));
  }, [notification]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "MartOn") {
            iconName = focused
              ? require("./src/assets/Images/Iconicmark-coloured.png")
              : require("./src/assets/Images/Iconicmark-black.png");
            return (
              <Image
                style={{ width: 32, height: 20, marginRight: 10 }}
                source={iconName}
              />
            );
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Your Orders") {
            iconName = focused ? "truck-check" : "truck-check-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Notification") {
            iconName = focused ? "bell" : "bell-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#1baa43",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="MartOn" component={HomeStack} />
      <Tab.Screen name="Cart" component={SettingStack} />
      <Tab.Screen name="Your Orders" component={OrderStack} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MenuTab"
      drawerContent={(props) => CustomDrawerContent(props)}
      drawerStyle={{
        width: Dimensions.get("window").width,
      }}
    >
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default function App() {
  const StackApp = createStackNavigator();

  return (
    <PaperProvider>
      <Provider store={store()}>
        <NavigationContainer>
          <StackApp.Navigator initialRouteName={"Cart"}>
            <StackApp.Screen
              name="HomeApp"
              component={DrawerNavigator}
              options={navOptionHandler}
            />
            <StackApp.Screen
              name="Login"
              component={LoginScreen}
              options={navOptionHandler}
            />

            <StackApp.Screen
              name="ConfigScreen"
              component={ConfigScreen}
              options={navOptionHandler}
            />
            <StackApp.Screen
              name="Register"
              component={RegisterScreen}
              options={navOptionHandler}
            />
          </StackApp.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}
