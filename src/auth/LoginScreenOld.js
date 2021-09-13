import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
// const navigation = useNavigation();
import { Button } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      {/* <CustomHeader navigation={navigation} /> */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Login Screen!</Text>
        {/* <TouchableOpacity style={{ marginTop: 20 }}> */}
        <Button
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("HomeApp")}
        >
          Login
        </Button>
        {/* </TouchableOpacity> */}
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
