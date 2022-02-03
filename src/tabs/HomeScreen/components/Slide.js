import React from "react";
import { View, Dimensions, StyleSheet, Image } from "react-native";
const { width } = Dimensions.get("window");
import { constant } from "../../../utils/constant";
const Slide = ({ imageUrl, localImage, localImageMain }) => {
  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image
          style={{
            resizeMode: "cover",
            width: "100%",
            height: 150,
            borderRadius: 10,
          }}
          source={{ uri: imageUrl }}
        />
      ) : localImage ? (
        <View
          style={{
            borderRadius: 10,
            borderColor: "#d7d7d7",
            borderWidth: 1,
            padding: 25,
            width: "100%",
            height: 150,
          }}
        >
          <Image
            style={{
              resizeMode: "contain",
              width: "100%",
              height: 100,
              opacity: 0.6,
            }}
            source={localImage}
          />
        </View>
      ) : (
        <Image
          style={{
            resizeMode: "cover",
            width: "100%",
            height: 150,
            borderRadius: 10,
          }}
          source={localImageMain}
        />
      )}
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
