import React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import ResetPasswordForm from "./components/ResetPasswordForm";

const { width } = Dimensions.get("window");

const ResetPasswordScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1, position: "absolute", height: "100%", width }}
        source={require("../assets/Images/flower3.jpg")}
        blurRadius={10}
      ></ImageBackground>
      <ResetPasswordForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ResetPasswordScreen;
