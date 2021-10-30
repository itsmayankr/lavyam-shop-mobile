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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";
//Colors
import Colors from "../../../utils/Colors";
import BottomModal from "../../../auth/components/BottomModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategorys,
  getPincodes,
} from "../../../redux/actions/configScreenActions";

const { width } = Dimensions.get("window");
export const Header = () => {
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.configScreen);

  const [pincode, setPinCode] = useState("");
  const [market, setMarket] = useState("");
  const [category, setCategory] = useState("");
  const [closeOnDragDown, setCloseOnDragDown] = useState(false);
  const [closeOnPressBack, setCloseOnPressBack] = useState(true);

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getPincodes());
    dispatch(getCategorys());
    handleBottomModal();
    localStorageValues();
    console.log(pincode, "pincodepincodepincodepincode");
    console.log("useEffect called header");
  }, []);

  const handleBottomModal = async () => {
    let pin = await AsyncStorage.getItem("pincode");
    let mark = await AsyncStorage.getItem("market");

    console.log(pin, mark, "::::::::::::::::::::::::::::");

    (pin === null || mark === null) && refRBSheet.current.open();

    !pin && !mark && setCloseOnPressBack(false);
  };

  useEffect(() => {
    localStorageValues();
  }, [isSubmitted]);

  const handleSubmitChildren = () => {
    setIsSubmitted(!isSubmitted);
  };

  const localStorageValues = async () => {
    let pin = await AsyncStorage.getItem("pincode");
    let mark = await AsyncStorage.getItem("market");
    let category = await AsyncStorage.getItem("category");
    pin && mark && setCloseOnDragDown(true);
    console.log(
      { pin, mark, category },
      "::::::::::::::::::ASDSAD::::::::::::::::::"
    );
    pin && setPinCode(pin);
    mark && setMarket(mark);
    category && setCategory(category);
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
                {pincode || "Select PIN Code"}
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
                {market || "Select market"}
              </Text>
            </View>
          </TouchableOpacity>

          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={closeOnDragDown}
            closeOnPressBack={closeOnPressBack}
            closeOnPressMask={false}
            customStyles={{
              container: {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: "50%",
                // position: "relative",
              },
              draggableIcon: {
                backgroundColor: Colors.green,
              },
            }}
          >
            <BottomModal
              pincodeData={data?.pincodes?.pinCode}
              marketsData={data?.markets?.markets}
              categoryData={data?.categorys?.categorys}
              refRBSheet={refRBSheet}
              handleSubmitChildren={handleSubmitChildren}
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
