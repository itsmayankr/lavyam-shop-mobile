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
import { getOrder, orderNow } from "../../redux/actions/orderAction";
import SnackBar from "../../redux/actions/snackBar";
import { FloatButton } from "../HomeScreen/components";
import HorizontalItem from "./HorizontalItem";

const OrderScreen = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  const orders = useSelector((state) => state.orders.orders);
  console.log(orders);

  // const handleOrder = () => {
  //   const data = {
  //     cartId: cart?._id,
  //   };
  //   dispatch(orderNow(cart?._id, navigation));
  // };

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <CustomHeader isback={true} title="Orders" />
      {/* <Portal>
        <FloatButton handleOrder={handleOrder} />
      </Portal> */}
      <ScrollView
        style={{
          flex: 1,
          // justifyContent: "center",
          // alignItems: "center",
          marginBottom: 2,
        }}
      >
        {orders?.data?.map((order) => (
          <HorizontalItem key={order._id} item={order} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
