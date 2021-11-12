import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";

import LoginForm from "./components/LoginForm";

const { height, width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   tokenData();
  // }, [token]);

  // const tokenData = async () => {
  //   const tokenData = await AsyncStorage.getItem("token");

  //   setToken(tokenData);
  // };
  // console.log(token);
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
