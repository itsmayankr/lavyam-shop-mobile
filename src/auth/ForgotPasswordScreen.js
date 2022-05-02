import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Dimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../utils/Colors";

import ForgotPassword from "./components/ForgotPassword";

const { width } = Dimensions.get("window");

const ForgotPasswordScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <ImageBackground
          style={{ flex: 1, position: "absolute", height: "100%", width }}
          source={require("../assets/Images/flower3.jpg")}
          blurRadius={10}
        ></ImageBackground>
        <ForgotPassword navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.lighter_green
  },
  container: {
    flex: 1,
  },
});
export default ForgotPasswordScreen;
