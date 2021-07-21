import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CardItemDetails from "./CardItemDetails";
import HomeScreen from "../HomeScreen/HomeScreen";
import DetailScreen from "../DetailScreen/DetailScreen";

const StackHome = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const HomeStack = () => {
  return (
    <StackHome.Navigator>
      <StackHome.Screen
        name="Home"
        component={HomeScreen}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="Detail"
        component={DetailScreen}
        options={() => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: true,
          headerTransparent: true,
          headerTintColor: "#fff",
        })}
      />
    </StackHome.Navigator>
  );
};

export default HomeStack;
