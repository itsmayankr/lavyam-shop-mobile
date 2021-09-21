import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  Button,
  AsyncStorage,
  ScrollView,
  Alert,
} from "react-native";
import { Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../CustomHeader";
import { getCart } from "../../redux/actions/cartScreenAction";
import { orderNow } from "../../redux/actions/orderAction";
import SnackBar from "../../redux/actions/snackBar";
import { FloatButton } from "../HomeScreen/components";
import { Header } from "../DetailScreen/components/Header";
import CartList from "./CartList";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);
  const cart = useSelector((state) => state.cartScreen.cart.data);

  const handleOrder = () => {
    const data = {
      cartId: cart?._id,
    };
    dispatch(orderNow(cart?._id, navigation));
    console.log(cart._id);
  };

  return (
    // <SafeAreaView style={styles.AndroidSafeArea}>
    //   <CustomHeader isback={true} />
    //   <Portal>
    //     <FloatButton handleOrder={handleOrder} />
    //   </Portal>
    //   <ScrollView
    //     style={{
    //       flex: 1,
    //     }}
    //   >
    //     {cart?.items?.map((item) => (
    //       <CartList key={item._id} item={item} />
    //     ))}
    //   </ScrollView>
    // </SafeAreaView>
    <View style={styles.container}>
      <Header shopName="Cart" />
      {cart?.items?.map((item) => (
        <CartList key={item._id} item={item} />
      ))}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingBottom: 20 },
});

// const styles = StyleSheet.create({
//   AndroidSafeArea: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
// });
