import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Text } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/axios";

import { Header } from "./Header";
import HorizontalItem from "./HorizontalItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOrder } from "../../redux/actions/orderAction";
import Colors from "../../utils/Colors";
import { Button } from "react-native-paper";
import CustomText from "../../components/UI/CustomText";
import RedirectLogin from "../../auth/components/RedirectLogin";
import NoItemFound from "../../auth/components/NoItemFound";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const OrderScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const [orders, setOrders] = useState([])
  const orders = useSelector((state) => state.orders.orders);

  const fetchOrders = async () => {
    let access_token;
    try {
      access_token = await AsyncStorage.getItem("token");
    } catch (err) {
      console.log(err);
    }
    // axios
    //   .get(`/order`, {
    //     headers: {
    //       authorization: access_token,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data)
    //     access_token && setOrders(response.data)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
  const isFocused = useIsFocused();

  useEffect(() => {
    // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
    dispatch(getOrder());
    if (isFocused) {
      fetchOrders()
    }
  }, [isFocused])


  const tokenRedux = useSelector(state => state.authProfile.token)
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
    // fetchOrders()
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const handleLogin = async () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.AndroidSafeArea}>
      <Header shopName={"Orders"} />

      {!tokenRedux ? (<RedirectLogin />)
        : (<ScrollView
          style={{
            flex: 1,
            marginBottom: 2,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {orders?.data?.length > 0 ? orders?.data?.map((order) => (
            <HorizontalItem key={order._id} item={order} />
          )) : <Text style={{ flex: 1, alignSelf: "center", marginTop: 170 }}> <NoItemFound name="Order" /> </Text>}
        </ScrollView>)}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  signIn: {
    width: "100%",
    height: 40,
    paddingHorizontal: 20,
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: Colors.lighter_green,
    marginBottom: 10,
  },
  textSign: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.white
  },
});
