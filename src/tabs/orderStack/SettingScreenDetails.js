import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
} from "react-native";
import CustomHeader from "../../CustomHeader";
import Colors from "../../utils/Colors";

const SettingScreenDetails = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <CustomHeader isBack={true} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Setting Details!</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreenDetails;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.lighter_green
  },
});
