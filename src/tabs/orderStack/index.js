import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrderScreen from "./OrderScreen";
import { useDispatch } from "react-redux";
import { getOrder } from "../../redux/actions/orderAction";
const StackSetting = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const OrderStack = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
  }, []);

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
