import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  Button,
} from "react-native";
import CustomHeader from "../../CustomHeader";

const SettingsScreen = ({ navigation }) => {
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
        <Text>Cart is empty!!</Text>
        {/* <View style={{ marginTop: 20 }}>
          <Button
            title="Go Setting Details"
            onPress={() => navigation.navigate("SettingDetails")}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
