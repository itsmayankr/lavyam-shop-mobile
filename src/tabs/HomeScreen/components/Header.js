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
import * as types from "../../../redux/constant";
//Colors
import Colors from "../../../utils/Colors";
import BottomModal from "../../../auth/components/BottomModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategorys,
  getPincodes,
} from "../../../redux/actions/configScreenActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../../../redux/actions/auth";
import { getShops } from "../../../redux/actions/shopAction";

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
  const tokenRedux = useSelector(state => state.authProfile.token)
  const configScreen = useSelector(
    (state) => state?.configScreen
  );


  useEffect(() => {
    dispatch(getPincodes());
    dispatch(getCategorys());
    localStorageValues();
  }, []);

  // useEffect(() => {
  //   localStorageValues();
  // }, [isSubmitted]);

  useEffect(() => {
    getToken();
  }, []);

  const handleSubmitChildren = (pincode, market, category) => {
    setPinCode(pincode);
    setMarket(market);
    setCategory(category);
    setIsSubmitted(!isSubmitted);
  };

  const localStorageValues = async () => {
    let pin = await AsyncStorage.getItem("pincode");
    let mark = await AsyncStorage.getItem("market");
    let category = await AsyncStorage.getItem("category");
    console.log({ pin, mark }, "localStorageValues Header")
    await AsyncStorage.getAllKeys(async (err, keys) => {
      await AsyncStorage.multiGet(keys, (err, stores) => {
        let data = stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          console.log({ [key]: value })
          return result
        });
        console.log({ data })
      });
    });
    setCloseOnDragDown(true);
    setPinCode(pin);
    setMarket(mark);
    setCategory(category);
    (pin && mark) && dispatch(getShops(null, pin, mark, category))
  };

  const navigation = useNavigation();

  const handleLogin = async () => {
    navigation.navigate("Login");
  };

  const getToken = async () => {
    let access_token = await AsyncStorage.getItem("token");
    dispatch({
      type: types.TOKEN,
      payload: access_token,
    });
    console.log({ access_token });
    setToken(access_token)
  }

  const [token, setToken] = useState(null)

  useEffect(() => {
    getToken()

  }, [])

  const handleLogout = () => {
    setToken(null)
    console.log("Clicked")
    dispatch(logout(navigation))
  }

  return (
    <>
      <SafeAreaView style={styles.header_safe_area}>
        <View style={styles.header}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "30%" }}>
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
            </View>

            <View style={{ justifyContent: "center", marginRight: 5 }}>
              {tokenRedux ? <TouchableOpacity onPress={handleLogout}>
                <Text style={{ color: Colors.green }}>Logout</Text>
              </TouchableOpacity> :
                <TouchableOpacity onPress={() => handleLogin()}>
                  <Text style={{ color: Colors.green }}>Login</Text>
                </TouchableOpacity>}
            </View>
          </View>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={closeOnDragDown}
            closeOnPressBack={closeOnPressBack}
            closeOnPressMask={false}
            customStyles={{
              container: {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: "100%",
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
    // backgroundColor: Colors.lighter_green
  },
  header: {
    backgroundColor: Colors.white,
    // width,
    height: 50,
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    // marginBottom: ,
  },
});
