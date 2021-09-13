import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrderScreen from "./OrderScreen";
const StackSetting = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const OrderStack = () => {
  return (
    <StackSetting.Navigator>
      <StackSetting.Screen
        name="Order"
        component={OrderScreen}
        options={navOptionHandler}
      />
    </StackSetting.Navigator>
  );
};

export default OrderStack;
