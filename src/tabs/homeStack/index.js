import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import HomeScreenDetails from "./HomeScreenDetails";

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
        name="HomeDetails"
        component={HomeScreenDetails}
        options={navOptionHandler}
      />
    </StackHome.Navigator>
  );
};

export default HomeStack;
