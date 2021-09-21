// Import react
import React, { useRef, useEffect, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
//Colors
import Colors from "../../../utils/Colors";
import BottomModal from "../../../auth/components/BottomModal";
import { useDispatch, useSelector } from "react-redux";
import { getPincodes } from "../../../redux/actions/configScreenActions";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
export const Header = ({ shopName }) => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={styles.header_safe_area}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 5 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={{ marginRight: 10 }}>
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={Colors.light_green}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                width: width,
                textTransform: "capitalize",
              }}
            >
              {shopName}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: Colors.white,
    // width,
    height: 50,
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 2,
    marginHorizontal: 10,
    // marginBottom: ,
  },
});
