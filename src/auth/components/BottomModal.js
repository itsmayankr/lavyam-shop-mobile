
import React, { useEffect, useRef, useState } from "react";
import {
  View, StyleSheet, TouchableOpacity
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { getCategorys, getMarkets, getPincodes } from "../../redux/actions/configScreenActions";
import { getShops } from "../../redux/actions/shopAction";
import SearchDropDown from './SearchDropdown'
import CustomText from "../../components/UI/CustomText";
import Colors from "../../utils/Colors";

export default function BottomModal({ refRBSheet, handleSubmitChildren }) {


  //Pincode
  const [selectedPincode, setSelectedPincode] = useState("");
  const [onPincodeChange, setOnPincodeChange] = useState("");
  const [pincodeDataSource, setPincodeDataSource] = useState([]);

  //Market
  const [selectedMarket, setSelectedMarket] = useState("");
  const [changeValueMarket, setChangeValueMarket] = useState("something");
  const [onMarketChange, setOnMarketeChange] = useState("");
  const [marketDataSource, setMarketDataSource] = useState([]);
  const [editable, setEditable] = useState(false)

  //Category
  const [selectedCategory, setSelectedCategory] = useState("");
  const [onCategoryChange, setOnCategoryChange] = useState("");
  const [categoryDataSource, setCategoryDataSource] = useState([]);
  const [clearInput, setClearInput] = useState(false)

  const dispatch = useDispatch();

  const pinCode = useSelector(
    (state) => state?.configScreen.pincodes
  );

  const market = useSelector(
    (state) => state?.configScreen.markets
  );
  const category = useSelector(
    (state) => state?.configScreen.categorys
  );

  useEffect(() => {
    console.log("Pincode useEffect Called");
    dispatch(getPincodes(null, onPincodeChange))
    pinCode?.totalCount > 0 && setPincodeDataSource(pinCode.pinCode.map(ele => ({ label: ele.pinCode, value: ele.pinCode })))
    setClearInput(true)
  }, [onPincodeChange])

  useEffect(() => {
    setChangeValueMarket("")
  }, [onPincodeChange, selectedPincode])

  useEffect(() => {
    selectedPincode?.length > 0 ? setEditable(true) : setEditable(false)
    selectedPincode && dispatch(getMarkets(null, selectedPincode, onMarketChange, false))
    market.totalCount > 0 && setMarketDataSource(market?.markets.map(ele => ({ label: ele.marketName, value: ele.marketName })))

  }, [selectedPincode, onMarketChange])

  useEffect(() => {
    dispatch(getCategorys(null, onCategoryChange))
    pinCode?.totalCount > 0 && setCategoryDataSource(category.categorys.map(ele => ({ label: ele.categoryName, value: ele.categoryName })))
  }, [onCategoryChange])


  const handleSubmit = async () => {
    dispatch(getShops(null, selectedPincode, selectedMarket, selectedCategory, refRBSheet))
    handleSubmitChildren(selectedPincode, selectedMarket, selectedCategory);
    // await AsyncStorage.setItem("pincode", selectedPincode);
    // await AsyncStorage.setItem("market", selectedMarket);
    // await AsyncStorage.setItem("category", selectedCategory);
  }

  return (
    <View style={styles.container}>
      <SearchDropDown value={setSelectedPincode} placeholder={"Pincode"} keyboardType={"numeric"} dataSource={pincodeDataSource} onChangeValue={setOnPincodeChange} />
      <SearchDropDown value={setSelectedMarket} placeholder={"Market"} editable={editable}
        instant={"true"} dataSource={marketDataSource} onChangeValue={setOnMarketeChange} clearInput={clearInput} changeValueMarket={changeValueMarket} />
      <SearchDropDown value={setSelectedCategory} placeholder={"Category"} dataSource={categoryDataSource} onChangeValue={setOnCategoryChange} />
      {/* <Button onPress={handleSubmit}>Submit</Button> */}
      <View>
        <TouchableOpacity
          // onPress={() => handleSubmit("123", "123")}
          onPress={handleSubmit}
          style={{
            alignItems: "center",
            marginTop: 40,
            width: "100%",
          }}
        >
          <View
            style={styles.signIn}
          >
            <CustomText
              style={styles.textSign}
            >
              Submit
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
    flex: 1
  },
  textInput: {
    backgroundColor: '#BFBFBF',
    marginVertical: 20,
    width: '80%',
    borderRadius: 5,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  signIn: {
    width: "100%",
    height: 40,
    paddingHorizontal: 20,
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: Colors.lighter_green
  },
  textSign: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.white
  },
});