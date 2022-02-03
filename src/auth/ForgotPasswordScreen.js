import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";

import ForgotPassword from "./components/ForgotPassword";

const { width } = Dimensions.get("window");

const ForgotPasswordScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1, position: "absolute", height: "100%", width }}
        source={require("../assets/Images/flower3.jpg")}
        blurRadius={10}
      ></ImageBackground>
      <ForgotPassword navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ForgotPasswordScreen;
