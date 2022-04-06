import * as types from "../constant";
import axios from "../../config/axios";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCart } from "./cartScreenAction";
// import { toast } from "react-toastify";

const getOrder = () => async (dispatch) => {
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
      dispatch({
        type: types.FETCH_ORDERS,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const orderNow = (data, navigation) => async (dispatch) => {
  let access_token;
  try {
    access_token = await AsyncStorage.getItem("token");
  } catch (err) {
    console.log(err);
  }
  console.log({ access_token })
  axios
    .post(
      `/order`,
      {
        cartId: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: access_token,
        },
      }
    )
    .then((response) => {
      ToastAndroid.showWithGravityAndOffset(
        "Order Recived",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        150
      );
      // Alert.alert("Order Placed Successfully", "Order Recived", [
      //   { text: "OK", onPress: () => console.log("OK Pressed") },
      // ]);
      dispatch(getCart());
      dispatch(getOrder());
      dispatch(navigation.navigate("Orders"));
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getOrder, orderNow };
