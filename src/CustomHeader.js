import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { Text, View, TouchableOpacity } from "react-native";

const CustomHeader = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        width: "100%",
        height: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 24,
      }}
    >
      <View
        style={{
          flex: 3,
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>Place</Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon
            style={{ textAlign: "center" }}
            name="menu"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
