import axios from "../../config/axios";
import jwt from "jwt-decode";
// import { toast } from "react-
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginUser = (loginData, navigate) => async (dispatch) => {
  //   dispatch({ type: types.LOGIN_LOADER, payload: true });

  // let pincode12 = await AsyncStorage.getItem("pincode");
  let pincode = await AsyncStorage.getItem("pincode");
  let market = await AsyncStorage.getItem("market");
  let category = await AsyncStorage.getItem("category");
  console.log({ pincode, market, category }, "action");
  try {
    const res = await axios.post("/user-login", loginData);
    try {
      let tokenData = jwt(res.data.token);
      await AsyncStorage.setItem("token", res.data.token);
      let pincode = await axios.get(`/pincode/${tokenData.pincode}`);
      await AsyncStorage.setItem("pincode", JSON.stringify(pincode.data));
    } catch (error) {
      console.log(error);
    }

    // dispatch({ type: types.LOGIN_LOADER, payload: false });
    navigate.navigate("Home", { replace: true });
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

const logout = (navigation) => async (dispatch) => {
  await AsyncStorage.clear();

  navigation.navigate("Login", { replace: true });
  // dispatch({ type: "RESET" });
};

export { loginUser, register, logout };
