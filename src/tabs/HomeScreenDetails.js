import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
} from "react-native";
import CustomHeader from "../CustomHeader";

const HomeScreenDetails = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <CustomHeader />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Home Details!</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreenDetails;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
