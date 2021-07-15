import React from "react";
import {
  FlatList,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  // Button,
} from "react-native";
import { useSelector } from "react-redux";
import CustomHeader from "../../CustomHeader";
import { Button } from "react-native-paper";
import Card from "../../components/Card";
import { data } from "../../model/data";

const HomeScreen = ({ navigation }) => {
  const { theme } = useSelector((state) => state);

  const renderItem = ({ item }) => {
    return (
      <Card
        itemData={item}
        onPress={() => navigation.navigate("CardDetails", { itemData: item })}
      />
    );
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <CustomHeader navigation={navigation} />
      <View
        style={{
          flex: 1,
          width: "90%",
          alignSelf: "center",
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
