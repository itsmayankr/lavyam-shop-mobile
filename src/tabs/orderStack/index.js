import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrderScreen from "./OrderScreen";
import { useDispatch } from "react-redux";
import { getOrder } from "../../redux/actions/orderAction";
const StackSetting = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const fetchOrder = async () => {
  let access_token;
  try {
    access_token = await AsyncStorage.getItem("token");
  } catch (err) {
    console.log(err)
  }
  access_token && dispatch(getOrder());
}
const OrderStack = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrder()
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
