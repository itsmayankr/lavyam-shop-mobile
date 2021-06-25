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

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <CustomHeader navigation={navigation} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Home!</Text>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Go Home Details"
            onPress={() => navigation.navigate("HomeDetails")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
