
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Dimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-navigation";
import Colors from "../utils/Colors";

import LoginForm from "./components/LoginForm";

const { width } = Dimensions.get("window");

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
    <SafeAreaView style={styles.AndroidSafeArea} >
      <View style={styles.container}>
        <ImageBackground
          style={{ flex: 1, position: "absolute", height: "100%", width }}
          source={require("../assets/Images/flower3.jpg")}
          blurRadius={10}
        ></ImageBackground>
        <LoginForm navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.lighter_green
  },
  container: {
    flex: 1,
  },
});
export default LoginScreen;
