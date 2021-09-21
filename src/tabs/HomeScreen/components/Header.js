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
import Entypo from "react-native-vector-icons/Entypo";
//Colors
import Colors from "../../../utils/Colors";
import BottomModal from "../../../auth/components/BottomModal";
import { useDispatch, useSelector } from "react-redux";
import { getPincodes } from "../../../redux/actions/configScreenActions";

const { width } = Dimensions.get("window");
export const Header = () => {
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.configScreen);
  useEffect(() => {
    dispatch(getPincodes());
  }, []);

  const handleSubmit = (pincode, market) => {
    console.log(pincode, market);
  };
  return (
    <>
      <SafeAreaView style={styles.header_safe_area}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <View style={{ flexDirection: "row" }}>
              <Entypo
                name="location-pin"
                size={24}
                color={Colors.light_green}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  width: width,
                }}
              >
                248007
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  width: width,
                  marginLeft: 10,
                  textTransform: "capitalize",
                  color: Colors.light_green,
                }}
              >
                select market
              </Text>
            </View>
          </TouchableOpacity>

          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              container: {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: "50%",
                position: "relative",
              },
              draggableIcon: {
                backgroundColor: Colors.green,
              },
            }}
          >
            <BottomModal
              pincodeData={data?.pincodes?.pinCode}
              handleSubmit={handleSubmit}
            />
          </RBSheet>
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
