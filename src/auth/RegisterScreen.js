import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import Colors from "../utils/Colors";
import RegisterForm from "./RegisterForm";

const { height, width } = Dimensions.get("window");

const RegisterScreen = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <ImageBackground
          style={{ flex: 1, position: "absolute", height: "100%", width }}
          source={require("../assets/Images/flower3.jpg")}
          blurRadius={10}
        ></ImageBackground>
        <ScrollView>
          <RegisterForm />
        </ScrollView>
        {/* <LoginForm navigation={navigation} /> */}
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
