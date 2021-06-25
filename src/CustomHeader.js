import React from "react";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({ isBack }) => {
  const navigation = useNavigation();
  console.log(navigation);
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
          flex: 1,
          justifyContent: "center",
        }}
      >
        {isBack ? (
          <TouchableOpacity>
            <MaterialIcons
              style={{ textAlign: "left", marginLeft: 25 }}
              name="arrow-back-ios"
              size={18}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
        ) : (
          <Text style={{ textAlign: "center" }}>Place</Text>
        )}
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        {isBack ? null : (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon
              style={{ textAlign: "center" }}
              name="menu"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;
