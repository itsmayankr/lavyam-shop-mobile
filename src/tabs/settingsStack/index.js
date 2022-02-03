import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./SettingsScreen";
import SettingScreenDetails from "./SettingScreenDetails";

const StackSetting = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const SettingStack = () => {
  return (
    <StackSetting.Navigator>
      <StackSetting.Screen
        name="Cart"
        component={SettingsScreen}
        options={navOptionHandler}
      />
      <StackSetting.Screen
        name="SettingDetails"
        component={SettingScreenDetails}
        options={navOptionHandler}
      />
    </StackSetting.Navigator>
  );
};

export default SettingStack;
