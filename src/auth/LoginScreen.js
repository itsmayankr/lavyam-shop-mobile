import React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";

import LoginForm from "./components/LoginForm";

const { height, width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1, position: "absolute", height: "100%", width }}
        source={require("../assets/Images/flower3.jpg")}
        blurRadius={10}
      ></ImageBackground>
      <LoginForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default LoginScreen;
