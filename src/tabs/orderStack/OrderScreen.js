import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { getOrder, orderNow } from "../../redux/actions/orderAction";

import { Header } from "./Header";
import HorizontalItem from "./HorizontalItem";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const OrderScreen = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  const orders = useSelector((state) => state.orders.orders);
  // console.log(orders);

  // const handleOrder = () => {
  //   const data = {
  //     cartId: cart?._id,
  //   };
  //   dispatch(orderNow(cart?._id, navigation));
  // };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getOrder());
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
