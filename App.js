import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./src/auth/LoginScreen";
import  ForgotPasswordScreen from "./src/auth/ForgotPasswordScreen";
import RegisterScreen from "./src/auth/RegisterScreen";

import HomeStack from "./src/tabs/HomeStack";
import SettingStack from "./src/tabs/settingsStack";

import NotificationScreen from "./src/tabs/NotificationScreen/NotificationScreen";

import store from "./src/redux/store/store";
// import ConfigScreen from "./src/tabs/ConfigScreen/ConfigScreen";
import OrderStack from "./src/tabs/orderStack";
// if (!window.location) {
//   // App is running in simulator
//   window.navigator.userAgent = "ReactNative";
// }

// This must be below your `window.navigator` hack above
import io from "socket.io-client";
import { getNotifications } from "./src/redux/actions/notificationAction";
import EnterOtpScreen from "./src/auth/EnterOtpScreen";
import ResetPasswordScreen from "./src/auth/ResetPasswordScreen";

const navOptionHandler = () => ({
  headerShown: false,
});

const Tab = createBottomTabNavigator();
const NotificationStack = createStackNavigator();

const TabNavigator = () => {
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

const AppNavigation = () => {
  const StackApp = createStackNavigator();

  const dispatch = useDispatch();

  const notificationData = useSelector(
    (state) => state.notification.notification
  );
  const [notification, setNotifications] = useState(notificationData);

  // socket.connect();

  // socket.on("611a9f504f6430536a310ea1", (data) => {
  //   console.log(data.order, "=============================Socket");
  //   setNotifications(data.order);
  // });

  React.useEffect(() => {
    dispatch(getNotifications(notification));
  }, [notification]);
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName={"HomeApp"}>
        {/* <StackApp.Screen name="Loading" component={HomeApp} /> */}
        <StackApp.Screen
          name="HomeApp"
          component={TabNavigator}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="Login"
          component={LoginScreen}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="EnterOtp"
          component={EnterOtpScreen}
          options={navOptionHandler}
          />
        <StackApp.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="Register"
          component={RegisterScreen}
          options={navOptionHandler}
        />
        {/* <StackApp.Screen
        name="MenuTab"
        component={TabNavigator}
        options={navOptionHandler}
      /> */}
      </StackApp.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <PaperProvider>
      <Provider store={store()}>
        <AppNavigation />
      </Provider>
    </PaperProvider>
  );
}

// const SwitchNavigator = ({ navigation }) => {
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   tokenData();
  // }, [token]);

  // const tokenData = async () => {
  //   const newtoken = await AsyncStorage.getItem("token");
  //   setToken(newtoken);
  // };
  // useEffect(() => {
  //   console.log({ token });
  //   navigation.navigate(token ? "HomeApp" : "Login");
  // }, [token]);
  // console.log(token);
//   return (
//     <View style={styles.container}>
//       <Text>Loading...</Text>
//       <ActivityIndicator size="large" color="#e9446a"></ActivityIndicator>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
