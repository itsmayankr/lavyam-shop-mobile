import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/axios";
import { getOrder, orderNow } from "../../redux/actions/orderAction";

import { Header } from "./Header";
import HorizontalItem from "./HorizontalItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const OrderScreen = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([])
  // const orders = useSelector((state) => state.orders.orders);

  const fetchOrders = async () => {
    let access_token;
    try {
      access_token = await AsyncStorage.getItem("token");
    } catch (err) {
      console.log(err);
    }
    axios
      .get(`/order`, {
        headers: {
          authorization: access_token,
        },
      })
      .then((response) => {
        console.log(response.data)
        setOrders(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const isFocused = useIsFocused();

  useEffect(() => {
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
    // dispatch(getOrder());
    if (isFocused) {
      fetchOrders()
    }
  }, [isFocused])

  console.log(orders);

  // const handleOrder = () => {
  //   const data = {
  //     cartId: cart?._id,
  //   };
  //   dispatch(orderNow(cart?._id, navigation));
  // };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // dispatch(getOrder());
    fetchOrders()
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.AndroidSafeArea}>
      <Header shopName={"Orders"} />

      <ScrollView
        style={{
          flex: 1,
          // justifyContent: "center",
          // alignItems: "center",
          marginBottom: 2,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {orders?.data?.map((order) => (
          <HorizontalItem key={order._id} item={order} />
        ))}
      </ScrollView>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
