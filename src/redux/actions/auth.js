import axios from "../../config/axios";
import jwt from "jwt-decode";
import * as types from "../constant";
// import { toast } from "react-
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

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
      showMessage({
        message: "Login successfully",
        type: "success",
        icon: "success",
        floating: true
      });
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
      showMessage({
        message: e.response.data,
        type: "danger",
        icon: "danger",
        floating: true
      });
      console.log(e.response.data)
      // e.response.data.error && toast.success(`${e.response.data.error}`)

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

      showMessage({
        message: "OTP sent",
        type: "success",
        icon: "success",
        floating: true
      });
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
        showMessage({
          message: "Incorrect OTP",
          type: "danger",
          icon: "danger",
          floating: true
        });
      }
    } else {
      showMessage({
        message: "Password Reset Successfully",
        type: "success",
        icon: "success",
        floating: true
      });
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
    showMessage({
      message: "User register successfully",
      type: "success",
      icon: "success",
      floating: true
    });
    navigation.navigate("Login");
    // if (err.response) return message.error(err.response.data);
  } catch (err) {
    console.log(err.response.data)
    if (err.response) {
      showMessage({
        message: err?.response?.data?.error?._message || err?.response?.data?.error || "something when wrong!!",
        type: "danger",
        icon: "danger",
        floating: true
      });
    }
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

      showMessage({
        message: "User Registerd Successfully",
        type: "success",
        icon: "success",
        floating: true
      });

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
  showMessage({
    message: "Logged Out",
    type: "success",
    icon: "success",
    floating: true
  });
  dispatch({
    type: types.FETCH_ORDERS,
    payload: null,
  });
  dispatch({
    type: types.TOKEN,
    payload: null,
  });
};

export { loginUser, register, logout, getOtp, forgotPasswordAction, getUserProfile };
