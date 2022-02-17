import React from "react";
import { View, Dimensions, StyleSheet, Image } from "react-native";
const { width } = Dimensions.get("window");
import { constant } from "../../../utils/constant";
const Slide = ({ localImageMain }) => {
  return (
    <View style={styles.container}>

      <Image
        style={{
          resizeMode: "contain",
          width: "100%",
          height: 150,
          marginBottom: 5
        }}
        source={{ uri: localImageMain }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default Slide;
