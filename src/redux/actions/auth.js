import axios from "../../config/axios";
import jwt from "jwt-decode";
import * as types from "../constant";
// import { toast } from "react-
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginUser = (loginData, navigate) => async (dispatch) => {
  //   dispatch({ type: types.LOGIN_LOADER, payload: true });

  // let pincode12 = await AsyncStorage.getItem("pincode");
  let pincode = await AsyncStorage.getItem("pincode");
  let market = await AsyncStorage.getItem("market");
  let category = await AsyncStorage.getItem("category");

  try {
    const res = await axios.post("/user-login", loginData);
    console.log("Login User");
    try {
      let tokenData = jwt(res.data.token);
      console.log({ tokenData })
      // console.log({ tokenData, oken: res.data.token })
      await AsyncStorage.setItem("token", res.data.token);

      navigate.navigate("HomeApp", { replace: true });
      ToastAndroid.showWithGravityAndOffset(
        "Login successfully",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        150
      );
      dispatch({
        type: types.TOKEN,
        payload: res.data.token,
      });
    } catch (error) {
      console.log({ error });
    }

    // dispatch({ type: types.LOGIN_LOADER, payload: false });
  } catch (e) {
    console.log(e);
    // dispatch({ type: types.LOGIN_LOADER, payload: false });
    if (e.response) {
      return (
        // message.error(e.response.data)
        console.log(e.response.data.error)
        // e.response.data.error && toast.success(`${e.response.data.error}`)
      );
    }
  }
};

const getOtp = (userData, navigation) => async (dispatch) => {
  try {
    let data = await axios.get(`/get-otp?email=${userData.email}`);
    // message.success("Register Successfully");
    console.log(data.data);
    if (data.data) {
      dispatch({
        type: types.GET_NUMBER,
        payload: data.data.number,
      });

      ToastAndroid.showWithGravityAndOffset(
        "OTP Sent",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        150
      );
      navigation.navigate("EnterOtp");
    }
    // if (err.response) return message.error(err.response.data);
  } catch (err) {
    console.log(err);
  }
};

const forgotPasswordAction = async (userData, navigation, type) => {
  try {
    let data = await axios.post(`/forgot-password`, userData);
    // message.success("Register Successfully");
    console.log({ data: data.data });
    if (type === "Reset") {
      if (data.data.redirect) {
        navigation.navigate("ResetPassword");
      } else {
        ToastAndroid.showWithGravityAndOffset(
          "Incorrect OTP",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          150
        );
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        "Password Reset Successfully",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        150
      );
      navigation.navigate("Login");
    }
  } catch (err) {
    console.log(err);
  }
};

const register = async (userData, navigation) => {
  try {
    await axios.post("/user-register", userData);
    // message.success("Register Successfully");
    navigation.navigate("Login");
    // if (err.response) return message.error(err.response.data);
  } catch (err) {
    console.log(err);
  }
};

const getLocalStorage = async () => {
  let access_token = await AsyncStorage.getItem("token");
  return access_token
}


const getUserProfile = () => async (dispatch) => {
  const token = await getLocalStorage()
  axios
    .get(`/user-profile`, {
      headers: {
        authorization: token
      }
    })
    .then((response) => {

      ToastAndroid.showWithGravityAndOffset(
        "Registred successfully",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        150
      );

      dispatch({
        type: types.GET_USER_PROFILE,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });

};

const logout = (navigation) => async (dispatch) => {
  await AsyncStorage.clear();

  navigation.navigate("Login", { replace: true });
  // dispatch({ type: "RESET" });
  ToastAndroid.showWithGravityAndOffset(
    "Logged out",
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    150
  );
  dispatch({
    type: types.FETCH_ORDERS,
    payload: [],
  });
  dispatch({
    type: types.TOKEN,
    payload: null,
  });
};

export { loginUser, register, logout, getOtp, forgotPasswordAction, getUserProfile };
