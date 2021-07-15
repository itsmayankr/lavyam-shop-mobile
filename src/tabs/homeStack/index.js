import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import CardItemDetails from "./CardItemDetails";
import ProductScreen from "../ProductScreen/ProductScreen";

const StackHome = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const HomeStack = () => {
  return (
    <StackHome.Navigator>
      <StackHome.Screen
        name="Home"
        component={ProductScreen}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="CardDetails"
        component={CardItemDetails}
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
