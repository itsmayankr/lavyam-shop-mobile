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
import RegisterForm from "./RegisterForm";

const { height, width } = Dimensions.get("window");

const RegisterScreen = () => {
  return (
    // <SafeAreaView style={styles.AndroidSafeArea}>
    //   {/* <CustomHeader navigation={navigation} /> */}
    //   <View
    //     style={{
    //       flex: 1,
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     {/* <Text>Register Screen!</Text> */}
    //   </View>
    // </SafeAreaView>
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
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
