import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";

import EnterOtpForm from "./components/EnterOtpForm";

const { width } = Dimensions.get("window");

const EnterOtpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1, position: "absolute", height: "100%", width }}
        source={require("../assets/Images/flower3.jpg")}
        blurRadius={10}
      ></ImageBackground>
    <EnterOtpForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default EnterOtpScreen;
