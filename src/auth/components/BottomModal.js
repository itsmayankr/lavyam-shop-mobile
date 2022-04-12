
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
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BottomModal({ refRBSheet, handleSubmitChildren }) {


  //Pincode
  const [selectedPincode, setSelectedPincode] = useState("");
  const [onPincodeChange, setOnPincodeChange] = useState("");
  const [pincodeDataSource, setPincodeDataSource] = useState([]);

  const [pin, setPinCode] = useState('');
  const [mark, setMarket] = useState("");
  const [cat, setCategory] = useState("");

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
    selectedPincode && dispatch(getMarkets(null, selectedPincode, false))
    market.totalCount > 0 && setMarketDataSource(market?.markets.map(ele => ele.marketName))

  }, [selectedPincode, onMarketChange])

  useEffect(() => {
    dispatch(getCategorys(null))
    // pinCode?.totalCount > 0 && setCategoryDataSource(category.categorys.map(ele => ({ label: ele.categoryName, value: ele.categoryName })))
    getConfigData()
  }, [])

  const getConfigData = async () => {
    let pin = await AsyncStorage.getItem("pincode");
    let mark = await AsyncStorage.getItem("market");
    let category = await AsyncStorage.getItem("category");
    setPinCode(pin);
    setMarket(mark);
    setCategory(category);
  }

  const handleSubmit = async () => {
    dispatch(getShops(null, selectedPincode, selectedMarket, selectedCategory, refRBSheet))
    handleSubmitChildren(selectedPincode, selectedMarket, selectedCategory);
    // await AsyncStorage.setItem("pincode", selectedPincode);
    // await AsyncStorage.setItem("market", selectedMarket);
    // await AsyncStorage.setItem("category", selectedCategory);
  }

  console.log({ marketDataSource })
  console.log({ market: market?.markets, total: market.totalCount })
  console.log({ pin, mark, cat }, "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
  return (
    <View style={styles.container}>
      <SearchDropDown value={setSelectedPincode} placeholder={"Pincode"} keyboardType={"numeric"} dataSource={pincodeDataSource} onChangeValue={setOnPincodeChange} />
      {/* <SearchDropDown value={setSelectedMarket} placeholder={"Market"} editable={editable}
        instant={"true"} dataSource={marketDataSource} onChangeValue={setOnMarketeChange} clearInput={clearInput} changeValueMarket={changeValueMarket} /> */}
      <SelectDropdown
        buttonStyle={{
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: Colors.green,
          marginTop: 20,
          minWidth: "80%",
          // marginHorizontal:20,
          borderRadius: 5,
          height: 50,

          // fontWeight: 'bold',
          paddingHorizontal: 10,
        }}
        disabled={selectedPincode ? false : true}
        defaultValue={mark ? mark : ""}
        buttonTextStyle={{ color: Colors.green, fontSize: 16, textAlign: "left" }}
        data={market.totalCount > 0 && market?.markets.map(ele => ele.marketName)}
        onSelect={(selectedItem, index) => {
          setSelectedMarket(selectedItem)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
      {/* <SearchDropDown value={setSelectedCategory} placeholder={"Category"} dataSource={categoryDataSource} onChangeValue={setOnCategoryChange} /> */}
      <SelectDropdown
        buttonStyle={{
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: Colors.green,
          marginTop: 20,
          minWidth: "80%",
          // marginHorizontal:20,
          borderRadius: 5,
          height: 50,

          // fontWeight: 'bold',
          paddingHorizontal: 10,
        }}
        dropdownStyle={{
          flexDirection: "column",
          marginTop: 1,
          backgroundColor: 'white',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5
        }}
        defaultValue={cat}
        buttonTextStyle={{ color: Colors.green, fontSize: 16, textAlign: "left" }}
        data={category.totalCount > 0 && category.categorys.map(ele => ele.categoryName)}
        onSelect={(selectedItem, index) => {
          setSelectedCategory(selectedItem)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
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