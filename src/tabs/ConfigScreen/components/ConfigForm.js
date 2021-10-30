// import React, { useEffect } from "react";
// import { TextInput, StyleSheet, View, AsyncStorage } from "react-native";
// import { Button, Menu, Provider } from "react-native-paper";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getCategorys,
//   getMarkets,
//   getPincodes,
// } from "../../../redux/actions/configScreenActions";
// import Colors from "../../../utils/Colors";

// const ConfigForm = ({ navigation }) => {
//   const [pincode, setPincode] = React.useState("Select Pincode");
//   const [localStoragePincode, setLocalStoragePincode] = React.useState({});
//   const [market, setMarket] = React.useState("Select Market");
//   const [category, setCategory] = React.useState("Select Category");
//   const [isOpenPin, setOpenPin] = React.useState(false);
//   const [isOpenMarket, setOpenMarket] = React.useState(false);
//   const [isOpenCategory, setOpenCategory] = React.useState(false);

//   const data = useSelector((state) => state.configScreen);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getPincodes());
//     dispatch(getCategorys());
//     // setPincodeFetch(data.pincodes.pinCode);
//     // getPincode();
//   }, []);
//   useEffect(() => {
//     // setPincode(localStoragePincode.pinCode);
//     dispatch(getMarkets(null, pincode));
//   }, [pincode]);
//   console.log(data, "::::::::::::::::::::::::::::::::::::::::::::");

//   const getPincode = async () => {
//     let pincode = await AsyncStorage.getItem("userpincode");
//     setLocalStoragePincode(JSON.parse(pincode));
//   };

//   const onPressItemHandler = (value) => {
//     setPincode(value);
//     setOpenPin(false);
//   };

//   const onPressItemHandlerMarket = (value) => {
//     setMarket(value);
//     setOpenMarket(false);
//   };

//   const onPressItemHandlerCategory = (value) => {
//     setCategory(value);
//     setOpenCategory(false);
//   };
//   console.log(localStoragePincode, "localStoragePincode");
//   console.log(pincode, "pincodepincode");

//   const handleConfirm = async () => {
//     try {
//       await AsyncStorage.setItem("pincode", pincode);
//       await AsyncStorage.setItem("market", market);
//       if (category !== "Select Category") {
//         await AsyncStorage.setItem("category", category);
//       } else {
//         await AsyncStorage.setItem("category", "");
//       }
//     } catch (error) {
//       // Error saving data
//     }

//     pincode !== "Select Pincode" &&
//       market !== "Select Market" &&
//       navigation.navigate("HomeApp");
//   };
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Menu
//         style={{ marginTop: 70 }}
//         visible={isOpenPin}
//         onDismiss={() => setOpenPin(false)}
//         anchor={
//           <Button
//             style={{ marginTop: 25 }}
//             color="#8DB600"
//             dark={true}
//             mode="contained"
//             onPress={() => setOpenPin(true)}
//           >
//             {localStoragePincode.pincode || pincode}
//           </Button>
//         }
//       >
//         {data?.pincodes?.pinCode?.map((pin) => (
//           <Menu.Item
//             key={pin._id}
//             onPress={() => onPressItemHandler(pin.pinCode)}
//             title={pin.pinCode}
//           />
//         ))}
//       </Menu>

//       <Menu
//         style={{ marginTop: 70 }}
//         visible={isOpenMarket}
//         onDismiss={() => setOpenMarket(false)}
//         anchor={
//           <Button
//             style={{ marginTop: 25 }}
//             color="#8DB600"
//             dark={true}
//             mode="contained"
//             onPress={() => setOpenMarket(true)}
//           >
//             {pincode !== "Select Pincode" && data?.markets.totalCount === 0
//               ? "No market in this Pincode"
//               : market}
//           </Button>
//         }
//       >
//         {data?.markets?.markets?.map((item) => (
//           <Menu.Item
//             key={item._id}
//             onPress={() => onPressItemHandlerMarket(item.marketName)}
//             title={item.marketName}
//           />
//         ))}
//       </Menu>

//       <Menu
//         style={{ marginTop: 70 }}
//         visible={isOpenCategory}
//         onDismiss={() => setOpenCategory(false)}
//         anchor={
//           <Button
//             style={{ marginTop: 25 }}
//             color="#8DB600"
//             dark={true}
//             mode="contained"
//             onPress={() => setOpenCategory(true)}
//           >
//             {data?.categorys.totalCount === 0 ? "No Category Found" : category}
//           </Button>
//         }
//       >
//         {data?.categorys?.categorys?.map((item) => (
//           <Menu.Item
//             key={item._id}
//             onPress={() => onPressItemHandlerCategory(item.categoryName)}
//             title={item.categoryName}
//           />
//         ))}
//         {/* <Menu.Item
//           onPress={() => onPressItemHandlerCategory("Category 1")}
//           title="Category 1"
//         />
//         <Menu.Item
//           onPress={() => onPressItemHandlerCategory("Category 2")}
//           title="Category 2"
//         />
//         <Menu.Item
//           onPress={() => onPressItemHandlerCategory("Category 3")}
//           title="Category 3"
//         /> */}
//       </Menu>

//       <Button
//         color="#8DB600"
//         dark={true}
//         mode="contained"
//         style={{
//           marginTop: 200,
//           width: "50%",
//           height: 50,
//           justifyContent: "center",
//           alignItems: "center",
//           borderRadius: 5,

//           backgroundColor: Colors.lighter_green,
//         }}
//         onPress={() => handleConfirm()}
//       >
//         Confirm
//       </Button>
//     </View>
//   );
// };

// export default ConfigForm;
