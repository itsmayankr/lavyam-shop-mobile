import * as types from "../constant";
import axios from "../../config/axios";
import { AsyncStorage } from "react-native";
// import { toast } from "react-toastify";

const getCart = () => async (dispatch) => {
  let access_token;
  try {
    access_token = await AsyncStorage.getItem("token");
  } catch (err) {
    console.log(err);
  }
  axios
    .get(`/cart`, {
      headers: {
        authorization: access_token,
      },
    })
    .then((response) => {
      console.log(response.data, "action");
      dispatch({
        type: types.FETCH_CART,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const addToCart = (data) => async (dispatch) => {
  let access_token;
  try {
    access_token = await AsyncStorage.getItem("token");
  } catch (err) {
    console.log(err);
  }
  axios
    .post(`/cart`, data, {
      headers: {
        authorization: access_token,
      },
    })
    .then((response) => {
      dispatch(getCart());
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getCart, addToCart };
