import * as types from "../constant";
import axios from "../../config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { toast } from "react-toastify";

const getNotifications = (data) => async (dispatch) => {
  dispatch({
    type: types.NOTIFICATION,
    payload: data,
  });
};

const getNotificationsNew = () => async (dispatch) => {
  let access_token;
  try {
    access_token = await AsyncStorage.getItem("token");
  } catch (err) {
    console.log(err);
  }
  axios
    .get(`/notifications`, {
      headers: {
        authorization: access_token,
      },
    })
    .then((response) => {
      dispatch({
        type: types.NOTIFICATION,
        payload: response.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getNotifications, getNotificationsNew };
