import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

const CustomDrawerContent = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeAreaDrawer}>
      <Text>Test 1</Text>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  AndroidSafeAreaDrawer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "tomato",
  },
});
