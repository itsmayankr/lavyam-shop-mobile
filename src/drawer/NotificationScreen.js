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

const NotificationScreen = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      {/* <CustomHeader /> */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Notification Screen!</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    height: 0
  },
});
