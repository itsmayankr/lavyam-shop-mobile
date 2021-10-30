import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../../components/UI/CustomText";
import Colors from "../../utils/Colors";

import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { getMarkets } from "../../redux/actions/configScreenActions";
import { getShops } from "../../redux/actions/shopAction";

export default function BottomModal({
  pincodeData,
  categoryData,
  refRBSheet,
  handleSubmitChildren,
}) {
  const [selectedPincode, setSelectedPincode] = useState();
  const [selectedMarket, setSelectedMarket] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [localStorage, setLocalStorage] = useState({
    pincode: "",
    category: "",
    market: "",
  });

  const marketsData = useSelector(
    (state) => state?.configScreen?.markets?.markets
  );
  const dispatch = useDispatch();
  const setLocalFunc = async (pin) => {
    console.log("Involed Set");
    await AsyncStorage.setItem("pincode", pin);
    console.log(pin);
    dispatch(getMarkets(null, pin));
  };

  useEffect(() => {
    localStorageValues();
  }, []);

  const localStorageValues = async () => {
    let pincode = await AsyncStorage.getItem("pincode");
    let market = await AsyncStorage.getItem("market");
    let category = await AsyncStorage.getItem("category");
    setLocalStorage({
      pincode,
      category,
      market,
    });
  };
  console.log({ localStorage });
  const handleSubmit = async () => {
    // console.log(selectedPincode, selectedMarket, selectedCategory);
    try {
      await AsyncStorage.setItem("pincode", selectedPincode);
      await AsyncStorage.setItem("market", selectedMarket);

      selectedCategory
        ? await AsyncStorage.setItem("category", selectedCategory)
        : await AsyncStorage.setItem("category", "");

      dispatch(
        getShops(null, selectedPincode, selectedMarket, selectedCategory)
      );

      handleSubmitChildren();
      refRBSheet.current.close();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E9EDF3",
        marginBottom: 10,
        position: "relative",
      }}
    >
      <View style={{ height: "100%" }}>
        <View style={styles.card}>
          <Picker
            selectedValue={localStorage.pincode || selectedPincode}
            onValueChange={(itemValue, itemIndex) => {
              setLocalFunc(itemValue);
              console.log(itemValue, ":::AAA::::");
              dispatch(getMarkets(null, itemValue));
              setSelectedPincode(itemValue);
            }}
            style={{ height: 30 }}
          >
            <Picker.Item
              label={localStorage.pincode || "Select PIN Code"}
              value={localStorage.pincode || selectedPincode}
            />
            {pincodeData?.map((ele, i) => (
              <Picker.Item
                style={styles.pickerItem}
                key={i}
                label={ele.pinCode}
                value={ele.pinCode}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.cardMarket(selectedPincode, localStorage)}>
          <Picker
            selectedValue={selectedMarket}
            enabled={localStorage.pincode || selectedPincode ? true : false}
            onValueChange={(itemValue, itemIndex) => {
              // fetchMarkets(itemValue);

              setSelectedMarket(itemValue);
            }}
            style={{
              height: 30,
              color:
                localStorage?.pincode?.pincode || selectedPincode
                  ? Colors.black
                  : Colors.grey,
            }}
          >
            <Picker.Item
              label={
                localStorage.market
                  ? localStorage.market
                  : selectedPincode
                  ? "Select Market"
                  : "PIN Code Required"
              }
              value={localStorage.market || selectedPincode}
            />
            {marketsData &&
              marketsData?.map((ele, i) => (
                <Picker.Item
                  style={styles.pickerItem}
                  key={ele._id}
                  label={
                    ele.marketName.charAt(0).toUpperCase() +
                    ele.marketName.slice(1)
                  }
                  value={ele.marketName}
                />
              ))}
          </Picker>
        </View>

        <View style={styles.card}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemValue)
            }
            style={{ height: 30 }}
          >
            <Picker.Item
              label={localStorage.category || "Select Category"}
              value={localStorage.category || null}
            />
            {categoryData?.map((ele, i) => (
              <Picker.Item
                style={styles.pickerItem}
                key={ele._id}
                label={
                  ele.categoryName.charAt(0).toUpperCase() +
                  ele.categoryName.slice(1)
                }
                value={ele.categoryName}
              />
            ))}
          </Picker>
        </View>
        <View>
          <TouchableOpacity
            // onPress={() => handleSubmit("123", "123")}
            onPress={
              (selectedPincode || localStorage.pincode) &&
              (selectedMarket || localStorage.market) &&
              handleSubmit
            }
            style={{
              alignItems: "center",
              marginTop: 40,
              width: "100%",
            }}
          >
            <View
              style={styles.signIn(
                selectedPincode,
                selectedMarket,
                localStorage
              )}
            >
              <CustomText
                style={styles.textSign(
                  selectedPincode,
                  selectedMarket,
                  localStorage
                )}
              >
                Submit
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signIn: (selectedPincode, selectedMarket, localStorage) => ({
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor:
      (localStorage?.pincode?.pincode || selectedPincode) && selectedMarket
        ? Colors.lighter_green
        : Colors.grey,
  }),
  textSign: (selectedPincode, selectedMarket, localStorage) => ({
    fontSize: 15,
    color:
      (localStorage?.pincode?.pincode || selectedPincode) && selectedMarket
        ? Colors.white
        : Colors.black,
    // fontFamily: "Roboto-Medium",
  }),
  card: {
    borderWidth: 1,
    width: 314,
    borderColor: Colors.green,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 4,
    paddingVertical: 6,
    marginTop: 30,
  },
  cardMarket: (selectedPincode, localStorage) => ({
    borderWidth: 1,
    width: 314,
    borderColor:
      localStorage?.pincode?.pincode || selectedPincode
        ? Colors.green
        : Colors.grey,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 4,
    paddingVertical: 6,
    marginTop: 30,
  }),
  pickerItem: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    color: "red",
  },
});
